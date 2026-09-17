import test from "node:test";
import assert from "node:assert/strict";
import { LENGTH_UNITS, convertLength, formatLengthResult } from "../app/length-distance-converter/lengthConversions.mjs";

function result(value, fromUnit, toUnit) {
  const conversion = convertLength({ value, fromUnit, toUnit });
  assert.equal(conversion.ok, true);
  return conversion.result;
}

function approximately(actual, expected, tolerance = 1e-10) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} was not within ${tolerance} of ${expected}`);
}

test("exports the verified meter factors", () => {
  assert.deepEqual(LENGTH_UNITS, {
    METER: { metersFactor: 1 }, FOOT: { metersFactor: 0.3048 }, INCH: { metersFactor: 0.0254 },
    KILOMETER: { metersFactor: 1000 }, MILE: { metersFactor: 1609.344 },
  });
});

test("1 meter converts to approximately 3.2808399 feet", () => {
  approximately(result(1, "METER", "FOOT"), 3.280839895013123, 1e-12);
});

test("12 inches convert to exactly 1 foot", () => {
  approximately(result(12, "INCH", "FOOT"), 1, 1e-12);
});

test("1 foot converts to exactly 0.3048 meter", () => {
  assert.equal(result(1, "FOOT", "METER"), 0.3048);
});

test("1 kilometer converts to approximately 0.621371192 mile", () => {
  approximately(result(1, "KILOMETER", "MILE"), 0.621371192237334, 1e-12);
});

test("1 mile converts to exactly 1.609344 kilometer", () => {
  assert.equal(result(1, "MILE", "KILOMETER"), 1.609344);
});

test("1000 meters convert to exactly 1 kilometer", () => {
  assert.equal(result(1000, "METER", "KILOMETER"), 1);
});

test("1609.344 meters convert to exactly 1 mile", () => {
  assert.equal(result(1609.344, "METER", "MILE"), 1);
});

test("same-unit and zero conversions remain exact", () => {
  assert.equal(result(25, "METER", "METER"), 25);
  assert.equal(result(0, "MILE", "KILOMETER"), 0);
});

test("invalid, negative, non-finite and unsupported values are rejected", () => {
  for (const value of ["", "abc", "1e3", -1, NaN, Infinity, 1e16]) {
    assert.equal(convertLength({ value, fromUnit: "METER", toUnit: "FOOT" }).ok, false);
  }
  assert.equal(convertLength({ value: 1, fromUnit: "YARD", toUnit: "METER" }).ok, false);
});

test("result formatting is concise without changing calculation precision", () => {
  assert.equal(formatLengthResult(3.280839895013123), "3.280839895");
  assert.equal(formatLengthResult(1.609344), "1.609344");
  assert.equal(formatLengthResult(1), "1");
});
