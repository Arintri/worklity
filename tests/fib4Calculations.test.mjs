import test from "node:test";
import assert from "node:assert/strict";
import {
  FIB4_CATEGORIES,
  PLATELET_UNITS,
  calculateFib4,
  classifyFib4,
  convertPlateletsToStandard,
} from "../app/fib-4-calculator/fib4Calculations.mjs";

const standardInput = { age: 50, ast: 40, alt: 40, plateletCount: 250, plateletUnit: PLATELET_UNITS.STANDARD };

test("calculates FIB-4 from standard platelet units", () => {
  const result = calculateFib4(standardInput);
  assert.equal(result.ok, true);
  assert.ok(Math.abs(result.score - 1.2649110640673518) < 1e-12);
  assert.equal(result.displayedScore, "1.26");
  assert.equal(result.category, FIB4_CATEGORIES.LOWER);
});

test("converts lakh/µL and produces an equivalent score", () => {
  assert.equal(convertPlateletsToStandard(2.5, PLATELET_UNITS.LAKH_PER_MICROLITER), 250);
  const standard = calculateFib4(standardInput);
  const lakh = calculateFib4({ ...standardInput, plateletCount: 2.5, plateletUnit: PLATELET_UNITS.LAKH_PER_MICROLITER });
  assert.equal(lakh.ok, true);
  assert.equal(lakh.score, standard.score);
});

test("uses exact standard age 35–64 classification boundaries", () => {
  assert.equal(classifyFib4(1.299999, 35), FIB4_CATEGORIES.LOWER);
  assert.equal(classifyFib4(1.3, 35), FIB4_CATEGORIES.INTERMEDIATE);
  assert.equal(classifyFib4(2.67, 64), FIB4_CATEGORIES.INTERMEDIATE);
  assert.equal(classifyFib4(2.670001, 64), FIB4_CATEGORIES.HIGHER);
});

test("uses exact age-adjusted boundary from age 65", () => {
  assert.equal(classifyFib4(1.999999, 65), FIB4_CATEGORIES.LOWER);
  assert.equal(classifyFib4(2, 65), FIB4_CATEGORIES.INTERMEDIATE);
  assert.equal(classifyFib4(2.67, 65), FIB4_CATEGORIES.INTERMEDIATE);
  assert.equal(classifyFib4(2.670001, 65), FIB4_CATEGORIES.HIGHER);
});

test("marks ages below 35 as limited accuracy without a reassuring risk category", () => {
  const result = calculateFib4({ ...standardInput, age: 34 });
  assert.equal(result.ok, true);
  assert.equal(result.category, FIB4_CATEGORIES.LIMITED_ACCURACY);
  assert.equal(result.limitedAccuracy, true);
  assert.equal(classifyFib4(0.5, 34), FIB4_CATEGORIES.LIMITED_ACCURACY);
});

test("handles age transition points 35, 64 and 65", () => {
  assert.equal(calculateFib4({ ...standardInput, age: 35 }).limitedAccuracy, false);
  assert.equal(calculateFib4({ ...standardInput, age: 64 }).limitedAccuracy, false);
  assert.equal(calculateFib4({ ...standardInput, age: 65 }).limitedAccuracy, false);
});

test("classification uses the unrounded score", () => {
  assert.equal(classifyFib4(1.296, 50), FIB4_CATEGORIES.LOWER);
  assert.equal(classifyFib4(1.304, 50), FIB4_CATEGORIES.INTERMEDIATE);
  assert.equal((1.296).toFixed(2), (1.304).toFixed(2));
});

test("rejects invalid, zero and negative AST or ALT", () => {
  for (const [field, value] of [["ast", ""], ["ast", 0], ["ast", -1], ["alt", 0], ["alt", -1]]) {
    const result = calculateFib4({ ...standardInput, [field]: value });
    assert.equal(result.ok, false);
  }
});

test("rejects invalid platelet values and protects against common unit mistakes", () => {
  for (const plateletCount of ["", 0, -1, 2.5, 2500]) {
    assert.equal(calculateFib4({ ...standardInput, plateletCount }).ok, false);
  }
  assert.equal(calculateFib4({ ...standardInput, plateletCount: 250, plateletUnit: PLATELET_UNITS.LAKH_PER_MICROLITER }).ok, false);
  assert.equal(calculateFib4({ ...standardInput, plateletUnit: "OTHER" }).ok, false);
});

test("rejects non-finite and malformed values", () => {
  for (const value of [NaN, Infinity, -Infinity, "1e3", "12abc"]) {
    assert.equal(calculateFib4({ ...standardInput, ast: value }).ok, false);
  }
});

test("rejects ages outside the adult guardrails and non-whole years", () => {
  for (const age of [17, 121, 50.5, ""]) {
    assert.equal(calculateFib4({ ...standardInput, age }).ok, false);
  }
});
