"use client";

import Link from "next/link";
import { useState } from "react";
import ToolTabs from "../components/ToolTabs";
import { generateVaccinationSchedule } from "./vaccinationCalculations.mjs";
import {
  GENDER,
  HPV_PROGRAMME_APPLICABILITY,
  INDIA_UIP_SCHEDULE,
  JE_APPLICABILITY,
  RECORD_STATES,
} from "./vaccinationSchedule.mjs";

const COPY = {
  en: {
    language: "Choose language", title: "Vaccination Due Date Calculator",
    subtitle: "Enter the child's date of birth to see the vaccination schedule.",
    eyebrow: "India vaccination planning tool", childName: "Child Name", optional: "Optional",
    namePlaceholder: "Enter child's name", dob: "Date of Birth", show: "Show Vaccination Schedule",
    reset: "Reset", privacy: "Information entered here stays on this page during the current session and is not saved by this calculator.",
    required: "Please enter the child's date of birth.", invalid: "Please enter a valid date of birth.", future: "Date of birth cannot be in the future.",
    schedule: "Vaccination Schedule", calculated: "Calculated from Date of Birth", child: "Child",
    due: "Due", dueWindow: "Calculated Due Window", print: "Print / Save PDF",
    jeNote: "In applicable/endemic areas", hpvTitle: "HPV Vaccination Programme",
    hpvProgrammeAge: "Programme age: 14 years", hpvSingleDose: "Single dose",
    hpvText: "The Government programme applies to eligible girls aged 14 years. This calculator does not determine individual programme eligibility. Eligibility must be confirmed with the vaccination centre.",
    recordTitle: "Record Vaccination & Check Next Due",
    recordSubtitle: "Optional — use this if a vaccine was given on a different date.",
    open: "Open optional record tool", close: "Close optional record tool",
    step1: "Step 1", step2: "Step 2", step3: "Step 3", selectDose: "Select Vaccine / Dose",
    chooseDose: "Choose a vaccine or dose", whatHappened: "What happened?",
    given: "Vaccine was given", missed: "Missed / Vaccine Not Available", actual: "Actual Given Date",
    check: "Show Next Due / Guidance", next: "Next Due / Guidance",
    selectFirst: "Please select a vaccine or dose.", dateRequired: "Please enter the actual given date.",
    dateInvalid: "Please enter a valid vaccination date.", dateBefore: "The vaccination date cannot be before the child's date of birth.",
    dateFuture: "The vaccination date cannot be in the future.", adjusted: "Adjusted next eligible date",
    confirmAdjusted: "Next adjusted date requires confirmation with the vaccination centre.",
    missedGuidance: "Follow up at the next RI/VHND/immunization session.",
    missedExtra: "Confirm the next dose timing with your vaccination centre. No local session date is calculated here.",
    unchanged: "The original DOB-based schedule above remains unchanged.",
    about: "About this schedule", aboutText: "Dates are calculated from the child's date of birth using the selected India schedule version. Official age ranges are shown as full due windows.",
    jeTitle: "JE vaccination", jeText: "JE doses are shown because they are part of the configured schedule, but apply only in designated or endemic programme areas. Confirm locally.",
    hpvInfo: "HPV vaccination", hpvInfoText: "HPV is shown separately from the routine childhood schedule. The Government programme applies to eligible girls aged 14 years, and individual eligibility must be confirmed with a vaccination centre.",
    delayed: "Delayed / missed vaccination", delayedText: "Do not restart or reschedule a series based only on this page. Delayed-dose timing needs professional confirmation unless a verified rule is available.",
    important: "Important information",
    disclaimer: "This calculator provides a DOB-based vaccination planning schedule for information only. Vaccination eligibility, delayed doses and medical decisions should be confirmed with a qualified health professional or vaccination centre. It does not replace U-WIN, MCP Card or official vaccination records.",
    reviewed: "Worklity schedule reviewed: 1 September 2026",
    references: "Official References",
    referencesIntro: "Government sources used to review the schedule. These links do not imply endorsement of Worklity.",
    routineManual: "Ministry of Health & Family Welfare — Routine Immunization Manual for Health Workers",
    annualReport: "Ministry of Health & Family Welfare — Annual Report 2024–25",
    jeGuidance: "NCVBDC — Japanese Encephalitis vaccination guidance",
    hpvGuidance: "Press Information Bureau — Update on National HPV Vaccination Programme",
    birth: "Birth", weeks6: "6 Weeks", weeks10: "10 Weeks", weeks14: "14 Weeks",
    months9: "9–11 Months", months16: "16–24 Months", years5: "5–6 Years", years10: "10 Years", years16: "16 Years",
  },
  bn: {
    language: "ভাষা বেছে নিন", title: "টিকার নির্ধারিত তারিখ ক্যালকুলেটর",
    subtitle: "টিকাদান সময়সূচি দেখতে শিশুর জন্মতারিখ লিখুন।", eyebrow: "ভারতের টিকাদান পরিকল্পনা টুল",
    childName: "শিশুর নাম", optional: "ঐচ্ছিক", namePlaceholder: "শিশুর নাম লিখুন", dob: "জন্মতারিখ",
    show: "টিকাদান সময়সূচি দেখুন", reset: "রিসেট",
    privacy: "এখানে দেওয়া তথ্য বর্তমান সেশনে এই পেজেই থাকে; এই ক্যালকুলেটর তথ্য সংরক্ষণ করে না।",
    required: "শিশুর জন্মতারিখ লিখুন।", invalid: "সঠিক জন্মতারিখ লিখুন।", future: "জন্মতারিখ ভবিষ্যতের হতে পারে না।",
    schedule: "টিকাদান সময়সূচি", calculated: "জন্মতারিখ থেকে হিসাব করা হয়েছে", child: "শিশু",
    due: "নির্ধারিত তারিখ", dueWindow: "হিসাব করা নির্ধারিত সময়সীমা", print: "প্রিন্ট / PDF সেভ করুন",
    jeNote: "প্রযোজ্য/এন্ডেমিক এলাকায়", hpvTitle: "HPV টিকাকরণ কর্মসূচি",
    hpvProgrammeAge: "কর্মসূচির বয়স: ১৪ বছর", hpvSingleDose: "একটি ডোজ",
    hpvText: "সরকারি কর্মসূচিটি ১৪ বছর বয়সী যোগ্য মেয়েদের জন্য প্রযোজ্য। এই ক্যালকুলেটর ব্যক্তিগত কর্মসূচির যোগ্যতা নির্ধারণ করে না। যোগ্যতা টিকাকরণ কেন্দ্র থেকে নিশ্চিত করুন।",
    recordTitle: "টিকার রেকর্ড ও পরবর্তী সময় দেখুন", recordSubtitle: "ঐচ্ছিক — কোনো টিকা অন্য তারিখে দেওয়া হলে এটি ব্যবহার করুন।",
    open: "ঐচ্ছিক রেকর্ড টুল খুলুন", close: "ঐচ্ছিক রেকর্ড টুল বন্ধ করুন",
    step1: "ধাপ ১", step2: "ধাপ ২", step3: "ধাপ ৩", selectDose: "টিকা / ডোজ বেছে নিন",
    chooseDose: "একটি টিকা বা ডোজ বেছে নিন", whatHappened: "কী হয়েছিল?", given: "টিকা দেওয়া হয়েছে",
    missed: "মিস হয়েছে / টিকা পাওয়া যায়নি", actual: "টিকা দেওয়ার আসল তারিখ", check: "পরবর্তী সময় / পরামর্শ দেখুন",
    next: "পরবর্তী সময় / পরামর্শ", selectFirst: "একটি টিকা বা ডোজ বেছে নিন।", dateRequired: "টিকা দেওয়ার আসল তারিখ লিখুন।",
    dateInvalid: "টিকা দেওয়ার সঠিক তারিখ লিখুন।", dateBefore: "টিকা দেওয়ার তারিখ শিশুর জন্মতারিখের আগে হতে পারে না।",
    dateFuture: "টিকা দেওয়ার তারিখ ভবিষ্যতের হতে পারে না।", adjusted: "সমন্বিত পরবর্তী যোগ্য তারিখ",
    confirmAdjusted: "পরবর্তী সমন্বিত তারিখ টিকাদান কেন্দ্র থেকে নিশ্চিত করুন।",
    missedGuidance: "পরবর্তী RI/VHND/টিকাদান সেশনে যোগাযোগ করুন।",
    missedExtra: "পরবর্তী ডোজের সময় টিকাদান কেন্দ্র থেকে নিশ্চিত করুন। এখানে স্থানীয় সেশনের তারিখ হিসাব করা হয় না।",
    unchanged: "উপরের মূল জন্মতারিখভিত্তিক সময়সূচি অপরিবর্তিত আছে।",
    about: "এই সময়সূচি সম্পর্কে", aboutText: "নির্বাচিত ভারতীয় সময়সূচি অনুযায়ী শিশুর জন্মতারিখ থেকে তারিখ হিসাব করা হয়। সরকারি বয়সসীমা থাকলে পুরো সময়সীমা দেখানো হয়।",
    jeTitle: "JE টিকা", jeText: "কনফিগার করা সময়সূচির অংশ হিসেবে JE ডোজ দেখানো হয়েছে, তবে এটি শুধু নির্ধারিত বা এন্ডেমিক এলাকায় প্রযোজ্য। স্থানীয়ভাবে নিশ্চিত করুন।",
    hpvInfo: "HPV টিকা", hpvInfoText: "HPV নিয়মিত শৈশব টিকাদান সময়সূচি থেকে আলাদাভাবে দেখানো হয়েছে। সরকারি কর্মসূচিটি ১৪ বছর বয়সী যোগ্য মেয়েদের জন্য প্রযোজ্য এবং ব্যক্তিগত যোগ্যতা টিকাদান কেন্দ্র থেকে নিশ্চিত করতে হবে।",
    delayed: "দেরি / মিস হওয়া টিকা", delayedText: "শুধু এই পেজ দেখে টিকার সিরিজ আবার শুরু বা পুনর্নির্ধারণ করবেন না। যাচাইকৃত নিয়ম না থাকলে দেরি হওয়া ডোজের সময় বিশেষজ্ঞের কাছ থেকে নিশ্চিত করুন।",
    important: "গুরুত্বপূর্ণ তথ্য",
    disclaimer: "এই ক্যালকুলেটর শুধু তথ্যের জন্য জন্মতারিখভিত্তিক টিকাদান পরিকল্পনা দেয়। টিকার যোগ্যতা, দেরি হওয়া ডোজ ও চিকিৎসা সংক্রান্ত সিদ্ধান্ত চিকিৎসক বা টিকাদান কেন্দ্র থেকে নিশ্চিত করুন। এটি U-WIN, MCP কার্ড বা সরকারি টিকাদান রেকর্ডের বিকল্প নয়।",
    reviewed: "Worklity সময়সূচি পর্যালোচনা: ১ সেপ্টেম্বর ২০২৬",
    references: "সরকারি তথ্যসূত্র",
    referencesIntro: "সময়সূচি পর্যালোচনায় ব্যবহৃত সরকারি তথ্যসূত্র। এই লিংকগুলোর অর্থ সংশ্লিষ্ট সংস্থাগুলো Worklity-কে অনুমোদন করে—এমন নয়।",
    routineManual: "স্বাস্থ্য ও পরিবার কল্যাণ মন্ত্রণালয় — স্বাস্থ্যকর্মীদের জন্য নিয়মিত টিকাদান নির্দেশিকা",
    annualReport: "স্বাস্থ্য ও পরিবার কল্যাণ মন্ত্রণালয় — বার্ষিক প্রতিবেদন ২০২৪–২৫",
    jeGuidance: "NCVBDC — জাপানিজ এনসেফালাইটিস টিকাদান নির্দেশনা",
    hpvGuidance: "প্রেস ইনফরমেশন ব্যুরো — জাতীয় HPV টিকাকরণ কর্মসূচির হালনাগাদ তথ্য",
    birth: "জন্মের সময়", weeks6: "৬ সপ্তাহ", weeks10: "১০ সপ্তাহ", weeks14: "১৪ সপ্তাহ",
    months9: "৯–১১ মাস", months16: "১৬–২৪ মাস", years5: "৫–৬ বছর", years10: "১০ বছর", years16: "১৬ বছর",
  },
};

const STAGES = [
  ["birth", "birth", "rose", "B"], ["6-weeks", "weeks6", "green", "6"],
  ["10-weeks", "weeks10", "orange", "10"], ["14-weeks", "weeks14", "blue", "14"],
  ["9-to-11-months", "months9", "violet", "9"], ["16-to-24-months", "months16", "teal", "16"],
  ["5-to-6-years", "years5", "pink", "5"], ["10-years", "years10", "amber", "10"],
  ["16-years", "years16", "indigo", "16"],
];
const ERRORS = { DOB_REQUIRED: "required", INVALID_DOB: "invalid", DOB_IN_FUTURE: "future", INVALID_ACTUAL_DATE: "dateInvalid", ACTUAL_DATE_BEFORE_DOB: "dateBefore", ACTUAL_DATE_IN_FUTURE: "dateFuture" };

function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function formatDate(value, language) {
  if (!value) return "—";
  const [year, month, day] = value.split("-").map(Number);
  if (![year, month, day].every(Number.isFinite)) return "—";
  const date = new Date(0); date.setUTCHours(0, 0, 0, 0); date.setUTCFullYear(year, month - 1, day);
  return new Intl.DateTimeFormat(language === "bn" ? "bn-BD" : "en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

export default function VaccinationCalculatorClient() {
  const [language, setLanguage] = useState("en");
  const [childName, setChildName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState("");
  const [recordOpen, setRecordOpen] = useState(false);
  const [selectedDose, setSelectedDose] = useState("");
  const [recordType, setRecordType] = useState(RECORD_STATES.GIVEN);
  const [actualDate, setActualDate] = useState("");
  const [recordMessage, setRecordMessage] = useState(null);
  const [recordError, setRecordError] = useState("");
  const t = COPY[language];
  const referenceDate = todayISO();

  const calculate = (birthDate, records = {}) => generateVaccinationSchedule({
    dob: birthDate, referenceDate, actualVaccinations: records,
    jeApplicability: JE_APPLICABILITY.UNCONFIRMED, gender: GENDER.UNCONFIRMED,
    hpvProgrammeApplicability: HPV_PROGRAMME_APPLICABILITY.UNCONFIRMED, includeHPV: true,
  });
  const submit = (event) => {
    event.preventDefault();
    const generated = calculate(dob);
    if (!generated.ok) { setError(ERRORS[generated.error] || "invalid"); setResult(null); setSubmitted(null); return; }
    setResult(generated); setSubmitted({ childName: childName.trim(), dob }); setError("");
    setSelectedDose(""); setActualDate(""); setRecordMessage(null); setRecordError("");
  };
  const reset = () => {
    setChildName(""); setDob(""); setResult(null); setSubmitted(null); setError(""); setRecordOpen(false);
    setSelectedDose(""); setActualDate(""); setRecordType(RECORD_STATES.GIVEN); setRecordMessage(null); setRecordError("");
  };
  const checkRecord = () => {
    if (!selectedDose) { setRecordError("selectFirst"); return; }
    if (recordType === RECORD_STATES.GIVEN && !actualDate) { setRecordError("dateRequired"); return; }
    const record = recordType === RECORD_STATES.GIVEN ? { state: RECORD_STATES.GIVEN, date: actualDate } : { state: RECORD_STATES.MISSED_NOT_AVAILABLE };
    const generated = calculate(submitted.dob, { [selectedDose]: record });
    if (!generated.ok) { setRecordError(ERRORS[generated.error] || "dateInvalid"); setRecordMessage(null); return; }
    setRecordMessage({ type: recordType, adjusted: generated.doses.filter((dose) => dose.adjustedEligibleDate) }); setRecordError("");
  };
  const dueText = (dose) => dose.officialDueStart === dose.officialDueEnd ? formatDate(dose.officialDueStart, language) : `${formatDate(dose.officialDueStart, language)} – ${formatDate(dose.officialDueEnd, language)}`;
  const routine = result?.doses.filter((dose) => dose.visitGroup !== "hpv-programme-14-years") || [];
  const hpv = result?.doses.filter((dose) => dose.visitGroup === "hpv-programme-14-years") || [];

  return <main className={`page ${language === "bn" ? "bengali" : ""}`}>
    <header className="nav screenOnly">
      <Link href="/" className="brand" aria-label="Worklity home"><span>W</span>Worklity</Link>
      <div className="language" role="group" aria-label={t.language}>
        <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>English</button>
        <button type="button" aria-pressed={language === "bn"} onClick={() => setLanguage("bn")}>বাংলা</button>
      </div>
    </header>
    <ToolTabs language={language} />
    <section className="hero screenOnly"><i className="glow" aria-hidden="true" /><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.subtitle}</p></section>
    <section className="inputCard screenOnly" aria-label={t.title}>
      <form onSubmit={submit} noValidate>
        <div className="fields">
          <label><span>{t.childName} <small>{t.optional}</small></span><input type="text" maxLength="120" value={childName} placeholder={t.namePlaceholder} onChange={(e) => setChildName(e.target.value)} /></label>
          <label><span>{t.dob} <b>*</b></span><input type="date" required max={referenceDate} value={dob} onChange={(e) => setDob(e.target.value)} /></label>
        </div>
        <div className="actions"><button className="primary" type="submit">{t.show}</button><button className="secondary" type="button" onClick={reset}>{t.reset}</button></div>
        <div className="live" aria-live="polite">{error && <p role="alert">{t[error]}</p>}</div>
      </form><p className="privacy">◈ {t.privacy}</p>
    </section>

    {result?.ok && submitted && <div className="report" aria-live="polite">
      <div className="printHeader printOnly"><strong>Worklity</strong><h1>{t.schedule}</h1></div>
      <section className="scheduleHead"><div><p className="eyebrow">{t.calculated}</p><h2>{t.schedule}</h2><p className="meta">{submitted.childName && <><strong>{t.child}:</strong> {submitted.childName}<span>•</span></>}<strong>{t.dob}:</strong> {formatDate(submitted.dob, language)}</p></div><button className="printButton screenOnly" type="button" onClick={() => window.print()}>{t.print}</button></section>
      <section className="stageGrid" aria-label={t.schedule}>
        {STAGES.map(([id, label, tone, icon]) => {
          const doses = routine.filter((dose) => dose.visitGroup === id); if (!doses.length) return null;
          return <article className={`stageCard ${tone}`} key={id}><div className="stageTop"><span className="stageIcon" aria-hidden="true">{icon}</span><h3>{t[label]}</h3></div><div className="dateBlock"><span>{doses[0].officialDueStart === doses[0].officialDueEnd ? t.due : t.dueWindow}</span><strong>{dueText(doses[0])}</strong></div><ul>{doses.map((dose) => <li key={dose.doseId}><i aria-hidden="true">✓</i><span><strong>{dose.label[language]}</strong>{dose.vaccineId === "je" && <small>{t.jeNote}</small>}</span></li>)}</ul></article>;
        })}
      </section>
      {hpv.length > 0 && <section className="hpvCard"><span aria-hidden="true">HPV</span><div><h2>{t.hpvTitle}</h2><p><strong>{t.hpvProgrammeAge}</strong></p><p><strong>{t.hpvSingleDose}</strong></p><p>{t.hpvText}</p></div></section>}
      <button className="printButton mobilePrint screenOnly" type="button" onClick={() => window.print()}>{t.print}</button>

      <section className="recordSection screenOnly">
        <button className="recordToggle" type="button" aria-expanded={recordOpen} onClick={() => setRecordOpen((open) => !open)}><span><small>{t.optional}</small><strong>{t.recordTitle}</strong><em>{t.recordSubtitle}</em></span><b aria-label={recordOpen ? t.close : t.open}>{recordOpen ? "−" : "+"}</b></button>
        {recordOpen && <div className="recordPanel"><div className="recordSteps">
          <label className="recordField"><span><b>{t.step1}</b>{t.selectDose}</span><select value={selectedDose} onChange={(e) => { setSelectedDose(e.target.value); setRecordMessage(null); }}><option value="">{t.chooseDose}</option>{result.doses.map((dose) => <option key={dose.doseId} value={dose.doseId}>{dose.label[language]}</option>)}</select></label>
          <fieldset className="recordField"><legend><b>{t.step2}</b>{t.whatHappened}</legend><label className="radio"><input type="radio" name="recordType" checked={recordType === RECORD_STATES.GIVEN} onChange={() => { setRecordType(RECORD_STATES.GIVEN); setRecordMessage(null); }} />{t.given}</label><label className="radio"><input type="radio" name="recordType" checked={recordType === RECORD_STATES.MISSED_NOT_AVAILABLE} onChange={() => { setRecordType(RECORD_STATES.MISSED_NOT_AVAILABLE); setRecordMessage(null); }} />{t.missed}</label>{recordType === RECORD_STATES.GIVEN && <label className="dateField"><span>{t.actual}</span><input type="date" min={submitted.dob} max={referenceDate} value={actualDate} onChange={(e) => { setActualDate(e.target.value); setRecordMessage(null); }} /></label>}</fieldset>
          <div className="recordAction"><span><b>{t.step3}</b>{t.next}</span><button type="button" onClick={checkRecord}>{t.check}</button></div>
        </div><div className="recordLive" aria-live="polite">{recordError && <p className="recordError" role="alert">{t[recordError]}</p>}{recordMessage && <div className="guidance"><h3>{t.next}</h3>{recordMessage.type === RECORD_STATES.MISSED_NOT_AVAILABLE ? <><strong>{t.missedGuidance}</strong><p>{t.missedExtra}</p></> : recordMessage.adjusted.length ? recordMessage.adjusted.map((dose) => <p key={dose.doseId}><strong>{dose.label[language]}:</strong> {t.adjusted} — {formatDate(dose.adjustedEligibleDate, language)}</p>) : <strong>{t.confirmAdjusted}</strong>}<p>{t.unchanged}</p></div>}</div></div>}
      </section>
    </div>}

    <section className="info screenOnly"><details><summary>{t.about}</summary><p>{t.aboutText}</p></details><details><summary>{t.jeTitle}</summary><p>{t.jeText}</p></details><details><summary>{t.hpvInfo}</summary><p>{t.hpvInfoText}</p></details><details><summary>{t.delayed}</summary><p>{t.delayedText}</p></details></section>
    <section className="officialReferences">
      <h2>{t.references}</h2>
      <p>{t.referencesIntro}</p>
      <ul>
        <li><a href={INDIA_UIP_SCHEDULE.sourceReferences.UIP_ROUTINE_MANUAL.url} target="_blank" rel="noopener noreferrer">{t.routineManual}</a></li>
        <li><a href={INDIA_UIP_SCHEDULE.sourceReferences.MOHFW_ANNUAL_REPORT_2024_25.url} target="_blank" rel="noopener noreferrer">{t.annualReport}</a></li>
        <li><a href={INDIA_UIP_SCHEDULE.sourceReferences.JE_PROGRAMME.url} target="_blank" rel="noopener noreferrer">{t.jeGuidance}</a></li>
        <li><a href={INDIA_UIP_SCHEDULE.sourceReferences.HPV_PROGRAMME_2026.url} target="_blank" rel="noopener noreferrer">{t.hpvGuidance}</a></li>
      </ul>
    </section>
    <aside className="disclaimer"><span aria-hidden="true">i</span><div><h2>{t.important}</h2><p>{t.disclaimer}</p><small>{t.reviewed}</small></div></aside>
    <footer className="footer screenOnly"><Link href="/">Worklity</Link><span>Simple Tools. Smarter Work.</span></footer>

    <style jsx>{`
      :global(*){box-sizing:border-box}:global(body){margin:0;background:#f5f7fc;color:#16203b}.page{min-height:100vh;overflow-x:clip;background:radial-gradient(circle at 90% 8%,rgba(104,75,190,.09),transparent 24rem),linear-gradient(180deg,#f8f9fe,#f4f7fb);font-family:Arial,Helvetica,sans-serif}.bengali{font-family:Arial,"Noto Sans Bengali",sans-serif}.nav{width:min(1160px,calc(100% - 2rem));min-height:72px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:1rem}.brand{display:flex;align-items:center;gap:.65rem;color:#192052;font-size:1.16rem;font-weight:850;text-decoration:none}.brand span{width:36px;height:36px;display:grid;place-items:center;border-radius:11px;color:#fff;background:linear-gradient(135deg,#302b82,#7452cc)}.language{display:flex;gap:.25rem;padding:.25rem;border:1px solid #dce0ed;border-radius:999px;background:#fff}.language button{min-height:40px;padding:.5rem .85rem;border:0;border-radius:999px;background:transparent;color:#535b73;font-weight:750;cursor:pointer}.language button[aria-pressed=true]{color:#fff;background:#292a76}button:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible,a:focus-visible{outline:3px solid rgba(13,158,166,.42);outline-offset:3px}.hero{position:relative;width:min(1160px,calc(100% - 2rem));margin:.25rem auto 1rem;padding:clamp(2rem,4vw,3.4rem);overflow:hidden;border-radius:28px;color:#fff;background:linear-gradient(125deg,#151b4c,#29266e 58%,#4b348e);box-shadow:0 22px 60px rgba(27,30,87,.18)}.glow{position:absolute;width:280px;height:280px;right:-60px;top:-100px;border-radius:50%;background:radial-gradient(circle,rgba(45,224,211,.32),transparent 68%)}.hero>*:not(.glow){position:relative}.eyebrow{margin:0 0 .55rem;color:#6754bf;font-size:.74rem;font-weight:850;letter-spacing:.12em;text-transform:uppercase}.hero .eyebrow{color:#83e5e2}.hero h1{max-width:850px;margin:0;font-size:clamp(2.1rem,5vw,4.2rem);line-height:1.04;letter-spacing:-.045em}.hero>p:last-child{max-width:650px;margin:1rem 0 0;color:#e4e6f7;font-size:clamp(1rem,2vw,1.13rem)}.inputCard,.scheduleHead,.stageGrid,.hpvCard,.recordSection,.info,.disclaimer{width:min(1060px,calc(100% - 2rem));margin-inline:auto}.inputCard{padding:clamp(1.15rem,3vw,2rem);border:1px solid #e0e4ef;border-radius:22px;background:#fff;box-shadow:0 15px 42px rgba(29,38,84,.09)}.fields{display:grid;grid-template-columns:1fr 1fr;gap:1rem}.fields label,.recordField,.dateField{display:flex;min-width:0;flex-direction:column;gap:.5rem;color:#29304f;font-size:.9rem;font-weight:750}.fields small{color:#787f93;font-size:.72rem}.fields b{color:#7746b4}.fields input,.recordField select,.dateField input{width:100%;min-height:50px;padding:.75rem .85rem;border:1px solid #d8ddea;border-radius:12px;background:#fbfcff;color:#18203d;font:inherit}.actions{display:flex;gap:.75rem;margin-top:1.15rem}.primary,.secondary,.printButton{min-height:48px;padding:.75rem 1.15rem;border-radius:12px;font-weight:800;cursor:pointer}.primary{border:0;color:#fff;background:linear-gradient(135deg,#302c83,#6947b5);box-shadow:0 10px 24px rgba(63,47,144,.23)}.secondary{border:1px solid #d6dae7;color:#343b60;background:#fff}.live{min-height:.2rem}.live p,.recordError{margin:.9rem 0 0;padding:.7rem .85rem;border-left:4px solid #bd3e67;border-radius:8px;color:#812743;background:#fff1f5;font-weight:750}.privacy{margin:1rem 0 0;padding-top:.9rem;border-top:1px solid #edf0f5;color:#687087;font-size:.82rem}.report{margin-top:2.5rem}.scheduleHead{display:flex;align-items:flex-end;justify-content:space-between;gap:1rem;margin-bottom:1rem}.scheduleHead h2{margin:0;color:#192052;font-size:clamp(1.8rem,4vw,2.6rem)}.meta{display:flex;flex-wrap:wrap;gap:.45rem;margin:.55rem 0 0;color:#646c81}.printButton{border:0;color:#fff;background:#27286f;white-space:nowrap}.stageGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.stageCard{--accent:#6b55b8;--tint:#f7f4ff;min-width:0;padding:1.2rem;border:1px solid color-mix(in srgb,var(--accent) 28%,white);border-top:4px solid var(--accent);border-radius:19px;background:linear-gradient(145deg,#fff,var(--tint));box-shadow:0 10px 28px rgba(29,38,78,.07);break-inside:avoid}.rose{--accent:#c65077;--tint:#fff4f7}.green{--accent:#23876f;--tint:#effaf5}.orange{--accent:#c57425;--tint:#fff7ed}.blue{--accent:#3978be;--tint:#f1f7ff}.violet{--accent:#7653bd;--tint:#f7f3ff}.teal{--accent:#168b91;--tint:#effbfb}.pink{--accent:#b84f86;--tint:#fff3fa}.amber{--accent:#a87513;--tint:#fff9e9}.indigo{--accent:#4753a9;--tint:#f3f4ff}.stageTop{display:flex;align-items:center;gap:.7rem}.stageIcon{width:38px;height:38px;display:grid;place-items:center;border-radius:12px;color:#fff;background:var(--accent);font-size:.75rem;font-weight:900}.stageTop h3{margin:0;color:#20274d;font-size:1.08rem}.dateBlock{margin:.95rem 0;padding:.78rem;border-radius:12px;background:rgba(255,255,255,.8);box-shadow:inset 0 0 0 1px rgba(30,40,80,.07)}.dateBlock span{display:block;margin-bottom:.25rem;color:var(--accent);font-size:.7rem;font-weight:850;text-transform:uppercase}.dateBlock strong{display:block;font-size:.93rem;line-height:1.45}.stageCard ul{display:grid;gap:.55rem;margin:0;padding:0;list-style:none}.stageCard li{display:flex;align-items:flex-start;gap:.5rem;color:#343b57;font-size:.88rem}.stageCard li>i{flex:0 0 auto;width:19px;height:19px;display:grid;place-items:center;border-radius:50%;color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,white);font-size:.66rem;font-style:normal}.stageCard li small{display:block;margin-top:.2rem;color:#777d8d;font-size:.7rem}.hpvCard{display:flex;gap:1rem;margin-top:1rem;padding:1.25rem;border:1px solid #d9d4ef;border-radius:19px;background:linear-gradient(135deg,#f8f5ff,#f0fbfb);box-shadow:0 10px 28px rgba(44,45,98,.07);break-inside:avoid}.hpvCard>span{flex:0 0 auto;width:54px;height:54px;display:grid;place-items:center;border-radius:16px;color:#fff;background:linear-gradient(135deg,#6b45aa,#258e98);font-size:.73rem;font-weight:900}.hpvCard h2{margin:0;color:#252a57;font-size:1.1rem}.hpvCard p{margin:.4rem 0 0;color:#646c80;font-size:.86rem;line-height:1.55}.mobilePrint{display:none}.recordSection{margin-top:1.5rem;border:1px solid #dde1ed;border-radius:20px;background:#fff}.recordToggle{width:100%;min-height:74px;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 1.2rem;border:0;border-radius:20px;background:linear-gradient(90deg,#fafaff,#f5fbfb);text-align:left;cursor:pointer}.recordToggle>span{display:flex;flex-direction:column;gap:.25rem}.recordToggle small{align-self:flex-start;padding:.2rem .45rem;border-radius:999px;color:#6352ac;background:#ece9fb;font-weight:800}.recordToggle strong{color:#252b56}.recordToggle em{color:#747b8e;font-size:.8rem;font-style:normal}.recordToggle>b{font-size:1.7rem;color:#51449c}.recordPanel{padding:1.2rem;border-top:1px solid #e8eaf2}.recordSteps{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem}.recordField{margin:0;padding:0;border:0}.recordField>span,.recordField legend,.recordAction>span{display:flex;flex-direction:column;gap:.25rem;margin-bottom:.6rem;color:#343a5b;font-size:.85rem;font-weight:800}.recordField b,.recordAction b{color:#6752b4;font-size:.7rem;text-transform:uppercase}.radio{min-height:40px;display:flex;align-items:center;gap:.5rem;color:#4d546c;font-size:.82rem}.radio input{width:18px;height:18px;accent-color:#5a46aa}.dateField{margin-top:.6rem}.recordAction button{width:100%;min-height:50px;padding:.7rem;border:0;border-radius:12px;color:#fff;background:#1f777f;font-weight:800}.guidance{margin-top:1rem;padding:1rem;border:1px solid #b7dadd;border-radius:13px;background:#effafa;color:#38545e}.guidance h3{margin:0 0 .5rem}.guidance p{margin:.45rem 0 0;font-size:.84rem}.info{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-top:2.5rem}.info details{border:1px solid #e0e4ee;border-radius:14px;background:#fff}.info summary{min-height:52px;padding:1rem;color:#29305b;font-weight:800;cursor:pointer}.info p{margin:0;padding:0 1rem 1rem;color:#626a80;font-size:.88rem;line-height:1.65}.disclaimer{display:flex;gap:1rem;margin-top:1rem;margin-bottom:2rem;padding:1.2rem;border:1px solid #b8d9dc;border-radius:17px;background:#f0fbfb}.disclaimer>span{flex:0 0 auto;width:34px;height:34px;display:grid;place-items:center;border-radius:50%;color:#fff;background:#197d85;font-weight:900}.disclaimer h2{margin:0;font-size:1rem}.disclaimer p{margin:.4rem 0;color:#4d6370;font-size:.85rem;line-height:1.6}.footer{width:min(1160px,calc(100% - 2rem));margin:auto;padding:1.5rem 0 2rem;display:flex;justify-content:space-between;border-top:1px solid #dfe3ec;color:#73798b;font-size:.83rem}.footer a{color:#343878;font-weight:850;text-decoration:none}.printOnly{display:none}
      @media(max-width:820px){.stageGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.recordSteps{grid-template-columns:1fr}}
      @media(max-width:600px){.nav,.hero,.inputCard,.scheduleHead,.stageGrid,.hpvCard,.recordSection,.info,.disclaimer,.footer{width:min(100% - 1.2rem,1060px)}.nav{min-height:66px}.language button{min-height:42px;padding-inline:.65rem}.hero{padding:1.8rem 1.15rem;border-radius:21px}.hero h1{font-size:clamp(2rem,10vw,2.8rem)}.fields{grid-template-columns:1fr}.actions{display:grid;grid-template-columns:1fr}.primary,.secondary{width:100%;min-height:50px}.scheduleHead{align-items:flex-start;flex-direction:column}.scheduleHead .printButton{display:none}.stageGrid{grid-template-columns:1fr}.stageCard{padding:1.05rem}.mobilePrint{display:block;width:calc(100% - 1.2rem);margin:1rem auto 0}.recordToggle{align-items:flex-start}.recordPanel{padding:1rem}.info{grid-template-columns:1fr}.footer{flex-direction:column;gap:.7rem}}
      @media(max-width:380px){.language button{padding-inline:.5rem;font-size:.78rem}.hpvCard{flex-direction:column}.meta{flex-direction:column}.meta span{display:none}}
      @media print{@page{size:A4 portrait;margin:11mm}:global(body){background:#fff!important}.page{min-height:auto;overflow:visible;background:#fff;color:#000}.screenOnly,.info,.footer,.recordSection{display:none!important}.printOnly{display:block}.printHeader{margin-bottom:6mm;padding-bottom:3mm;border-bottom:2px solid #202650}.printHeader h1{margin:1mm 0 0;font-size:19pt}.report{margin:0}.scheduleHead,.stageGrid,.hpvCard,.disclaimer{width:100%;margin-inline:0}.scheduleHead{margin-bottom:4mm}.stageGrid{grid-template-columns:repeat(3,1fr);gap:3mm}.stageCard{padding:3mm;border:1px solid #777;border-top:3px solid var(--accent);border-radius:3mm;background:#fff;box-shadow:none;break-inside:avoid}.dateBlock{margin:2mm 0;padding:2mm;background:#fff;border:1px solid #aaa}.stageCard li{font-size:8pt}.stageCard li small{font-size:6.5pt}.hpvCard{margin-top:4mm;padding:3mm;border:1px solid #777;border-radius:3mm;background:#fff;box-shadow:none}.disclaimer{margin-top:5mm;margin-bottom:0;padding:3mm;border:1px solid #777;border-radius:2mm;background:#fff;break-inside:avoid}.disclaimer>span{display:none}.disclaimer p{color:#222;font-size:7.5pt}}
      .officialReferences{width:min(1060px,calc(100% - 2rem));margin:1rem auto 0;padding:1rem 1.2rem;border:1px solid #dfe3ec;border-radius:16px;background:#fff}.officialReferences h2{margin:0;color:#252b56;font-size:1rem}.officialReferences p{margin:.4rem 0;color:#626a80;font-size:.82rem;line-height:1.55}.officialReferences ul{display:grid;gap:.4rem;margin:.7rem 0 0;padding-left:1.2rem}.officialReferences a{color:#343878;font-size:.82rem;font-weight:750;text-underline-offset:3px}@media(max-width:600px){.officialReferences{width:min(100% - 1.2rem,1060px)}}@media print{.officialReferences{width:100%;margin:4mm 0 0;padding:2.5mm;border:1px solid #777;border-radius:2mm;break-inside:avoid}.officialReferences h2{font-size:9pt}.officialReferences p,.officialReferences a{color:#222;font-size:7pt}.officialReferences ul{gap:1mm;margin:2mm 0 0;padding-left:4mm}}
    `}</style>
  </main>;
}
