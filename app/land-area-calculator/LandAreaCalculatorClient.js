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
    <main className="landPage">
      <header className="landNav">
        <Link className="landBrand" href="/">
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

          <Link className="homeLink" href="/">
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
        <section className="calc calculatorCard">
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

          <div className="result" role="status" aria-live="polite">
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

        <aside className="unitGuide">
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

        <div className="tableScroll" tabIndex="0">
          <table className="conversionTable">
            <thead>
              <tr>
                <th>
                  {bn ? "জমির একক" : "Land unit"}
                </th>
                <th>
                  {bn ? "রূপান্তর" : "Conversion"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {bn ? "১ ডেসিমেল / ডিসিমিল" : "1 Decimal / Disimil"}
                </td>
                <td>
                  {bn ? "৪৩৫.৬ স্কয়ার ফিট" : "435.6 sq ft"}
                </td>
              </tr>
              <tr>
                <td>
                  {bn
                    ? "১ কাঠা (পশ্চিমবঙ্গে প্রচলিত)"
                    : "1 Katha (commonly used in West Bengal)"}
                </td>
                <td>
                  {bn ? "৭২০ স্কয়ার ফিট" : "720 sq ft"}
                </td>
              </tr>
              <tr>
                <td>
                  {bn
                    ? "১ বিঘা (পশ্চিমবঙ্গে প্রচলিত)"
                    : "1 Bigha (commonly used in West Bengal)"}
                </td>
                <td>
                  {bn
                    ? "১৪,৪০০ স্কয়ার ফিট = ২০ কাঠা"
                    : "14,400 sq ft = 20 Katha"}
                </td>
              </tr>
              <tr>
                <td>
                  {bn ? "১ একর" : "1 Acre"}
                </td>
                <td>
                  {bn ? "৪৩,৫৬০ স্কয়ার ফিট" : "43,560 sq ft"}
                </td>
              </tr>
              <tr>
                <td>
                  {bn ? "১ হেক্টর" : "1 Hectare"}
                </td>
                <td>
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

      <style jsx>{`
        .landPage {
          --navy: #111a3a;
          --indigo: #29377a;
          --violet: #7656d8;
          --cyan: #25a6b8;
          --ink: #17213f;
          --muted: #657089;
          --line: #e1e4ee;
          --s: #f4f5fb;
          min-width: 0;
          min-height: 100vh;
          overflow-x: hidden;
          color: var(--ink);
          background:
            radial-gradient(circle at 2% 32%, rgba(118, 86, 216, 0.07), transparent 28rem),
            radial-gradient(circle at 98% 62%, rgba(37, 166, 184, 0.07), transparent 28rem),
            #f7f8fc;
        }

        .landNav {
          position: relative;
          z-index: 10;
          display: flex;
          min-height: 78px;
          max-width: 1180px;
          margin: auto;
          padding: 10px 22px;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e5e8f1;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(14px);
        }

        :global(.landBrand) {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--navy);
          font-size: 23px;
          font-weight: 800;
          letter-spacing: -0.025em;
        }

        :global(.landBrand span) {
          display: grid;
          width: 40px;
          height: 40px;
          place-items: center;
          border-radius: 11px;
          color: #fff;
          background: linear-gradient(145deg, var(--indigo), var(--violet));
          box-shadow: 0 9px 22px rgba(72, 58, 153, 0.22);
        }

        .navActions,
        .languageSwitch {
          display: flex;
          align-items: center;
        }

        .navActions {
          gap: 14px;
        }

        .languageSwitch {
          padding: 4px;
          border: 1px solid #dde1ed;
          border-radius: 13px;
          background: #f3f5fa;
        }

        .languageButton {
          min-height: 40px;
          padding: 9px 14px;
          border: 0;
          border-radius: 9px;
          color: #59637b;
          background: transparent;
          box-shadow: none;
          cursor: pointer;
        }

        .languageButton[aria-pressed="true"] {
          color: #fff;
          background: linear-gradient(135deg, var(--indigo), var(--violet));
          box-shadow: 0 6px 16px rgba(63, 54, 147, 0.22);
        }

        :global(.homeLink) {
          display: inline-flex;
          min-height: 44px;
          align-items: center;
          color: #4d5872;
          font-weight: 700;
        }

        .toolHero {
          position: relative;
          isolation: isolate;
          padding: 48px 20px 76px;
          overflow: hidden;
          border-bottom: 1px solid rgba(105, 91, 180, 0.12);
          text-align: center;
          background: linear-gradient(135deg, rgba(245, 247, 255, 0.98), rgba(245, 240, 255, 0.95) 58%, rgba(236, 250, 250, 0.94));
        }

        .toolHero::before,
        .toolHero::after {
          position: absolute;
          z-index: -1;
          border-radius: 50%;
          content: "";
        }

        .toolHero::before {
          width: 280px;
          height: 280px;
          top: -205px;
          left: 10%;
          border: 1px solid rgba(118, 86, 216, 0.17);
          box-shadow: 0 0 0 32px rgba(118, 86, 216, 0.035);
        }

        .toolHero::after {
          width: 185px;
          height: 185px;
          right: 9%;
          bottom: -132px;
          background: linear-gradient(145deg, rgba(37, 166, 184, 0.15), rgba(118, 86, 216, 0.08));
        }

        .toolHero > b {
          display: inline-flex;
          padding: 8px 12px;
          border: 1px solid rgba(118, 86, 216, 0.2);
          border-radius: 99px;
          color: #5541b1;
          background: rgba(255, 255, 255, 0.78);
          font-size: 13px;
          letter-spacing: 0.08em;
        }

        .toolHero h1 {
          max-width: 820px;
          margin: 18px auto 11px;
          color: var(--navy);
          font-size: clamp(39px, 5vw, 59px);
          line-height: 1.07;
          letter-spacing: -0.045em;
          text-wrap: balance;
        }

        .toolHero p {
          max-width: 740px;
          margin: auto;
          color: #5d6882;
          font-size: 17.5px;
          line-height: 1.6;
          text-wrap: balance;
        }

        .calcWrap {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(270px, 0.9fr);
          gap: 22px;
          max-width: 1080px;
          margin: -42px auto 58px;
          padding: 0 20px;
          align-items: start;
        }

        .calculatorCard,
        .unitGuide,
        .explain {
          min-width: 0;
          border: 1px solid rgba(76, 68, 143, 0.14);
          background: rgba(255, 255, 255, 0.97);
          box-shadow: 0 22px 58px rgba(31, 39, 82, 0.1);
        }

        .calculatorCard {
          padding: 29px;
          border-radius: 24px;
        }

        .inputs {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .calculatorCard label {
          display: block;
          margin-bottom: 18px;
          color: var(--indigo);
          font-weight: 800;
        }

        .calculatorCard input,
        .calculatorCard select {
          width: 100%;
          min-height: 54px;
          margin-top: 9px;
          padding: 13px 14px;
          border: 1px solid #ccd3e3;
          border-radius: 12px;
          color: var(--navy);
          background: #fff;
          font-size: 16px;
          font-weight: 650;
          box-shadow: 0 3px 8px rgba(31, 39, 82, 0.04);
        }

        .calculatorCard input:focus,
        .calculatorCard select:focus {
          border-color: var(--violet);
          outline: none;
          box-shadow: 0 0 0 4px rgba(118, 86, 216, 0.14);
        }

        .result {
          position: relative;
          padding: 25px;
          overflow: hidden;
          border-radius: 19px;
          color: #fff;
          background:
            radial-gradient(circle at 92% 5%, rgba(54, 204, 208, 0.24), transparent 29%),
            linear-gradient(135deg, #121b3d, #293474 63%, #5543a5);
          box-shadow: 0 18px 38px rgba(26, 31, 83, 0.22);
        }

        .result > small {
          color: #92e4e7;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.1em;
        }

        .result > h2 {
          margin: 9px 0 0;
          color: #fff;
          font-size: clamp(27px, 4vw, 39px);
          line-height: 1.2;
          overflow-wrap: anywhere;
        }

        .results {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 20px;
        }

        .result .results > div {
          min-width: 0;
          padding: 14px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 12px;
          color: rgba(239, 242, 255, 0.76);
          background: rgba(255, 255, 255, 0.075);
          font-size: 13px;
          line-height: 1.35;
        }

        .results b {
          display: block;
          margin-top: 7px;
          color: inherit;
          font-size: 18px;
          line-height: 1.25;
          overflow-wrap: anywhere;
        }

        .result .results b {
          color: #fff;
        }

        .buttons {
          display: flex;
          gap: 10px;
          margin-top: 16px;
        }

        .buttons button {
          min-height: 48px;
          padding: 12px 19px;
          border: 0;
          border-radius: 11px;
          color: #fff;
          background: linear-gradient(135deg, var(--indigo), var(--violet));
          box-shadow: 0 11px 24px rgba(64, 52, 146, 0.22);
          font-weight: 800;
          cursor: pointer;
        }

        .buttons button:disabled {
          opacity: 0.48;
          cursor: not-allowed;
          box-shadow: none;
        }

        .buttons .reset {
          border: 1px solid #d6dbe8;
          color: var(--indigo);
          background: #fff;
          box-shadow: none;
        }

        .unitGuide {
          padding: 26px;
          border-radius: 22px;
        }

        .unitGuide::before {
          display: grid;
          width: 52px;
          height: 52px;
          margin-bottom: 18px;
          place-items: center;
          border-radius: 15px;
          color: #147f91;
          background: #e5f7f8;
          font-size: 22px;
          font-weight: 900;
          content: "⌗";
        }

        .unitGuide h3 {
          margin: 0;
          color: var(--navy);
          font-size: 23px;
          line-height: 1.25;
        }

        .unitGuide p {
          margin: 13px 0 0;
          color: var(--muted);
          line-height: 1.58;
        }

        .unitGuide p:has(> b) {
          padding: 11px 12px;
          border: 1px solid #e3e6ef;
          border-radius: 10px;
          color: var(--indigo);
          background: #fafbfe;
        }

        .unitGuide small,
        .explain small {
          color: #68728a;
          line-height: 1.55;
        }

        .unitGuide p:last-child {
          padding: 13px 14px;
          border-left: 4px solid var(--violet);
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(118, 86, 216, 0.07), rgba(37, 166, 184, 0.05));
        }

        .explain {
          max-width: 960px;
          margin: 0 auto 80px;
          padding: 34px;
          border-radius: 24px;
        }

        .explain h2 {
          margin: 38px 0 12px;
          padding-top: 34px;
          border-top: 1px solid var(--line);
          color: var(--navy);
          font-size: clamp(25px, 3vw, 32px);
          line-height: 1.2;
          letter-spacing: -0.025em;
        }

        .explain h2:first-child {
          margin-top: 0;
          padding-top: 0;
          border-top: 0;
        }

        .explain h3 {
          margin: 23px 0 7px;
          color: var(--indigo);
          font-size: 18px;
          line-height: 1.4;
        }

        .explain p {
          margin: 0 0 13px;
          color: var(--muted);
          line-height: 1.72;
        }

        .tableScroll {
          max-width: 100%;
          margin: 20px 0;
          overflow-x: auto;
          border: 1px solid var(--line);
          border-radius: 14px;
          background: #fff;
        }

        .conversionTable {
          width: 100%;
          min-width: 520px;
          border-collapse: collapse;
        }

        .conversionTable th,
        .conversionTable td {
          padding: 14px 15px;
          border-bottom: 1px solid var(--line);
          text-align: left;
        }

        .conversionTable th {
          color: var(--indigo);
          background: var(--s);
          font-size: 13px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .conversionTable tr:last-child td {
          border-bottom: 0;
        }

        .explain > .results {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin: 20px 0 4px;
        }

        .explain > .results > div {
          min-width: 0;
          padding: 17px;
          border: 1px solid #e1e4ee;
          border-top: 3px solid var(--violet);
          border-radius: 13px;
          color: var(--muted);
          background: #fafbfe;
        }

        .explain > .results b {
          color: var(--navy);
          font-size: 17px;
        }

        .languageButton:focus-visible,
        :global(.landBrand:focus-visible),
        :global(.homeLink:focus-visible),
        .buttons button:focus-visible,
        .tableScroll:focus-visible {
          outline: 3px solid rgba(37, 166, 184, 0.58);
          outline-offset: 3px;
        }

        @media (max-width: 820px) {
          .calcWrap {
            grid-template-columns: 1fr;
          }

          .unitGuide {
            box-shadow: 0 15px 35px rgba(31, 39, 82, 0.08);
          }
        }

        @media (max-width: 600px) {
          .landNav {
            min-height: auto;
            padding: 12px 15px;
            flex-wrap: wrap;
            gap: 10px;
          }

          .navActions {
            width: 100%;
            justify-content: space-between;
          }

          .languageButton {
            min-height: 44px;
            padding: 9px 12px;
          }

          .toolHero {
            padding: 36px 18px 65px;
          }

          .toolHero h1 {
            margin-top: 16px;
            font-size: clamp(34px, 10.5vw, 46px);
          }

          .toolHero p {
            font-size: 16.5px;
          }

          .calcWrap {
            margin-top: -34px;
            padding: 0 14px;
          }

          .calculatorCard {
            padding: 20px;
            border-radius: 20px;
          }

          .inputs,
          .results,
          .explain > .results {
            grid-template-columns: 1fr;
          }

          .result {
            padding: 22px 18px;
          }

          .buttons {
            display: grid;
            grid-template-columns: 1fr;
          }

          .buttons button {
            width: 100%;
          }

          .unitGuide {
            padding: 22px;
          }

          .explain {
            margin: 0 14px 60px;
            padding: 23px 19px;
            border-radius: 20px;
          }

          .explain h2 {
            margin-top: 31px;
            padding-top: 28px;
            font-size: 24px;
          }

          .conversionTable {
            min-width: 500px;
          }
        }
      `}</style>
    </main>
  );
}
