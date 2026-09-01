import test from "node:test";
import assert from "node:assert/strict";

import {
  MAX_ANNUAL_INTEREST_RATE,
  MAX_PRINCIPAL_RUPEES,
  MAX_TENURE_MONTHS,
  MIN_ANNUAL_INTEREST_RATE,
  MIN_PRINCIPAL_RUPEES,
  MIN_TENURE_MONTHS,
  TENURE_UNITS,
  buildAmortizationSchedule,
  calculateEMIDetails,
  calculateMonthlyRate,
  calculateRegularEMIPaise,
  convertTenureToMonths,
  parseAnnualInterestRate,
  parsePrincipalToPaise,
} from "../app/emi-calculator/emiCalculations.mjs";

function calculate(principal, annualRate, tenure, tenureUnit = "months") {
  const result = calculateEMIDetails({
    principal,
    annualRate,
    tenure,
    tenureUnit,
  });
  assert.equal(result.ok, true, result.error);
  return result;
}

function assertReconciled(result) {
  assert.equal(result.schedule.length, result.instalmentCount);

  let principal = 0;
  let interest = 0;
  let payments = 0;

  for (const row of result.schedule) {
    const values = [
      row.openingBalancePaise,
      row.paymentPaise,
      row.interestPaise,
      row.principalRepaidPaise,
      row.closingBalancePaise,
    ];

    for (const value of values) {
      assert.equal(Number.isSafeInteger(value), true);
      assert.ok(value >= 0);
    }

    assert.equal(
      row.paymentPaise,
      row.principalRepaidPaise + row.interestPaise
    );
    principal += row.principalRepaidPaise;
    interest += row.interestPaise;
    payments += row.paymentPaise;
  }

  assert.equal(principal, result.principalPaise);
  assert.equal(principal, result.totalPrincipalPaise);
  assert.equal(interest, result.totalInterestPaise);
  assert.equal(payments, result.totalPaymentPaise);
  assert.equal(payments, principal + interest);
  assert.equal(result.schedule.at(-1).closingBalancePaise, 0);
}

test("exports the locked product limits", () => {
  assert.equal(MIN_PRINCIPAL_RUPEES, 1);
  assert.equal(MAX_PRINCIPAL_RUPEES, 1_000_000_000_000);
  assert.equal(MIN_ANNUAL_INTEREST_RATE, 0);
  assert.equal(MAX_ANNUAL_INTEREST_RATE, 100);
  assert.equal(MIN_TENURE_MONTHS, 1);
  assert.equal(MAX_TENURE_MONTHS, 600);
  assert.deepEqual(TENURE_UNITS, { MONTHS: "months", YEARS: "years" });
});

test("vector A: zero interest uses principal divided by months", () => {
  const result = calculate("120000", "0", "12");

  assert.equal(result.regularEMIPaise, 1_000_000);
  assert.equal(result.totalInterestPaise, 0);
  assert.equal(result.totalPaymentPaise, 12_000_000);
  assert.ok(result.schedule.every((row) => row.interestPaise === 0));
  assertReconciled(result);
});

test("vector B: 12 percent schedule follows the selected paise policy", () => {
  const result = calculate("100000", "12", "12");

  assert.equal(result.regularEMIPaise, 888_488);
  assert.deepEqual(result.schedule[0], {
    month: 1,
    openingBalancePaise: 10_000_000,
    paymentPaise: 888_488,
    interestPaise: 100_000,
    principalRepaidPaise: 788_488,
    closingBalancePaise: 9_211_512,
    isFinalAdjustedPayment: false,
  });
  assert.deepEqual(result.schedule[1], {
    month: 2,
    openingBalancePaise: 9_211_512,
    paymentPaise: 888_488,
    interestPaise: 92_115,
    principalRepaidPaise: 796_373,
    closingBalancePaise: 8_415_139,
    isFinalAdjustedPayment: false,
  });
  assert.equal(result.totalInterestPaise, 661_853);
  assert.equal(result.totalPaymentPaise, 10_661_853);
  assert.equal(result.schedule.at(-1).paymentPaise, 888_485);
  assert.equal(result.schedule.at(-1).isFinalAdjustedPayment, true);
  assertReconciled(result);
});

test("vector C: decimal rate and 60-month totals reconcile exactly", () => {
  const result = calculate("500000", "8.5", "60");

  assert.equal(result.regularEMIPaise, 1_025_827);
  assert.equal(result.totalInterestPaise, 11_549_589);
  assert.equal(result.totalPaymentPaise, 61_549_589);
  assert.equal(result.schedule.at(-1).paymentPaise, 1_025_796);
  assertReconciled(result);
});

test("vector D: long decimal-rate loan reconciles exactly", () => {
  const result = calculate("1000000", "7.25", "240");

  assert.equal(result.regularEMIPaise, 790_376);
  assert.equal(result.totalInterestPaise, 89_690_239);
  assert.equal(result.totalPaymentPaise, 189_690_239);
  assert.equal(result.schedule.at(-1).paymentPaise, 790_375);
  assertReconciled(result);
});

test("years and months normalize to the same whole-month tenure", () => {
  assert.deepEqual(convertTenureToMonths("1", "years"), {
    ok: true,
    months: 12,
  });
  assert.deepEqual(convertTenureToMonths("1.5", "years"), {
    ok: true,
    months: 18,
  });

  const inYears = calculate("250000", "9.75", "1", "years");
  const inMonths = calculate("250000", "9.75", "12", "months");
  assert.deepEqual(inYears, inMonths);
});

test("minimum and maximum boundaries are enforced", () => {
  assert.equal(calculate("1", "0", "1").regularEMIPaise, 100);
  assert.equal(
    calculate(String(MAX_PRINCIPAL_RUPEES), "5", "12").principalPaise,
    MAX_PRINCIPAL_RUPEES * 100
  );
  assert.equal(calculate("100000", "100", "12").annualRate, 100);
  assert.equal(calculate("1000000", "5", "600").months, 600);

  assert.equal(parsePrincipalToPaise("0").error, "PRINCIPAL_BELOW_MINIMUM");
  assert.equal(
    parsePrincipalToPaise("1000000000000.01").error,
    "PRINCIPAL_ABOVE_MAXIMUM"
  );
  assert.equal(parseAnnualInterestRate("-0.01").error, "ANNUAL_RATE_BELOW_MINIMUM");
  assert.equal(parseAnnualInterestRate("100.01").error, "ANNUAL_RATE_ABOVE_MAXIMUM");
  assert.equal(convertTenureToMonths("0", "months").error, "TENURE_BELOW_MINIMUM");
  assert.equal(convertTenureToMonths("601", "months").error, "TENURE_ABOVE_MAXIMUM");
});

test("empty, malformed, non-finite, and overflow values are rejected", () => {
  const invalidPrincipals = ["", "abc", "1e3", "1e9999", NaN, Infinity, -Infinity];
  const invalidRates = ["", "abc", "1e2", "1e9999", NaN, Infinity, -Infinity];
  const invalidTenures = ["", "abc", "1e2", "1e9999", NaN, Infinity, -Infinity];

  for (const value of invalidPrincipals) {
    assert.equal(parsePrincipalToPaise(value).ok, false);
  }
  for (const value of invalidRates) {
    assert.equal(parseAnnualInterestRate(value).ok, false);
  }
  for (const value of invalidTenures) {
    assert.equal(convertTenureToMonths(value, "months").ok, false);
  }

  assert.equal(calculateEMIDetails().ok, false);
});

test("principal precision, fractional months, and unsupported units are rejected", () => {
  assert.deepEqual(parsePrincipalToPaise("100.001"), {
    ok: false,
    error: "PRINCIPAL_TOO_MANY_DECIMALS",
  });
  assert.equal(
    convertTenureToMonths("1.1", "months").error,
    "TENURE_MUST_BE_WHOLE_MONTHS"
  );
  assert.equal(
    convertTenureToMonths("1.333", "years").error,
    "TENURE_MUST_BE_WHOLE_MONTHS"
  );
  assert.equal(
    convertTenureToMonths("12", "weeks").error,
    "UNSUPPORTED_TENURE_UNIT"
  );
});

test("calculation primitives reject invalid and non-reducing schedules", () => {
  assert.equal(calculateMonthlyRate(Infinity), null);
  assert.equal(calculateRegularEMIPaise(100, 0, 600), null);
  assert.equal(calculateRegularEMIPaise(100_000, 101, 12), null);

  const invalid = buildAmortizationSchedule(100_000, 1, 12, 100_000);
  assert.deepEqual(invalid, {
    ok: false,
    error: "EMI_DOES_NOT_REDUCE_PRINCIPAL",
  });

  const extreme = calculateEMIDetails({
    principal: String(MAX_PRINCIPAL_RUPEES),
    annualRate: String(MAX_ANNUAL_INTEREST_RATE),
    tenure: String(MAX_TENURE_MONTHS),
    tenureUnit: "months",
  });
  assert.equal(extreme.ok, false);
  assert.equal(extreme.error, "EMI_DOES_NOT_REDUCE_PRINCIPAL");
});

test("all reviewed schedules satisfy every reconciliation invariant", () => {
  const vectors = [
    ["120000", "0", "12"],
    ["100000", "12", "12"],
    ["500000", "8.5", "60"],
    ["1000000", "7.25", "240"],
    ["1", "0", "3"],
    ["1000000000000", "5", "12"],
    ["1000000", "5", "600"],
  ];

  for (const vector of vectors) {
    assertReconciled(calculate(...vector));
  }
});
