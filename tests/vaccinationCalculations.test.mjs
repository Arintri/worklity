import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

import {
  FEBRUARY_29_CONVENTION,
  MONTH_END_CONVENTION,
  addAgeOffset,
  addCalendarDays,
  addCalendarMonthsClamped,
  addCalendarYearsClamped,
  calculateOfficialDueWindow,
  formatISODate,
  generateVaccinationSchedule,
  getAllScheduleDoses,
  parseISODate,
  validateScheduleConfiguration,
} from "../app/vaccination-calculator/vaccinationCalculations.mjs";
import {
  ADJUSTMENT_RULES,
  GENDER,
  HPV_PROGRAMME,
  HPV_PROGRAMME_APPLICABILITY,
  INDIA_UIP_SCHEDULE,
  JE_APPLICABILITY,
  RECORD_STATES,
  ROUTINE_VACCINE_DOSES,
} from "../app/vaccination-calculator/vaccinationSchedule.mjs";

function date(value) {
  const parsed = parseISODate(value);
  assert.ok(parsed, `${value} should be valid`);
  return parsed;
}

function generate(overrides = {}) {
  const result = generateVaccinationSchedule({
    dob: "2026-06-20",
    referenceDate: "2026-08-10",
    ...overrides,
  });
  assert.equal(result.ok, true, result.error);
  return result;
}

function findDose(result, doseId) {
  const found = result.doses.find((dose) => dose.doseId === doseId);
  assert.ok(found, `${doseId} should exist`);
  return found;
}

function withRules(rules) {
  return { ...INDIA_UIP_SCHEDULE, adjustmentRules: rules };
}

test("schedule metadata is versioned, sourced, and informational", () => {
  assert.equal(INDIA_UIP_SCHEDULE.id, "worklity-india-uip");
  assert.equal(INDIA_UIP_SCHEDULE.version, "2026-09-01");
  assert.equal(INDIA_UIP_SCHEDULE.jurisdiction, "India");
  assert.match(INDIA_UIP_SCHEDULE.publisher, /Ministry of Health/);
  assert.ok(INDIA_UIP_SCHEDULE.sourceReferences.UIP_ROUTINE_MANUAL.url);
  assert.match(INDIA_UIP_SCHEDULE.warning.en, /does not prescribe/i);
  assert.match(INDIA_UIP_SCHEDULE.warning.en, /official records/i);
  assert.deepEqual(ADJUSTMENT_RULES, []);
});

test("all configured dose IDs are unique", () => {
  const doses = getAllScheduleDoses();
  const ids = doses.map((dose) => dose.doseId);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(validateScheduleConfiguration().ok, true);
});

test("birth vaccines have the DOB as both official window dates", () => {
  const result = generate({ referenceDate: "2026-06-20" });
  for (const doseId of ["bcg", "opv-0", "hepb-birth"]) {
    const dose = findDose(result, doseId);
    assert.equal(dose.officialDueStart, "2026-06-20");
    assert.equal(dose.officialDueEnd, "2026-06-20");
  }
});

test("6-week dates are DOB plus exactly 42 calendar days", () => {
  const result = generate();
  for (const doseId of ["opv-1", "penta-1", "rotavirus-1", "fipv-1", "pcv-1"]) {
    const dose = findDose(result, doseId);
    assert.equal(dose.officialDueStart, "2026-08-01");
    assert.equal(dose.officialDueEnd, "2026-08-01");
  }
});

test("10-week dates are DOB plus exactly 70 calendar days", () => {
  const result = generate({ referenceDate: "2026-09-01" });
  for (const doseId of ["opv-2", "penta-2", "rotavirus-2"]) {
    assert.equal(findDose(result, doseId).officialDueStart, "2026-08-29");
  }
});

test("14-week dates are DOB plus exactly 98 calendar days", () => {
  const result = generate({ referenceDate: "2026-10-01" });
  for (const doseId of ["opv-3", "penta-3", "rotavirus-3", "fipv-2", "pcv-2"]) {
    assert.equal(findDose(result, doseId).officialDueStart, "2026-09-26");
  }
});

test("MR-1, fIPV-3, PCV booster, and JE-1 share the 9-11 month window", () => {
  const result = generate({ dob: "2024-01-31", referenceDate: "2025-02-01" });
  for (const doseId of ["mr-1", "fipv-3", "pcv-booster", "je-1"]) {
    const dose = findDose(result, doseId);
    assert.equal(dose.officialDueStart, "2024-10-31");
    assert.equal(dose.officialDueEnd, "2024-12-31");
    assert.equal(dose.visitGroup, "9-to-11-months");
  }
});

test("16-24 month stages remain official date windows", () => {
  const result = generate({ dob: "2024-01-31", referenceDate: "2026-02-01" });
  for (const doseId of ["mr-2", "dpt-booster-1", "opv-booster", "je-2"]) {
    const dose = findDose(result, doseId);
    assert.equal(dose.officialDueStart, "2025-05-31");
    assert.equal(dose.officialDueEnd, "2026-01-31");
  }
});

test("year-based milestones preserve windows and exact milestones", () => {
  const result = generate({ dob: "2020-03-15", referenceDate: "2036-03-15" });
  assert.deepEqual(
    [findDose(result, "dpt-booster-2").officialDueStart, findDose(result, "dpt-booster-2").officialDueEnd],
    ["2025-03-15", "2026-03-15"]
  );
  assert.equal(findDose(result, "td-10").officialDueStart, "2030-03-15");
  assert.equal(findDose(result, "td-16").officialDueStart, "2036-03-15");
});

test("week arithmetic crosses leap days and year boundaries exactly", () => {
  assert.equal(formatISODate(addAgeOffset(date("2024-01-20"), "weeks", 6)), "2024-03-02");
  assert.equal(formatISODate(addAgeOffset(date("2024-12-15"), "weeks", 6)), "2025-01-26");
});

test("February 29 year milestones clamp to February 28", () => {
  assert.match(FEBRUARY_29_CONVENTION, /February 28/);
  assert.equal(formatISODate(addCalendarYearsClamped(date("2024-02-29"), 1)), "2025-02-28");
  assert.equal(formatISODate(addCalendarYearsClamped(date("2024-02-29"), 4)), "2028-02-29");

  const result = generate({ dob: "2024-02-29", referenceDate: "2040-02-29" });
  assert.equal(findDose(result, "dpt-booster-2").officialDueStart, "2029-02-28");
  assert.equal(findDose(result, "td-10").officialDueStart, "2034-02-28");
});

test("calendar months clamp January 31 to the target month end", () => {
  assert.match(MONTH_END_CONVENTION, /last valid day/);
  assert.equal(formatISODate(addCalendarMonthsClamped(date("2023-01-31"), 1)), "2023-02-28");
  assert.equal(formatISODate(addCalendarMonthsClamped(date("2024-01-31"), 1)), "2024-02-29");
  assert.equal(formatISODate(addCalendarMonthsClamped(date("2024-01-31"), 2)), "2024-03-31");
});

test("strict date parsing rejects impossible and malformed dates", () => {
  for (const value of ["", "2023-02-29", "2024-04-31", "2024-1-01", "2024/01/01", "0000-01-01", "bad"]) {
    assert.equal(parseISODate(value), null);
  }
  assert.equal(formatISODate(date("0099-01-01")), "0099-01-01");
});

test("future DOB is rejected", () => {
  assert.deepEqual(
    generateVaccinationSchedule({ dob: "2026-08-11", referenceDate: "2026-08-10" }),
    { ok: false, error: "DOB_IN_FUTURE" }
  );
});

test("actual vaccination dates before DOB are rejected", () => {
  const result = generateVaccinationSchedule({
    dob: "2026-06-20",
    referenceDate: "2026-08-10",
    actualVaccinations: { "penta-1": "2026-06-19" },
  });
  assert.deepEqual(result, {
    ok: false,
    error: "ACTUAL_DATE_BEFORE_DOB",
    doseId: "penta-1",
  });
});

test("actual vaccination dates after reference date are rejected", () => {
  const result = generateVaccinationSchedule({
    dob: "2026-06-20",
    referenceDate: "2026-08-10",
    actualVaccinations: { "penta-1": "2026-08-11" },
  });
  assert.deepEqual(result, {
    ok: false,
    error: "ACTUAL_DATE_IN_FUTURE",
    doseId: "penta-1",
  });
});

test("actual records remain independent for vaccines at one visit", () => {
  const result = generate({
    actualVaccinations: {
      "penta-1": "2026-08-07",
      "opv-1": "2026-08-01",
    },
  });
  assert.equal(findDose(result, "penta-1").actualVaccinationDate, "2026-08-07");
  assert.equal(findDose(result, "opv-1").actualVaccinationDate, "2026-08-01");
  assert.equal(findDose(result, "rotavirus-1").actualVaccinationDate, null);
  assert.equal(findDose(result, "fipv-1").actualVaccinationDate, null);
  assert.equal(findDose(result, "pcv-1").actualVaccinationDate, null);
});

test("a Penta actual date does not shift same-visit vaccines", () => {
  const baseline = generate();
  const recorded = generate({ actualVaccinations: { "penta-1": "2026-08-07" } });

  for (const doseId of ["opv-1", "rotavirus-1", "fipv-1", "pcv-1"]) {
    const before = findDose(baseline, doseId);
    const after = findDose(recorded, doseId);
    assert.equal(after.officialDueStart, before.officialDueStart);
    assert.equal(after.officialDueEnd, before.officialDueEnd);
    assert.equal(after.adjustedEligibleDate, null);
  }
});

test("default unsupported adjustments always return null", () => {
  const result = generate({ actualVaccinations: { "penta-1": "2026-08-07" } });
  const penta2 = findDose(result, "penta-2");
  assert.equal(penta2.adjustedEligibleDate, null);
  assert.equal(penta2.adjustmentStatus, "NOT_SUPPORTED");
});

test("an unverified dependency rule cannot produce an adjusted date", () => {
  const rule = {
    ruleId: "test-unverified",
    predecessorDoseId: "penta-1",
    dependentDoseId: "penta-2",
    verified: false,
  };
  const result = generate({
    scheduleConfig: withRules([rule]),
    adjustmentRules: [rule],
    actualVaccinations: { "penta-1": "2026-08-07" },
  });
  assert.equal(findDose(result, "penta-2").adjustedEligibleDate, null);
  assert.equal(findDose(result, "penta-2").adjustmentStatus, "NOT_SUPPORTED");
});

test("only an explicit verified rule produces an adjusted eligible date", () => {
  const rule = {
    ruleId: "verified-test-rule-not-production-policy",
    predecessorDoseId: "penta-1",
    dependentDoseId: "penta-2",
    basis: "ACTUAL_PREDECESSOR_DATE",
    minimumInterval: { unit: "days", value: 28 },
    combineWithOfficialDate: "LATER_OF_OFFICIAL_AND_INTERVAL",
    cascade: false,
    sourceRef: "TEST_ONLY",
    verified: true,
  };
  const result = generate({
    scheduleConfig: withRules([rule]),
    adjustmentRules: [rule],
    actualVaccinations: { "penta-1": "2026-08-07" },
  });
  const penta2 = findDose(result, "penta-2");
  assert.equal(penta2.officialDueStart, "2026-08-29");
  assert.equal(penta2.adjustedEligibleDate, "2026-09-04");
  assert.equal(penta2.adjustmentStatus, "SUPPORTED_VERIFIED_RULE");
});

test("JE applicable retains normal schedule statuses", () => {
  const result = generate({ jeApplicability: JE_APPLICABILITY.APPLICABLE });
  const je = findDose(result, "je-1");
  assert.equal(je.applicabilityStatus, "APPLICABLE");
  assert.equal(je.status, "UPCOMING");
});

test("JE not applicable remains present and marked not applicable", () => {
  const result = generate({ jeApplicability: JE_APPLICABILITY.NOT_APPLICABLE });
  const je = findDose(result, "je-1");
  assert.equal(je.applicabilityStatus, "NOT_APPLICABLE");
  assert.equal(je.status, "NOT_APPLICABLE");
});

test("JE unconfirmed remains present without a medical assumption", () => {
  const result = generate();
  const je = findDose(result, "je-1");
  assert.equal(je.applicabilityStatus, "UNCONFIRMED");
  assert.equal(je.status, "APPLICABILITY_UNCONFIRMED");
});

test("HPV is a separate single-dose programme with non-permanent campaign policy", () => {
  assert.equal(HPV_PROGRAMME.programmeType, "SEPARATE_PROGRAMME");
  assert.equal(HPV_PROGRAMME.routineRule.structure, "SINGLE_DOSE");
  assert.equal(HPV_PROGRAMME.routineRule.internalMilestoneOnly, true);
  assert.deepEqual(HPV_PROGRAMME.eligibilityPresentation, {
    targetGroup: "ELIGIBLE_GIRLS",
    programmeAgeYears: 14,
    doseStructure: "SINGLE_DOSE",
    exposeExactDueDate: false,
    individualEligibilityDecision: false,
  });
  assert.equal(HPV_PROGRAMME.transitionalCampaignPolicy.permanentAgeRule, false);
  assert.equal(HPV_PROGRAMME.transitionalCampaignPolicy.automaticallyApplied, false);
  assert.equal(
    HPV_PROGRAMME.transitionalCampaignPolicy.eligibilityShape.routineTargetAgeYears,
    14
  );
  assert.equal(
    HPV_PROGRAMME.transitionalCampaignPolicy.eligibilityShape.transitionalTurnsAgeYears,
    15
  );
  assert.equal(
    HPV_PROGRAMME.transitionalCampaignPolicy.eligibilityShape.transitionalWindowDaysFromLaunch,
    90
  );

  const unknown = generate({ dob: "2012-03-01", referenceDate: "2026-03-01" });
  assert.equal(findDose(unknown, "hpv-single-dose").status, "APPLICABILITY_UNCONFIRMED");

  const female = generate({
    dob: "2012-03-01",
    referenceDate: "2026-03-01",
    gender: GENDER.FEMALE,
    hpvProgrammeApplicability: HPV_PROGRAMME_APPLICABILITY.APPLICABLE,
  });
  assert.equal(findDose(female, "hpv-single-dose").status, "DUE");
});

test("missed/not-available state affects only the selected dose", () => {
  const result = generate({
    actualVaccinations: {
      "rotavirus-1": { state: RECORD_STATES.MISSED_NOT_AVAILABLE },
      "opv-1": "2026-08-01",
    },
  });
  const missed = findDose(result, "rotavirus-1");
  assert.equal(missed.recordState, "MISSED_NOT_AVAILABLE");
  assert.equal(missed.actualVaccinationDate, null);
  assert.deepEqual(missed.warnings, ["MISSED_NOT_AVAILABLE"]);
  assert.equal(findDose(result, "opv-1").recordState, "GIVEN");
  assert.equal(findDose(result, "penta-1").recordState, "NOT_RECORDED");
});

test("actual dates never overwrite official due windows", () => {
  const result = generate({ actualVaccinations: { "penta-1": "2026-08-07" } });
  const penta1 = findDose(result, "penta-1");
  assert.equal(penta1.officialDueStart, "2026-08-01");
  assert.equal(penta1.officialDueEnd, "2026-08-01");
  assert.equal(penta1.actualVaccinationDate, "2026-08-07");
  assert.equal(penta1.status, "GIVEN");
  assert.deepEqual(penta1.warnings, ["GIVEN_LATE"]);
});

test("given before eligibility is preserved with a warning", () => {
  const result = generate({ actualVaccinations: { "penta-1": "2026-07-31" } });
  const dose = findDose(result, "penta-1");
  assert.equal(dose.status, "GIVEN");
  assert.deepEqual(dose.warnings, ["ACTUAL_DATE_BEFORE_ELIGIBILITY"]);
});

test("DELAYED is used only after an explicit official due end", () => {
  const delayed = generate({ referenceDate: "2026-08-02" });
  assert.equal(findDose(delayed, "penta-1").status, "DELAYED");

  const noEndDose = {
    ...ROUTINE_VACCINE_DOSES[3],
    doseId: "test-no-end",
    officialTiming: { kind: "age", unit: "weeks", start: 6, end: null },
  };
  const custom = {
    ...INDIA_UIP_SCHEDULE,
    routineDoses: [noEndDose],
    programmes: {},
    adjustmentRules: [],
  };
  const noEnd = generate({
    referenceDate: "2027-01-01",
    scheduleConfig: custom,
    adjustmentRules: [],
  });
  assert.equal(findDose(noEnd, "test-no-end").officialDueEnd, null);
  assert.equal(findDose(noEnd, "test-no-end").status, "DUE");
});

test("dependency validation detects references to missing dose IDs", () => {
  const invalid = validateScheduleConfiguration(INDIA_UIP_SCHEDULE, [
    {
      ruleId: "missing-dose",
      predecessorDoseId: "penta-1",
      dependentDoseId: "does-not-exist",
      verified: false,
    },
  ]);
  assert.equal(invalid.ok, false);
  assert.equal(invalid.error, "ADJUSTMENT_RULE_MISSING_DOSE");
});

test("dependency validation detects cycles", () => {
  const invalid = validateScheduleConfiguration(INDIA_UIP_SCHEDULE, [
    {
      ruleId: "cycle-a",
      predecessorDoseId: "penta-1",
      dependentDoseId: "penta-2",
      verified: false,
    },
    {
      ruleId: "cycle-b",
      predecessorDoseId: "penta-2",
      dependentDoseId: "penta-1",
      verified: false,
    },
  ]);
  assert.equal(invalid.ok, false);
  assert.equal(invalid.error, "ADJUSTMENT_RULE_CYCLE");
});

test("official window helper supports birth, days, weeks, months, and years", () => {
  const dob = date("2024-01-31");
  assert.deepEqual(calculateOfficialDueWindow(dob, { kind: "age", unit: "birth", start: 0, end: 0 }), { officialDueStart: "2024-01-31", officialDueEnd: "2024-01-31" });
  assert.deepEqual(calculateOfficialDueWindow(dob, { kind: "age", unit: "days", start: 1, end: 2 }), { officialDueStart: "2024-02-01", officialDueEnd: "2024-02-02" });
  assert.deepEqual(calculateOfficialDueWindow(dob, { kind: "age", unit: "weeks", start: 1, end: 2 }), { officialDueStart: "2024-02-07", officialDueEnd: "2024-02-14" });
  assert.deepEqual(calculateOfficialDueWindow(dob, { kind: "age", unit: "months", start: 1, end: 2 }), { officialDueStart: "2024-02-29", officialDueEnd: "2024-03-31" });
  assert.deepEqual(calculateOfficialDueWindow(dob, { kind: "age", unit: "years", start: 1, end: 2 }), { officialDueStart: "2025-01-31", officialDueEnd: "2026-01-31" });
});

test("core results are timezone invariant", () => {
  const moduleUrl = new URL(
    "../app/vaccination-calculator/vaccinationCalculations.mjs",
    import.meta.url
  ).href;
  const scheduleUrl = new URL(
    "../app/vaccination-calculator/vaccinationSchedule.mjs",
    import.meta.url
  ).href;
  const script = `
    import { generateVaccinationSchedule } from ${JSON.stringify(moduleUrl)};
    import { JE_APPLICABILITY } from ${JSON.stringify(scheduleUrl)};
    const result = generateVaccinationSchedule({
      dob: "2024-02-29",
      referenceDate: "2034-02-28",
      jeApplicability: JE_APPLICABILITY.APPLICABLE,
      actualVaccinations: {
        "penta-1": "2024-04-11",
        "rotavirus-1": { state: "MISSED_NOT_AVAILABLE" }
      }
    });
    process.stdout.write(JSON.stringify({
      ok: result.ok,
      doses: result.ok ? result.doses.map((dose) => ({
        id: dose.doseId,
        start: dose.officialDueStart,
        end: dose.officialDueEnd,
        actual: dose.actualVaccinationDate,
        state: dose.recordState,
        status: dose.status,
        adjusted: dose.adjustedEligibleDate
      })) : null
    }));
  `;

  const timezones = [
    "Asia/Kolkata",
    "UTC",
    "America/New_York",
    "Europe/London",
  ];
  let baseline;

  for (const timezone of timezones) {
    const run = spawnSync(process.execPath, ["--input-type=module", "--eval", script], {
      encoding: "utf8",
      env: { ...process.env, TZ: timezone },
    });
    assert.equal(run.status, 0, run.stderr);
    const output = JSON.parse(run.stdout);
    if (!baseline) baseline = output;
    assert.deepEqual(output, baseline, `Results changed in ${timezone}`);
  }
});
