export const MIN_PRINCIPAL_RUPEES = 1;
export const MAX_PRINCIPAL_RUPEES = 1_000_000_000_000;
export const MIN_ANNUAL_INTEREST_RATE = 0;
export const MAX_ANNUAL_INTEREST_RATE = 100;
export const MIN_TENURE_MONTHS = 1;
export const MAX_TENURE_MONTHS = 600;
export const TENURE_UNITS = Object.freeze({
  MONTHS: "months",
  YEARS: "years",
});

const PAISE_PER_RUPEE = 100;
const DECIMAL_NUMBER_PATTERN = /^[+-]?(?:\d+|\d*\.\d+)$/;

function parseDecimal(value) {
  if (value === null || value === undefined) return null;

  const text = typeof value === "string" ? value.trim() : String(value);
  if (text === "" || !DECIMAL_NUMBER_PATTERN.test(text)) return null;

  const number = Number(text);
  if (!Number.isFinite(number)) return null;

  return { number, text };
}

function decimalPlaces(text) {
  const unsigned = text.replace(/^[+-]/, "");
  const point = unsigned.indexOf(".");
  return point === -1 ? 0 : unsigned.length - point - 1;
}

export function parsePrincipalToPaise(value) {
  if (value === null || value === undefined || String(value).trim() === "") {
    return { ok: false, error: "PRINCIPAL_REQUIRED" };
  }

  const parsed = parseDecimal(value);
  if (!parsed) return { ok: false, error: "INVALID_PRINCIPAL" };

  if (decimalPlaces(parsed.text) > 2) {
    return { ok: false, error: "PRINCIPAL_TOO_MANY_DECIMALS" };
  }

  if (parsed.number < MIN_PRINCIPAL_RUPEES) {
    return { ok: false, error: "PRINCIPAL_BELOW_MINIMUM" };
  }

  if (parsed.number > MAX_PRINCIPAL_RUPEES) {
    return { ok: false, error: "PRINCIPAL_ABOVE_MAXIMUM" };
  }

  const principalPaise = Math.round(parsed.number * PAISE_PER_RUPEE);
  if (!Number.isSafeInteger(principalPaise) || principalPaise <= 0) {
    return { ok: false, error: "INVALID_PRINCIPAL" };
  }

  return { ok: true, principalPaise };
}

export function parseAnnualInterestRate(value) {
  if (value === null || value === undefined || String(value).trim() === "") {
    return { ok: false, error: "ANNUAL_RATE_REQUIRED" };
  }

  const parsed = parseDecimal(value);
  if (!parsed) return { ok: false, error: "INVALID_ANNUAL_RATE" };

  if (parsed.number < MIN_ANNUAL_INTEREST_RATE) {
    return { ok: false, error: "ANNUAL_RATE_BELOW_MINIMUM" };
  }

  if (parsed.number > MAX_ANNUAL_INTEREST_RATE) {
    return { ok: false, error: "ANNUAL_RATE_ABOVE_MAXIMUM" };
  }

  return { ok: true, annualRate: parsed.number };
}

export function convertTenureToMonths(value, unit) {
  if (unit !== TENURE_UNITS.MONTHS && unit !== TENURE_UNITS.YEARS) {
    return { ok: false, error: "UNSUPPORTED_TENURE_UNIT" };
  }

  if (value === null || value === undefined || String(value).trim() === "") {
    return { ok: false, error: "TENURE_REQUIRED" };
  }

  const parsed = parseDecimal(value);
  if (!parsed) return { ok: false, error: "INVALID_TENURE" };

  const months =
    unit === TENURE_UNITS.YEARS ? parsed.number * 12 : parsed.number;

  if (!Number.isSafeInteger(months)) {
    return { ok: false, error: "TENURE_MUST_BE_WHOLE_MONTHS" };
  }

  if (months < MIN_TENURE_MONTHS) {
    return { ok: false, error: "TENURE_BELOW_MINIMUM" };
  }

  if (months > MAX_TENURE_MONTHS) {
    return { ok: false, error: "TENURE_ABOVE_MAXIMUM" };
  }

  return { ok: true, months };
}

export function calculateMonthlyRate(annualRate) {
  if (
    !Number.isFinite(annualRate) ||
    annualRate < MIN_ANNUAL_INTEREST_RATE ||
    annualRate > MAX_ANNUAL_INTEREST_RATE
  ) {
    return null;
  }

  const monthlyRate = annualRate / 12 / 100;
  return Number.isFinite(monthlyRate) && monthlyRate >= 0
    ? monthlyRate
    : null;
}

export function calculateRegularEMIPaise(
  principalPaise,
  annualRate,
  months
) {
  if (
    !Number.isSafeInteger(principalPaise) ||
    principalPaise <= 0 ||
    !Number.isSafeInteger(months) ||
    months < MIN_TENURE_MONTHS ||
    months > MAX_TENURE_MONTHS
  ) {
    return null;
  }

  const monthlyRate = calculateMonthlyRate(annualRate);
  if (monthlyRate === null) return null;

  let preciseEMI;

  if (monthlyRate === 0) {
    preciseEMI = principalPaise / months;
  } else {
    const growthFactor = (1 + monthlyRate) ** months;
    const denominator = growthFactor - 1;

    if (
      !Number.isFinite(growthFactor) ||
      !Number.isFinite(denominator) ||
      denominator <= 0
    ) {
      return null;
    }

    preciseEMI =
      (principalPaise * monthlyRate * growthFactor) / denominator;
  }

  if (!Number.isFinite(preciseEMI) || preciseEMI <= 0) return null;

  const regularEMIPaise = Math.round(preciseEMI);
  return Number.isSafeInteger(regularEMIPaise) && regularEMIPaise > 0
    ? regularEMIPaise
    : null;
}

function isValidMoney(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

export function buildAmortizationSchedule(
  principalPaise,
  monthlyRate,
  months,
  regularEMIPaise
) {
  if (
    !Number.isSafeInteger(principalPaise) ||
    principalPaise <= 0 ||
    !Number.isFinite(monthlyRate) ||
    monthlyRate < 0 ||
    !Number.isSafeInteger(months) ||
    months < MIN_TENURE_MONTHS ||
    months > MAX_TENURE_MONTHS ||
    !Number.isSafeInteger(regularEMIPaise) ||
    regularEMIPaise <= 0
  ) {
    return { ok: false, error: "INVALID_SCHEDULE_INPUT" };
  }

  const schedule = [];
  let balancePaise = principalPaise;

  for (let month = 1; month <= months; month++) {
    const openingBalancePaise = balancePaise;
    const interestPaise = Math.round(openingBalancePaise * monthlyRate);

    if (!isValidMoney(interestPaise)) {
      return { ok: false, error: "INVALID_SCHEDULE_VALUE" };
    }

    let paymentPaise;
    let principalRepaidPaise;

    if (month === months) {
      principalRepaidPaise = openingBalancePaise;
      paymentPaise = principalRepaidPaise + interestPaise;
    } else {
      paymentPaise = regularEMIPaise;
      principalRepaidPaise = paymentPaise - interestPaise;

      if (principalRepaidPaise <= 0) {
        return { ok: false, error: "EMI_DOES_NOT_REDUCE_PRINCIPAL" };
      }

      if (principalRepaidPaise >= openingBalancePaise) {
        return { ok: false, error: "EMI_REPAYS_BEFORE_FINAL_MONTH" };
      }
    }

    const closingBalancePaise =
      month === months ? 0 : openingBalancePaise - principalRepaidPaise;

    const rowValues = [
      openingBalancePaise,
      paymentPaise,
      interestPaise,
      principalRepaidPaise,
      closingBalancePaise,
    ];

    if (
      rowValues.some((value) => !isValidMoney(value)) ||
      paymentPaise !== principalRepaidPaise + interestPaise
    ) {
      return { ok: false, error: "INVALID_SCHEDULE_VALUE" };
    }

    schedule.push({
      month,
      openingBalancePaise,
      paymentPaise,
      interestPaise,
      principalRepaidPaise,
      closingBalancePaise,
      isFinalAdjustedPayment:
        month === months && paymentPaise !== regularEMIPaise,
    });

    balancePaise = closingBalancePaise;
  }

  if (balancePaise !== 0 || schedule.length !== months) {
    return { ok: false, error: "SCHEDULE_RECONCILIATION_FAILED" };
  }

  return { ok: true, schedule };
}

export function calculateEMIDetails({
  principal,
  annualRate,
  tenure,
  tenureUnit,
} = {}) {
  const principalResult = parsePrincipalToPaise(principal);
  if (!principalResult.ok) return principalResult;

  const rateResult = parseAnnualInterestRate(annualRate);
  if (!rateResult.ok) return rateResult;

  const tenureResult = convertTenureToMonths(tenure, tenureUnit);
  if (!tenureResult.ok) return tenureResult;

  const { principalPaise } = principalResult;
  const { annualRate: normalizedAnnualRate } = rateResult;
  const { months } = tenureResult;
  const monthlyRate = calculateMonthlyRate(normalizedAnnualRate);
  const regularEMIPaise = calculateRegularEMIPaise(
    principalPaise,
    normalizedAnnualRate,
    months
  );

  if (monthlyRate === null || regularEMIPaise === null) {
    return { ok: false, error: "EMI_CALCULATION_FAILED" };
  }

  const scheduleResult = buildAmortizationSchedule(
    principalPaise,
    monthlyRate,
    months,
    regularEMIPaise
  );

  if (!scheduleResult.ok) return scheduleResult;

  const { schedule } = scheduleResult;
  let totalPrincipalPaise = 0;
  let totalInterestPaise = 0;
  let totalPaymentPaise = 0;

  for (const row of schedule) {
    totalPrincipalPaise += row.principalRepaidPaise;
    totalInterestPaise += row.interestPaise;
    totalPaymentPaise += row.paymentPaise;
  }

  const totals = [
    totalPrincipalPaise,
    totalInterestPaise,
    totalPaymentPaise,
  ];

  if (
    totals.some((value) => !isValidMoney(value)) ||
    totalPrincipalPaise !== principalPaise ||
    totalPaymentPaise !== totalPrincipalPaise + totalInterestPaise ||
    schedule.at(-1)?.closingBalancePaise !== 0
  ) {
    return { ok: false, error: "SCHEDULE_RECONCILIATION_FAILED" };
  }

  return {
    ok: true,
    principalPaise,
    annualRate: normalizedAnnualRate,
    monthlyRate,
    months,
    instalmentCount: months,
    regularEMIPaise,
    totalPrincipalPaise,
    totalInterestPaise,
    totalPaymentPaise,
    schedule,
  };
}
