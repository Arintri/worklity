// Pure adult screening arithmetic. Source details are in bmiContent.js.
// Product input limits are guardrails, not healthy measurement ranges.
export const BMI_LIMITS = Object.freeze({ minAge: 18, maxAge: 120, minHeightCm: 50, maxHeightCm: 275, minWeightKg: 10, maxWeightKg: 650, minWaistCm: 40, maxWaistCm: 250 });
export const BMI_CUTOFFS = Object.freeze({ underweight: 18.5, indiaOverweight: 23, indiaObesity: 25, whoOverweight: 25, whoObesity: 30 });
export const WAIST_REFERENCE_CM = Object.freeze({ male: 90, female: 80 });

function number(value) {
  if (typeof value !== "string" && typeof value !== "number") return null;
  if (typeof value === "string" && !/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(value.trim())) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}
const fail = (error, field) => ({ ok: false, error, field });

export function convertHeightToCm(input = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return fail("INVALID_HEIGHT", "heightCm");
  const { heightUnit, heightCm, feet, inches } = input;
  let cm;
  if (heightUnit === "cm") cm = number(heightCm);
  else if (heightUnit === "ft") {
    const ft = number(feet);
    const inch = number(inches);
    if (ft === null || !Number.isInteger(ft) || ft < 0 || ft > 9) return fail("INVALID_FEET", "feet");
    if (inch === null || inch < 0 || inch >= 12) return fail("INVALID_INCHES", "inches");
    cm = (ft * 12 + inch) * 2.54;
  } else return fail("INVALID_HEIGHT_UNIT", "heightUnit");
  if (cm === null || !Number.isFinite(cm) || cm < BMI_LIMITS.minHeightCm || cm > BMI_LIMITS.maxHeightCm) return fail("INVALID_HEIGHT", heightUnit === "ft" ? "feet" : "heightCm");
  return { ok: true, heightCm: cm };
}

export function classifyBMI(bmi, reference = "india") {
  if (!Number.isFinite(bmi) || bmi <= 0 || !["india", "who"].includes(reference)) return null;
  if (bmi < BMI_CUTOFFS.underweight) return "UNDERWEIGHT";
  const overweight = reference === "india" ? BMI_CUTOFFS.indiaOverweight : BMI_CUTOFFS.whoOverweight;
  const obesity = reference === "india" ? BMI_CUTOFFS.indiaObesity : BMI_CUTOFFS.whoObesity;
  if (bmi < overweight) return "NORMAL";
  if (bmi < obesity) return "OVERWEIGHT";
  return "OBESITY";
}

export function calculateBMIDetails(input = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return fail("INVALID_INPUT", "age");
  const age = number(input.age);
  if (age !== null && age < BMI_LIMITS.minAge) return fail("ADULTS_ONLY", "age");
  if (age === null || !Number.isInteger(age) || age > BMI_LIMITS.maxAge) return fail("INVALID_AGE", "age");
  if (!["male", "female"].includes(input.sex)) return fail("INVALID_SEX", "sex");
  const height = convertHeightToCm(input);
  if (!height.ok) return height;
  const weightKg = number(input.weightKg);
  if (weightKg === null || weightKg < BMI_LIMITS.minWeightKg || weightKg > BMI_LIMITS.maxWeightKg) return fail("INVALID_WEIGHT", "weightKg");
  let waist = null;
  if (input.waistCm !== undefined && input.waistCm !== null && !(typeof input.waistCm === "string" && input.waistCm.trim() === "")) {
    const cm = number(input.waistCm);
    if (cm === null || cm < BMI_LIMITS.minWaistCm || cm > BMI_LIMITS.maxWaistCm) return fail("INVALID_WAIST", "waistCm");
    const referenceCm = WAIST_REFERENCE_CM[input.sex];
    waist = { cm, referenceCm, status: cm >= referenceCm ? "AT_OR_ABOVE_REFERENCE" : "BELOW_REFERENCE" };
  }
  const bmi = weightKg / ((height.heightCm / 100) ** 2);
  if (!Number.isFinite(bmi) || bmi <= 0) return fail("INVALID_INPUT", "weightKg");
  const indiaCategory = classifyBMI(bmi, "india");
  return { ok: true, age, sex: input.sex, heightCm: height.heightCm, weightKg, bmi,
    bmiDisplay: bmi.toFixed(1), indiaCategory, whoCategory: classifyBMI(bmi, "who"), waist,
    guidance: indiaCategory === "UNDERWEIGHT" ? "UNDERWEIGHT" : indiaCategory === "NORMAL" ? "MAINTAIN" : "ELEVATED" };
}
