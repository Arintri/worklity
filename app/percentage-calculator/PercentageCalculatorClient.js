"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ToolTabs from "../components/ToolTabs";
import TrustLinks from "../components/TrustLinks";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 6,
  }).format(Number.isFinite(n) ? n : 0);

export default function PercentageCalculatorClient() {
  const [lang, setLang] = useState("en");

  const [p1, setP1] = useState("");
  const [n1, setN1] = useState("");

  const [n2, setN2] = useState("");
  const [total2, setTotal2] = useState("");

  const [old3, setOld3] = useState("");
  const [new3, setNew3] = useState("");

  const bn = lang === "bn";

  const hasValues1 = p1 !== "" && n1 !== "";
  const invalid1 =
    hasValues1 &&
    (!Number.isFinite(Number(p1)) ||
      !Number.isFinite(Number(n1)) ||
      !Number.isFinite((Number(p1) / 100) * Number(n1)));

  const result1 =
    Number(p1) >= 0 &&
    Number(n1) >= 0 &&
    hasValues1 &&
    !invalid1
      ? (Number(p1) / 100) * Number(n1)
      : null;

  const hasValues2 = n2 !== "" && total2 !== "";
  const invalid2 =
    hasValues2 &&
    (!Number.isFinite(Number(n2)) ||
      !Number.isFinite(Number(total2)) ||
      (Number(total2) !== 0 &&
        !Number.isFinite((Number(n2) / Number(total2)) * 100)));
  const zeroTotal2 = hasValues2 && Number(total2) === 0;

  const result2 =
    Number(total2) !== 0 && hasValues2 && !invalid2
      ? (Number(n2) / Number(total2)) * 100
      : null;

  const hasValues3 = old3 !== "" && new3 !== "";
  const invalid3 =
    hasValues3 &&
    (!Number.isFinite(Number(old3)) ||
      !Number.isFinite(Number(new3)) ||
      (Number(old3) !== 0 &&
        !Number.isFinite(
          ((Number(new3) - Number(old3)) / Math.abs(Number(old3))) * 100
        )));
  const zeroOld3 = hasValues3 && Number(old3) === 0;

  const result3 =
    Number(old3) !== 0 && hasValues3 && !invalid3
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
          <Image src="/brand/worklity-mark.png" alt="" width={40} height={40} style={{ display: "block", flex: "0 0 40px", width: 40, height: 40, objectFit: "contain" }} />
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
            role="group"
            aria-label={bn ? "ভাষা নির্বাচন" : "Language selection"}
            style={{
              display: "flex",
              border: "1px solid #d7e5dc",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
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
              aria-pressed={lang === "bn"}
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

      <ToolTabs language={lang} />

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

          <div className="result" role="status" aria-live="polite" aria-atomic="true">
            <small>{bn ? "ফলাফল" : "RESULT"}</small>
            <h2>
              {result1 !== null
                ? fmt(result1)
                : invalid1
                ? bn
                  ? "সসীম ও বৈধ সংখ্যা লিখুন"
                  : "Enter valid finite numbers"
                : "—"}
            </h2>
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

          <div className="result" role="status" aria-live="polite" aria-atomic="true">
            <small>{bn ? "ফলাফল" : "RESULT"}</small>
            <h2>
              {result2 !== null
                ? `${fmt(result2)}%`
                : invalid2
                ? bn
                  ? "সসীম ও বৈধ সংখ্যা লিখুন"
                  : "Enter valid finite numbers"
                : zeroTotal2
                ? bn
                  ? "মোটের মান শূন্য হতে পারে না"
                  : "Total cannot be zero"
                : "—"}
            </h2>
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

          <div className="result" role="status" aria-live="polite" aria-atomic="true">
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
                : invalid3
                ? bn
                  ? "সসীম ও বৈধ সংখ্যা লিখুন"
                  : "Enter valid finite numbers"
                : zeroOld3
                ? bn
                  ? "পুরনো মান শূন্য হলে শতাংশ পরিবর্তন নির্ণয় করা যায় না"
                  : "Percentage change is undefined when the old value is zero"
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
          {bn ? "শতাংশ হিসাবের তিনটি সূত্র" : "Three Percentage Formulas"}
        </h2>

        <h3>
          {bn ? "ক. কোনো সংখ্যার শতাংশ" : "A. Percentage of a number"}
        </h3>
        <p>
          <b>
            {bn
              ? "সূত্র: (শতাংশ ÷ ১০০) × সংখ্যা"
              : "Formula: (Percentage ÷ 100) × Number"}
          </b>
          <br />
          {bn ? "উদাহরণ: ৫০০-এর ২০% = ১০০" : "Example: 20% of 500 = 100"}
        </p>

        <h3>
          {bn
            ? "খ. একটি সংখ্যা অন্য সংখ্যার কত শতাংশ"
            : "B. One number as a percentage of another"}
        </h3>
        <p>
          <b>
            {bn
              ? "সূত্র: (সংখ্যা ÷ মোট) × ১০০"
              : "Formula: (Number ÷ Total) × 100"}
          </b>
          <br />
          {bn ? "উদাহরণ: ২০০-এর মধ্যে ৫০ = ২৫%" : "Example: 50 out of 200 = 25%"}
        </p>

        <h3>
          {bn
            ? "গ. শতাংশ বৃদ্ধি বা হ্রাস"
            : "C. Percentage increase or decrease"}
        </h3>
        <p>
          <b>
            {bn
              ? "সূত্র: ((নতুন মান − পুরনো মান) ÷ |পুরনো মান|) × ১০০"
              : "Formula: ((New Value − Old Value) ÷ |Old Value|) × 100"}
          </b>
          <br />
          {bn
            ? "উদাহরণ: ১০০ থেকে ১২৫ = ২৫% বৃদ্ধি; ১০০ থেকে ৭৫ = ২৫% হ্রাস।"
            : "Examples: 100 to 125 = 25% increase; 100 to 75 = 25% decrease."}
        </p>

        <p>
          <small>
            {bn
              ? "পুরনো মান শূন্য হলে শতাংশ পরিবর্তন নির্ণয় করা যায় না, কারণ শূন্য দিয়ে ভাগ করা সম্ভব নয়।"
              : "Percentage change from an old value of zero is undefined because division by zero is not possible."}
          </small>
        </p>

        <h2>{bn ? "শতাংশের ব্যবহার" : "Practical Uses of Percentages"}</h2>
        <p>
          {bn
            ? "শতাংশ ব্যবহার করে ছাড়, নম্বর বা স্কোর, দামের পরিবর্তন, বৃদ্ধি বা হ্রাস এবং দুটি মানের তুলনা সহজে বোঝা যায়। এই ক্যালকুলেটরটি সাধারণ হিসাবের জন্য তৈরি।"
            : "Percentages make it easier to understand discounts, marks or scores, price changes, growth or decline, and comparisons between values. This calculator is intended for general calculations."}
        </p>

        <h2>
          {bn ? "শতাংশ ও শতাংশ পয়েন্টের পার্থক্য" : "Percentage vs Percentage Points"}
        </h2>
        <p>
          {bn
            ? "কোনো হার ২০% থেকে ২৫% হলে সেটি ৫ শতাংশ পয়েন্ট বেড়েছে। আগের ২০%-এর তুলনায় আপেক্ষিক শতাংশ বৃদ্ধি হলো ২৫%।"
            : "If a rate changes from 20% to 25%, it increases by 5 percentage points. Relative to the original 20%, the percentage increase is 25%."}
        </p>

        <h2>{bn ? "সাধারণ প্রশ্ন" : "Frequently Asked Questions"}</h2>

        <h3>
          {bn
            ? "কোনো সংখ্যার ২০% কীভাবে হিসাব করব?"
            : "How do I calculate 20% of a number?"}
        </h3>
        <p>
          {bn
            ? "সংখ্যাটিকে ২০ দিয়ে গুণ করে ১০০ দিয়ে ভাগ করুন। যেমন, ৫০০-এর ২০% হলো ১০০।"
            : "Multiply the number by 20 and divide by 100. For example, 20% of 500 is 100."}
        </p>

        <h3>
          {bn
            ? "একটি সংখ্যা অন্য সংখ্যার কত শতাংশ তা কীভাবে বের করব?"
            : "How do I find what percentage one number is of another?"}
        </h3>
        <p>
          {bn
            ? "প্রথম সংখ্যাটিকে মোট দিয়ে ভাগ করে ফলটিকে ১০০ দিয়ে গুণ করুন।"
            : "Divide the first number by the total and multiply the result by 100."}
        </p>

        <h3>
          {bn
            ? "শতাংশ বৃদ্ধি কীভাবে হিসাব করব?"
            : "How do I calculate percentage increase?"}
        </h3>
        <p>
          {bn
            ? "নতুন মান থেকে পুরনো মান বিয়োগ করুন, পুরনো মানের পরম মান দিয়ে ভাগ করুন এবং ১০০ দিয়ে গুণ করুন।"
            : "Subtract the old value from the new value, divide by the absolute old value, and multiply by 100."}
        </p>

        <h3>
          {bn
            ? "শতাংশ পরিবর্তনের ক্ষেত্রে পুরনো মান কি শূন্য হতে পারে?"
            : "Can the old value be zero when calculating percentage change?"}
        </h3>
        <p>
          {bn
            ? "না। পুরনো মান শূন্য হলে সূত্রে শূন্য দিয়ে ভাগ করতে হয়, তাই শতাংশ পরিবর্তন অনির্ণেয়।"
            : "No. An old value of zero would require division by zero, so the percentage change is undefined."}
        </p>

        <h3>
          {bn
            ? "শতাংশ ও শতাংশ পয়েন্টের মধ্যে পার্থক্য কী?"
            : "What is the difference between percentage and percentage points?"}
        </h3>
        <p>
          {bn
            ? "শতাংশ পয়েন্ট দুটি শতাংশ হারের সরাসরি পার্থক্য দেখায়। শতাংশ পরিবর্তন আগের হারের তুলনায় আপেক্ষিক পরিবর্তন দেখায়।"
            : "Percentage points show the direct difference between two percentage rates. Percentage change shows the relative change from the original rate."}
        </p>
      </section>
      <TrustLinks language={lang} />
    </main>
  );
}
