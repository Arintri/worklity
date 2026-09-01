import {
  GENDER,
  HPV_PROGRAMME_APPLICABILITY,
  INDIA_UIP_SCHEDULE,
  JE_APPLICABILITY,
  RECORD_STATES,
} from "./vaccinationSchedule.mjs";

export const DAY_MS = 86_400_000;
export const MONTH_END_CONVENTION =
  "Clamp to the last valid day of the target calendar month.";
export const FEBRUARY_29_CONVENTION =
  "For year-based milestones, February 29 clamps to February 28 in a non-leap target year.";

const TIMING_UNITS = new Set(["birth", "days", "weeks", "months", "years"]);
const VALID_RECORD_STATES = new Set(Object.values(RECORD_STATES));

function createUTCDate(year, monthIndex, day) {
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(monthIndex) ||
    !Number.isInteger(day)
  ) {
    return null;
  }

  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(year, monthIndex, day);
  return Number.isFinite(date.getTime()) ? date : null;
}

export function isValidUTCDate(date) {
  return (
    date instanceof Date &&
    Number.isFinite(date.getTime()) &&
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0 &&
    date.getUTCMilliseconds() === 0
  );
}

export function daysInMonth(year, month) {
  if (
    !Number.isSafeInteger(year) ||
    year < 1 ||
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12
  ) {
    return null;
  }

  const date = createUTCDate(year, month, 0);
  return date ? date.getUTCDate() : null;
}

export function parseISODate(value) {
  if (typeof value !== "string" || value === "") return null;

  const match = /^(\d{4,})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const maximumDay = daysInMonth(year, month);

  if (
    !Number.isSafeInteger(year) ||
    year < 1 ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    maximumDay === null ||
    day < 1 ||
    day > maximumDay
  ) {
    return null;
  }

  const date = createUTCDate(year, month - 1, day);

  if (
    !isValidUTCDate(date) ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

export function formatISODate(date) {
  if (!isValidUTCDate(date)) return null;

  const year = String(date.getUTCFullYear()).padStart(4, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addCalendarDays(date, amount) {
  if (!isValidUTCDate(date) || !Number.isSafeInteger(amount)) return null;

  const result = createUTCDate(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );
  if (!result) return null;

  result.setUTCDate(result.getUTCDate() + amount);
  return isValidUTCDate(result) ? result : null;
}

export function addCalendarMonthsClamped(date, amount) {
  if (!isValidUTCDate(date) || !Number.isSafeInteger(amount)) return null;

  const targetFirst = createUTCDate(
    date.getUTCFullYear(),
    date.getUTCMonth() + amount,
    1
  );
  if (!targetFirst) return null;

  const targetYear = targetFirst.getUTCFullYear();
  const targetMonth = targetFirst.getUTCMonth() + 1;
  const maximumDay = daysInMonth(targetYear, targetMonth);
  if (maximumDay === null) return null;

  return createUTCDate(
    targetYear,
    targetMonth - 1,
    Math.min(date.getUTCDate(), maximumDay)
  );
}

export function addCalendarYearsClamped(date, amount) {
  if (!isValidUTCDate(date) || !Number.isSafeInteger(amount)) return null;
  return addCalendarMonthsClamped(date, amount * 12);
}

export function addAgeOffset(date, unit, amount) {
  if (!isValidUTCDate(date) || !TIMING_UNITS.has(unit)) return null;
  if (!Number.isSafeInteger(amount) || amount < 0) return null;

  if (unit === "birth") return amount === 0 ? addCalendarDays(date, 0) : null;
  if (unit === "days") return addCalendarDays(date, amount);
  if (unit === "weeks") return addCalendarDays(date, amount * 7);
  if (unit === "months") return addCalendarMonthsClamped(date, amount);
  return addCalendarYearsClamped(date, amount);
}

export function calculateOfficialDueWindow(dobDate, officialTiming) {
  if (
    !isValidUTCDate(dobDate) ||
    !officialTiming ||
    officialTiming.kind !== "age" ||
    !TIMING_UNITS.has(officialTiming.unit) ||
    !Number.isSafeInteger(officialTiming.start) ||
    officialTiming.start < 0 ||
    (officialTiming.end !== null &&
      officialTiming.end !== undefined &&
      (!Number.isSafeInteger(officialTiming.end) ||
        officialTiming.end < officialTiming.start))
  ) {
    return null;
  }

  const start = addAgeOffset(
    dobDate,
    officialTiming.unit,
    officialTiming.start
  );
  const hasEnd =
    officialTiming.end !== null && officialTiming.end !== undefined;
  const end = hasEnd
    ? addAgeOffset(dobDate, officialTiming.unit, officialTiming.end)
    : null;

  if (!start || (hasEnd && !end)) return null;

  return {
    officialDueStart: formatISODate(start),
    officialDueEnd: end ? formatISODate(end) : null,
  };
}

export function getAllScheduleDoses(scheduleConfig = INDIA_UIP_SCHEDULE) {
  const routine = Array.isArray(scheduleConfig?.routineDoses)
    ? scheduleConfig.routineDoses
    : [];
  const programmes = Object.values(scheduleConfig?.programmes || {});
  const programmeDoses = programmes.flatMap((programme) =>
    Array.isArray(programme?.entries) ? programme.entries : []
  );
  return [...routine, ...programmeDoses];
}

export function validateScheduleConfiguration(
  scheduleConfig = INDIA_UIP_SCHEDULE,
  adjustmentRules = scheduleConfig?.adjustmentRules || []
) {
  const doses = getAllScheduleDoses(scheduleConfig);
  if (doses.length === 0) {
    return { ok: false, error: "SCHEDULE_HAS_NO_DOSES" };
  }

  const doseIds = new Set();
  for (const dose of doses) {
    if (!dose?.doseId || doseIds.has(dose.doseId)) {
      return {
        ok: false,
        error: dose?.doseId ? "DUPLICATE_DOSE_ID" : "INVALID_DOSE_ID",
        doseId: dose?.doseId || null,
      };
    }
    doseIds.add(dose.doseId);

    if (!calculateOfficialDueWindow(parseISODate("2000-01-01"), dose.officialTiming)) {
      return { ok: false, error: "INVALID_OFFICIAL_TIMING", doseId: dose.doseId };
    }
  }

  if (!Array.isArray(adjustmentRules)) {
    return { ok: false, error: "INVALID_ADJUSTMENT_RULES" };
  }

  const ruleIds = new Set();
  const dependentIds = new Set();
  const graph = new Map([...doseIds].map((doseId) => [doseId, []]));

  for (const rule of adjustmentRules) {
    if (!rule?.ruleId || ruleIds.has(rule.ruleId)) {
      return { ok: false, error: "DUPLICATE_OR_INVALID_RULE_ID" };
    }
    ruleIds.add(rule.ruleId);

    if (
      !doseIds.has(rule.predecessorDoseId) ||
      !doseIds.has(rule.dependentDoseId)
    ) {
      return {
        ok: false,
        error: "ADJUSTMENT_RULE_MISSING_DOSE",
        ruleId: rule.ruleId,
      };
    }

    if (dependentIds.has(rule.dependentDoseId)) {
      return {
        ok: false,
        error: "MULTIPLE_RULES_FOR_DEPENDENT_DOSE",
        doseId: rule.dependentDoseId,
      };
    }
    dependentIds.add(rule.dependentDoseId);
    graph.get(rule.predecessorDoseId).push(rule.dependentDoseId);

    if (
      rule.verified === true &&
      (!rule.sourceRef ||
        rule.basis !== "ACTUAL_PREDECESSOR_DATE" ||
        !rule.minimumInterval ||
        !["days", "weeks", "months", "years"].includes(
          rule.minimumInterval.unit
        ) ||
        !Number.isSafeInteger(rule.minimumInterval.value) ||
        rule.minimumInterval.value < 0 ||
        rule.combineWithOfficialDate !== "LATER_OF_OFFICIAL_AND_INTERVAL")
    ) {
      return {
        ok: false,
        error: "INVALID_VERIFIED_ADJUSTMENT_RULE",
        ruleId: rule.ruleId,
      };
    }
  }

  const visiting = new Set();
  const visited = new Set();

  function hasCycle(doseId) {
    if (visiting.has(doseId)) return true;
    if (visited.has(doseId)) return false;

    visiting.add(doseId);
    for (const dependentId of graph.get(doseId) || []) {
      if (hasCycle(dependentId)) return true;
    }
    visiting.delete(doseId);
    visited.add(doseId);
    return false;
  }

  for (const doseId of doseIds) {
    if (hasCycle(doseId)) {
      return { ok: false, error: "ADJUSTMENT_RULE_CYCLE" };
    }
  }

  return { ok: true, doseCount: doses.length, ruleCount: adjustmentRules.length };
}

function normalizeRecord(rawRecord) {
  if (rawRecord === undefined || rawRecord === null) {
    return { ok: true, state: RECORD_STATES.NOT_RECORDED, actualDate: null };
  }

  if (typeof rawRecord === "string") {
    return { ok: true, state: RECORD_STATES.GIVEN, actualDate: rawRecord };
  }

  if (typeof rawRecord !== "object" || Array.isArray(rawRecord)) {
    return { ok: false, error: "INVALID_RECORD" };
  }

  const state = rawRecord.state ||
    (typeof rawRecord.date === "string"
      ? RECORD_STATES.GIVEN
      : RECORD_STATES.NOT_RECORDED);

  if (!VALID_RECORD_STATES.has(state)) {
    return { ok: false, error: "INVALID_RECORD_STATE" };
  }

  if (state === RECORD_STATES.GIVEN) {
    if (typeof rawRecord.date !== "string" || rawRecord.date === "") {
      return { ok: false, error: "ACTUAL_DATE_REQUIRED" };
    }
    return { ok: true, state, actualDate: rawRecord.date };
  }

  if (rawRecord.date !== undefined && rawRecord.date !== null && rawRecord.date !== "") {
    return { ok: false, error: "ACTUAL_DATE_NOT_ALLOWED_FOR_STATE" };
  }

  return { ok: true, state, actualDate: null };
}

function evaluateApplicability(
  dose,
  { jeApplicability, gender, hpvProgrammeApplicability }
) {
  const kind = dose.applicability?.kind || "UNIVERSAL";
  if (kind === "UNIVERSAL") return "APPLICABLE";
  if (kind === "JE_PROGRAMME") return jeApplicability;

  if (kind === "HPV_PROGRAMME") {
    if (
      hpvProgrammeApplicability === HPV_PROGRAMME_APPLICABILITY.UNCONFIRMED ||
      gender === GENDER.UNCONFIRMED
    ) {
      return "UNCONFIRMED";
    }
    if (
      hpvProgrammeApplicability ===
      HPV_PROGRAMME_APPLICABILITY.NOT_APPLICABLE
    ) {
      return "NOT_APPLICABLE";
    }
    return gender === dose.applicability.requiredGender
      ? "APPLICABLE"
      : "NOT_APPLICABLE";
  }

  return "UNCONFIRMED";
}

function statusForDose({
  recordState,
  applicabilityStatus,
  officialDueStart,
  officialDueEnd,
  referenceDate,
}) {
  if (recordState === RECORD_STATES.GIVEN) return "GIVEN";
  if (applicabilityStatus === "UNCONFIRMED") {
    return "APPLICABILITY_UNCONFIRMED";
  }
  if (applicabilityStatus === "NOT_APPLICABLE") return "NOT_APPLICABLE";

  const start = parseISODate(officialDueStart);
  const end = officialDueEnd ? parseISODate(officialDueEnd) : null;
  if (!start) return null;

  if (referenceDate < start) return "UPCOMING";
  if (end && referenceDate > end) return "DELAYED";
  return "DUE";
}

function calculateAdjustedDate({
  dose,
  officialDueStart,
  applicabilityStatus,
  rulesByDependentDose,
  normalizedRecords,
}) {
  if (applicabilityStatus !== "APPLICABLE") {
    return { adjustedEligibleDate: null, adjustmentStatus: "NOT_APPLICABLE" };
  }

  const rule = rulesByDependentDose.get(dose.doseId);
  if (!rule || rule.verified !== true) {
    return { adjustedEligibleDate: null, adjustmentStatus: "NOT_SUPPORTED" };
  }

  const predecessor = normalizedRecords.get(rule.predecessorDoseId);
  if (!predecessor || predecessor.state !== RECORD_STATES.GIVEN) {
    return {
      adjustedEligibleDate: null,
      adjustmentStatus: "PREDECESSOR_NOT_GIVEN",
    };
  }

  const predecessorDate = parseISODate(predecessor.actualDate);
  const officialStart = parseISODate(officialDueStart);
  const intervalDate = addAgeOffset(
    predecessorDate,
    rule.minimumInterval.unit,
    rule.minimumInterval.value
  );

  if (!predecessorDate || !officialStart || !intervalDate) {
    return { adjustedEligibleDate: null, adjustmentStatus: "CALCULATION_ERROR" };
  }

  const adjusted = intervalDate > officialStart ? intervalDate : officialStart;
  return {
    adjustedEligibleDate: formatISODate(adjusted),
    adjustmentStatus: "SUPPORTED_VERIFIED_RULE",
    adjustmentRuleId: rule.ruleId,
  };
}

export function generateVaccinationSchedule({
  dob,
  referenceDate,
  actualVaccinations = {},
  jeApplicability = JE_APPLICABILITY.UNCONFIRMED,
  gender = GENDER.UNCONFIRMED,
  hpvProgrammeApplicability =
    HPV_PROGRAMME_APPLICABILITY.UNCONFIRMED,
  includeHPV = true,
  scheduleConfig = INDIA_UIP_SCHEDULE,
  adjustmentRules = scheduleConfig?.adjustmentRules || [],
} = {}) {
  const configuration = validateScheduleConfiguration(
    scheduleConfig,
    adjustmentRules
  );
  if (!configuration.ok) return configuration;

  if (typeof dob !== "string" || dob === "") {
    return { ok: false, error: "DOB_REQUIRED" };
  }
  const dobDate = parseISODate(dob);
  if (!dobDate) return { ok: false, error: "INVALID_DOB" };

  if (typeof referenceDate !== "string" || referenceDate === "") {
    return { ok: false, error: "REFERENCE_DATE_REQUIRED" };
  }
  const reference = parseISODate(referenceDate);
  if (!reference) return { ok: false, error: "INVALID_REFERENCE_DATE" };
  if (dobDate > reference) return { ok: false, error: "DOB_IN_FUTURE" };

  if (!Object.values(JE_APPLICABILITY).includes(jeApplicability)) {
    return { ok: false, error: "INVALID_JE_APPLICABILITY" };
  }
  if (!Object.values(GENDER).includes(gender)) {
    return { ok: false, error: "INVALID_GENDER" };
  }
  if (
    !Object.values(HPV_PROGRAMME_APPLICABILITY).includes(
      hpvProgrammeApplicability
    )
  ) {
    return { ok: false, error: "INVALID_HPV_PROGRAMME_APPLICABILITY" };
  }
  if (
    !actualVaccinations ||
    typeof actualVaccinations !== "object" ||
    Array.isArray(actualVaccinations)
  ) {
    return { ok: false, error: "INVALID_ACTUAL_VACCINATIONS" };
  }

  const allDoses = getAllScheduleDoses(scheduleConfig);
  const includedDoses = includeHPV
    ? allDoses
    : allDoses.filter((dose) => dose.applicability?.kind !== "HPV_PROGRAMME");
  const doseIds = new Set(allDoses.map((dose) => dose.doseId));
  const normalizedRecords = new Map();

  for (const [doseId, rawRecord] of Object.entries(actualVaccinations)) {
    if (!doseIds.has(doseId)) {
      return { ok: false, error: "UNKNOWN_DOSE_ID", doseId };
    }

    const record = normalizeRecord(rawRecord);
    if (!record.ok) return { ...record, doseId };

    if (record.actualDate) {
      const actualDate = parseISODate(record.actualDate);
      if (!actualDate) return { ok: false, error: "INVALID_ACTUAL_DATE", doseId };
      if (actualDate < dobDate) {
        return { ok: false, error: "ACTUAL_DATE_BEFORE_DOB", doseId };
      }
      if (actualDate > reference) {
        return { ok: false, error: "ACTUAL_DATE_IN_FUTURE", doseId };
      }
    }

    normalizedRecords.set(doseId, record);
  }

  const rulesByDependentDose = new Map(
    adjustmentRules.map((rule) => [rule.dependentDoseId, rule])
  );
  const doses = [];

  for (const dose of includedDoses) {
    const dueWindow = calculateOfficialDueWindow(dobDate, dose.officialTiming);
    if (!dueWindow) {
      return { ok: false, error: "DUE_DATE_CALCULATION_FAILED", doseId: dose.doseId };
    }

    const record = normalizedRecords.get(dose.doseId) || {
      state: RECORD_STATES.NOT_RECORDED,
      actualDate: null,
    };
    const applicabilityStatus = evaluateApplicability(dose, {
      jeApplicability,
      gender,
      hpvProgrammeApplicability,
    });
    const warnings = [];

    if (record.state === RECORD_STATES.MISSED_NOT_AVAILABLE) {
      warnings.push("MISSED_NOT_AVAILABLE");
    }
    if (record.actualDate) {
      if (record.actualDate < dueWindow.officialDueStart) {
        warnings.push("ACTUAL_DATE_BEFORE_ELIGIBILITY");
      }
      if (
        dueWindow.officialDueEnd &&
        record.actualDate > dueWindow.officialDueEnd
      ) {
        warnings.push("GIVEN_LATE");
      }
    }

    const adjustment = calculateAdjustedDate({
      dose,
      officialDueStart: dueWindow.officialDueStart,
      applicabilityStatus,
      rulesByDependentDose,
      normalizedRecords,
    });
    const status = statusForDose({
      recordState: record.state,
      applicabilityStatus,
      ...dueWindow,
      referenceDate: reference,
    });

    if (!status) {
      return { ok: false, error: "STATUS_CALCULATION_FAILED", doseId: dose.doseId };
    }

    doses.push({
      doseId: dose.doseId,
      vaccineId: dose.vaccineId,
      seriesId: dose.seriesId,
      doseNumber: dose.doseNumber,
      label: dose.label,
      visitGroup: dose.visitGroup,
      applicabilityStatus,
      recordState: record.state,
      actualVaccinationDate: record.actualDate,
      ...dueWindow,
      ...adjustment,
      status,
      warnings,
      sourceRef: dose.sourceRef,
    });
  }

  return {
    ok: true,
    scheduleId: scheduleConfig.id,
    scheduleVersion: scheduleConfig.version,
    dob,
    referenceDate,
    jeApplicability,
    gender,
    hpvProgrammeApplicability,
    doses,
  };
}
