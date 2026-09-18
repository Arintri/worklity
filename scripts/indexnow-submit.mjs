import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const INDEXNOW_HOST = "worklity.in";
export const INDEXNOW_KEY = "54691f4f34aa1ffa7e71ebd3fea900ff";
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export function normalizeWorklityUrl(value) {
  let url;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`Invalid URL: ${value}`);
  }

  if (
    url.protocol !== "https:" ||
    url.hostname !== INDEXNOW_HOST ||
    url.port ||
    url.username ||
    url.password
  ) {
    throw new Error(`Only https://${INDEXNOW_HOST}/ URLs are allowed: ${value}`);
  }

  url.hash = "";
  return url.href;
}

export function buildIndexNowPayload(values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("Provide at least one Worklity URL to submit.");
  }

  return {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: values.map(normalizeWorklityUrl),
  };
}

export async function submitIndexNow(values, fetchImplementation = fetch) {
  const payload = buildIndexNowPayload(values);
  const response = await fetchImplementation(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `IndexNow submission failed (${response.status} ${response.statusText})${details ? `: ${details}` : ""}`,
    );
  }

  return { status: response.status, urlCount: payload.urlList.length };
}

async function main() {
  try {
    const result = await submitIndexNow(process.argv.slice(2));
    console.log(
      `IndexNow accepted ${result.urlCount} URL${result.urlCount === 1 ? "" : "s"} (HTTP ${result.status}).`,
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

const isDirectRun =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  await main();
}
