"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ToolTabs from "../components/ToolTabs";
import TrustLinks from "../components/TrustLinks";
import { calculateFib4, FIB4_CATEGORIES, PLATELET_UNITS } from "./fib4Calculations.mjs";
import { COPY, SOURCES } from "./fib4Content";
import styles from "./Fib4.module.css";

const EMPTY = { age: "", ast: "", alt: "", plateletCount: "" };

export default function Fib4CalculatorClient() {
  const [language, setLanguage] = useState("en");
  const [values, setValues] = useState(EMPTY);
  const [plateletUnit, setPlateletUnit] = useState(PLATELET_UNITS.STANDARD);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);
  const copy = COPY[language];

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setError(null);
    setResult(null);
  }

  function calculate(event) {
    event.preventDefault();
    const next = calculateFib4({ ...values, plateletUnit });
    if (!next.ok) {
      setResult(null);
      setError(next.error);
      return;
    }
    setError(null);
    setResult(next);
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  function reset() {
    setValues(EMPTY);
    setPlateletUnit(PLATELET_UNITS.STANDARD);
    setResult(null);
    setError(null);
  }

  const interpretation = result && ({
    [FIB4_CATEGORIES.LOWER]: [copy.lowerTitle, copy.lowerText],
    [FIB4_CATEGORIES.INTERMEDIATE]: [copy.intermediateTitle, copy.intermediateText],
    [FIB4_CATEGORIES.HIGHER]: [copy.higherTitle, copy.higherText],
    [FIB4_CATEGORIES.LIMITED_ACCURACY]: [copy.limitedTitle, copy.limitedText],
  }[result.category]);

  return (
    <main className={styles.page} lang={language}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Worklity home">
          <Image src="/brand/worklity-mark.png" alt="" width={40} height={40} />
          Worklity
        </Link>
        <div className={styles.language} role="group" aria-label={language === "bn" ? "ভাষা নির্বাচন" : "Language selection"}>
          <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>English</button>
          <button type="button" aria-pressed={language === "bn"} onClick={() => setLanguage("bn")}>বাংলা</button>
        </div>
      </header>

      <ToolTabs language={language} />

      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <strong>{copy.support}</strong>
          <p>{copy.intro}</p>
        </div>
        <div className={styles.heroMark} aria-hidden="true"><span>FIB</span><b>4</b></div>
      </section>

      <section className={styles.workspace} aria-label={copy.title}>
        <form className={styles.formCard} onSubmit={calculate} noValidate>
          <div className={styles.cardHeading}><h2>{copy.formTitle}</h2><p>{copy.formHint}</p></div>
          <div className={styles.grid}>
            <label>{copy.age}<span className={styles.inputWrap}><input type="number" inputMode="numeric" min="18" max="120" step="1" value={values.age} onChange={(e) => update("age", e.target.value)} required /><em>{copy.years}</em></span></label>
            <label>{copy.ast}<span className={styles.inputWrap}><input type="number" inputMode="decimal" min="1" max="10000" value={values.ast} onChange={(e) => update("ast", e.target.value)} required /><em>U/L</em></span></label>
            <label>{copy.alt}<span className={styles.inputWrap}><input type="number" inputMode="decimal" min="1" max="10000" value={values.alt} onChange={(e) => update("alt", e.target.value)} required /><em>U/L</em></span></label>
          </div>

          <fieldset className={styles.plateletField}>
            <legend>{copy.platelets}</legend>
            <div className={styles.unitSwitch}>
              <button type="button" aria-pressed={plateletUnit === PLATELET_UNITS.STANDARD} onClick={() => { setPlateletUnit(PLATELET_UNITS.STANDARD); setResult(null); setError(null); }}>×10⁹/L</button>
              <button type="button" aria-pressed={plateletUnit === PLATELET_UNITS.LAKH_PER_MICROLITER} onClick={() => { setPlateletUnit(PLATELET_UNITS.LAKH_PER_MICROLITER); setResult(null); setError(null); }}>lakh/µL · লাখ/µL</button>
            </div>
            <input aria-label={`${copy.platelets} ${plateletUnit === PLATELET_UNITS.STANDARD ? "×10⁹/L" : "lakh/µL"}`} type="number" inputMode="decimal" min={plateletUnit === PLATELET_UNITS.STANDARD ? "10" : "0.1"} max={plateletUnit === PLATELET_UNITS.STANDARD ? "2000" : "20"} step="any" value={values.plateletCount} onChange={(e) => update("plateletCount", e.target.value)} required />
            <small>{plateletUnit === PLATELET_UNITS.STANDARD ? copy.plateletHelpStandard : copy.plateletHelpLakh}</small>
          </fieldset>

          <div className={styles.status} role="status" aria-live="polite">{error ? copy.errors[error] || copy.errors.RESULT_INVALID : ""}</div>
          <div className={styles.actions}><button className={styles.primary} type="submit">{copy.calculate}</button><button className={styles.secondary} type="button" onClick={reset}>{copy.reset}</button></div>
        </form>

        <section ref={resultRef} tabIndex="-1" className={`${styles.resultCard} ${result ? styles[result.category.toLowerCase()] : ""}`} aria-live="polite" aria-labelledby="fib4-result-title">
          <span>{copy.resultTitle}</span>
          {result ? <><strong id="fib4-result-title">{result.displayedScore}</strong><h2>{interpretation[0]}</h2><p>{interpretation[1]}</p><dl><div><dt>{copy.age}</dt><dd>{result.inputs.age} {copy.years}</dd></div><div><dt>AST / ALT</dt><dd>{result.inputs.ast} / {result.inputs.alt} U/L</dd></div><div><dt>{copy.platelets}</dt><dd>{result.inputs.plateletsStandard} ×10⁹/L</dd></div></dl></> : <><strong id="fib4-result-title">—</strong><p>{copy.waiting}</p></>}
        </section>
      </section>

      <section className={styles.infoGrid}>
        <article><h2>{copy.howTitle}</h2><p>{copy.howText}</p><div className={styles.formula} aria-label="FIB-4 formula">FIB-4 = (Age × AST) ÷ (Platelets × √ALT)</div></article>
        <article><h2>{copy.interpretationTitle}</h2><p>{copy.interpretationText}</p></article>
      </section>

      <section className={styles.limits}><h2>{copy.limitationsTitle}</h2><ul>{copy.limitations.map((item) => <li key={item}>{item}</li>)}</ul></section>

      <section className={styles.faq}><h2>{copy.faqTitle}</h2><div>{copy.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

      <section className={styles.sources}><h2>{copy.sourcesTitle}</h2><p>{copy.sourcesIntro}</p><ul>{SOURCES.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul></section>

      <aside className={styles.disclaimer}><strong>{language === "bn" ? "চিকিৎসা সংক্রান্ত গুরুত্বপূর্ণ তথ্য" : "Important medical information"}</strong><p>{copy.disclaimer}</p><small>{copy.privacy}</small></aside>
      <TrustLinks language={language} />
      <footer className={styles.footer}>© {new Date().getFullYear()} Worklity · Simple Tools. Smarter Work.</footer>
    </main>
  );
}
