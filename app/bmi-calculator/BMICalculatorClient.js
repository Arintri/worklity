"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ToolTabs from "../components/ToolTabs";
import TrustLinks from "../components/TrustLinks";
import { BMI_LIMITS, BMI_CUTOFFS, calculateBMIDetails } from "./bmiCalculations.mjs";
import { COPY, SOURCES } from "./bmiContent";
import styles from "./BMI.module.css";

const EMPTY = { age: "", sex: "", heightUnit: "cm", heightCm: "", feet: "", inches: "", weightKg: "", waistCm: "" };
const CATEGORIES = ["UNDERWEIGHT", "NORMAL", "OVERWEIGHT", "OBESITY"];

function NumberField({ name, label, value, onChange, error, min, max, step = "any", hint, required = true }) {
  const id = `bmi-${name}`;
  return <div className={styles.field}>
    <label htmlFor={id}>{label}</label>
    <input id={id} name={name} type="number" inputMode={step === 1 ? "numeric" : "decimal"} min={min} max={max} step={step} required={required} value={value} onChange={onChange} aria-invalid={error || undefined} aria-describedby={[hint ? `${id}-hint` : "", error ? "bmi-error" : ""].filter(Boolean).join(" ") || undefined} />
    {hint && <small id={`${id}-hint`}>{hint}</small>}
  </div>;
}

export default function BMICalculatorClient() {
  const [lang, setLang] = useState("en");
  const [inputs, setInputs] = useState(EMPTY);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [checks, setChecks] = useState([false, false, false, false]);
  const t = COPY[lang];
  const format = (n, digits = 1) => new Intl.NumberFormat(lang === "bn" ? "bn-IN" : "en-IN", { maximumFractionDigits: digits }).format(n);
  const change = (event) => {
    const { name, value } = event.target;
    setInputs((current) => ({ ...current, [name]: value }));
    setResult(null);
    setError(null);
  };
  const reset = () => { setInputs(EMPTY); setResult(null); setError(null); setChecks([false, false, false, false]); };
  const submit = (event) => {
    event.preventDefault();
    const next = calculateBMIDetails(inputs);
    if (!next.ok) {
      setResult(null); setError(next);
      requestAnimationFrame(() => document.getElementById(`bmi-${next.field}`)?.focus());
      return;
    }
    setError(null); setResult(next);
    requestAnimationFrame(() => document.getElementById("bmi-result")?.focus());
  };
  const field = (name, label, min, max, extra = {}) => <NumberField name={name} label={label} min={min} max={max} value={inputs[name]} onChange={change} error={error?.field === name} {...extra} />;
  const bandRanges = [`< ${format(BMI_CUTOFFS.underweight)}`, `${format(BMI_CUTOFFS.underweight)} – < ${format(BMI_CUTOFFS.indiaOverweight)}`, `${format(BMI_CUTOFFS.indiaOverweight)} – < ${format(BMI_CUTOFFS.indiaObesity)}`, `≥ ${format(BMI_CUTOFFS.indiaObesity)}`];

  return <main className={styles.page} lang={lang}>
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label={t.home}>
        <Image src="/brand/worklity-mark.png" alt="" width={40} height={40} />Worklity
      </Link>
      <div className={styles.language} role="group" aria-label={t.language}>
        <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>English</button>
        <button type="button" aria-pressed={lang === "bn"} onClick={() => setLang("bn")}>বাংলা</button>
      </div>
    </header>
    <ToolTabs language={lang} />
    <div className={styles.container}>
      <section className={styles.hero}>
        <span>{t.eyebrow}</span><h1>{t.title}</h1><p>{t.intro}</p>
      </section>
      <div className={styles.workspace}>
        <section className={styles.card} aria-labelledby="bmi-form-title">
          <h2 id="bmi-form-title">{t.formTitle}</h2>
          <p className={styles.caution}>{t.caution}</p>
          <form onSubmit={submit} noValidate>
            <div className={styles.fields}>
              {field("age", t.age, BMI_LIMITS.minAge, BMI_LIMITS.maxAge, { step: 1 })}
              <div className={styles.field}>
                <label htmlFor="bmi-sex">{t.sex}</label>
                <select id="bmi-sex" name="sex" value={inputs.sex} onChange={change} required aria-describedby={`bmi-sex-hint${error?.field === "sex" ? " bmi-error" : ""}`} aria-invalid={error?.field === "sex" || undefined}>
                  <option value="">{t.select}</option><option value="male">{t.male}</option><option value="female">{t.female}</option>
                </select>
              </div>
              <small id="bmi-sex-hint" className={styles.full}>{t.sexNote}</small>
              <div className={`${styles.field} ${styles.full}`}>
                <label htmlFor="bmi-heightUnit">{t.heightUnit}</label>
                <select id="bmi-heightUnit" name="heightUnit" value={inputs.heightUnit} onChange={change}><option value="cm">{t.cm}</option><option value="ft">{t.ft}</option></select>
              </div>
              {inputs.heightUnit === "cm" ? <div className={styles.full}>{field("heightCm", t.heightCm, BMI_LIMITS.minHeightCm, BMI_LIMITS.maxHeightCm)}</div> : <>
                {field("feet", t.feet, 0, 9, { step: 1 })}{field("inches", t.inches, 0, 11.999, { hint: t.inchesNote })}
              </>}
              {field("weightKg", t.weight, BMI_LIMITS.minWeightKg, BMI_LIMITS.maxWeightKg)}
              {field("waistCm", `${t.waist} · ${t.optional}`, BMI_LIMITS.minWaistCm, BMI_LIMITS.maxWaistCm, { required: false })}
              <small className={styles.full}>{t.waistHelp}</small>
            </div>
            <div className={styles.actions}><button type="submit" className={styles.primary}>{t.calculate}</button><button type="button" onClick={reset}>{t.reset}</button></div>
            <div role="alert" id="bmi-error">{error && <p className={styles.error}>{t.errors[error.error] || t.errors.INVALID_INPUT}</p>}</div>
          </form>
          <details className={styles.limits}><summary>{lang === "bn" ? "ইনপুট সীমা" : "Input limits"}</summary><p>{t.limits}</p></details>
          <p className={styles.privacy}>{t.privacy}</p>
        </section>
        <section className={styles.resultArea} aria-live="polite" aria-atomic="true">
          {result ? <div id="bmi-result" tabIndex={-1} className={styles.result}>
            <div className={styles.resultHero}><h2>{t.result}</h2><strong className={styles.number}>{new Intl.NumberFormat(lang === "bn" ? "bn-IN" : "en-IN", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(Number(result.bmiDisplay))}</strong><span>kg/m²</span><p>{t.categories[result.indiaCategory]}</p></div>
            <div className={styles.resultBody}>
              <h3>{t.india}</h3><p>{t.screening}</p>
              <ol className={styles.bands} aria-label={t.india}>
                {CATEGORIES.map((category, i) => <li key={category} className={`${styles.band} ${styles[category]} ${result.indiaCategory === category ? styles.selected : ""}`}><strong>{t.categories[category]}</strong><span>{bandRanges[i]}</span>{result.indiaCategory === category && <b>✓ {t.yourRange}</b>}</li>)}
              </ol>
              <dl className={styles.summary}><div><dt>{t.heightSummary}</dt><dd>{format(result.heightCm, 2)} cm</dd></div><div><dt>{t.weightSummary}</dt><dd>{format(result.weightKg, 2)} kg</dd></div></dl>
              <p className={styles.small}>{t.rounding}</p>
              {result.waist && <aside className={styles.waist}><h3>{t.waistSummary}: {format(result.waist.cm, 2)} cm</h3><p>{result.waist.status === "AT_OR_ABOVE_REFERENCE" ? t.waistHigh : t.waistBelow}</p><small>{t.waistRef}</small></aside>}
            </div>
          </div> : <div className={styles.placeholder}><span aria-hidden="true">BMI</span><h2>{t.result}</h2><p>{lang === "bn" ? "আপনার মাপ দিয়ে BMI হিসাব করুন। এখানে ফল ও তার ব্যাখ্যা দেখাবে।" : "Enter your measurements and calculate. Your BMI and explanation will appear here."}</p></div>}
        </section>
      </div>
      {result && <section className={`${styles.card} ${styles.guidance}`} aria-labelledby="ncd-title"><h2 id="ncd-title">{t.guidanceTitle}</h2><p>{t.ncdMeaning}</p><p className={styles.lead}>{t.guidance[result.guidance]}</p>
        {result.guidance !== "UNDERWEIGHT" && <><ul>{t.prompts.map(p => <li key={p}>{p}</li>)}</ul><p>{t.activity}</p></>}
      </section>}
      <div className={styles.information}>
        <section className={styles.card}><h2>{t.who}</h2><p>{t.whoIntro}</p><ul>{t.whoRows.map(row => <li key={row}>{row}</li>)}</ul>{result && <p className={styles.referenceResult}>{t.whoResult}: <strong>{t.categories[result.whoCategory]}</strong></p>}</section>
        <section className={styles.card}><h2>{t.formulaTitle}</h2><p>{t.formula}</p><p className={styles.example}>{t.example}</p></section>
      </div>
      <details className={`${styles.card} ${styles.checklist}`}><summary>{t.checkTitle} · {t.optional}</summary><p>{t.checkIntro}</p><div className={styles.checks}>{t.checks.map((question,i) => <label key={i}><input type="checkbox" checked={checks[i]} onChange={event => setChecks(current => current.map((value,j) => j === i ? event.target.checked : value))} />{question}</label>)}</div></details>
      <section className={`${styles.card} ${styles.faq}`}><h2>{t.faqTitle}</h2>{t.faqs.map(([question,answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
      <section className={`${styles.card} ${styles.sources}`}><h2>{t.sources}</h2><ul>{SOURCES.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source[lang]}</a></li>)}</ul><p>{t.sourceNote}</p></section>
      <aside className={styles.disclaimer}>{t.disclaimer}</aside>
      <TrustLinks language={lang} />
      <footer className={styles.footer}><Link href="/">Worklity</Link><span>Simple Tools. Smarter Work.</span></footer>
    </div>
  </main>;
}
