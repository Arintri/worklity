"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ToolTabs from "../components/ToolTabs";
import TrustLinks from "../components/TrustLinks";
import { convertLength, formatLengthResult } from "./lengthConversions.mjs";
import styles from "./LengthDistanceConverter.module.css";

const UNITS = [
  { id: "METER", en: "Meter", bn: "মিটার", symbol: "m" },
  { id: "FOOT", en: "Feet", bn: "ফুট", symbol: "ft" },
  { id: "INCH", en: "Inch", bn: "ইঞ্চি", symbol: "in" },
  { id: "KILOMETER", en: "Kilometer", bn: "কিলোমিটার", symbol: "km" },
  { id: "MILE", en: "Mile", bn: "মাইল", symbol: "mi" },
];

const COPY = {
  en: {
    eyebrow: "LENGTH & DISTANCE",
    title: "Length & Distance Converter",
    intro: "Convert length and distance between Meter, Feet, Inch, Kilometer and Mile with verified standard conversion values.",
    cardTitle: "Convert a measurement",
    cardHelp: "Enter a value, choose the units and select Convert.",
    value: "Value",
    from: "From unit",
    to: "To unit",
    convert: "Convert",
    swap: "Swap units",
    clear: "Clear",
    copy: "Copy result",
    copied: "Result copied",
    result: "Converted result",
    waiting: "Your converted value will appear here.",
    examplesTitle: "Helpful Conversion Examples",
    examplesIntro: "Use these common values as a quick reference.",
    howTitle: "How the converter works",
    howText: "Each unit is first related to meters, then converted to the selected output unit. The calculation uses the full value before the result is formatted for display.",
    formula: "Result = Value × From-unit meter factor ÷ To-unit meter factor",
    noteTitle: "Good to know",
    noteText: "This converter is useful for everyday length and distance calculations. Check the required precision and measurement standard for technical, engineering or official work.",
    faqTitle: "Frequently Asked Questions",
    errors: {
      VALUE_INVALID: "Enter a valid number.",
      VALUE_NEGATIVE: "Length or distance cannot be negative.",
      VALUE_TOO_LARGE: "The value is too large. Check the number entered.",
      UNIT_INVALID: "Choose valid From and To units.",
      RESULT_INVALID: "The result could not be calculated. Check the entered value.",
      COPY_FAILED: "The result could not be copied. Please copy it manually.",
    },
  },
  bn: {
    eyebrow: "দৈর্ঘ্য ও দূরত্ব",
    title: "দৈর্ঘ্য ও দূরত্ব রূপান্তরকারী",
    intro: "যাচাইকৃত মান ব্যবহার করে মিটার, ফুট, ইঞ্চি, কিলোমিটার ও মাইলের মধ্যে দৈর্ঘ্য এবং দূরত্ব রূপান্তর করুন।",
    cardTitle: "পরিমাপ রূপান্তর করুন",
    cardHelp: "একটি মান লিখুন, একক বেছে নিন এবং রূপান্তর করুন।",
    value: "মান",
    from: "যে একক থেকে",
    to: "যে এককে",
    convert: "রূপান্তর করুন",
    swap: "একক অদলবদল",
    clear: "মুছুন",
    copy: "ফল কপি করুন",
    copied: "ফল কপি হয়েছে",
    result: "রূপান্তরিত ফল",
    waiting: "রূপান্তরিত মান এখানে দেখা যাবে।",
    examplesTitle: "সহায়ক রূপান্তর উদাহরণ",
    examplesIntro: "দ্রুত জানার জন্য এই প্রচলিত মানগুলো দেখুন।",
    howTitle: "রূপান্তর কীভাবে হয়",
    howText: "প্রথমে প্রতিটি একককে মিটারের সঙ্গে সম্পর্কিত করা হয়, তারপর নির্বাচিত এককে রূপান্তর করা হয়। ফল দেখানোর আগে পূর্ণ মান দিয়ে হিসাব করা হয়।",
    formula: "ফল = মান × প্রথম এককের মিটার গুণক ÷ শেষ এককের মিটার গুণক",
    noteTitle: "মনে রাখুন",
    noteText: "দৈনন্দিন দৈর্ঘ্য ও দূরত্বের হিসাবের জন্য এই রূপান্তরকারী ব্যবহার করা যায়। প্রযুক্তিগত, প্রকৌশল বা সরকারি কাজে প্রয়োজনীয় নির্ভুলতা ও পরিমাপের মান যাচাই করুন।",
    faqTitle: "সাধারণ প্রশ্ন",
    errors: {
      VALUE_INVALID: "সঠিক সংখ্যা লিখুন।",
      VALUE_NEGATIVE: "দৈর্ঘ্য বা দূরত্ব ঋণাত্মক হতে পারে না।",
      VALUE_TOO_LARGE: "মানটি খুব বড়। লেখা সংখ্যাটি যাচাই করুন।",
      UNIT_INVALID: "সঠিক প্রথম ও শেষ একক বেছে নিন।",
      RESULT_INVALID: "ফল হিসাব করা যায়নি। লেখা মান যাচাই করুন।",
      COPY_FAILED: "ফল কপি করা যায়নি। অনুগ্রহ করে নিজে কপি করুন।",
    },
  },
};

const EXAMPLES = [
  ["1 Meter = 3.28084 Feet", "১ মিটার = ৩.২৮০৮৪ ফুট"],
  ["1 Foot = 0.3048 Meter", "১ ফুট = ০.৩০৪৮ মিটার"],
  ["1 Kilometer = 0.621371 Mile", "১ কিলোমিটার = ০.৬২১৩৭১ মাইল"],
  ["1 Mile = 1.609344 Kilometer", "১ মাইল = ১.৬০৯৩৪৪ কিলোমিটার"],
  ["12 Inches = 1 Foot", "১২ ইঞ্চি = ১ ফুট"],
];

const FAQS = {
  en: [
    ["How many feet are in one meter?", "One meter equals approximately 3.28084 feet."],
    ["How do I convert kilometers to miles?", "Multiply kilometers by approximately 0.621371, or select Kilometer and Mile above."],
    ["Are calculation and display precision the same?", "The calculation uses full JavaScript numeric precision; the displayed result is formatted to remain readable."],
  ],
  bn: [
    ["এক মিটারে কত ফুট?", "এক মিটার প্রায় ৩.২৮০৮৪ ফুট।"],
    ["কিলোমিটার থেকে মাইল কীভাবে হিসাব করব?", "কিলোমিটারকে প্রায় ০.৬২১৩৭১ দিয়ে গুণ করুন, অথবা উপরে কিলোমিটার ও মাইল বেছে নিন।"],
    ["হিসাব ও দেখানো ফলের নির্ভুলতা কি একই?", "হিসাবে পূর্ণ সংখ্যাগত নির্ভুলতা ব্যবহার করা হয়; সহজে পড়ার জন্য দেখানো ফল সাজানো হয়।"],
  ],
};

function unitLabel(unitId, bn) {
  const unit = UNITS.find((item) => item.id === unitId);
  return unit ? `${bn ? unit.bn : unit.en} (${unit.symbol})` : "";
}

export default function LengthDistanceConverterClient() {
  const [language, setLanguage] = useState("en");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("METER");
  const [toUnit, setToUnit] = useState("FOOT");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const resultRef = useRef(null);
  const bn = language === "bn";
  const copy = COPY[language];

  function calculate(event) {
    event.preventDefault();
    const conversion = convertLength({ value, fromUnit, toUnit });
    if (!conversion.ok) {
      setResult(null);
      setMessage(copy.errors[conversion.error] || copy.errors.RESULT_INVALID);
      return;
    }
    setResult(conversion);
    setMessage("");
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  function swapUnits() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
    setMessage("");
  }

  function clear() {
    setValue("");
    setFromUnit("METER");
    setToUnit("FOOT");
    setResult(null);
    setMessage("");
  }

  async function copyResult() {
    if (!result) return;
    const summary = `${formatLengthResult(result.value)} ${unitLabel(result.fromUnit, bn)} = ${formatLengthResult(result.result)} ${unitLabel(result.toUnit, bn)}`;
    try {
      await navigator.clipboard.writeText(summary);
      setMessage(copy.copied);
    } catch {
      setMessage(copy.errors.COPY_FAILED);
    }
  }

  const displayResult = result ? formatLengthResult(result.result) : "—";

  return (
    <main className={styles.page} lang={language}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Worklity home">
          <Image src="/brand/worklity-mark.png" alt="" width={40} height={40} />
          Worklity
        </Link>
        <div className={styles.headerActions}>
          <div className={styles.language} role="group" aria-label={bn ? "ভাষা নির্বাচন" : "Language selection"}>
            <button type="button" aria-pressed={!bn} onClick={() => setLanguage("en")}>English</button>
            <button type="button" aria-pressed={bn} onClick={() => setLanguage("bn")}>বাংলা</button>
          </div>
          <Link className={styles.homeLink} href="/">{bn ? "← হোম" : "← Home"}</Link>
        </div>
      </header>

      <ToolTabs language={language} />

      <section className={styles.hero}>
        <div><span>{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.intro}</p></div>
        <div className={styles.heroVisual} aria-hidden="true"><b>m</b><i>↔</i><b>mi</b></div>
      </section>

      <section className={styles.workspace}>
        <form className={styles.converter} onSubmit={calculate} noValidate>
          <div className={styles.cardHeading}><h2>{copy.cardTitle}</h2><p>{copy.cardHelp}</p></div>
          <label htmlFor="length-value">{copy.value}</label>
          <input id="length-value" type="number" inputMode="decimal" min="0" step="any" value={value} onChange={(event) => { setValue(event.target.value); setResult(null); setMessage(""); }} placeholder={bn ? "যেমন: ১০" : "e.g. 10"} />

          <div className={styles.unitRow}>
            <label htmlFor="from-unit">{copy.from}<select id="from-unit" value={fromUnit} onChange={(event) => { setFromUnit(event.target.value); setResult(null); }}>{UNITS.map((unit) => <option value={unit.id} key={unit.id}>{bn ? unit.bn : unit.en} ({unit.symbol})</option>)}</select></label>
            <button className={styles.swap} type="button" onClick={swapUnits} aria-label={copy.swap} title={copy.swap}>⇄<span>{copy.swap}</span></button>
            <label htmlFor="to-unit">{copy.to}<select id="to-unit" value={toUnit} onChange={(event) => { setToUnit(event.target.value); setResult(null); }} disabled={false}>{UNITS.map((unit) => <option value={unit.id} key={unit.id}>{bn ? unit.bn : unit.en} ({unit.symbol})</option>)}</select></label>
          </div>

          <div className={styles.status} role="status" aria-live="polite">{message}</div>
          <div className={styles.actions}><button className={styles.primary} type="submit">{copy.convert}</button><button type="button" onClick={clear}>{copy.clear}</button></div>
        </form>

        <section className={styles.resultCard} ref={resultRef} tabIndex="-1" aria-live="polite" aria-labelledby="conversion-result">
          <span>{copy.result}</span>
          <strong id="conversion-result">{displayResult}</strong>
          {result ? <><p>{unitLabel(result.toUnit, bn)}</p><div>{formatLengthResult(result.value)} {unitLabel(result.fromUnit, bn)} = {displayResult} {unitLabel(result.toUnit, bn)}</div><button type="button" onClick={copyResult}>{copy.copy}</button></> : <p>{copy.waiting}</p>}
        </section>
      </section>

      <section className={styles.examples}><h2>{copy.examplesTitle}</h2><p>{copy.examplesIntro}</p><ul>{EXAMPLES.map(([en, bnText]) => <li key={en}>{bn ? bnText : en}</li>)}</ul></section>

      <section className={styles.infoGrid}>
        <article><h2>{copy.howTitle}</h2><p>{copy.howText}</p><div className={styles.formula}>{copy.formula}</div></article>
        <article><h2>{copy.noteTitle}</h2><p>{copy.noteText}</p></article>
      </section>

      <section className={styles.faq}><h2>{copy.faqTitle}</h2>{FAQS[language].map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
      <TrustLinks language={language} />
      <footer className={styles.footer}>© {new Date().getFullYear()} Worklity · Simple Tools. Smarter Work.</footer>
    </main>
  );
}
