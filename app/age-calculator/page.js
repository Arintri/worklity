"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateAgeDetails,
  isValidDate,
  parseDate,
} from "./ageCalculations.mjs";

function formatDate(date, bn) {
  return new Intl.DateTimeFormat(bn ? "bn-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default function AgeCalculator() {
  const [lang, setLang] = useState("en");
  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState("");

  const bn = lang === "bn";

  const result = useMemo(() => {
    const birth = parseDate(dob);

    if (!birth) return dob ? { error: "invalid" } : null;

    let target;

    if (asOf) {
      target = parseDate(asOf);
    } else {
      const now = new Date();

      target = new Date(
        Date.UTC(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        )
      );
    }

    if (!target || !isValidDate(target)) {
      return { error: "invalid" };
    }

    if (birth > target) {
      return { error: "beforeBirth" };
    }

    const details = calculateAgeDetails(birth, target);

    return details || { error: "invalid" };
  }, [dob, asOf]);

  const reset = () => {
    setDob("");
    setAsOf("");
  };

  return (
    <main>
      <header className="nav">
        <Link className="brand" href="/">
          <span>W</span>
          Worklity
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              border: "1px solid #d7e5dc",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setLang("en")}
              style={{
                border: 0,
                padding: "8px 12px",
                cursor: "pointer",
                background:
                  lang === "en" ? "#078c4d" : "#fff",
                color:
                  lang === "en" ? "#fff" : "#17382a",
              }}
            >
              English
            </button>

            <button
              onClick={() => setLang("bn")}
              style={{
                border: 0,
                padding: "8px 12px",
                cursor: "pointer",
                background:
                  lang === "bn" ? "#078c4d" : "#fff",
                color:
                  lang === "bn" ? "#fff" : "#17382a",
              }}
            >
              বাংলা
            </button>
          </div>

          <Link href="/">
            {bn ? "← হোম" : "← Home"}
          </Link>
        </div>
      </header>

      <section className="toolHero">
        <b>{bn ? "তারিখ ও সময়" : "DATE & TIME"}</b>

        <h1>
          {bn ? "বয়স ক্যালকুলেটর" : "Age Calculator"}
        </h1>

        <p>
          {bn
            ? "জন্মতারিখ থেকে আপনার সঠিক বয়স বছর, মাস ও দিনে হিসাব করুন।"
            : "Calculate exact age in years, months and days from a date of birth."}
        </p>
      </section>

      <div className="calcWrap">
        <section className="calc">
          <div className="inputs">
            <label>
              {bn ? "জন্মতারিখ" : "Date of Birth"}

              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </label>

            <label>
              {bn
                ? "যে তারিখ পর্যন্ত বয়স"
                : "Age as of"}

              <input
                type="date"
                value={asOf}
                onChange={(e) => setAsOf(e.target.value)}
              />
            </label>
          </div>

          <p style={{ marginTop: "8px" }}>
            <small>
              {bn
                ? "দ্বিতীয় তারিখ ফাঁকা রাখলে আজকের তারিখ অনুযায়ী বয়স দেখাবে।"
                : "Leave the second date blank to calculate age as of today."}
            </small>
          </p>

          <div className="result">
            <small>
              {bn ? "আপনার বয়স" : "CALCULATED AGE"}
            </small>

            {!dob && (
              <h2>
                {bn
                  ? "জন্মতারিখ লিখুন"
                  : "Enter date of birth"}
              </h2>
            )}

            {result?.error && (
              <h2>
                {result.error === "beforeBirth"
                  ? bn
                    ? "যে তারিখ পর্যন্ত বয়স হিসাব করবেন, সেটি জন্মতারিখের আগে হতে পারে না"
                    : "Age as of date cannot be earlier than the date of birth"
                  : bn
                  ? "সঠিক ও বৈধ তারিখ নির্বাচন করুন"
                  : "Please select a valid date"}
              </h2>
            )}

            {result && !result.error && (
              <>
                <h2>
                  {result.years}{" "}
                  {bn ? "বছর" : "years"},{" "}
                  {result.months}{" "}
                  {bn ? "মাস" : "months"},{" "}
                  {result.days}{" "}
                  {bn ? "দিন" : "days"}
                </h2>

                <div className="results">
                  <div>
                    {bn ? "সম্পূর্ণ বছর" : "Completed Years"}
                    <b>{result.years}</b>
                  </div>

                  <div>
                    {bn ? "মোট দিন" : "Total Days"}
                    <b>
                      {new Intl.NumberFormat(
                        "en-IN"
                      ).format(result.totalDays)}
                    </b>
                  </div>

                  <div>
                    {bn
                      ? "পরবর্তী জন্মদিন"
                      : "Next Birthday"}
                    <b>
                      {formatDate(
                        result.nextBirthday,
                        bn
                      )}
                    </b>
                  </div>

                  <div>
                    {bn
                      ? "জন্মদিন আসতে বাকি"
                      : "Days Until Birthday"}
                    <b>
                      {result.birthdayDays}{" "}
                      {bn ? "দিন" : "days"}
                    </b>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="buttons">
            <button
              className="reset"
              onClick={reset}
            >
              {bn ? "রিসেট" : "Reset"}
            </button>
          </div>
        </section>

        <aside>
          <h3>
            {bn
              ? "বয়স কীভাবে হিসাব হয়?"
              : "How is age calculated?"}
          </h3>

          <p>
            {bn
              ? "Worklity জন্মতারিখ এবং নির্বাচিত তারিখের মধ্যে সম্পূর্ণ বছর, মাস ও দিনের পার্থক্য হিসাব করে।"
              : "Worklity calculates the difference between the date of birth and the selected date in completed years, months and days."}
          </p>

          <p>
            {bn
              ? "চাকরি, স্কুল, ফর্ম পূরণ বা সাধারণ কাজে কোনো নির্দিষ্ট তারিখে বয়স জানার জন্য দ্বিতীয় তারিখটি ব্যবহার করতে পারেন।"
              : "You can use the second date to check age on a specific date for forms, school, work or everyday use."}
          </p>
        </aside>
      </div>

      <section className="explain">
        <h2>
          {bn
            ? "অনলাইন বয়স ক্যালকুলেটর"
            : "Online Age Calculator"}
        </h2>

        <p>
          {bn
            ? "জন্মতারিখ নির্বাচন করলেই আপনার বর্তমান বয়স বছর, মাস ও দিনে দেখা যাবে। চাইলে আজকের পরিবর্তে অন্য কোনো নির্দিষ্ট তারিখেও বয়স হিসাব করতে পারবেন।"
            : "Select a date of birth to see the age in years, months and days. You can also calculate age on any specific date instead of today."}
        </p>
      </section>
    </main>
  );
}
