export const PREGNANCY_LENGTH_DAYS = 280;

const DAY_MS = 86400000;

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
    !Number.isInteger(year) ||
    year < 1 ||
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12
  ) {
    return null;
  }

  const lastDay = createUTCDate(year, month, 0);
  return lastDay ? lastDay.getUTCDate() : null;
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

export function differenceInCalendarDays(start, end) {
  if (!isValidUTCDate(start) || !isValidUTCDate(end)) return null;

  const difference = (end.getTime() - start.getTime()) / DAY_MS;
  return Number.isSafeInteger(difference) ? difference : null;
}

export function calculateEDD(lmpDate) {
  return addCalendarDays(lmpDate, PREGNANCY_LENGTH_DAYS);
}

export function calculateGestationalAge(lmpDate, referenceDate) {
  const elapsedDays = differenceInCalendarDays(lmpDate, referenceDate);

  if (elapsedDays === null || elapsedDays < 0) return null;

  const completedWeeks = Math.floor(elapsedDays / 7);
  const remainingDays = elapsedDays % 7;

  if (
    !Number.isFinite(completedWeeks) ||
    completedWeeks < 0 ||
    !Number.isFinite(remainingDays) ||
    remainingDays < 0
  ) {
    return null;
  }

  return {
    elapsedDays,
    completedWeeks,
    remainingDays,
  };
}

export function getTrimester(elapsedDays) {
  if (!Number.isSafeInteger(elapsedDays) || elapsedDays < 0) return null;

  if (elapsedDays <= 97) return "first";
  if (elapsedDays <= 195) return "second";
  return "third";
}

export function calculatePregnancyProgress(elapsedDays) {
  if (!Number.isSafeInteger(elapsedDays) || elapsedDays < 0) return null;

  const precisePercent =
    (elapsedDays / PREGNANCY_LENGTH_DAYS) * 100;
  const normalizedPercent = Math.min(
    100,
    Math.max(0, precisePercent)
  );

  if (
    !Number.isFinite(precisePercent) ||
    !Number.isFinite(normalizedPercent)
  ) {
    return null;
  }

  return {
    precisePercent,
    normalizedPercent,
  };
}

export function calculateEDDDetails(lmpValue, referenceValue) {
  if (typeof lmpValue !== "string" || lmpValue === "") {
    return { ok: false, error: "LMP_REQUIRED" };
  }

  const lmpDate = parseISODate(lmpValue);
  if (!lmpDate) return { ok: false, error: "INVALID_LMP" };

  if (typeof referenceValue !== "string" || referenceValue === "") {
    return { ok: false, error: "REFERENCE_DATE_REQUIRED" };
  }

  const referenceDate = parseISODate(referenceValue);
  if (!referenceDate) {
    return { ok: false, error: "INVALID_REFERENCE_DATE" };
  }

  const gestationalAge = calculateGestationalAge(lmpDate, referenceDate);
  if (!gestationalAge) {
    return { ok: false, error: "REFERENCE_BEFORE_LMP" };
  }

  const estimatedDueDate = calculateEDD(lmpDate);
  const trimester = getTrimester(gestationalAge.elapsedDays);
  const progress = calculatePregnancyProgress(gestationalAge.elapsedDays);

  if (!estimatedDueDate || !trimester || !progress) {
    return { ok: false, error: "CALCULATION_ERROR" };
  }

  return {
    ok: true,
    lmpDate,
    referenceDate,
    estimatedDueDate,
    ...gestationalAge,
    trimester,
    progress,
  };
}
