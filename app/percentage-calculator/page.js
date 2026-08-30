"use client";

import { useState } from "react";
import Link from "next/link";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 6,
  }).format(Number.isFinite(n) ? n : 0);

export default function PercentageCalculator() {
  const [lang, setLang] = useState("en");

  const [p1, setP1] = useState("");
  const [n1, setN1] = useState("");

  const [n2, setN2] = useState("");
  const [total2, setTotal2] = useState("");

  const [old3, setOld3] = useState("");
  const [new3, setNew3] = useState("");

  const bn = lang === "bn";

  const result1 =
    Number(p1) >= 0 && Number(n1) >= 0 && p1 !== "" && n1 !== ""
      ? (Number(p1) / 100) * Number(n1)
      : null;

  const result2 =
    Number(total2) !== 0 && n2 !== "" && total2 !== ""
      ? (Number(n2) / Number(total2)) * 100
      : null;

  const result3 =
    Number(old3) !== 0 && old3 !== "" && new3 !== ""
      ? ((Number(new3) - Number(old3)) / Math.abs(Number(old3))) * 100
      : null;

  const reset = () => {
    setP1("");
    setN1("");
    setN2("");
    setTotal2("");
    setOld3("");
    setNew3("");
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
                background: lang === "en" ? "#078c4d" : "#fff",
                color: lang === "en" ? "#fff" : "#17382a",
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
                background: lang === "bn" ? "#078c4d" : "#fff",
                color: lang === "bn" ? "#fff" : "#17382a",
              }}
            >
              বাংলা
            </button>
          </div>

          <Link href="/">{bn ? "← হোম" : "← Home"}</Link>
        </div>
      </header>

      <section className="toolHero">
        <b>{bn ? "টাকা ও হিসাব" : "FINANCE"}</b>

        <h1>{bn ? "শতাংশ ক্যালকুলেটর" : "Percentage Calculator"}</h1>

        <p>
          {bn
            ? "সহজে শতাংশ, মোটের কত শতাংশ এবং শতাংশ বৃদ্ধি বা হ্রাস হিসাব করুন।"
            : "Calculate percentages, percentage of a total, and percentage increase or decrease."}
        </p>
      </section>

      <div className="calcWrap">
        <section className="calc">
          <h2>
            {bn ? "কোনো সংখ্যার শতাংশ বের করুন" : "Find a percentage of a number"}
          </h2>

          <p>
            {bn
              ? "উদাহরণ: ৫০০-এর ২০% কত?"
              : "Example: What is 20% of 500?"}
          </p>

          <div className="inputs">
            <label>
              {bn ? "শতাংশ (%)" : "Percentage (%)"}
              <input
                type="number"
                value={p1}
                onChange={(e) => setP1(e.target.value)}
                placeholder="20"
              />
            </label>

            <label>
              {bn ? "সংখ্যা" : "Number"}
              <input
                type="number"
                value={n1}
                onChange={(e) => setN1(e.target.value)}
                placeholder="500"
              />
            </label>
          </div>

          <div className="result">
            <small>{bn ? "ফলাফল" : "RESULT"}</small>
            <h2>{result1 !== null ? fmt(result1) : "—"}</h2>
          </div>

          <hr style={{ margin: "32px 0", border: 0, borderTop: "1px solid #dfe9e3" }} />

          <h2>
            {bn ? "একটি সংখ্যা মোটের কত শতাংশ?" : "What percentage is one number of another?"}
          </h2>

          <p>
            {bn
              ? "উদাহরণ: ৫০ হলো ২০০-এর কত শতাংশ?"
              : "Example: 50 is what percent of 200?"}
          </p>

          <div className="inputs">
            <label>
              {bn ? "সংখ্যা" : "Number"}
              <input
                type="number"
                value={n2}
                onChange={(e) => setN2(e.target.value)}
                placeholder="50"
              />
            </label>

            <label>
              {bn ? "মোট" : "Total"}
              <input
                type="number"
                value={total2}
                onChange={(e) => setTotal2(e.target.value)}
                placeholder="200"
              />
            </label>
          </div>

          <div className="result">
            <small>{bn ? "ফলাফল" : "RESULT"}</small>
            <h2>{result2 !== null ? `${fmt(result2)}%` : "—"}</h2>
          </div>

          <hr style={{ margin: "32px 0", border: 0, borderTop: "1px solid #dfe9e3" }} />

          <h2>
            {bn ? "শতাংশ বৃদ্ধি বা হ্রাস" : "Percentage increase or decrease"}
          </h2>

          <p>
            {bn
              ? "পুরনো এবং নতুন মান লিখুন।"
              : "Enter the old value and new value."}
          </p>

          <div className="inputs">
            <label>
              {bn ? "পুরনো মান" : "Old value"}
              <input
                type="number"
                value={old3}
                onChange={(e) => setOld3(e.target.value)}
                placeholder="100"
              />
            </label>

            <label>
              {bn ? "নতুন মান" : "New value"}
              <input
                type="number"
                value={new3}
                onChange={(e) => setNew3(e.target.value)}
                placeholder="125"
              />
            </label>
          </div>

          <div className="result">
            <small>{bn ? "ফলাফল" : "RESULT"}</small>

            <h2>
              {result3 !== null
                ? `${fmt(Math.abs(result3))}% ${
                    result3 > 0
                      ? bn
                        ? "বৃদ্ধি"
                        : "increase"
                      : result3 < 0
                      ? bn
                        ? "হ্রাস"
                        : "decrease"
                      : bn
                      ? "পরিবর্তন নেই"
                      : "no change"
                  }`
                : "—"}
            </h2>
          </div>

          <div className="buttons" style={{ marginTop: "24px" }}>
            <button className="reset" onClick={reset}>
              {bn ? "সব মুছুন" : "Reset all"}
            </button>
          </div>
        </section>

        <aside>
          <h3>{bn ? "শতাংশ কী?" : "What is a percentage?"}</h3>

          <p>
            {bn
              ? "শতাংশ মানে প্রতি ১০০-তে কত। যেমন, ২০% মানে প্রতি ১০০-তে ২০।"
              : "A percentage represents a value out of 100. For example, 20% means 20 out of every 100."}
          </p>

          <p>
            <b>{bn ? "উদাহরণ:" : "Example:"}</b>
          </p>

          <p>
            {bn
              ? "৫০০-এর ২০% = ১০০"
              : "20% of 500 = 100"}
          </p>

          <p>
            {bn
              ? "৫০ হলো ২০০-এর ২৫%"
              : "50 is 25% of 200"}
          </p>
        </aside>
      </div>

      <section className="explain">
        <h2>
          {bn ? "শতাংশ কীভাবে হিসাব করবেন?" : "How to calculate percentage"}
        </h2>

        <p>
          {bn
            ? "কোনো সংখ্যার একটি নির্দিষ্ট শতাংশ বের করতে সংখ্যাটিকে শতাংশ দিয়ে গুণ করে ১০০ দিয়ে ভাগ করুন।"
            : "To find a percentage of a number, multiply the number by the percentage and divide by 100."}
        </p>

        <p>
          <b>
            {bn
              ? "সূত্র: (শতাংশ × সংখ্যা) ÷ ১০০"
              : "Formula: (Percentage × Number) ÷ 100"}
          </b>
        </p>
      </section>
    </main>
  );
}
