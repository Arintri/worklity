"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ToolTabs from "../components/ToolTabs";
import TrustLinks from "../components/TrustLinks";

import {
  MAX_ANNUAL_INTEREST_RATE,
  MAX_PRINCIPAL_RUPEES,
  MAX_TENURE_MONTHS,
  MIN_ANNUAL_INTEREST_RATE,
  MIN_PRINCIPAL_RUPEES,
  MIN_TENURE_MONTHS,
  TENURE_UNITS,
  calculateEMIDetails,
} from "./emiCalculations.mjs";

const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatPaise(value) {
  return rupees.format(value / 100);
}

const errorMessages = {
  PRINCIPAL_REQUIRED: {
    en: "Enter the loan amount.",
    bn: "ঋণের পরিমাণ লিখুন।",
  },
  INVALID_PRINCIPAL: {
    en: "Enter a valid loan amount using numbers only.",
    bn: "শুধু সংখ্যা ব্যবহার করে সঠিক ঋণের পরিমাণ লিখুন।",
  },
  PRINCIPAL_TOO_MANY_DECIMALS: {
    en: "Loan amount can have no more than two decimal places.",
    bn: "ঋণের পরিমাণে দশমিকের পরে সর্বোচ্চ দুইটি ঘর রাখা যাবে।",
  },
  PRINCIPAL_BELOW_MINIMUM: {
    en: `Loan amount must be at least ${rupees.format(MIN_PRINCIPAL_RUPEES)}.`,
    bn: `ঋণের পরিমাণ কমপক্ষে ${rupees.format(MIN_PRINCIPAL_RUPEES)} হতে হবে।`,
  },
  PRINCIPAL_ABOVE_MAXIMUM: {
    en: `Loan amount cannot exceed ${rupees.format(MAX_PRINCIPAL_RUPEES)}.`,
    bn: `ঋণের পরিমাণ ${rupees.format(MAX_PRINCIPAL_RUPEES)}-এর বেশি হতে পারবে না।`,
  },
  ANNUAL_RATE_REQUIRED: {
    en: "Enter the annual interest rate.",
    bn: "বার্ষিক সুদের হার লিখুন।",
  },
  INVALID_ANNUAL_RATE: {
    en: "Enter a valid annual interest rate.",
    bn: "সঠিক বার্ষিক সুদের হার লিখুন।",
  },
  ANNUAL_RATE_BELOW_MINIMUM: {
    en: `Interest rate cannot be below ${MIN_ANNUAL_INTEREST_RATE}%.`,
    bn: `সুদের হার ${MIN_ANNUAL_INTEREST_RATE}%-এর কম হতে পারবে না।`,
  },
  ANNUAL_RATE_ABOVE_MAXIMUM: {
    en: `Interest rate cannot exceed ${MAX_ANNUAL_INTEREST_RATE}%.`,
    bn: `সুদের হার ${MAX_ANNUAL_INTEREST_RATE}%-এর বেশি হতে পারবে না।`,
  },
  TENURE_REQUIRED: {
    en: "Enter the loan tenure.",
    bn: "ঋণের মেয়াদ লিখুন।",
  },
  INVALID_TENURE: {
    en: "Enter a valid loan tenure.",
    bn: "সঠিক ঋণের মেয়াদ লিখুন।",
  },
  TENURE_MUST_BE_WHOLE_MONTHS: {
    en: "The tenure must convert to a whole number of months.",
    bn: "ঋণের মেয়াদটি পূর্ণ সংখ্যক মাসে রূপান্তরযোগ্য হতে হবে।",
  },
  TENURE_BELOW_MINIMUM: {
    en: `Loan tenure must be at least ${MIN_TENURE_MONTHS} month.`,
    bn: `ঋণের মেয়াদ কমপক্ষে ${MIN_TENURE_MONTHS} মাস হতে হবে।`,
  },
  TENURE_ABOVE_MAXIMUM: {
    en: `Loan tenure cannot exceed ${MAX_TENURE_MONTHS} months.`,
    bn: `ঋণের মেয়াদ ${MAX_TENURE_MONTHS} মাসের বেশি হতে পারবে না।`,
  },
  UNSUPPORTED_TENURE_UNIT: {
    en: "Choose Years or Months for the loan tenure.",
    bn: "ঋণের মেয়াদের জন্য বছর অথবা মাস বেছে নিন।",
  },
  EMI_CALCULATION_FAILED: {
    en: "These values could not produce a valid EMI. Check the inputs and try again.",
    bn: "এই মানগুলো দিয়ে সঠিক EMI হিসাব করা যায়নি। ইনপুট যাচাই করে আবার চেষ্টা করুন।",
  },
  EMI_DOES_NOT_REDUCE_PRINCIPAL: {
    en: "This rate and tenure produce an instalment that does not reduce the loan. Try a shorter tenure or different values.",
    bn: "এই সুদ ও মেয়াদে কিস্তি ঋণের মূল টাকা কমাচ্ছে না। কম মেয়াদ বা অন্য মান দিয়ে চেষ্টা করুন।",
  },
  EMI_REPAYS_BEFORE_FINAL_MONTH: {
    en: "These values produce an inconsistent repayment schedule. Check the inputs and try again.",
    bn: "এই মানগুলোতে পরিশোধের সময়সূচি সঠিক হচ্ছে না। ইনপুট যাচাই করে আবার চেষ্টা করুন।",
  },
  INVALID_SCHEDULE_INPUT: {
    en: "A valid repayment schedule could not be created.",
    bn: "সঠিক পরিশোধের সময়সূচি তৈরি করা যায়নি।",
  },
  INVALID_SCHEDULE_VALUE: {
    en: "The repayment schedule contains an invalid value. Check the inputs and try again.",
    bn: "পরিশোধের সময়সূচিতে একটি ভুল মান পাওয়া গেছে। ইনপুট যাচাই করে আবার চেষ্টা করুন।",
  },
  SCHEDULE_RECONCILIATION_FAILED: {
    en: "The repayment totals could not be reconciled. Check the inputs and try again.",
    bn: "পরিশোধের মোট হিসাব মেলানো যায়নি। ইনপুট যাচাই করে আবার চেষ্টা করুন।",
  },
};

export default function EMICalculatorClient() {
  const [lang, setLang] = useState("en");
  const [principal, setPrincipal] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureUnit, setTenureUnit] = useState(TENURE_UNITS.YEARS);
  const [result, setResult] = useState(null);
  const [errorCode, setErrorCode] = useState("");

  const bn = lang === "bn";

  const calculate = (event) => {
    event.preventDefault();

    const calculated = calculateEMIDetails({
      principal,
      annualRate,
      tenure,
      tenureUnit,
    });

    if (!calculated.ok) {
      setResult(null);
      setErrorCode(calculated.error);
      return;
    }

    setErrorCode("");
    setResult(calculated);
  };

  const reset = () => {
    setPrincipal("");
    setAnnualRate("");
    setTenure("");
    setTenureUnit(TENURE_UNITS.YEARS);
    setResult(null);
    setErrorCode("");
  };

  const errorMessage = errorCode
    ? errorMessages[errorCode]?.[lang] ||
      (bn
        ? "হিসাব করা যায়নি। ইনপুট যাচাই করে আবার চেষ্টা করুন।"
        : "The calculation could not be completed. Check the inputs and try again.")
    : "";

  const finalAdjusted = result?.schedule.some(
    (row) => row.isFinalAdjustedPayment
  );

  return (
    <main className="emiPage">
      <header className="emiNav">
        <Link className="emiBrand" href="/" aria-label="Worklity home">
          <Image src="/brand/worklity-mark.png" alt="" width={40} height={40} style={{ display: "block", flex: "0 0 40px", width: 40, height: 40, objectFit: "contain" }} />
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

      <ToolTabs language={lang} />

      <section className="emiHero">
        <span>{bn ? "ঋণ ও EMI" : "LOAN & EMI"}</span>
        <h1>{bn ? "EMI ক্যালকুলেটর" : "EMI Calculator"}</h1>
        <p>
          {bn
            ? "ঋণের পরিমাণ, বার্ষিক সুদের হার ও মেয়াদ লিখে মাসিক EMI, মোট সুদ এবং সম্পূর্ণ পরিশোধের সময়সূচি দেখুন।"
            : "Enter the loan amount, annual interest rate and tenure to see the monthly EMI, total interest and complete repayment schedule."}
        </p>
      </section>

      <div className="calculatorLayout">
        <section className="calculatorCard" aria-labelledby="calculator-title">
          <div className="cardIntro">
            <span aria-hidden="true">₹</span>
            <div>
              <h2 id="calculator-title">
                {bn ? "আপনার ঋণের হিসাব করুন" : "Calculate your loan EMI"}
              </h2>
              <p>
                {bn
                  ? "তিনটি তথ্য লিখে হিসাব দেখুন।"
                  : "Enter three details to get your estimate."}
              </p>
            </div>
          </div>

          <form onSubmit={calculate} noValidate>
            <div className="inputGrid">
              <div className="field principalField">
                <label htmlFor="loan-amount">
                  {bn ? "ঋণের পরিমাণ (₹)" : "Loan Amount (₹)"}
                </label>
                <input
                  id="loan-amount"
                  type="number"
                  inputMode="decimal"
                  min={MIN_PRINCIPAL_RUPEES}
                  max={MAX_PRINCIPAL_RUPEES}
                  step="0.01"
                  value={principal}
                  onChange={(event) => setPrincipal(event.target.value)}
                  placeholder={bn ? "যেমন: ৫০০০০০" : "e.g. 500000"}
                  aria-invalid={Boolean(errorCode?.includes("PRINCIPAL"))}
                />
              </div>

              <div className="field">
                <label htmlFor="annual-rate">
                  {bn ? "বার্ষিক সুদের হার (%)" : "Annual Interest Rate (%)"}
                </label>
                <input
                  id="annual-rate"
                  type="number"
                  inputMode="decimal"
                  min={MIN_ANNUAL_INTEREST_RATE}
                  max={MAX_ANNUAL_INTEREST_RATE}
                  step="any"
                  value={annualRate}
                  onChange={(event) => setAnnualRate(event.target.value)}
                  placeholder={bn ? "যেমন: ৮.৫" : "e.g. 8.5"}
                  aria-invalid={Boolean(errorCode?.includes("RATE"))}
                />
              </div>

              <div className="field tenureField">
                <label htmlFor="loan-tenure">
                  {bn ? "ঋণের মেয়াদ" : "Loan Tenure"}
                </label>
                <div className="tenureControl">
                  <input
                    id="loan-tenure"
                    type="number"
                    inputMode="decimal"
                    min={
                      tenureUnit === TENURE_UNITS.MONTHS
                        ? MIN_TENURE_MONTHS
                        : MIN_TENURE_MONTHS / 12
                    }
                    max={
                      tenureUnit === TENURE_UNITS.MONTHS
                        ? MAX_TENURE_MONTHS
                        : MAX_TENURE_MONTHS / 12
                    }
                    step="any"
                    value={tenure}
                    onChange={(event) => setTenure(event.target.value)}
                    placeholder={bn ? "যেমন: ৫" : "e.g. 5"}
                    aria-invalid={Boolean(errorCode?.includes("TENURE"))}
                  />
                  <select
                    value={tenureUnit}
                    onChange={(event) => setTenureUnit(event.target.value)}
                    aria-label={bn ? "মেয়াদের একক" : "Tenure unit"}
                  >
                    <option value={TENURE_UNITS.YEARS}>
                      {bn ? "বছর" : "Years"}
                    </option>
                    <option value={TENURE_UNITS.MONTHS}>
                      {bn ? "মাস" : "Months"}
                    </option>
                  </select>
                </div>
                <small>
                  {bn
                    ? `সর্বোচ্চ ${MAX_TENURE_MONTHS} মাস; বছর লিখলে তা পূর্ণ মাসে হতে হবে।`
                    : `Maximum ${MAX_TENURE_MONTHS} months; years must convert to whole months.`}
                </small>
              </div>
            </div>

            <div className="formActions">
              <button className="calculateButton" type="submit">
                {bn ? "EMI হিসাব করুন" : "Calculate EMI"}
              </button>
              <button className="resetButton" type="button" onClick={reset}>
                {bn ? "রিসেট" : "Reset"}
              </button>
            </div>
          </form>

          <div className="messageRegion" aria-live="polite" aria-atomic="true">
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          </div>

          {result && (
            <section className="resultsPanel" aria-live="polite" aria-atomic="true">
              <div className="primaryResult">
                <span>{bn ? "মাসিক EMI" : "MONTHLY EMI"}</span>
                <strong>{formatPaise(result.regularEMIPaise)}</strong>
                <p>
                  {bn
                    ? `${result.instalmentCount}টি মাসিক কিস্তির নিয়মিত পরিমাণ`
                    : `Regular payment for ${result.instalmentCount} monthly instalments`}
                </p>
              </div>

              <div className="summaryGrid">
                <div>
                  <span>{bn ? "মূল ঋণের পরিমাণ" : "Principal Amount"}</span>
                  <strong>{formatPaise(result.totalPrincipalPaise)}</strong>
                </div>
                <div>
                  <span>{bn ? "মোট সুদ" : "Total Interest"}</span>
                  <strong>{formatPaise(result.totalInterestPaise)}</strong>
                </div>
                <div>
                  <span>{bn ? "মোট পরিশোধ" : "Total Amount Payable"}</span>
                  <strong>{formatPaise(result.totalPaymentPaise)}</strong>
                </div>
                <div>
                  <span>{bn ? "মোট কিস্তি" : "Number of Instalments"}</span>
                  <strong>
                    {result.instalmentCount} {bn ? "মাস" : "months"}
                  </strong>
                </div>
              </div>
            </section>
          )}
        </section>

        <aside className="methodCard">
          <span aria-hidden="true">%</span>
          <h2>{bn ? "রিডিউসিং-ব্যালান্স হিসাব" : "Reducing-balance estimate"}</h2>
          <p>
            {bn
              ? "প্রতি মাসে বাকি মূল টাকার উপর সুদ হিসাব করা হয়। মূল টাকা কমলে পরের মাসের সুদের অংশও কমে।"
              : "Interest is calculated each month on the remaining principal. As the balance falls, the interest portion also falls."}
          </p>
          <small>
            {bn
              ? "এই হিসাবটি সাধারণ তথ্যের জন্য; ঋণদাতার প্রকৃত হিসাব আলাদা হতে পারে।"
              : "This is a general estimate; an actual lender calculation may differ."}
          </small>
        </aside>
      </div>

      {result && (
        <section className="scheduleSection" aria-labelledby="schedule-title">
          <div className="scheduleHeading">
            <div>
              <span>{bn ? "মাসভিত্তিক বিবরণ" : "MONTH-BY-MONTH DETAILS"}</span>
              <h2 id="schedule-title">
                {bn ? "ঋণ পরিশোধের সময়সূচি" : "Amortization Schedule"}
              </h2>
            </div>
            <p className="scrollCue">
              <span aria-hidden="true">↔</span>{" "}
              {bn
                ? "সব কলাম দেখতে টেবিলটি পাশে স্ক্রল করুন"
                : "Scroll the table sideways to see every column"}
            </p>
          </div>

          {finalAdjusted && (
            <p className="roundingNote">
              {bn
                ? "পয়সা রাউন্ড করার কারণে শেষ কিস্তিটি নিয়মিত EMI থেকে সামান্য আলাদা হতে পারে। এটি বাকি মূল টাকা ঠিকভাবে শূন্য করার জন্য সমন্বয় করা হয়েছে।"
                : "Because values are rounded to paise, the final payment may differ slightly from the regular EMI. It is adjusted only to clear the remaining principal exactly."}
            </p>
          )}

          <div className="tableScroll" tabIndex="0">
            <table>
              <caption className="srOnly">
                {bn
                  ? "সম্পূর্ণ মাসভিত্তিক ঋণ পরিশোধের সময়সূচি"
                  : "Complete month-wise loan repayment schedule"}
              </caption>
              <thead>
                <tr>
                  <th scope="col">{bn ? "মাস" : "Month"}</th>
                  <th scope="col">{bn ? "শুরুর বাকি টাকা" : "Opening Balance"}</th>
                  <th scope="col">{bn ? "EMI / পরিশোধ" : "EMI / Payment"}</th>
                  <th scope="col">{bn ? "সুদ" : "Interest"}</th>
                  <th scope="col">{bn ? "মূল টাকা পরিশোধ" : "Principal Repaid"}</th>
                  <th scope="col">{bn ? "শেষের বাকি টাকা" : "Closing Balance"}</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((row) => (
                  <tr key={row.month}>
                    <th scope="row">{row.month}</th>
                    <td>{formatPaise(row.openingBalancePaise)}</td>
                    <td>
                      {formatPaise(row.paymentPaise)}
                      {row.isFinalAdjustedPayment && (
                        <small className="adjustedLabel">
                          {bn ? "সমন্বিত শেষ কিস্তি" : "Adjusted final payment"}
                        </small>
                      )}
                    </td>
                    <td>{formatPaise(row.interestPaise)}</td>
                    <td>{formatPaise(row.principalRepaidPaise)}</td>
                    <td>{formatPaise(row.closingBalancePaise)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="information">
        <article>
          <h2>{bn ? "EMI কী?" : "What Is EMI?"}</h2>
          <p>
            {bn
              ? "EMI হলো ঋণ পরিশোধের জন্য প্রতি মাসে দেওয়া নির্ধারিত কিস্তি। এতে মূল টাকা ও সুদ—দুই অংশই থাকে।"
              : "EMI is the regular monthly instalment used to repay a loan. Each payment contains both principal and interest."}
          </p>
        </article>

        <article>
          <h2>{bn ? "EMI কীভাবে হিসাব করা হয়" : "How EMI Is Calculated"}</h2>
          <p className="formula" aria-label="EMI formula">
            EMI = P × r × (1+r)<sup>n</sup> / ((1+r)<sup>n</sup> − 1)
          </p>
          <p>
            {bn
              ? "এখানে P হলো ঋণের মূল টাকা, r হলো মাসিক সুদের হার এবং n হলো মোট মাসিক কিস্তির সংখ্যা। মাসিক হার = বার্ষিক সুদের হার ÷ ১২ ÷ ১০০। সুদ ০% হলে EMI = মূল টাকা ÷ মোট মাস।"
              : "P is the loan principal, r is the monthly interest rate, and n is the number of monthly instalments. Monthly rate = annual interest rate ÷ 12 ÷ 100. At 0% interest, EMI equals principal divided by the number of months."}
          </p>
        </article>

        <article>
          <h2>{bn ? "রিডিউসিং-ব্যালান্স পদ্ধতি" : "Reducing Balance Method"}</h2>
          <p>
            {bn
              ? "প্রতি কিস্তিতে মূল টাকা কিছুটা কমে। পরের মাসের সুদ তখন আগের চেয়ে কম বাকি মূল টাকার উপর হিসাব হয়। সব ঋণদাতা একই নিয়ম ও রাউন্ডিং ব্যবহার করেন—এমন নয়।"
              : "Each instalment reduces some principal. The next month’s interest is then calculated on the lower outstanding balance. Not every lender uses exactly the same rules or rounding."}
          </p>
        </article>

        <article>
          <h2>{bn ? "মূল টাকা ও সুদ বুঝুন" : "Understanding Principal and Interest"}</h2>
          <p>
            {bn
              ? "মূল টাকা হলো ধার নেওয়া অর্থ। সুদ হলো সেই অর্থ ব্যবহারের খরচ। সাধারণত শুরুর কিস্তিতে সুদের অংশ বেশি থাকে এবং পরে মূল টাকা পরিশোধের অংশ বাড়ে।"
              : "Principal is the amount borrowed; interest is the cost of borrowing it. Early instalments usually contain more interest, while the principal portion generally grows later."}
          </p>
        </article>

        <article className="wideArticle">
          <h2>{bn ? "পরিশোধের সময়সূচি কীভাবে পড়বেন" : "How to Read the Repayment Schedule"}</h2>
          <p>
            {bn
              ? "প্রতিটি সারিতে মাসের শুরুর বাকি টাকা, সেই মাসের কিস্তি, সুদ, পরিশোধ হওয়া মূল টাকা এবং কিস্তির পর বাকি টাকা দেখানো হয়। পয়সার রাউন্ডিং মেলাতে শেষ কিস্তি সামান্য সমন্বয় হতে পারে।"
              : "Each row shows the opening balance, that month’s payment, interest, principal repaid and the balance after payment. The final instalment may be adjusted slightly to reconcile paise rounding."}
          </p>
        </article>

        <article className="disclaimerArticle">
          <h2>{bn ? "গুরুত্বপূর্ণ তথ্য" : "Important Information"}</h2>
          <p>
            {bn
              ? "এই ক্যালকুলেটর মাসিক রিডিউসিং-ব্যালান্স সূত্র ব্যবহার করে একটি আনুমানিক হিসাব দেখায়। ঋণদাতার নিয়ম, সুদের হার পরিবর্তন, ফি, কর, বিমা, রাউন্ডিং ও অন্যান্য চার্জের কারণে প্রকৃত EMI, সুদ ও মোট পরিশোধের পরিমাণ আলাদা হতে পারে। এটি সাধারণ তথ্যের জন্য; আর্থিক পরামর্শ বা ঋণের প্রস্তাব নয়।"
              : "This calculator provides an estimate using a standard monthly reducing-balance formula. Actual lender EMI, interest and repayment amounts may differ because of lender policies, rate changes, fees, taxes, insurance, rounding and other charges. It is for general information and is not financial advice or a loan offer."}
          </p>
          <p>
            {bn
              ? "এই সংস্করণে প্রসেসিং ফি, GST, বিমা, জরিমানা, আগাম পরিশোধ বা পরিবর্তনশীল সুদের হার অন্তর্ভুক্ত নয়।"
              : "This version does not include processing fees, GST, insurance, penalties, prepayments or floating-rate changes."}
          </p>
        </article>

        <article className="faqArticle">
          <h2>{bn ? "সাধারণ প্রশ্ন" : "Frequently Asked Questions"}</h2>

          <h3>{bn ? "মাসিক EMI কীভাবে নির্ধারিত হয়?" : "How is the monthly EMI determined?"}</h3>
          <p>
            {bn
              ? "ঋণের মূল টাকা, মাসিক সুদের হার এবং মোট কিস্তির সংখ্যা ব্যবহার করে EMI হিসাব করা হয়।"
              : "It is calculated from the principal, monthly interest rate and total number of instalments."}
          </p>

          <h3>{bn ? "০% সুদ দেওয়া যাবে?" : "Can I enter 0% interest?"}</h3>
          <p>
            {bn
              ? "হ্যাঁ। তখন মূল টাকা মোট মাস দিয়ে ভাগ করে মাসিক কিস্তি হিসাব করা হয়।"
              : "Yes. The principal is then divided by the total number of months."}
          </p>

          <h3>{bn ? "শেষ কিস্তি আলাদা হতে পারে কেন?" : "Why might the final payment be different?"}</h3>
          <p>
            {bn
              ? "প্রতি মাসের টাকা পয়সায় রাউন্ড করা হয়। বাকি মূল টাকা ঠিক শূন্য করতে শেষ কিস্তিতে অল্প সমন্বয় হতে পারে।"
              : "Monthly values are rounded to paise, so the final payment may be adjusted slightly to clear the exact remaining principal."}
          </p>

          <h3>{bn ? "ব্যাংকের EMI কি একই হবে?" : "Will my lender’s EMI be identical?"}</h3>
          <p>
            {bn
              ? "সব সময় নয়। ঋণদাতার নিয়ম, ফি, রাউন্ডিং, হারের পরিবর্তন ও অন্যান্য চার্জের কারণে পার্থক্য হতে পারে।"
              : "Not always. Lender rules, fees, rounding, rate changes and other charges can produce a different result."}
          </p>

          <h3>{bn ? "এটি কি আর্থিক পরামর্শ?" : "Is this financial advice?"}</h3>
          <p>
            {bn
              ? "না। এটি সাধারণ তথ্য ও আনুমানিক হিসাবের জন্য, আর্থিক পরামর্শ বা ঋণের প্রস্তাব নয়।"
              : "No. It is for general information and estimation, not financial advice or a loan offer."}
          </p>
        </article>
      </section>

      <TrustLinks language={lang} />

      <style jsx>{`
        .emiPage{--navy:#111a3a;--indigo:#29377a;--violet:#7656d8;--cyan:#25a6b8;--ink:#17213f;--muted:#657089;min-width:0;min-height:100vh;overflow-x:hidden;color:var(--ink);background:radial-gradient(circle at 3% 34%,rgba(118,86,216,.07),transparent 28rem),radial-gradient(circle at 98% 62%,rgba(37,166,184,.07),transparent 28rem),#f7f8fc}.emiNav{position:relative;z-index:10;display:flex;min-height:78px;max-width:1180px;margin:auto;padding:10px 22px;align-items:center;justify-content:space-between;border-bottom:1px solid #e5e8f1;background:rgba(255,255,255,.94);backdrop-filter:blur(14px)}:global(.emiBrand){display:flex;align-items:center;gap:10px;color:var(--navy);font-size:23px;font-weight:800;letter-spacing:-.025em}:global(.emiBrand span){display:grid;width:40px;height:40px;place-items:center;border-radius:11px;color:#fff;background:linear-gradient(145deg,var(--indigo),var(--violet));box-shadow:0 9px 22px rgba(72,58,153,.22)}.navActions,.languageSwitch{display:flex;align-items:center}.navActions{gap:14px}.languageSwitch{padding:4px;border:1px solid #dde1ed;border-radius:13px;background:#f3f5fa}.languageButton{min-height:40px;padding:9px 14px;border:0;border-radius:9px;color:#59637b;background:transparent;box-shadow:none;cursor:pointer}.languageButton[aria-pressed=true]{color:#fff;background:linear-gradient(135deg,var(--indigo),var(--violet));box-shadow:0 6px 16px rgba(63,54,147,.22)}:global(.homeLink){display:inline-flex;min-height:44px;align-items:center;color:#4d5872;font-weight:700}.emiHero{position:relative;isolation:isolate;overflow:hidden;padding:52px 20px 82px;text-align:center;background:linear-gradient(135deg,rgba(245,247,255,.98),rgba(245,240,255,.95) 58%,rgba(236,250,250,.94));border-bottom:1px solid rgba(105,91,180,.12)}.emiHero:before,.emiHero:after{position:absolute;z-index:-1;border-radius:50%;content:""}.emiHero:before{width:280px;height:280px;top:-200px;left:10%;border:1px solid rgba(118,86,216,.17);box-shadow:0 0 0 32px rgba(118,86,216,.035)}.emiHero:after{width:190px;height:190px;right:9%;bottom:-132px;background:linear-gradient(145deg,rgba(37,166,184,.15),rgba(118,86,216,.08))}.emiHero>span{display:inline-flex;padding:8px 12px;border:1px solid rgba(118,86,216,.2);border-radius:99px;color:#5541b1;background:rgba(255,255,255,.78);font-size:13px;font-weight:900;letter-spacing:.08em}.emiHero h1{max-width:850px;margin:19px auto 12px;color:var(--navy);font-size:clamp(39px,5vw,60px);line-height:1.07;letter-spacing:-.045em;text-wrap:balance}.emiHero p{max-width:760px;margin:auto;color:#5d6882;font-size:17.5px;line-height:1.6;text-wrap:balance}.calculatorLayout{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,2.05fr) minmax(270px,.85fr);gap:22px;max-width:1080px;margin:-43px auto 64px;padding:0 20px;align-items:start}.calculatorCard,.methodCard,.scheduleSection,.information article{min-width:0;border:1px solid rgba(76,68,143,.14);background:rgba(255,255,255,.97);box-shadow:0 22px 58px rgba(31,39,82,.1)}.calculatorCard{padding:30px;border-radius:24px}.cardIntro{display:flex;align-items:center;gap:15px;margin-bottom:24px}.cardIntro>span{display:grid;width:51px;height:51px;flex:0 0 51px;place-items:center;border-radius:15px;color:#fff;background:linear-gradient(145deg,var(--indigo),var(--violet));box-shadow:0 10px 24px rgba(69,54,154,.22);font-size:22px;font-weight:900}.cardIntro h2{margin:0;color:var(--navy);font-size:24px}.cardIntro p{margin:4px 0 0;color:var(--muted)}.inputGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 14px}.principalField,.tenureField{grid-column:1/-1}.field label{display:block;margin-bottom:9px;color:var(--indigo);font-weight:800}.field input,.field select{width:100%;min-height:54px;padding:13px 14px;border:1px solid #ccd3e3;border-radius:12px;color:var(--navy);background:#fff;font-size:16px;font-weight:650;box-shadow:0 3px 8px rgba(31,39,82,.04)}.field input:focus,.field select:focus{border-color:var(--violet);outline:none;box-shadow:0 0 0 4px rgba(118,86,216,.14)}.field input[aria-invalid=true]{border-color:#b44c68}.field{margin-bottom:18px}.field small{display:block;margin-top:8px;color:var(--muted);font-size:13px;line-height:1.45}.tenureControl{display:grid;grid-template-columns:minmax(0,1fr) minmax(118px,.38fr);gap:9px}.formActions{display:flex;gap:10px}.calculateButton,.resetButton{min-height:48px;padding:12px 19px;border-radius:11px;font-weight:800;cursor:pointer}.calculateButton{border:0;color:#fff;background:linear-gradient(135deg,var(--indigo),var(--violet));box-shadow:0 11px 24px rgba(64,52,146,.22)}.resetButton{border:1px solid #d6dbe8;color:var(--indigo);background:#fff}.messageRegion:empty{display:none}.errorMessage{margin:22px 0 0;padding:15px 17px;border:1px solid rgba(177,66,97,.2);border-left:4px solid #b74667;border-radius:12px;color:#77354a;background:#fff4f7;line-height:1.55}.resultsPanel{margin-top:26px}.primaryResult{position:relative;overflow:hidden;padding:27px;border-radius:19px;color:#fff;background:radial-gradient(circle at 92% 5%,rgba(54,204,208,.24),transparent 29%),linear-gradient(135deg,#121b3d,#293474 63%,#5543a5);box-shadow:0 18px 38px rgba(26,31,83,.22)}.primaryResult>span{display:block;color:#92e4e7;font-size:12px;font-weight:900;letter-spacing:.1em}.primaryResult>strong{display:block;margin-top:9px;font-size:clamp(30px,4.4vw,43px);line-height:1.18;letter-spacing:-.025em;overflow-wrap:anywhere}.primaryResult p{margin:13px 0 0;color:rgba(245,247,255,.82);line-height:1.5}.summaryGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:11px}.summaryGrid>div{min-width:0;padding:16px;border:1px solid #e1e4ee;border-radius:13px;background:#fafbfe}.summaryGrid span{display:block;color:var(--muted);font-size:13px;font-weight:700}.summaryGrid strong{display:block;margin-top:7px;color:var(--navy);font-size:17px;line-height:1.35;overflow-wrap:anywhere}.methodCard{padding:27px;border-radius:22px}.methodCard>span{display:grid;width:54px;height:54px;margin-bottom:20px;place-items:center;border-radius:16px;color:#147f91;background:#e5f7f8;font-size:21px;font-weight:900}.methodCard h2{margin:0;color:var(--navy);font-size:23px;line-height:1.25}.methodCard p{color:var(--muted);line-height:1.65}.methodCard small{display:block;padding-top:14px;border-top:1px solid #e7e9f1;color:#626d84;line-height:1.5}.scheduleSection{max-width:1160px;margin:0 auto 64px;padding:30px;border-radius:24px}.scheduleHeading{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:20px}.scheduleHeading>div>span{color:#6550bd;font-size:12px;font-weight:900;letter-spacing:.09em}.scheduleHeading h2{margin:8px 0 0;color:var(--navy);font-size:clamp(27px,3.5vw,38px);letter-spacing:-.035em}.scrollCue{max-width:310px;margin:0;color:var(--muted);font-size:14px;line-height:1.45}.scrollCue span{color:var(--cyan);font-weight:900}.roundingNote{margin:0 0 18px;padding:14px 16px;border:1px solid rgba(118,86,216,.17);border-left:4px solid var(--violet);border-radius:11px;color:#58627a;background:linear-gradient(135deg,rgba(118,86,216,.06),rgba(37,166,184,.045));line-height:1.55}.tableScroll{max-width:100%;overflow-x:auto;border:1px solid #dfe3ed;border-radius:14px;background:#fff;box-shadow:inset -16px 0 18px -20px rgba(17,26,58,.55)}table{width:100%;min-width:980px;border-collapse:separate;border-spacing:0}th,td{padding:13px 14px;border-bottom:1px solid #e6e8f0;text-align:right;white-space:nowrap}thead th{position:sticky;top:0;z-index:2;color:#eef1ff;background:#202c62;font-size:12px;letter-spacing:.035em}thead th:first-child{z-index:4;border-radius:12px 0 0 0}thead th:last-child{border-radius:0 12px 0 0}tbody th{position:sticky;left:0;z-index:1;color:var(--indigo);background:#f8f9fd;text-align:center}tbody td{color:#4f5a73;font-variant-numeric:tabular-nums}tbody tr:nth-child(even) td{background:#fafbfe}tbody tr:last-child th,tbody tr:last-child td{border-bottom:0}.adjustedLabel{display:block;margin-top:4px;color:#6550bd;font-size:11px;font-weight:800}.srOnly{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.information{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;max-width:960px;margin:0 auto 85px;padding:0 20px}.information article{padding:28px;border-radius:20px}.information h2{margin:0 0 12px;color:var(--navy);font-size:25px;line-height:1.22;letter-spacing:-.025em}.information h3{margin:22px 0 6px;padding-top:15px;border-top:1px solid #e7e9f1;color:var(--indigo);font-size:17px}.information p{margin:0;color:var(--muted);line-height:1.7}.formula{margin:15px 0!important;padding:15px;border:1px solid #e0e4ef;border-radius:11px;color:var(--indigo)!important;background:#f7f5ff;font-size:17px;font-weight:800;overflow-wrap:anywhere}.wideArticle,.disclaimerArticle,.faqArticle{grid-column:1/-1}.disclaimerArticle{border-left:4px solid var(--violet)!important;background:linear-gradient(135deg,rgba(118,86,216,.06),rgba(37,166,184,.045))!important}.disclaimerArticle p+p{margin-top:12px}.languageButton:focus-visible,:global(.emiBrand:focus-visible),:global(.homeLink:focus-visible),.calculateButton:focus-visible,.resetButton:focus-visible,.tableScroll:focus-visible{outline:3px solid rgba(37,166,184,.58);outline-offset:3px}@media(max-width:820px){.calculatorLayout{grid-template-columns:1fr}.methodCard{box-shadow:0 15px 35px rgba(31,39,82,.08)}.scheduleSection{margin-right:20px;margin-left:20px}.information{grid-template-columns:1fr}.information article,.wideArticle,.disclaimerArticle,.faqArticle{grid-column:1}}@media(max-width:560px){.emiNav{min-height:auto;padding:12px 15px;flex-wrap:wrap;gap:10px}.navActions{width:100%;justify-content:space-between}.languageButton{min-height:44px;padding:9px 12px}.emiHero{padding:37px 18px 68px}.emiHero h1{margin-top:17px;font-size:clamp(35px,10.5vw,47px)}.emiHero p{font-size:16.5px}.calculatorLayout{margin-top:-34px;padding:0 14px}.calculatorCard{padding:20px;border-radius:20px}.cardIntro{align-items:flex-start}.cardIntro h2{font-size:21px}.inputGrid,.summaryGrid{grid-template-columns:1fr}.principalField,.tenureField{grid-column:auto}.tenureControl{grid-template-columns:minmax(0,1fr) 112px}.formActions{display:grid;grid-template-columns:1fr}.calculateButton,.resetButton{width:100%;min-height:48px}.primaryResult{padding:22px 18px}.methodCard{padding:22px}.scheduleSection{margin:0 14px 52px;padding:22px 18px;border-radius:20px}.scheduleHeading{display:block}.scrollCue{margin-top:10px}.tableScroll{margin-right:-2px}.information{gap:14px;margin-bottom:60px;padding:0 14px}.information article{padding:22px 19px}.information h2{font-size:23px}}
      `}</style>
    </main>
  );
}
