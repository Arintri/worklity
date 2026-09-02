"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PREGNANCY_LENGTH_DAYS,
  calculateEDDDetails,
  isBeyondUsualPregnancyDatingRange,
} from "./eddCalculations.mjs";

function getLocalISODate() {
  const now = new Date();
  const year = String(now.getFullYear()).padStart(4, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(date, bn) {
  return new Intl.DateTimeFormat(bn ? "bn-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default function EDDCalculatorClient() {
  const [lang, setLang] = useState("en");
  const [lmp, setLmp] = useState("");
  const [result, setResult] = useState(null);
  const [errorCode, setErrorCode] = useState("");

  const bn = lang === "bn";

  const errorText = (code) => {
    const messages = {
      LMP_REQUIRED: bn
        ? "শেষ মাসিকের প্রথম দিন নির্বাচন করুন।"
        : "Select the first day of your last menstrual period.",
      INVALID_LMP: bn
        ? "সঠিক ও বৈধ শেষ মাসিকের তারিখ নির্বাচন করুন।"
        : "Select a valid last menstrual period date.",
      REFERENCE_BEFORE_LMP: bn
        ? "শেষ মাসিকের প্রথম দিন ভবিষ্যতের তারিখ হতে পারে না।"
        : "The first day of your last menstrual period cannot be in the future.",
      REFERENCE_DATE_REQUIRED: bn
        ? "আজকের তারিখ নির্ধারণ করা যায়নি। আবার চেষ্টা করুন।"
        : "Today's date could not be determined. Please try again.",
      INVALID_REFERENCE_DATE: bn
        ? "আজকের তারিখ নির্ধারণ করা যায়নি। আবার চেষ্টা করুন।"
        : "Today's date could not be determined. Please try again.",
      CALCULATION_ERROR: bn
        ? "এই তারিখ দিয়ে হিসাব করা যায়নি। তারিখটি যাচাই করে আবার চেষ্টা করুন।"
        : "The estimate could not be calculated. Check the date and try again.",
    };

    return messages[code] || messages.CALCULATION_ERROR;
  };

  const calculate = (event) => {
    event.preventDefault();
    const calculated = calculateEDDDetails(lmp, getLocalISODate());

    if (!calculated.ok) {
      setResult(null);
      setErrorCode(calculated.error);
      return;
    }

    setErrorCode("");
    setResult(calculated);
  };

  const reset = () => {
    setLmp("");
    setResult(null);
    setErrorCode("");
  };

  const trimesterLabel = result
    ? {
        first: bn ? "প্রথম ত্রৈমাসিক" : "First trimester",
        second: bn ? "দ্বিতীয় ত্রৈমাসিক" : "Second trimester",
        third: bn ? "তৃতীয় ত্রৈমাসিক" : "Third trimester",
      }[result.trimester]
    : "";

  const progressPercent = result
    ? Math.round(result.progress.normalizedPercent)
    : 0;
  const dueDatePassed = result
    ? result.elapsedDays > PREGNANCY_LENGTH_DAYS
    : false;
  const beyondFortyTwoWeeks = result
    ? isBeyondUsualPregnancyDatingRange(result.elapsedDays)
    : false;

  return (
    <main className="eddPage">
      <header className="eddNav">
        <Link className="eddBrand" href="/" aria-label="Worklity home">
          <span>W</span>
          Worklity
        </Link>

        <div className="navActions">
          <div
            className="languageSwitch"
            role="group"
            aria-label={bn ? "ভাষা নির্বাচন" : "Language selection"}
          >
            <button
              type="button"
              className="languageButton"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              English
            </button>
            <button
              type="button"
              className="languageButton"
              onClick={() => setLang("bn")}
              aria-pressed={lang === "bn"}
            >
              বাংলা
            </button>
          </div>
          <Link className="homeLink" href="/">
            {bn ? "← হোম" : "← Home"}
          </Link>
        </div>
      </header>

      <section className="eddHero">
        <span>{bn ? "গর্ভাবস্থার তারিখের টুল" : "PREGNANCY DATE TOOL"}</span>
        <h1>
          {bn
            ? "আনুমানিক প্রসবের তারিখ ক্যালকুলেটর"
            : "Estimated Due Date Calculator"}
        </h1>
        <p>
          {bn
            ? "শেষ মাসিকের প্রথম দিন লিখে আনুমানিক প্রসবের তারিখ ও বর্তমান গর্ভাবস্থার সময়রেখা দেখুন।"
            : "Enter the first day of your last menstrual period (LMP) to estimate your due date and current pregnancy timeline."}
        </p>
      </section>

      <div className="calculatorLayout">
        <section className="calculatorCard" aria-labelledby="calculator-title">
          <div className="cardIntro">
            <span aria-hidden="true">40</span>
            <div>
              <h2 id="calculator-title">
                {bn ? "তারিখ দিয়ে হিসাব করুন" : "Calculate from your LMP"}
              </h2>
              <p>
                {bn
                  ? "শুধু একটি তারিখ লাগবে।"
                  : "You only need one date."}
              </p>
            </div>
          </div>

          <form onSubmit={calculate} noValidate>
            <label htmlFor="lmp-date">
              {bn
                ? "শেষ মাসিকের প্রথম দিন"
                : "First day of your last menstrual period (LMP)"}
            </label>
            <input
              id="lmp-date"
              type="date"
              value={lmp}
              max={getLocalISODate()}
              aria-describedby="lmp-hint"
              aria-invalid={Boolean(errorCode)}
              onChange={(event) => {
                setLmp(event.target.value);
                setResult(null);
                setErrorCode("");
              }}
            />
            <p className="inputHint" id="lmp-hint">
              {bn
                ? "যেদিন মাসিক শুরু হয়েছিল সেই প্রথম দিনটি দিন, শেষ দিন নয়।"
                : "Enter the first day bleeding started, not the last day."}
            </p>

            <div className="formActions">
              <button type="submit" className="calculateButton">
                {bn ? "আনুমানিক তারিখ হিসাব করুন" : "Calculate Due Date"}
              </button>
              <button type="button" className="resetButton" onClick={reset}>
                {bn ? "রিসেট" : "Reset"}
              </button>
            </div>
          </form>

          <div className="messageRegion" role="status" aria-live="polite" aria-atomic="true">
            {errorCode && (
              <p className="errorMessage">{errorText(errorCode)}</p>
            )}

            {result && (
              <div className="resultsPanel">
                <div className="dueDateResult">
                  <span>{bn ? "আনুমানিক প্রসবের তারিখ" : "ESTIMATED DUE DATE"}</span>
                  <strong>{formatDate(result.estimatedDueDate, bn)}</strong>
                  {dueDatePassed && (
                    <p>
                      {bn
                        ? "আনুমানিক প্রসবের তারিখটি পেরিয়ে গেছে। এটি প্রসবের সময় সম্পর্কে কোনো পূর্বাভাস নয়।"
                        : "The estimated due date has passed. This does not predict when delivery will occur."}
                    </p>
                  )}
                </div>

                <div className="resultGrid">
                  <div>
                    <span>{bn ? "আনুমানিক গর্ভকাল" : "Estimated Gestational Age"}</span>
                    <strong>
                      {result.completedWeeks} {bn ? "সপ্তাহ" : "weeks"},{" "}
                      {result.remainingDays} {bn ? "দিন" : "days"}
                    </strong>
                  </div>
                  <div>
                    <span>{bn ? "বর্তমান ত্রৈমাসিক" : "Current Trimester"}</span>
                    <strong>
                      {beyondFortyTwoWeeks
                        ? bn
                          ? "সাধারণ গর্ভকাল গণনার সীমার বাইরে"
                          : "Beyond the usual pregnancy dating range"
                        : trimesterLabel}
                    </strong>
                  </div>
                  <div>
                    <span>{bn ? "শেষ মাসিকের তারিখ" : "LMP Date"}</span>
                    <strong>{formatDate(result.lmpDate, bn)}</strong>
                  </div>
                </div>

                {beyondFortyTwoWeeks && (
                  <div className="durationNotice">
                    <strong>
                      {bn
                        ? "সাধারণ গর্ভকাল গণনার সীমার বাইরে"
                        : "Beyond the usual pregnancy dating range"}
                    </strong>
                    <p>
                      {bn
                        ? "দেওয়া LMP তারিখটি ৪২ সম্পূর্ণ সপ্তাহের বেশি গর্ভকাল দেখাচ্ছে। তারিখটি আবার যাচাই করুন। তারিখটি সঠিক হলে গর্ভকাল নির্ধারণের বিষয়ে একজন যোগ্য মাতৃসেবা চিকিৎসক বা স্বাস্থ্যকর্মীর সঙ্গে আলোচনা করুন।"
                        : "The entered LMP produces a gestational age beyond 42 completed weeks. Verify the date you entered. If it is correct, discuss pregnancy dating with a qualified maternity-care professional."}
                    </p>
                  </div>
                )}

                {!beyondFortyTwoWeeks && (
                  <div className="progressCard">
                    <div className="progressHeading">
                      <span>{bn ? "গর্ভাবস্থার অগ্রগতি" : "Pregnancy Progress"}</span>
                      <strong>{progressPercent}%</strong>
                    </div>
                    <div
                      className="progressTrack"
                      role="progressbar"
                      aria-label={bn ? "গর্ভাবস্থার অগ্রগতি" : "Pregnancy progress"}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow={progressPercent}
                      aria-valuetext={`${progressPercent}%`}
                    >
                      <span style={{ width: `${progressPercent}%` }} />
                    </div>
                    <p className="progressExplanation">
                      {bn
                        ? "এই শতাংশটি দেওয়া LMP থেকে ২৮০ দিনের তুলনায় অতিবাহিত ক্যালেন্ডার সময় দেখায়। এটি ভ্রূণের বিকাশ, গর্ভাবস্থার স্বাস্থ্য বা ক্লিনিক্যাল অগ্রগতি মাপে না।"
                        : "This percentage shows elapsed calendar time from the entered LMP relative to 280 days. It does not measure fetal development, pregnancy health or clinical progress."}
                    </p>
                  </div>
                )}

                <p className="resultDisclaimer">
                  {bn
                    ? "শেষ মাসিকের তারিখ থেকে করা এই হিসাবটি আনুমানিক; এটি নিশ্চিত প্রসবের তারিখ নয়। আল্ট্রাসাউন্ড বা চিকিৎসকের হিসাব আলাদা হতে পারে।"
                    : "This LMP-based due date is an estimate, not a guaranteed delivery date. Ultrasound or clinical dating may give a different estimate."}
                </p>
              </div>
            )}
          </div>
        </section>

        <aside className="quickGuide">
          <span aria-hidden="true">280</span>
          <h2>{bn ? "হিসাবের সহজ নিয়ম" : "The simple dating rule"}</h2>
          <p>
            {bn
              ? "শেষ মাসিকের প্রথম দিনের সঙ্গে ২৮০ ক্যালেন্ডার দিন বা ৪০ সপ্তাহ যোগ করে আনুমানিক তারিখ দেখানো হয়।"
              : "The estimate adds 280 calendar days, or 40 weeks, to the first day of the LMP."}
          </p>
          <small>
            {bn
              ? "এটি IVF বা এমব্রিও ট্রান্সফারের হিসাব নয়।"
              : "This version does not calculate IVF or embryo-transfer dates."}
          </small>
        </aside>
      </div>

      <section className="information">
        <article>
          <h2>{bn ? "আনুমানিক তারিখ কীভাবে হিসাব হয়" : "How the Estimated Due Date Is Calculated"}</h2>
          <p>
            {bn
              ? "শেষ মাসিকের প্রথম দিনের সঙ্গে ঠিক ২৮০ ক্যালেন্ডার দিন যোগ করে আনুমানিক প্রসবের তারিখ দেখানো হয়। এটি LMP-ভিত্তিক সাধারণ হিসাব।"
              : "The estimated due date is calculated by adding exactly 280 calendar days to the first day of the last menstrual period. This is a standard LMP-based estimate."}
          </p>
          <p>
            {bn
              ? "এই প্রচলিত LMP-ভিত্তিক হিসাবটি সাধারণত ২৮ দিনের মাসিক চক্র এবং প্রায় ১৪তম দিনে ডিম্বস্ফোটন ধরে নেয়। মাসিক অনিয়মিত হলে, LMP অনিশ্চিত হলে বা ডিম্বস্ফোটনের সময় ভিন্ন হলে হিসাবটি কম নির্ভরযোগ্য হতে পারে।"
              : "This conventional LMP-based estimate assumes a typical 28-day menstrual cycle with ovulation around day 14. Irregular cycles, an uncertain LMP or different ovulation timing can make the estimate less reliable."}
          </p>
        </article>

        <article>
          <h2>{bn ? "গর্ভকাল বুঝুন" : "Understanding Gestational Age"}</h2>
          <p>
            {bn
              ? "গর্ভকাল শেষ মাসিকের প্রথম দিন থেকে সম্পূর্ণ সপ্তাহ ও বাকি দিনে দেখানো হয়। যেমন ১৪ সপ্তাহ ও ৩ দিন মানে ১৪টি সম্পূর্ণ সপ্তাহের পর আরও ৩ দিন।"
              : "Gestational age is shown as completed weeks and remaining days counted from the first day of the LMP. For example, 14 weeks and 3 days means 14 full weeks plus 3 days."}
          </p>
        </article>

        <article>
          <h2>{bn ? "তিনটি ত্রৈমাসিক" : "Understanding the Three Trimesters"}</h2>
          <p>
            {bn
              ? "প্রথম ত্রৈমাসিক ১৩ সপ্তাহ ৬ দিন পর্যন্ত, দ্বিতীয় ত্রৈমাসিক ১৪ সপ্তাহ থেকে ২৭ সপ্তাহ ৬ দিন পর্যন্ত এবং তৃতীয় ত্রৈমাসিক ২৮ সপ্তাহ থেকে শুরু।"
              : "The first trimester runs through 13 weeks 6 days, the second from 14 weeks through 27 weeks 6 days, and the third begins at 28 weeks."}
          </p>
        </article>

        <article>
          <h2>{bn ? "LMP ও আল্ট্রাসাউন্ডের তারিখ" : "LMP Dating and Ultrasound"}</h2>
          <p>
            {bn
              ? "শেষ মাসিকের তারিখ নিশ্চিত না হলে বা মাসিক অনিয়মিত হলে LMP-ভিত্তিক হিসাব ভিন্ন হতে পারে। চিকিৎসক ক্লিনিক্যাল তথ্য ও আল্ট্রাসাউন্ড দেখে আনুমানিক তারিখ নিশ্চিত বা পরিবর্তন করতে পারেন।"
              : "LMP dating may differ when the date is uncertain or menstrual cycles are irregular. A clinician may confirm or revise the estimate using clinical information and ultrasound."}
          </p>
        </article>

        <article className="timelineArticle">
          <h2>{bn ? "গর্ভাবস্থার সময়রেখা" : "Pregnancy Timeline"}</h2>
          <div className="timeline">
            {[
              [bn ? "সপ্তাহ ০" : "Week 0", bn ? "LMP / গর্ভকাল গণনা শুরু" : "LMP / pregnancy dating starts"],
              [bn ? "০–১৩ সপ্তাহ ৬ দিন" : "Weeks 0–13 weeks 6 days", bn ? "প্রথম ত্রৈমাসিক" : "First trimester"],
              [bn ? "১৪–২৭ সপ্তাহ ৬ দিন" : "Weeks 14–27 weeks 6 days", bn ? "দ্বিতীয় ত্রৈমাসিক" : "Second trimester"],
              [bn ? "২৮ সপ্তাহ থেকে" : "Week 28 onward", bn ? "তৃতীয় ত্রৈমাসিক" : "Third trimester"],
              [bn ? "সপ্তাহ ৪০" : "Week 40", bn ? "আনুমানিক প্রসবের তারিখ" : "Estimated due date"],
            ].map(([period, label]) => (
              <div key={period}>
                <strong>{period}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="fullDisclaimer">
          <h2>{bn ? "গুরুত্বপূর্ণ তথ্য" : "Important Information"}</h2>
          <p>
            {bn
              ? "এই ক্যালকুলেটর শেষ মাসিকের প্রথম দিনের সঙ্গে ২৮০ দিন যোগ করে আনুমানিক তারিখ দেখায়। এটি সাধারণ তথ্যের জন্য; চিকিৎসা পরামর্শ দেয় না, গর্ভধারণ নিশ্চিত করে না এবং গর্ভাবস্থার স্বাস্থ্য যাচাই করে না। শেষ মাসিকের তারিখ নিশ্চিত না হলে বা মাসিক অনিয়মিত হলে হিসাব কম নির্ভরযোগ্য হতে পারে। একজন যোগ্য মাতৃসেবা চিকিৎসক বা স্বাস্থ্যকর্মী ক্লিনিক্যাল তথ্য ও আল্ট্রাসাউন্ডের ভিত্তিতে গর্ভকাল ও তারিখ নিশ্চিত বা পরিবর্তন করতে পারেন।"
              : "This calculator adds 280 days to the first day of the last menstrual period. It is intended for general information and does not provide medical advice, confirm pregnancy, or assess pregnancy health. LMP-based dating may be less reliable when the date is uncertain or menstrual cycles are irregular. A qualified maternity-care professional may confirm or revise pregnancy dating using clinical information and ultrasound."}
          </p>
        </article>

        <article className="medicalReferences">
          <h2>{bn ? "চিকিৎসা তথ্যসূত্র" : "Medical References"}</h2>
          <p>
            {bn
              ? "নিচের স্বাধীন চিকিৎসা তথ্যসূত্রগুলো LMP-ভিত্তিক তারিখ নির্ধারণ ও গর্ভাবস্থার ত্রৈমাসিক সম্পর্কে তথ্য দেয়। লিংক দেওয়ার অর্থ ACOG বা NHS Worklity-কে অনুমোদন করে—এমন নয়।"
              : "These independent medical references explain LMP-based pregnancy dating and trimester timing. Providing these links does not imply that ACOG or the NHS endorses Worklity."}
          </p>
          <ul>
            <li>
              <a
                href="https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date"
                target="_blank"
                rel="noopener noreferrer"
              >
                ACOG — Methods for Estimating the Due Date
              </a>
            </li>
            <li>
              <a
                href="https://www.acog.org/womens-health/faqs/how-your-fetus-grows-during-pregnancy"
                target="_blank"
                rel="noopener noreferrer"
              >
                ACOG — How Your Fetus Grows During Pregnancy
              </a>
            </li>
            <li>
              <a
                href="https://www.nhs.uk/pregnancy/finding-out/due-date-calculator/"
                target="_blank"
                rel="noopener noreferrer"
              >
                NHS — Pregnancy due date calculator
              </a>
            </li>
          </ul>
        </article>

        <article className="faqArticle">
          <h2>{bn ? "সাধারণ প্রশ্ন" : "Frequently Asked Questions"}</h2>

          <h3>{bn ? "কোন তারিখটি লিখব?" : "Which date should I enter?"}</h3>
          <p>{bn ? "শেষ মাসিক যেদিন শুরু হয়েছিল সেই প্রথম দিনটি লিখুন।" : "Enter the first day your last menstrual period started."}</p>

          <h3>{bn ? "তারিখটি কি নিশ্চিত প্রসবের দিন?" : "Is the result a guaranteed delivery date?"}</h3>
          <p>{bn ? "না। এটি LMP-ভিত্তিক আনুমানিক তারিখ; প্রকৃত প্রসবের দিন আলাদা হতে পারে।" : "No. It is an LMP-based estimate, and the actual delivery date may be different."}</p>

          <h3>{bn ? "আল্ট্রাসাউন্ডের তারিখ আলাদা কেন হতে পারে?" : "Why might ultrasound dating be different?"}</h3>
          <p>{bn ? "LMP অনিশ্চিত, মাসিক অনিয়মিত বা ডিম্বস্ফোটনের সময় ভিন্ন হলে হিসাব আলাদা হতে পারে।" : "The estimate may differ when the LMP is uncertain, cycles are irregular, or ovulation timing varies."}</p>

          <h3>{bn ? "IVF-এর জন্য কি এই ক্যালকুলেটর ব্যবহার করা যাবে?" : "Can I use this for IVF dating?"}</h3>
          <p>{bn ? "না। এই সংস্করণে IVF বা এমব্রিও ট্রান্সফারের তারিখ হিসাব করা হয় না।" : "No. This version does not calculate IVF or embryo-transfer dates."}</p>

          <h3>{bn ? "৪২ সপ্তাহের বেশি দেখালে কী করব?" : "What if the estimate is beyond 42 weeks?"}</h3>
          <p>{bn ? "LMP তারিখটি যাচাই করুন এবং একজন যোগ্য মাতৃসেবা চিকিৎসক বা স্বাস্থ্যকর্মীর সঙ্গে কথা বলুন।" : "Verify the LMP date and speak with a qualified maternity-care professional."}</p>
        </article>
      </section>

      <style jsx>{`
.eddPage{--navy:#111a3a;--indigo:#29377a;--violet:#7656d8;--cyan:#25a6b8;--ink:#17213f;--muted:#657089;min-height:100vh;color:var(--ink);background:radial-gradient(circle at 3% 34%,rgba(118,86,216,.07),transparent 28rem),radial-gradient(circle at 98% 60%,rgba(37,166,184,.07),transparent 28rem),#f7f8fc}.eddNav{display:flex;min-height:78px;max-width:1180px;margin:auto;padding:10px 22px;align-items:center;justify-content:space-between;border-bottom:1px solid #e5e8f1;background:rgba(255,255,255,.94);backdrop-filter:blur(14px)}:global(.eddBrand){display:flex;align-items:center;gap:10px;color:var(--navy);font-size:23px;font-weight:800;letter-spacing:-.025em}:global(.eddBrand span){display:grid;width:40px;height:40px;place-items:center;border-radius:11px;color:#fff;background:linear-gradient(145deg,var(--indigo),var(--violet));box-shadow:0 9px 22px rgba(72,58,153,.22)}.navActions,.languageSwitch{display:flex;align-items:center}.navActions{gap:14px}.languageSwitch{padding:4px;border:1px solid #dde1ed;border-radius:13px;background:#f3f5fa}.languageButton{min-height:40px;padding:9px 14px;border:0;border-radius:9px;color:#59637b;background:transparent;box-shadow:none}.languageButton[aria-pressed=true]{color:#fff;background:linear-gradient(135deg,var(--indigo),var(--violet));box-shadow:0 6px 16px rgba(63,54,147,.22)}:global(.homeLink){min-height:44px;display:inline-flex;align-items:center;color:#4d5872;font-weight:700}.eddHero{position:relative;isolation:isolate;overflow:hidden;padding:57px 20px 84px;text-align:center;background:linear-gradient(135deg,rgba(245,247,255,.98),rgba(245,240,255,.95) 58%,rgba(236,250,250,.94));border-bottom:1px solid rgba(105,91,180,.12)}.eddHero:before,.eddHero:after{position:absolute;z-index:-1;border-radius:50%;content:""}.eddHero:before{width:280px;height:280px;top:-190px;left:10%;border:1px solid rgba(118,86,216,.17);box-shadow:0 0 0 32px rgba(118,86,216,.035)}.eddHero:after{width:190px;height:190px;right:9%;bottom:-130px;background:linear-gradient(145deg,rgba(37,166,184,.15),rgba(118,86,216,.08))}.eddHero>span{display:inline-flex;padding:8px 12px;border:1px solid rgba(118,86,216,.2);border-radius:99px;color:#5541b1;background:rgba(255,255,255,.78);font-size:13px;font-weight:900;letter-spacing:.08em}.eddHero h1{max-width:850px;margin:21px auto 13px;color:var(--navy);font-size:clamp(39px,5vw,61px);line-height:1.07;letter-spacing:-.045em;text-wrap:balance}.eddHero p{max-width:720px;margin:auto;color:#5d6882;font-size:18px;line-height:1.6;text-wrap:balance}.calculatorLayout{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,2fr) minmax(260px,1fr);gap:22px;max-width:1060px;margin:-45px auto 64px;padding:0 20px;align-items:start}.calculatorCard,.quickGuide,.information article{border:1px solid rgba(76,68,143,.14);background:rgba(255,255,255,.97);box-shadow:0 22px 58px rgba(31,39,82,.1)}.calculatorCard{padding:30px;border-radius:24px}.cardIntro{display:flex;align-items:center;gap:15px;margin-bottom:24px}.cardIntro>span{display:grid;width:51px;height:51px;flex:0 0 51px;place-items:center;border-radius:15px;color:#fff;background:linear-gradient(145deg,var(--indigo),var(--violet));box-shadow:0 10px 24px rgba(69,54,154,.22);font-weight:900}.cardIntro h2{margin:0;color:var(--navy);font-size:24px}.cardIntro p{margin:4px 0 0;color:var(--muted)}form label{display:block;margin-bottom:9px;color:var(--indigo);font-weight:800}form input{width:100%;min-height:54px;padding:14px;border:1px solid #ccd3e3;border-radius:12px;color:var(--navy);background:#fff;font-size:16px;font-weight:600;box-shadow:0 3px 8px rgba(31,39,82,.04)}form input:focus{border-color:var(--violet);outline:none;box-shadow:0 0 0 4px rgba(118,86,216,.14)}form input[aria-invalid=true]{border-color:#b44c68}.inputHint{margin:9px 0 20px;color:var(--muted);font-size:14px;line-height:1.55}.formActions{display:flex;gap:10px}.calculateButton,.resetButton{min-height:48px;padding:12px 19px;border-radius:11px;font-weight:800}.calculateButton{color:#fff;background:linear-gradient(135deg,var(--indigo),var(--violet));box-shadow:0 11px 24px rgba(64,52,146,.22)}.resetButton{border:1px solid #d6dbe8;color:var(--indigo);background:#fff}.messageRegion:empty{display:none}.errorMessage,.durationNotice{margin:22px 0 0;padding:15px 17px;border:1px solid rgba(177,66,97,.2);border-left:4px solid #b74667;border-radius:12px;color:#77354a;background:#fff4f7;line-height:1.55}.resultsPanel{margin-top:26px}.dueDateResult{position:relative;overflow:hidden;padding:27px;border-radius:19px;color:#fff;background:radial-gradient(circle at 92% 5%,rgba(54,204,208,.24),transparent 29%),linear-gradient(135deg,#121b3d,#293474 63%,#5543a5);box-shadow:0 18px 38px rgba(26,31,83,.22)}.dueDateResult>span{display:block;color:#92e4e7;font-size:12px;font-weight:900;letter-spacing:.1em}.dueDateResult>strong{display:block;margin-top:10px;font-size:clamp(28px,4.2vw,41px);line-height:1.18;letter-spacing:-.025em;overflow-wrap:anywhere}.dueDateResult p{margin:14px 0 0;color:rgba(245,247,255,.82);line-height:1.5}.resultGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:12px}.resultGrid>div,.progressCard{min-width:0;padding:15px;border:1px solid #e1e4ee;border-radius:13px;background:#fafbfe}.resultGrid span,.progressHeading span{display:block;color:var(--muted);font-size:13px;font-weight:700}.resultGrid strong{display:block;margin-top:7px;color:var(--navy);line-height:1.35;overflow-wrap:anywhere}.progressCard{margin-top:10px}.progressHeading{display:flex;align-items:center;justify-content:space-between;gap:12px}.progressHeading strong{color:var(--indigo);font-size:19px}.progressTrack{height:11px;margin-top:12px;overflow:hidden;border-radius:99px;background:#e6e8f1}.progressTrack span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--violet),var(--cyan))}.durationNotice{border-color:rgba(181,119,24,.22);border-left-color:#b17820;color:#705321;background:#fff9ed}.resultDisclaimer{margin:14px 0 0;padding:15px;border:1px solid rgba(118,86,216,.15);border-radius:12px;color:#58627a;background:#f7f4ff;font-size:14px;line-height:1.55}.quickGuide{padding:27px;border-radius:22px}.quickGuide>span{display:grid;width:54px;height:54px;margin-bottom:20px;place-items:center;border-radius:16px;color:#147f91;background:#e5f7f8;font-size:18px;font-weight:900}.quickGuide h2{margin:0;color:var(--navy);font-size:23px;line-height:1.25}.quickGuide p{color:var(--muted);line-height:1.65}.quickGuide small{display:block;padding-top:14px;border-top:1px solid #e7e9f1;color:#626d84;line-height:1.5}.information{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;max-width:960px;margin:0 auto 85px;padding:0 20px}.information article{padding:28px;border-radius:20px}.information h2{margin:0 0 12px;color:var(--navy);font-size:25px;line-height:1.22;letter-spacing:-.025em}.information h3{margin:22px 0 6px;color:var(--indigo);font-size:17px}.information p{margin:0;color:var(--muted);line-height:1.7}.timelineArticle,.fullDisclaimer,.faqArticle{grid-column:1/-1}.timeline{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:9px;margin-top:20px}.timeline>div{min-width:0;padding:14px;border:1px solid #e2e5ef;border-top:3px solid var(--violet);border-radius:12px;background:#fafbfe}.timeline strong,.timeline span{display:block}.timeline strong{color:var(--indigo);font-size:13px}.timeline span{margin-top:7px;color:var(--muted);font-size:14px;line-height:1.4}.fullDisclaimer{border-left:4px solid var(--violet)!important;background:linear-gradient(135deg,rgba(118,86,216,.06),rgba(37,166,184,.045))!important}.faqArticle h3{padding-top:15px;border-top:1px solid #e7e9f1}.languageButton:focus-visible,:global(.eddBrand:focus-visible),:global(.homeLink:focus-visible),.calculateButton:focus-visible,.resetButton:focus-visible{outline:3px solid rgba(37,166,184,.58);outline-offset:3px}@media(max-width:800px){.calculatorLayout{grid-template-columns:1fr}.quickGuide{box-shadow:0 15px 35px rgba(31,39,82,.08)}.timeline{grid-template-columns:1fr 1fr}.information{grid-template-columns:1fr}.information article{grid-column:auto}.timelineArticle,.fullDisclaimer,.faqArticle{grid-column:1}}@media(max-width:560px){.eddNav{min-height:auto;padding:12px 15px;flex-wrap:wrap;gap:10px}.navActions{width:100%;justify-content:space-between}.languageButton{min-height:44px;padding:9px 12px}.eddHero{padding:38px 18px 68px}.eddHero h1{margin-top:17px;font-size:clamp(34px,10.5vw,46px)}.eddHero p{font-size:16.5px}.calculatorLayout{margin-top:-34px;padding:0 14px}.calculatorCard{padding:20px;border-radius:20px}.cardIntro{align-items:flex-start}.cardIntro h2{font-size:21px}.formActions{display:grid;grid-template-columns:1fr}.calculateButton,.resetButton{width:100%;min-height:48px}.dueDateResult{padding:22px 18px}.resultGrid{grid-template-columns:1fr}.quickGuide{padding:22px}.information{gap:14px;padding:0 14px;margin-bottom:60px}.information article{padding:22px 19px}.information h2{font-size:23px}.timeline{grid-template-columns:1fr}.timeline>div{display:grid;grid-template-columns:minmax(105px,.7fr) minmax(0,1.3fr);gap:12px;align-items:center}.timeline span{margin-top:0}}.progressExplanation{margin:11px 0 0;color:var(--muted);font-size:13px;line-height:1.55}.durationNotice strong{display:block;color:#6d4d14}.durationNotice p{margin:6px 0 0}.information article>p+p{margin-top:12px}.information .medicalReferences{grid-column:1/-1}.medicalReferences ul{margin:16px 0 0;padding-left:21px}.medicalReferences li+li{margin-top:10px}.medicalReferences a{color:var(--indigo);font-weight:750;text-decoration:underline;text-decoration-color:rgba(41,55,122,.32);text-underline-offset:3px}.medicalReferences a:hover{text-decoration-color:currentColor}:global(.medicalReferences a:focus-visible){outline:3px solid rgba(37,166,184,.58);outline-offset:3px;border-radius:3px}
      `}</style>
    </main>
  );
}
