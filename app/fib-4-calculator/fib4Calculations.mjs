export const FIB4_LIMITS = Object.freeze({
  age: Object.freeze({ min: 18, max: 120 }),
  ast: Object.freeze({ min: 1, max: 10000 }),
  alt: Object.freeze({ min: 1, max: 10000 }),
  plateletsStandard: Object.freeze({ min: 10, max: 2000 }),
  plateletsLakh: Object.freeze({ min: 0.1, max: 20 }),
});

export const PLATELET_UNITS = Object.freeze({
  STANDARD: "STANDARD",
  LAKH_PER_MICROLITER: "LAKH_PER_MICROLITER",
});

export const FIB4_CATEGORIES = Object.freeze({
  LOWER: "LOWER",
  INTERMEDIATE: "INTERMEDIATE",
  HIGHER: "HIGHER",
  LIMITED_ACCURACY: "LIMITED_ACCURACY",
});

const DECIMAL_NUMBER = /^(?:\d+\.?\d*|\.\d+)$/;

function parseNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || !DECIMAL_NUMBER.test(trimmed)) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export function convertPlateletsToStandard(value, unit) {
  const parsed = parseNumber(value);
  if (parsed === null) return null;
  if (unit === PLATELET_UNITS.STANDARD) return parsed;
  if (unit === PLATELET_UNITS.LAKH_PER_MICROLITER) return parsed * 100;
  return null;
}

export function classifyFib4(score, age) {
  if (!Number.isFinite(score) || score < 0 || !Number.isFinite(age)) return null;
  if (age < 35) return FIB4_CATEGORIES.LIMITED_ACCURACY;
  const lowerThreshold = age >= 65 ? 2 : 1.3;
  if (score < lowerThreshold) return FIB4_CATEGORIES.LOWER;
  if (score <= 2.67) return FIB4_CATEGORIES.INTERMEDIATE;
  return FIB4_CATEGORIES.HIGHER;
}

export function validateFib4Inputs({ age, ast, alt, plateletCount, plateletUnit }) {
  const values = {
    age: parseNumber(age),
    ast: parseNumber(ast),
    alt: parseNumber(alt),
    plateletCount: parseNumber(plateletCount),
  };

  for (const field of ["age", "ast", "alt", "plateletCount"]) {
    if (values[field] === null) return { ok: false, error: `${field.toUpperCase()}_INVALID`, field };
  }

  if (!Number.isInteger(values.age)) return { ok: false, error: "AGE_WHOLE_YEARS", field: "age" };
  if (values.age < FIB4_LIMITS.age.min || values.age > FIB4_LIMITS.age.max) {
    return { ok: false, error: "AGE_OUT_OF_RANGE", field: "age" };
  }
  if (values.ast < FIB4_LIMITS.ast.min || values.ast > FIB4_LIMITS.ast.max) {
    return { ok: false, error: "AST_OUT_OF_RANGE", field: "ast" };
  }
  if (values.alt < FIB4_LIMITS.alt.min || values.alt > FIB4_LIMITS.alt.max) {
    return { ok: false, error: "ALT_OUT_OF_RANGE", field: "alt" };
  }
  if (!Object.values(PLATELET_UNITS).includes(plateletUnit)) {
    return { ok: false, error: "PLATELET_UNIT_INVALID", field: "plateletCount" };
  }

  const plateletLimits = plateletUnit === PLATELET_UNITS.STANDARD
    ? FIB4_LIMITS.plateletsStandard
    : FIB4_LIMITS.plateletsLakh;
  if (values.plateletCount < plateletLimits.min || values.plateletCount > plateletLimits.max) {
    return { ok: false, error: "PLATELET_OUT_OF_RANGE", field: "plateletCount" };
  }

  const plateletsStandard = convertPlateletsToStandard(values.plateletCount, plateletUnit);
  if (!Number.isFinite(plateletsStandard) || plateletsStandard <= 0) {
    return { ok: false, error: "PLATELET_INVALID", field: "plateletCount" };
  }
  return { ok: true, values: { ...values, plateletsStandard } };
}

export function calculateFib4(inputs) {
  const validation = validateFib4Inputs(inputs);
  if (!validation.ok) return validation;

  const { age, ast, alt, plateletCount, plateletsStandard } = validation.values;
  const score = (age * ast) / (plateletsStandard * Math.sqrt(alt));
  if (!Number.isFinite(score) || score < 0) {
    return { ok: false, error: "RESULT_INVALID", field: null };
  }

  return {
    ok: true,
    score,
    displayedScore: score.toFixed(2),
    category: classifyFib4(score, age),
    limitedAccuracy: age < 35,
    inputs: { age, ast, alt, plateletCount, plateletUnit: inputs.plateletUnit, plateletsStandard },
  };
}
