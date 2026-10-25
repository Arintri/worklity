import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateAge,
  calculateAgeDetails,
  differenceInDays,
  parseDate,
} from "../app/age-calculator/ageCalculations.mjs";

test("parses only real ISO calendar dates", () => {
  assert.equal(parseDate("2024-02-29")?.toISOString(), "2024-02-29T00:00:00.000Z");
  assert.equal(parseDate("2023-02-29"), null);
  assert.equal(parseDate("2024-2-9"), null);
  assert.equal(parseDate(""), null);
});

test("calculates completed years, clamped months, and remaining days", () => {
  const result = calculateAge(parseDate("2000-01-31"), parseDate("2024-03-01"));
  assert.deepEqual(result, { years: 24, months: 1, days: 1 });
});

test("uses February 28 for a February 29 birthday in a non-leap year", () => {
  const result = calculateAgeDetails(parseDate("2000-02-29"), parseDate("2023-02-28"));
  assert.equal(result.years, 23);
  assert.equal(result.months, 0);
  assert.equal(result.days, 0);
  assert.equal(result.nextBirthday.toISOString(), "2023-02-28T00:00:00.000Z");
  assert.equal(result.birthdayDays, 0);
});

test("rejects a reference date before date of birth and keeps UTC day differences", () => {
  assert.equal(calculateAge(parseDate("2024-01-02"), parseDate("2024-01-01")), null);
  assert.equal(differenceInDays(parseDate("2024-02-28"), parseDate("2024-03-01")), 2);
});
