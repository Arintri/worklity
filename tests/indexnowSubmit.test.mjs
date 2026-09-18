import test from "node:test";
import assert from "node:assert/strict";

import {
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
  buildIndexNowPayload,
  normalizeWorklityUrl,
} from "../scripts/indexnow-submit.mjs";

test("accepts and normalizes a worklity.in URL", () => {
  assert.equal(
    normalizeWorklityUrl("https://worklity.in/age-calculator"),
    "https://worklity.in/age-calculator",
  );
});

test("rejects URLs from another domain", () => {
  assert.throws(
    () => normalizeWorklityUrl("https://example.com/age-calculator"),
    /Only https:\/\/worklity\.in\/ URLs are allowed/,
  );
});

test("builds the required IndexNow payload", () => {
  assert.deepEqual(buildIndexNowPayload(["https://worklity.in/bmi-calculator"]), {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: ["https://worklity.in/bmi-calculator"],
  });

  assert.equal(INDEXNOW_HOST, "worklity.in");
  assert.equal(INDEXNOW_KEY, "54691f4f34aa1ffa7e71ebd3fea900ff");
  assert.equal(
    INDEXNOW_KEY_LOCATION,
    "https://worklity.in/54691f4f34aa1ffa7e71ebd3fea900ff.txt",
  );
});

test("requires at least one URL", () => {
  assert.throws(() => buildIndexNowPayload([]), /at least one Worklity URL/);
});
