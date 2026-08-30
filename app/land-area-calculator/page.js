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

export default function Page() {
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
            ? "জমির ক্ষেত্রফল কীভাবে হিসাব করা হয়?"
            : "How is land area calculated?"}
        </h2>

        <p>
          {bn ? (
            <>
              আয়তাকার জমির সাধারণ হিসাব:
              <b> ক্ষেত্রফল = দৈর্ঘ্য × প্রস্থ</b>। এরপর Worklity
              সেই ক্ষেত্রফলকে বিভিন্ন জমির এককে পরিবর্তন করে দেখায়।
            </>
          ) : (
            <>
              For a rectangular plot:
              <b> Area = Length × Width</b>. Worklity then
              automatically converts the calculated area into
              commonly used land units.
            </>
          )}
        </p>

        <h2>
          {bn
            ? "পশ্চিমবঙ্গে কাঠা ও বিঘার হিসাব"
            : "West Bengal Katha & Bigha Conversion"}
        </h2>

        <p>
          {bn
            ? "পশ্চিমবঙ্গে প্রচলিত হিসাবে ১ কাঠা = ৭২০ স্কয়ার ফিট এবং ২০ কাঠা = ১ বিঘা। অর্থাৎ ১ বিঘা = ১৪,৪০০ স্কয়ার ফিট।"
            : "In the commonly used West Bengal system, 1 Katha is calculated as 720 square feet and 20 Katha make 1 Bigha. This means 1 Bigha equals 14,400 square feet."}
        </p>
      </section>
    </main>
  );
}
