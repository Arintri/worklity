"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const factor = {
  ft: 0.3048,
  m: 1,
  yd: 0.9144,
  in: 0.0254,
};

const f = (n, d = 4) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: d,
  }).format(n || 0);

export default function LandAreaCalculatorClient() {
  const [l, setL] = useState("");
  const [w, setW] = useState("");
  const [u, setU] = useState("ft");
  const [lang, setLang] = useState("en");

  const bn = lang === "bn";

  const r = useMemo(() => {
    if (!(l > 0 && w > 0)) return null;

    const sqm =
      Number(l) *
      Number(w) *
      factor[u] ** 2;

    const sqft = sqm * 10.7639104167;

    return {
      sqft,
      sqm,
      sqyd: sqft / 9,
      acre: sqft / 43560,
      hectare: sqm / 10000,
      decimal: sqft / 435.6,
      kathaWB: sqft / 720,
      bighaWB: sqft / 14400,
    };
  }, [l, w, u]);

  const copy = () => {
    if (!r) return;

    navigator.clipboard.writeText(
      `Area: ${f(r.sqft)} sq ft | ${f(r.sqm)} sq m | ${f(
        r.decimal
      )} Decimal | ${f(r.kathaWB)} Katha | ${f(
        r.bighaWB
      )} Bigha | ${f(r.acre, 6)} Acre`
    );
  };

  const reset = () => {
    setL("");
    setW("");
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
                border: "0",
                padding: "8px 12px",
                cursor: "pointer",
                background: lang === "en" ? "#078c4d" : "#fff",
                color: lang === "en" ? "#fff" : "#17382a",
              }}
            >
              English
            </button>

            <button
              onClick={() => setLang("bn")}
              style={{
                border: "0",
                padding: "8px 12px",
                cursor: "pointer",
                background: lang === "bn" ? "#078c4d" : "#fff",
                color: lang === "bn" ? "#fff" : "#17382a",
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
        <b>{bn ? "জমি ও ক্ষেত্রফল" : "LAND & AREA"}</b>

        <h1>
          {bn
            ? "জমির ক্ষেত্রফল ক্যালকুলেটর"
            : "Land Area Calculator"}
        </h1>

        <p>
          {bn
            ? "জমির দৈর্ঘ্য ও প্রস্থ লিখুন। সঙ্গে সঙ্গে স্কয়ার ফিট, ডেসিমেল, কাঠা, বিঘা, একর সহ বিভিন্ন এককে হিসাব দেখুন।"
            : "Enter length and width once and instantly convert land area into Square Feet, Decimal, Katha, Bigha, Acre and more."}
        </p>
      </section>

      <div className="calcWrap">
        <section className="calc">
          <div className="inputs">
            <label>
              {bn ? "দৈর্ঘ্য" : "Length"}

              <input
                type="number"
                value={l}
                onChange={(e) => setL(e.target.value)}
                placeholder={bn ? "যেমন: ৫০" : "e.g. 50"}
              />
            </label>

            <label>
              {bn ? "প্রস্থ" : "Width"}

              <input
                type="number"
                value={w}
                onChange={(e) => setW(e.target.value)}
                placeholder={bn ? "যেমন: ৩০" : "e.g. 30"}
              />
            </label>
          </div>

          <label>
            {bn ? "মাপের একক" : "Input unit"}

            <select
              value={u}
              onChange={(e) => setU(e.target.value)}
            >
              <option value="ft">
                {bn ? "ফুট" : "Feet"}
              </option>

              <option value="m">
                {bn ? "মিটার" : "Meter"}
              </option>

              <option value="yd">
                {bn ? "ইয়ার্ড" : "Yard"}
              </option>

              <option value="in">
                {bn ? "ইঞ্চি" : "Inch"}
              </option>
            </select>
          </label>

          <div className="result">
            <small>
              {bn ? "হিসাব করা ক্ষেত্রফল" : "CALCULATED AREA"}
            </small>

            <h2>
              {r
                ? `${f(r.sqft)} ${bn ? "স্কয়ার ফিট" : "sq ft"}`
                : bn
                ? "দৈর্ঘ্য ও প্রস্থ লিখুন"
                : "Enter length & width"}
            </h2>

            {r && (
              <div className="results">
                <div>
                  {bn ? "স্কয়ার মিটার" : "Square Meter"}
                  <b>{f(r.sqm)}</b>
                </div>

                <div>
                  {bn ? "স্কয়ার ইয়ার্ড" : "Square Yard"}
                  <b>{f(r.sqyd)}</b>
                </div>

                <div>
                  {bn ? "ডেসিমেল / ডিসিমিল" : "Decimal / Disimil"}
                  <b>{f(r.decimal)}</b>
                </div>

                <div>
                  {bn
                    ? "কাঠা (পশ্চিমবঙ্গ)"
                    : "Katha (West Bengal)"}
                  <b>{f(r.kathaWB)}</b>
                </div>

                <div>
                  {bn
                    ? "বিঘা (পশ্চিমবঙ্গ)"
                    : "Bigha (West Bengal)"}
                  <b>{f(r.bighaWB)}</b>
                </div>

                <div>
                  {bn ? "একর" : "Acre"}
                  <b>{f(r.acre, 6)}</b>
                </div>

                <div>
                  {bn ? "হেক্টর" : "Hectare"}
                  <b>{f(r.hectare, 6)}</b>
                </div>
              </div>
            )}
          </div>

          <div className="buttons">
            <button
              onClick={copy}
              disabled={!r}
            >
              {bn ? "ফলাফল কপি করুন" : "Copy result"}
            </button>

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
              ? "পশ্চিমবঙ্গের জমির প্রচলিত একক"
              : "West Bengal Land Units"}
          </h3>

          <p>
            {bn
              ? "এই ক্যালকুলেটরে পশ্চিমবঙ্গে প্রচলিত নিচের হিসাব ব্যবহার করা হয়েছে:"
              : "For this calculator, the commonly used West Bengal conversion is:"}
          </p>

          <p>
            <b>
              {bn
                ? "১ কাঠা = ৭২০ স্কয়ার ফিট"
                : "1 Katha = 720 sq ft"}
            </b>
          </p>

          <p>
            <b>
              {bn
                ? "১ বিঘা = ২০ কাঠা = ১৪,৪০০ স্কয়ার ফিট"
                : "1 Bigha = 20 Katha = 14,400 sq ft"}
            </b>
          </p>

          <p>
            <b>
              {bn
                ? "১ ডেসিমেল / ডিসিমিল = ৪৩৫.৬ স্কয়ার ফিট"
                : "1 Decimal / Disimil = 435.6 sq ft"}
            </b>
          </p>

          <p>
            <small>
              {bn
                ? "নোট: কাঠা ও বিঘার মাপ অঞ্চলভেদে আলাদা হতে পারে। জমির সরকারি বা আইনি কাজের ক্ষেত্রে স্থানীয় সরকারি রেকর্ডের মাপ যাচাই করুন।"
                : "Note: Traditional land units such as Katha and Bigha can vary by region and local practice. Verify local records for legal or official land transactions."}
            </small>
          </p>
        </aside>
      </div>

      <section className="explain">
        <h2>
          {bn
            ? "জমির ক্ষেত্রফল রূপান্তর টেবিল"
            : "Land Area Conversion Table"}
        </h2>

        <p>
          {bn
            ? "জমির ক্ষেত্রফলের প্রচলিত এককগুলোর দ্রুত তুলনার জন্য নিচের রূপান্তরগুলো ব্যবহার করুন।"
            : "Use these common conversions for a quick comparison of land area units."}
        </p>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "20px 0",
              minWidth: "520px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "13px",
                    textAlign: "left",
                    border: "1px solid var(--line)",
                    background: "var(--s)",
                  }}
                >
                  {bn ? "জমির একক" : "Land unit"}
                </th>
                <th
                  style={{
                    padding: "13px",
                    textAlign: "left",
                    border: "1px solid var(--line)",
                    background: "var(--s)",
                  }}
                >
                  {bn ? "রূপান্তর" : "Conversion"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "13px", border: "1px solid var(--line)" }}>
                  {bn ? "১ ডেসিমেল / ডিসিমিল" : "1 Decimal / Disimil"}
                </td>
                <td style={{ padding: "13px", border: "1px solid var(--line)" }}>
                  {bn ? "৪৩৫.৬ স্কয়ার ফিট" : "435.6 sq ft"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "13px", border: "1px solid var(--line)" }}>
                  {bn
                    ? "১ কাঠা (পশ্চিমবঙ্গে প্রচলিত)"
                    : "1 Katha (commonly used in West Bengal)"}
                </td>
                <td style={{ padding: "13px", border: "1px solid var(--line)" }}>
                  {bn ? "৭২০ স্কয়ার ফিট" : "720 sq ft"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "13px", border: "1px solid var(--line)" }}>
                  {bn
                    ? "১ বিঘা (পশ্চিমবঙ্গে প্রচলিত)"
                    : "1 Bigha (commonly used in West Bengal)"}
                </td>
                <td style={{ padding: "13px", border: "1px solid var(--line)" }}>
                  {bn
                    ? "১৪,৪০০ স্কয়ার ফিট = ২০ কাঠা"
                    : "14,400 sq ft = 20 Katha"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "13px", border: "1px solid var(--line)" }}>
                  {bn ? "১ একর" : "1 Acre"}
                </td>
                <td style={{ padding: "13px", border: "1px solid var(--line)" }}>
                  {bn ? "৪৩,৫৬০ স্কয়ার ফিট" : "43,560 sq ft"}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "13px", border: "1px solid var(--line)" }}>
                  {bn ? "১ হেক্টর" : "1 Hectare"}
                </td>
                <td style={{ padding: "13px", border: "1px solid var(--line)" }}>
                  {bn ? "প্রায় ১,০৭,৬৩৯.১ স্কয়ার ফিট" : "Approximately 107,639.1 sq ft"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <small>
            {bn
              ? "নোট: কাঠা ও বিঘার মাপ অঞ্চল ও স্থানীয় রীতি অনুযায়ী ভিন্ন হতে পারে।"
              : "Note: Katha and Bigha measurements can vary by region and local practice."}
          </small>
        </p>

        <h2>{bn ? "উদাহরণসহ হিসাব" : "Example Calculation"}</h2>

        <p>
          {bn ? (
            <>
              দৈর্ঘ্য = ৫০ ফুট এবং প্রস্থ = ৩০ ফুট হলে,
              <b> ক্ষেত্রফল = ৫০ × ৩০ = ১,৫০০ স্কয়ার ফিট</b>।
            </>
          ) : (
            <>
              If Length = 50 ft and Width = 30 ft,
              <b> Area = 50 × 30 = 1,500 sq ft</b>.
            </>
          )}
        </p>

        <div className="results">
          <div>
            {bn ? "ডেসিমেল / ডিসিমিল" : "Decimal / Disimil"}
            <b>{bn ? "প্রায় ৩.৪৪৩৫" : "Approximately 3.4435"}</b>
          </div>
          <div>
            {bn ? "কাঠা (পশ্চিমবঙ্গ)" : "Katha (West Bengal)"}
            <b>{bn ? "প্রায় ২.০৮৩৩" : "Approximately 2.0833"}</b>
          </div>
          <div>
            {bn ? "বিঘা (পশ্চিমবঙ্গ)" : "Bigha (West Bengal)"}
            <b>{bn ? "প্রায় ০.১০৪২" : "Approximately 0.1042"}</b>
          </div>
        </div>

        <h2>
          {bn
            ? "জমির ক্ষেত্রফল কীভাবে হিসাব করবেন"
            : "How to Calculate Land Area"}
        </h2>

        <p>
          {bn ? (
            <>
              আয়তাকার জমির জন্য <b>ক্ষেত্রফল = দৈর্ঘ্য × প্রস্থ</b>। সঠিক
              ফল পেতে দৈর্ঘ্য ও প্রস্থ—দুটিই একই এককে মাপুন।
            </>
          ) : (
            <>
              For a rectangular plot, <b>Area = Length × Width</b>. Measure
              both length and width in the same unit to get the correct result.
            </>
          )}
        </p>

        <h2>{bn ? "অনিয়মিত আকৃতির জমি" : "Irregular Land"}</h2>

        <p>
          {bn
            ? "এই ক্যালকুলেটর সরাসরি আয়তাকার জমির ক্ষেত্রফল হিসাব করে। অনিয়মিত আকৃতির জমিকে সহজ কয়েকটি আকৃতিতে ভাগ করে আলাদাভাবে হিসাব করা যেতে পারে। গুরুত্বপূর্ণ সম্পত্তি-সংক্রান্ত কাজে যোগ্য সার্ভেয়ার বা সরকারি জমি পরিমাপের সহায়তা নিন।"
            : "This calculator directly calculates rectangular plots. For an irregular plot, divide the land into simpler shapes and calculate each part separately. For important property matters, use a qualified surveyor or an official land measurement."}
        </p>

        <h2>{bn ? "সাধারণ প্রশ্ন" : "Frequently Asked Questions"}</h2>

        <h3>
          {bn
            ? "পশ্চিমবঙ্গে ১ কাঠায় কত স্কয়ার ফিট?"
            : "How many square feet are in 1 Katha in West Bengal?"}
        </h3>
        <p>
          {bn
            ? "পশ্চিমবঙ্গে প্রচলিত হিসাবে ১ কাঠা = ৭২০ স্কয়ার ফিট।"
            : "In the commonly used West Bengal system, 1 Katha equals 720 square feet."}
        </p>

        <h3>
          {bn
            ? "পশ্চিমবঙ্গে ১ বিঘায় কত কাঠা?"
            : "How many Katha are in 1 Bigha in West Bengal?"}
        </h3>
        <p>
          {bn
            ? "পশ্চিমবঙ্গে প্রচলিত হিসাবে ১ বিঘা = ২০ কাঠা।"
            : "In the commonly used West Bengal system, 1 Bigha equals 20 Katha."}
        </p>

        <h3>
          {bn
            ? "১ ডেসিমেলে কত স্কয়ার ফিট?"
            : "How many square feet are in 1 Decimal?"}
        </h3>
        <p>
          {bn
            ? "১ ডেসিমেল বা ডিসিমিল = ৪৩৫.৬ স্কয়ার ফিট।"
            : "1 Decimal, also called Disimil, equals 435.6 square feet."}
        </p>

        <h3>
          {bn
            ? "স্থানভেদে কাঠা ও বিঘার মাপ কি আলাদা হতে পারে?"
            : "Can Katha and Bigha measurements vary by location?"}
        </h3>
        <p>
          {bn
            ? "হ্যাঁ। অঞ্চল ও স্থানীয় রীতি অনুযায়ী কাঠা ও বিঘার মাপ ভিন্ন হতে পারে, তাই স্থানীয় মাপ যাচাই করুন।"
            : "Yes. Their sizes can vary by region and local practice, so check the conversion used in your location."}
        </p>

        <h3>
          {bn
            ? "সরকারি জমি রেজিস্ট্রেশনের জন্য কি এই ক্যালকুলেটর ব্যবহার করা যাবে?"
            : "Can I use this calculator for official land registration?"}
        </h3>
        <p>
          {bn
            ? "এটি সাধারণ হিসাব ও আনুমানিক রূপান্তরের জন্য। রেজিস্ট্রেশন বা গুরুত্বপূর্ণ সম্পত্তি-সংক্রান্ত কাজে সরকারি রেকর্ড এবং যোগ্য পেশাদারের পরিমাপ ব্যবহার করুন।"
            : "Use it for general calculations and estimates. For registration or important property matters, rely on official records and measurements from a qualified professional."}
        </p>
      </section>
    </main>
  );
}
