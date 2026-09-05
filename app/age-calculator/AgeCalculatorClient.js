"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ToolTabs from "../components/ToolTabs";
import TrustLinks from "../components/TrustLinks";
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

export default function AgeCalculatorClient() {
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
    <main className="agePage">
      <header className="nav ageNav">
        <Link className="brand ageBrand" href="/">
          <Image src="/brand/worklity-mark.png" alt="" width={40} height={40} style={{ display: "block", flex: "0 0 40px", width: 40, height: 40, objectFit: "contain" }} />
          Worklity
        </Link>

        <div className="ageNavControls">
          <div
            className="languageSwitch"
            role="group"
            aria-label={bn ? "ভাষা নির্বাচন" : "Language selection"}
          >
            <button
              className="languageButton"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              English
            </button>

            <button
              className="languageButton"
              onClick={() => setLang("bn")}
              aria-pressed={lang === "bn"}
            >
              বাংলা
            </button>
          </div>

          <Link className="ageHome" href="/">
            {bn ? "← হোম" : "← Home"}
          </Link>
        </div>
      </header>

      <ToolTabs language={lang} />

      <section className="toolHero ageHero">
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

      <div className="calcWrap ageCalcWrap">
        <section className="calc ageCalculatorCard">
          <div className="inputs ageInputs">
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

          <p className="dateHint">
            <small>
              {bn
                ? "দ্বিতীয় তারিখ ফাঁকা রাখলে আজকের তারিখ অনুযায়ী বয়স দেখাবে।"
                : "Leave the second date blank to calculate age as of today."}
            </small>
          </p>

          <div
            className="result ageResult"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <small>
              {bn ? "আপনার বয়স" : "CALCULATED AGE"}
            </small>

            {!dob && (
              <h2 className="ageResultHeadline">
                {bn
                  ? "জন্মতারিখ লিখুন"
                  : "Enter date of birth"}
              </h2>
            )}

            {result?.error && (
              <h2 className="ageResultHeadline ageError">
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
                <h2 className="ageResultHeadline">
                  {result.years}{" "}
                  {bn ? "বছর" : "years"},{" "}
                  {result.months}{" "}
                  {bn ? "মাস" : "months"},{" "}
                  {result.days}{" "}
                  {bn ? "দিন" : "days"}
                </h2>

                <div className="results ageResults">
                  <div className="completedCard">
                    {bn ? "সম্পূর্ণ বছর" : "Completed Years"}
                    <b>{result.years}</b>
                  </div>

                  <div className="daysCard">
                    {bn ? "মোট দিন" : "Total Days"}
                    <b>
                      {new Intl.NumberFormat(
                        "en-IN"
                      ).format(result.totalDays)}
                    </b>
                  </div>

                  <div className="birthdayCard">
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

                  <div className="countdownCard">
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

          <div className="buttons ageActions">
            <button
              className="reset ageReset"
              onClick={reset}
            >
              {bn ? "রিসেট" : "Reset"}
            </button>
          </div>
        </section>

        <aside className="ageAside">
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

      <section className="explain ageInfo">
        <h2 className="infoTitle">
          {bn
            ? "বয়স ক্যালকুলেটর কীভাবে কাজ করে"
            : "How the Age Calculator Works"}
        </h2>

        <p>
          {bn
            ? "ক্যালকুলেটরটি জন্মতারিখের সঙ্গে আজকের তারিখ অথবা আপনার নির্বাচিত ‘যে তারিখ পর্যন্ত বয়স’ তারিখের তুলনা করে। এটি প্রতিটি মাসকে নির্দিষ্ট সংখ্যক দিন ধরে অনুমান না করে ক্যালেন্ডারের সম্পূর্ণ বছর, মাস ও দিন হিসাব করে।"
            : "The calculator compares the Date of Birth with either today or the selected “Age as of” date. It uses calendar years, months and days rather than estimating every month as a fixed number of days."}
        </p>

        <h2 className="infoDivider">{bn ? "ফলাফল বুঝুন" : "Understanding the Results"}</h2>

        <h3>{bn ? "বছর, মাস ও দিনে বয়স" : "Age in years, months and days"}</h3>
        <p>
          {bn
            ? "নির্বাচিত তারিখ পর্যন্ত সম্পূর্ণ ক্যালেন্ডার বছর, মাস ও অবশিষ্ট দিনের সমন্বয়ে বয়স দেখায়।"
            : "Shows age as completed calendar years and months plus the remaining days."}
        </p>

        <h3>{bn ? "সম্পূর্ণ বছর" : "Completed years"}</h3>
        <p>
          {bn
            ? "নির্বাচিত তারিখ পর্যন্ত যতটি পূর্ণ জন্মবছর সম্পন্ন হয়েছে।"
            : "The number of full birth years completed by the selected date."}
        </p>

        <h3>{bn ? "মোট দিন" : "Total days"}</h3>
        <p>
          {bn
            ? "জন্মতারিখ থেকে নির্বাচিত তারিখ পর্যন্ত অতিবাহিত ক্যালেন্ডার দিনের সংখ্যা। শুরু ও শেষের তারিখ একই হলে মোট অতিবাহিত দিন ০।"
            : "The number of elapsed calendar days between the birth date and target date. If the start and target dates are the same, Total Days is 0."}
        </p>

        <h3>{bn ? "পরবর্তী জন্মদিন" : "Next birthday"}</h3>
        <p>
          {bn
            ? "নির্বাচিত তারিখে বা তার পরে আসা পরবর্তী জন্মদিনের তারিখ। জন্মদিনটি নির্বাচিত তারিখেই হলে সেটি আজকের জন্মদিন হিসেবে দেখানো হতে পারে।"
            : "The birthday date on or after the selected date. If the selected date is the birthday, it may show that same day."}
        </p>

        <h3>{bn ? "জন্মদিন আসতে বাকি" : "Days until next birthday"}</h3>
        <p>
          {bn
            ? "নির্বাচিত তারিখ থেকে পরবর্তী জন্মদিন পর্যন্ত অতিবাহিত হওয়ার বাকি ক্যালেন্ডার দিন। জন্মদিনটি একই দিনে হলে ফল ০।"
            : "The calendar days remaining from the selected date until the next birthday. It is 0 when the birthday is on that date."}
        </p>

        <h2 className="infoDivider leapTitle">{bn ? "২৯ ফেব্রুয়ারির জন্মদিন" : "February 29 Birthdays"}</h2>
        <p className="leapNote">
          {bn
            ? "২৯ ফেব্রুয়ারি জন্ম হলে এই ক্যালকুলেটর অধিবর্ষ নয় এমন বছরে ২৮ ফেব্রুয়ারিকে জন্মদিন হিসেবে ধরে। এটি শুধু Worklity ক্যালকুলেটরের একটি নিয়ম, সর্বজনীন আইনি নিয়ম নয়। সরকারি বা আইনি বয়সের প্রয়োজনে প্রযোজ্য নিয়ম ও সরকারি নথি যাচাই করুন।"
            : "For a February 29 birth, this calculator treats February 28 as the birthday in a non-leap year. This is a Worklity calculator convention, not a universal legal rule. For official or legal age requirements, verify the applicable rule and official records."}
        </p>

        <h2 className="infoDivider">{bn ? "ব্যবহারিক ব্যবহার" : "Practical Uses"}</h2>
        <p>
          {bn
            ? "কোনো নির্দিষ্ট তারিখে বয়স দেখা, স্কুল বা আবেদনের জন্য প্রাথমিক বয়স হিসাব, ফর্ম প্রস্তুতি এবং ব্যক্তিগত তারিখের সাধারণ হিসাবের জন্য এই ক্যালকুলেটর ব্যবহার করা যায়। ফলাফলটি নিজে থেকে কোনো সরকারি বা আইনি বয়সের শর্ত পূরণের প্রমাণ নয়।"
            : "Use the calculator to check age on a particular date, prepare school or application age calculations, complete forms, or make general personal date calculations. The result does not by itself establish compliance with official or legal age requirements."}
        </p>

        <h2 className="infoDivider ageFaqTitle">{bn ? "সাধারণ প্রশ্ন" : "Frequently Asked Questions"}</h2>

        <h3>{bn ? "বয়স কীভাবে হিসাব করা হয়?" : "How is age calculated?"}</h3>
        <p>
          {bn
            ? "জন্মতারিখ ও লক্ষ্য তারিখের মধ্যে সম্পূর্ণ ক্যালেন্ডার বছর, মাস এবং অবশিষ্ট দিন হিসাব করা হয়।"
            : "Age is calculated as completed calendar years and months plus the remaining days between the two dates."}
        </p>

        <h3>
          {bn
            ? "অতীত বা ভবিষ্যতের কোনো তারিখে কি বয়স হিসাব করা যায়?"
            : "Can I calculate my age on a past or future date?"}
        </h3>
        <p>
          {bn
            ? "হ্যাঁ। ‘যে তারিখ পর্যন্ত বয়স’ ঘরে জন্মতারিখের সমান বা পরের যেকোনো বৈধ তারিখ নির্বাচন করুন।"
            : "Yes. Select any valid “Age as of” date that is the same as or later than the Date of Birth."}
        </p>

        <h3>
          {bn
            ? "অধিবর্ষ নয় এমন বছরে ২৯ ফেব্রুয়ারির জন্মদিন কীভাবে ধরা হয়?"
            : "What happens for a February 29 birthday in a non-leap year?"}
        </h3>
        <p>
          {bn
            ? "এই ক্যালকুলেটর ওই বছরে ২৮ ফেব্রুয়ারিকে জন্মদিন হিসেবে ধরে।"
            : "For this calculator, February 28 is treated as the birthday in that year."}
        </p>

        <h3>{bn ? "মোট দিন বলতে কী বোঝায়?" : "What does Total Days mean?"}</h3>
        <p>
          {bn
            ? "এটি জন্মতারিখ থেকে লক্ষ্য তারিখ পর্যন্ত সম্পূর্ণ অতিবাহিত ক্যালেন্ডার দিনের সংখ্যা।"
            : "It is the number of complete calendar days elapsed from the birth date to the target date."}
        </p>

        <h3>
          {bn
            ? "‘যে তারিখ পর্যন্ত বয়স’ জন্মতারিখের আগে হতে পারে না কেন?"
            : "Why can't “Age as of” be earlier than Date of Birth?"}
        </h3>
        <p>
          {bn
            ? "জন্মের আগের কোনো তারিখের জন্য বয়স নির্ণয় করা যায় না, তাই ক্যালকুলেটর এমন তারিখ গ্রহণ করে না।"
            : "Age is not defined before the birth date, so the calculator rejects an earlier target date."}
        </p>

        <h3>
          {bn
            ? "এই ফলাফল কি বয়সের সরকারি প্রমাণ হিসেবে ব্যবহার করা যাবে?"
            : "Can I use this result as official proof of age?"}
        </h3>
        <p>
          {bn
            ? "না। এই ফলাফল কেবল তথ্যের জন্য। সরকারি প্রয়োজনে গ্রহণযোগ্য নথি, সরকারি রেকর্ড এবং প্রযোজ্য নিয়ম ব্যবহার করুন।"
            : "No. The result is informational. Official requirements should use accepted documents, official records, and the applicable rules."}
        </p>
      </section>

      <TrustLinks language={lang} />

      <style jsx>{`
        .agePage {
          --age-navy: #111a3a;
          --age-indigo: #29377a;
          --age-violet: #7656d8;
          --age-cyan: #25a6b8;
          --age-ink: #17213f;
          --age-muted: #64708a;
          min-height: 100vh;
          color: var(--age-ink);
          background:
            radial-gradient(circle at 8% 28%, rgba(118, 86, 216, 0.07), transparent 24rem),
            radial-gradient(circle at 94% 40%, rgba(37, 166, 184, 0.07), transparent 25rem),
            #f7f8fc;
        }

        .ageNav {
          min-height: 78px;
          height: auto;
          max-width: 1180px;
          border-bottom-color: #e6e9f2;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(14px);
        }

        .ageBrand {
          color: var(--age-navy);
          letter-spacing: -0.02em;
        }

        :global(.ageBrand span) {
          background: linear-gradient(145deg, var(--age-indigo), var(--age-violet));
          box-shadow: 0 9px 22px rgba(72, 58, 153, 0.24);
        }

        .ageNavControls {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .languageSwitch {
          display: flex;
          padding: 4px;
          border: 1px solid #dde1ed;
          border-radius: 13px;
          background: #f3f5fa;
          box-shadow: inset 0 1px 2px rgba(24, 32, 70, 0.05);
        }

        .languageButton {
          min-height: 40px;
          padding: 9px 14px;
          border: 0;
          border-radius: 9px;
          color: #59637b;
          background: transparent;
          box-shadow: none;
          transition: background 160ms ease, color 160ms ease, box-shadow 160ms ease;
        }

        .languageButton[aria-pressed="true"] {
          color: #fff;
          background: linear-gradient(135deg, var(--age-indigo), var(--age-violet));
          box-shadow: 0 6px 16px rgba(63, 54, 147, 0.22);
        }

        .languageButton:hover:not([aria-pressed="true"]) {
          color: var(--age-indigo);
          background: #fff;
        }

        .ageHome {
          padding: 10px 4px;
          color: #46516c;
          font-weight: 700;
        }

        .ageHome:hover {
          color: var(--age-violet);
        }

        .ageHero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 84px 20px 104px;
          border-bottom: 1px solid rgba(105, 91, 180, 0.12);
          background:
            linear-gradient(135deg, rgba(243, 246, 255, 0.98), rgba(244, 239, 255, 0.94) 56%, rgba(235, 250, 250, 0.92));
        }

        .ageHero::before,
        .ageHero::after {
          position: absolute;
          z-index: -1;
          content: "";
          border-radius: 999px;
          pointer-events: none;
        }

        .ageHero::before {
          width: 310px;
          height: 310px;
          top: -190px;
          left: 8%;
          border: 1px solid rgba(118, 86, 216, 0.18);
          box-shadow: 0 0 0 34px rgba(118, 86, 216, 0.035);
        }

        .ageHero::after {
          width: 210px;
          height: 210px;
          right: 9%;
          bottom: -145px;
          background: linear-gradient(145deg, rgba(37, 166, 184, 0.16), rgba(118, 86, 216, 0.08));
          filter: blur(1px);
        }

        .ageHero > b {
          display: inline-block;
          color: #5541b1;
          border-color: rgba(118, 86, 216, 0.24);
          background: rgba(255, 255, 255, 0.76);
          box-shadow: 0 8px 24px rgba(50, 48, 110, 0.08);
          letter-spacing: 0.09em;
        }

        .ageHero h1 {
          margin-top: 26px;
          color: var(--age-navy);
          font-size: clamp(42px, 5.4vw, 66px);
          letter-spacing: -0.045em;
          text-wrap: balance;
        }

        .ageHero p {
          color: #5d6882;
          font-size: 19px;
          text-wrap: balance;
        }

        .ageCalcWrap {
          position: relative;
          z-index: 2;
          max-width: 1080px;
          margin: -48px auto 66px;
          gap: 24px;
        }

        .ageCalculatorCard,
        .ageAside {
          border: 1px solid rgba(76, 68, 143, 0.14);
          background: rgba(255, 255, 255, 0.97);
          box-shadow: 0 24px 64px rgba(31, 39, 82, 0.12);
        }

        .ageCalculatorCard {
          padding: 32px;
          border-radius: 24px;
        }

        .ageInputs {
          gap: 18px;
        }

        .ageInputs label {
          margin-bottom: 12px;
          padding: 17px;
          border: 1px solid #e3e6f0;
          border-radius: 16px;
          color: var(--age-indigo);
          background: linear-gradient(145deg, #fbfcff, #f7f7fc);
          font-size: 14px;
          letter-spacing: 0.015em;
        }

        .ageInputs input {
          min-height: 50px;
          margin-top: 10px;
          padding: 13px 14px;
          border: 1px solid #cfd5e5;
          border-radius: 11px;
          color: var(--age-navy);
          background: #fff;
          box-shadow: 0 2px 5px rgba(27, 35, 73, 0.03);
          font-weight: 600;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }

        .ageInputs input:hover {
          border-color: #aeb7d1;
        }

        .ageInputs input:focus {
          border-color: var(--age-violet);
          outline: none;
          box-shadow: 0 0 0 4px rgba(118, 86, 216, 0.14);
        }

        .dateHint {
          margin: 6px 4px 20px;
          color: var(--age-muted);
          line-height: 1.55;
        }

        .ageResult {
          position: relative;
          overflow: hidden;
          padding: 29px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          color: #fff;
          background:
            radial-gradient(circle at 92% 5%, rgba(54, 204, 208, 0.25), transparent 29%),
            linear-gradient(135deg, #121b3d, #293474 63%, #5543a5);
          box-shadow: 0 20px 42px rgba(26, 31, 83, 0.24);
        }

        .ageResult::after {
          position: absolute;
          width: 150px;
          height: 150px;
          right: -95px;
          bottom: -100px;
          content: "";
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          box-shadow: 0 0 0 25px rgba(255, 255, 255, 0.025);
          pointer-events: none;
        }

        .ageResult > small {
          color: #8fe4e6;
          letter-spacing: 0.1em;
        }

        .ageResultHeadline {
          margin: 14px 0 24px;
          color: #fff;
          font-size: clamp(27px, 4vw, 38px);
          line-height: 1.22;
          letter-spacing: -0.025em;
          overflow-wrap: anywhere;
        }

        .ageError {
          font-size: clamp(22px, 3vw, 29px);
          line-height: 1.35;
        }

        .ageResults {
          position: relative;
          z-index: 1;
          gap: 11px;
        }

        .ageResults > div {
          min-width: 0;
          padding: 15px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-top-width: 3px;
          color: rgba(241, 244, 255, 0.78);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(5px);
        }

        .ageResults > div:nth-child(1) { border-top-color: #9c88f2; }
        .ageResults > div:nth-child(2) { border-top-color: #61c6d3; }
        .ageResults > div:nth-child(3) { border-top-color: #b699ef; }
        .ageResults > div:nth-child(4) { border-top-color: #72d6c2; }

        .ageResults b {
          color: #fff;
          font-size: 19px;
          line-height: 1.35;
          overflow-wrap: anywhere;
        }

        .ageActions {
          justify-content: flex-end;
          margin-top: 24px;
        }

        .ageReset {
          min-height: 46px;
          min-width: 112px;
          padding: 12px 22px;
          border: 1px solid #d4d9e7;
          color: var(--age-indigo);
          background: #fff;
          box-shadow: 0 7px 18px rgba(33, 42, 87, 0.08);
          transition: color 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
        }

        .ageReset:hover {
          color: #fff;
          border-color: var(--age-indigo);
          background: linear-gradient(135deg, var(--age-indigo), var(--age-violet));
          box-shadow: 0 10px 24px rgba(71, 55, 158, 0.22);
          transform: translateY(-1px);
        }

        .ageAside {
          position: relative;
          overflow: hidden;
          padding: 29px;
          border-radius: 22px;
          box-shadow: 0 18px 45px rgba(31, 39, 82, 0.09);
        }

        .ageAside::before {
          display: block;
          width: 42px;
          height: 5px;
          margin-bottom: 22px;
          border-radius: 99px;
          content: "";
          background: linear-gradient(90deg, var(--age-violet), var(--age-cyan));
        }

        .ageAside h3 {
          margin-top: 0;
          color: var(--age-navy);
          font-size: 23px;
          line-height: 1.25;
        }

        .ageAside p {
          color: var(--age-muted);
        }

        .ageInfo {
          max-width: 940px;
          margin: 0 auto 90px;
          padding: 46px 50px;
          border: 1px solid rgba(76, 68, 143, 0.12);
          border-radius: 26px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 22px 58px rgba(31, 39, 82, 0.08);
        }

        .ageInfo h2 {
          margin: 0 0 16px;
          color: var(--age-navy);
          font-size: clamp(27px, 3vw, 36px);
          line-height: 1.18;
          letter-spacing: -0.025em;
        }

        .ageInfo h3 {
          margin: 24px 0 6px;
          color: var(--age-indigo);
          font-size: 18px;
          line-height: 1.35;
        }

        .ageInfo p {
          margin: 0 0 18px;
          color: var(--age-muted);
          font-size: 16.5px;
          line-height: 1.75;
        }

        .infoDivider {
          margin-top: 42px !important;
          padding-top: 38px;
          border-top: 1px solid #e7e9f1;
        }

        .leapTitle {
          color: #493a9b !important;
        }

        .leapNote {
          padding: 20px 22px;
          border: 1px solid rgba(118, 86, 216, 0.18);
          border-left: 4px solid var(--age-violet);
          border-radius: 14px;
          color: #4f5871 !important;
          background: linear-gradient(135deg, rgba(118, 86, 216, 0.07), rgba(37, 166, 184, 0.055));
        }

        .ageFaqTitle ~ h3 {
          margin-top: 14px;
          padding: 17px 19px 0;
          border: 1px solid #e6e8f1;
          border-bottom: 0;
          border-radius: 14px 14px 0 0;
          background: #fafbfe;
        }

        .ageFaqTitle ~ h3 + p {
          margin-top: 0;
          padding: 8px 19px 17px;
          border: 1px solid #e6e8f1;
          border-top: 0;
          border-radius: 0 0 14px 14px;
          background: #fafbfe;
        }

        .languageButton:focus-visible,
        .ageHome:focus-visible,
        .ageBrand:focus-visible,
        .ageReset:focus-visible {
          outline: 3px solid rgba(37, 166, 184, 0.58);
          outline-offset: 3px;
        }

        @media (max-width: 800px) {
          .ageHero {
            padding: 68px 20px 90px;
          }

          .ageCalcWrap {
            margin-top: -42px;
          }

          .ageAside {
            padding: 26px;
          }

          .ageInfo {
            margin-right: 20px;
            margin-left: 20px;
            padding: 38px 34px;
          }
        }

        @media (max-width: 640px) {
          .ageNav {
            flex-wrap: wrap;
            gap: 10px;
            padding-top: 12px;
            padding-bottom: 12px;
          }

          .ageNavControls {
            width: 100%;
            justify-content: space-between;
            gap: 8px;
          }

          .languageButton {
            min-height: 44px;
            padding: 9px 13px;
          }

          .ageHero {
            padding: 58px 18px 80px;
          }

          .ageHero h1 {
            font-size: clamp(36px, 12vw, 48px);
          }

          .ageHero p {
            font-size: 17px;
          }

          .ageCalcWrap {
            margin-top: -34px;
            padding: 0 14px;
          }

          .ageCalculatorCard {
            padding: 20px;
            border-radius: 20px;
          }

          .ageInputs label {
            padding: 14px;
          }

          .ageResult {
            padding: 22px 18px;
          }

          .ageResults {
            grid-template-columns: 1fr;
          }

          .ageActions {
            justify-content: stretch;
          }

          .ageReset {
            width: 100%;
            min-height: 48px;
          }

          .ageAside {
            padding: 23px 21px;
          }

          .ageInfo {
            margin: 0 14px 60px;
            padding: 28px 21px;
            border-radius: 20px;
          }

          .ageInfo h2 {
            font-size: 27px;
          }

          .infoDivider {
            margin-top: 34px !important;
            padding-top: 30px;
          }

          .leapNote {
            padding: 17px;
          }

          .ageFaqTitle ~ h3,
          .ageFaqTitle ~ h3 + p {
            padding-right: 15px;
            padding-left: 15px;
          }
        }
      `}</style>
    </main>
  );
}
