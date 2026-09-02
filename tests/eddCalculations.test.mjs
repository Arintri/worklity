import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

import {
  addCalendarDays,
  calculateEDD,
  calculateEDDDetails,
  calculateGestationalAge,
  calculatePregnancyProgress,
  differenceInCalendarDays,
  formatISODate,
  getTrimester,
  isBeyondUsualPregnancyDatingRange,
  parseISODate,
} from "../app/edd-calculator/eddCalculations.mjs";

function date(value) {
  const parsed = parseISODate(value);
  assert.ok(parsed, `Expected ${value} to be a valid date`);
  return parsed;
}

function detailsAtElapsedDay(elapsedDays) {
  const lmp = date("2024-01-01");
  const reference = addCalendarDays(lmp, elapsedDays);
  assert.ok(reference);

  const result = calculateEDDDetails(
    formatISODate(lmp),
    formatISODate(reference)
  );
  assert.equal(result.ok, true);
  return result;
}

test("strict date parsing accepts real dates without year 0-99 remapping", () => {
  assert.equal(formatISODate(date("2024-02-29")), "2024-02-29");

  const earlyYear = date("0099-01-01");
  assert.equal(earlyYear.getUTCFullYear(), 99);
  assert.equal(formatISODate(earlyYear), "0099-01-01");
});

test("strict date parsing rejects impossible, malformed, and empty dates", () => {
  const invalidValues = [
    "",
    "2023-02-29",
    "2024-04-31",
    "2024-00-10",
    "2024-13-01",
    "2024-01-00",
    "2024-1-01",
    "24-01-01",
    "2024/01/01",
    "not-a-date",
    "0000-01-01",
  ];

  for (const value of invalidValues) {
    assert.equal(parseISODate(value), null, `${value} should be rejected`);
  }

  assert.equal(parseISODate(null), null);
  assert.equal(parseISODate(undefined), null);
});

test("EDD is exactly 280 UTC calendar days after LMP", () => {
  const cases = [
    ["2023-01-01", "2023-10-08"],
    ["2024-01-01", "2024-10-07"],
    ["2024-02-29", "2024-12-05"],
    ["2024-12-31", "2025-10-07"],
  ];

  for (const [lmp, expected] of cases) {
    const estimatedDueDate = calculateEDD(date(lmp));
    assert.equal(formatISODate(estimatedDueDate), expected);
    assert.equal(differenceInCalendarDays(date(lmp), estimatedDueDate), 280);
  }
});

test("gestational age uses completed weeks and remaining days", () => {
  const cases = [
    [0, 0, 0],
    [6, 0, 6],
    [7, 1, 0],
    [97, 13, 6],
    [98, 14, 0],
    [195, 27, 6],
    [196, 28, 0],
    [279, 39, 6],
    [280, 40, 0],
  ];

  for (const [elapsedDays, completedWeeks, remainingDays] of cases) {
    const result = detailsAtElapsedDay(elapsedDays);
    assert.equal(result.elapsedDays, elapsedDays);
    assert.equal(result.completedWeeks, completedWeeks);
    assert.equal(result.remainingDays, remainingDays);
  }
});

test("trimester boundaries are exact", () => {
  assert.equal(getTrimester(0), "first");
  assert.equal(getTrimester(97), "first");
  assert.equal(getTrimester(98), "second");
  assert.equal(getTrimester(195), "second");
  assert.equal(getTrimester(196), "third");
  assert.equal(getTrimester(280), "third");

  assert.equal(detailsAtElapsedDay(97).trimester, "first");
  assert.equal(detailsAtElapsedDay(98).trimester, "second");
  assert.equal(detailsAtElapsedDay(195).trimester, "second");
  assert.equal(detailsAtElapsedDay(196).trimester, "third");
});

test("beyond-range presentation state starts only after 42 completed weeks", () => {
  assert.equal(isBeyondUsualPregnancyDatingRange(293), false);
  assert.equal(isBeyondUsualPregnancyDatingRange(294), false);
  assert.equal(isBeyondUsualPregnancyDatingRange(295), true);
  assert.equal(isBeyondUsualPregnancyDatingRange(-1), false);
  assert.equal(isBeyondUsualPregnancyDatingRange(Number.NaN), false);

  const normal = detailsAtElapsedDay(280);
  assert.equal(isBeyondUsualPregnancyDatingRange(normal.elapsedDays), false);
  assert.equal(normal.completedWeeks, 40);
  assert.equal(normal.remainingDays, 0);
  assert.equal(normal.trimester, "third");
  assert.equal(normal.progress.normalizedPercent, 100);

  const beyond = detailsAtElapsedDay(295);
  assert.equal(isBeyondUsualPregnancyDatingRange(beyond.elapsedDays), true);
  assert.equal(beyond.completedWeeks, 42);
  assert.equal(beyond.remainingDays, 1);
});

test("pregnancy progress is precise and normalized to 0-100 percent", () => {
  const cases = [
    [0, 0],
    [70, 25],
    [140, 50],
    [210, 75],
    [280, 100],
    [281, 100],
  ];

  for (const [elapsedDays, expectedNormalized] of cases) {
    const progress = calculatePregnancyProgress(elapsedDays);
    assert.ok(progress);
    assert.equal(progress.normalizedPercent, expectedNormalized);
    assert.equal(
      progress.precisePercent,
      (elapsedDays / 280) * 100
    );
  }

  assert.ok(calculatePregnancyProgress(281).precisePercent > 100);
});

test("reference date before LMP is rejected and same date is valid", () => {
  const before = calculateEDDDetails("2024-06-20", "2024-06-19");
  assert.deepEqual(before, {
    ok: false,
    error: "REFERENCE_BEFORE_LMP",
  });

  assert.equal(
    calculateGestationalAge(date("2024-06-20"), date("2024-06-19")),
    null
  );

  const same = calculateEDDDetails("2024-06-20", "2024-06-20");
  assert.equal(same.ok, true);
  assert.equal(same.elapsedDays, 0);
  assert.equal(same.completedWeeks, 0);
  assert.equal(same.remainingDays, 0);
  assert.equal(same.progress.normalizedPercent, 0);
});

test("validated details return specific errors for missing and invalid input", () => {
  assert.deepEqual(calculateEDDDetails("", "2024-01-01"), {
    ok: false,
    error: "LMP_REQUIRED",
  });
  assert.deepEqual(calculateEDDDetails("2023-02-29", "2024-01-01"), {
    ok: false,
    error: "INVALID_LMP",
  });
  assert.deepEqual(calculateEDDDetails("2024-01-01", ""), {
    ok: false,
    error: "REFERENCE_DATE_REQUIRED",
  });
  assert.deepEqual(calculateEDDDetails("2024-01-01", "bad-date"), {
    ok: false,
    error: "INVALID_REFERENCE_DATE",
  });
});

test("month/year boundaries and dates beyond EDD remain finite and nonnegative", () => {
  const result = calculateEDDDetails("2024-12-31", "2025-10-08");
  assert.equal(result.ok, true);
  assert.equal(formatISODate(result.estimatedDueDate), "2025-10-07");
  assert.equal(result.elapsedDays, 281);
  assert.equal(result.completedWeeks, 40);
  assert.equal(result.remainingDays, 1);
  assert.equal(result.trimester, "third");
  assert.equal(result.progress.normalizedPercent, 100);

  const numericalValues = [
    result.elapsedDays,
    result.completedWeeks,
    result.remainingDays,
    result.progress.precisePercent,
    result.progress.normalizedPercent,
  ];

  for (const value of numericalValues) {
    assert.equal(Number.isFinite(value), true);
    assert.ok(value >= 0);
  }
});

test("UTC calendar results are identical across supported timezone checks", () => {
  const moduleUrl = new URL(
    "../app/edd-calculator/eddCalculations.mjs",
    import.meta.url
  ).href;
  const script = `
    import {
      calculateEDDDetails,
      formatISODate
    } from ${JSON.stringify(moduleUrl)};

    const vectors = [
      ["2024-02-29", "2024-03-10"],
      ["2024-03-10", "2024-11-03"],
      ["2024-10-27", "2025-01-01"],
      ["2024-12-31", "2025-10-08"]
    ];

    const results = vectors.map(([lmp, reference]) => {
      const result = calculateEDDDetails(lmp, reference);
      return {
        ok: result.ok,
        edd: result.ok ? formatISODate(result.estimatedDueDate) : null,
        elapsedDays: result.ok ? result.elapsedDays : null,
        weeks: result.ok ? result.completedWeeks : null,
        days: result.ok ? result.remainingDays : null,
        trimester: result.ok ? result.trimester : null,
        progress: result.ok ? result.progress.normalizedPercent : null
      };
    });

    process.stdout.write(JSON.stringify(results));
  `;

  const timezones = [
    "Asia/Kolkata",
    "UTC",
    "America/New_York",
    "Europe/London",
  ];
  let baseline;

  for (const timezone of timezones) {
    const run = spawnSync(
      process.execPath,
      ["--input-type=module", "--eval", script],
      {
        encoding: "utf8",
        env: { ...process.env, TZ: timezone },
      }
    );

    assert.equal(run.status, 0, run.stderr);
    const output = JSON.parse(run.stdout);

    if (!baseline) baseline = output;
    assert.deepEqual(output, baseline, `Results changed in ${timezone}`);
  }
});
