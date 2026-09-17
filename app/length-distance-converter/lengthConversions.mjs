export const LENGTH_UNITS = Object.freeze({
  METER: Object.freeze({ metersFactor: 1.0 }),
  FOOT: Object.freeze({ metersFactor: 0.3048 }),
  INCH: Object.freeze({ metersFactor: 0.0254 }),
  KILOMETER: Object.freeze({ metersFactor: 1000.0 }),
  MILE: Object.freeze({ metersFactor: 1609.344 }),
});

const DECIMAL_NUMBER = /^(?:\d+\.?\d*|\.\d+)$/;
const MAX_INPUT = 1e15;

function parseValue(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || !DECIMAL_NUMBER.test(trimmed)) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export function convertLength({ value, fromUnit, toUnit }) {
  const parsedValue = parseValue(value);
  if (parsedValue === null) return { ok: false, error: "VALUE_INVALID" };
  if (parsedValue < 0) return { ok: false, error: "VALUE_NEGATIVE" };
  if (parsedValue > MAX_INPUT) return { ok: false, error: "VALUE_TOO_LARGE" };

  const from = LENGTH_UNITS[fromUnit];
  const to = LENGTH_UNITS[toUnit];
  if (!from || !to) return { ok: false, error: "UNIT_INVALID" };

  const result = (parsedValue * from.metersFactor) / to.metersFactor;
  if (!Number.isFinite(result) || result < 0) return { ok: false, error: "RESULT_INVALID" };

  return { ok: true, value: parsedValue, fromUnit, toUnit, result };
}

export function formatLengthResult(value) {
  if (!Number.isFinite(value)) return "";
  if (value === 0) return "0";
  if (Math.abs(value) >= 1e12 || Math.abs(value) < 1e-8) {
    return value.toExponential(8).replace(/\.0+e/, "e").replace(/(\.\d*?[1-9])0+e/, "$1e");
  }
  return Number(value.toFixed(10)).toString();
}
