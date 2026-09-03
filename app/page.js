"use client";

import { useState } from "react";
import Link from "next/link";
import ToolTabs from "./components/ToolTabs";

export default function Home() {
  const [lang, setLang] = useState("en");
  const bn = lang === "bn";

  const tools = [
    {
      categoryEn: "Land & Area",
      categoryBn: "জমি ও মাপ",
      en: "Land Area Calculator",
      bn: "জমির মাপ ক্যালকুলেটর",
      enDesc: "Convert land area into Katha, Bigha, Decimal, Acre and more.",
      bnDesc: "জমির মাপ কাঠা, বিঘা, ডেসিমেল, একরসহ বিভিন্ন এককে দেখুন।",
      link: "/land-area-calculator",
      icon: "⌗",
      accent: "violet",
      active: true,
    },
    {
      categoryEn: "Finance",
      categoryBn: "শতাংশের হিসাব",
      en: "Percentage Calculator",
      bn: "শতাংশ ক্যালকুলেটর",
      enDesc: "Calculate percentage, percentage increase or decrease.",
      bnDesc: "শতাংশ এবং শতাংশ কতটা বেড়েছে বা কমেছে সহজে হিসাব করুন।",
      link: "/percentage-calculator",
      icon: "%",
      accent: "cyan",
      active: true,
    },
    {
      categoryEn: "Date & Time",
      categoryBn: "বয়স ও তারিখ",
      en: "Age Calculator",
      bn: "বয়স ক্যালকুলেটর",
      enDesc: "Find age in years, months and days or calculate age on any date.",
      bnDesc: "বছর, মাস ও দিনে বয়স দেখুন বা নির্দিষ্ট তারিখে বয়স হিসাব করুন।",
      link: "/age-calculator",
      icon: "◷",
      accent: "indigo",
      active: true,
    },
    {
      categoryEn: "Pregnancy & Dates",
      categoryBn: "গর্ভকাল ও তারিখ",
      en: "Pregnancy EDD Calculator",
      bn: "প্রেগন্যান্সি EDD ক্যালকুলেটর",
      enDesc:
        "Estimate your due date and pregnancy timeline from the first day of your last period.",
      bnDesc:
        "শেষ মাসিকের প্রথম দিন থেকে আনুমানিক প্রসবের তারিখ ও গর্ভকাল হিসাব করুন।",
      enAction: "Calculate Due Date",
      bnAction: "প্রসবের তারিখ হিসাব করুন",
      link: "/edd-calculator",
      icon: "✦",
      accent: "violet",
      active: true,
    },
    {
      categoryEn: "Loans & Finance",
      categoryBn: "ঋণ ও ফাইন্যান্স",
      en: "Loan EMI Calculator",
      bn: "লোন EMI ক্যালকুলেটর",
      enDesc:
        "Calculate monthly EMI, total interest and repayment with a detailed loan schedule.",
      bnDesc:
        "মাসিক EMI, মোট সুদ ও মোট পরিশোধের হিসাবসহ বিস্তারিত ঋণ পরিশোধের সূচি দেখুন।",
      enAction: "Calculate EMI",
      bnAction: "EMI হিসাব করুন",
      link: "/emi-calculator",
      icon: "₹",
      accent: "cyan",
      active: true,
    },
    {
      categoryEn: "Child Health",
      categoryBn: "শিশুর টিকাদান",
      en: "Vaccination Due Date Calculator",
      bn: "টিকাদান তারিখ ক্যালকুলেটর",
      enDesc:
        "See a child's vaccination schedule from date of birth based on India's immunization schedule.",
      bnDesc: "শিশুর জন্মতারিখ থেকে ভারতের টিকাদান সময়সূচি দেখুন।",
      enAction: "View Vaccine Schedule",
      bnAction: "টিকাদান সময়সূচি দেখুন",
      link: "/vaccination-calculator",
      icon: "✚",
      accent: "indigo",
      active: true,
    },
    {
      categoryEn: "Office & Data",
      categoryBn: "অফিস ও ডাটা",
      en: "Office & Data Tools",
      bn: "অফিস ও ডাটার টুল",
      enDesc: "Helpful spreadsheet and data tools are being prepared.",
      bnDesc: "স্প্রেডশিট ও ডাটার কাজে নতুন টুল তৈরি হচ্ছে।",
      icon: "▦",
      accent: "muted",
      active: false,
    },
  ];

  const values = [
    {
      icon: "✓",
      en: "Free practical tools",
      bn: "ফ্রি দরকারি টুল",
      enDesc: "Open a calculator and start right away.",
      bnDesc: "ক্যালকুলেটর খুলে সঙ্গে সঙ্গে কাজ শুরু করুন।",
    },
    {
      icon: "↗",
      en: "Simple to use",
      bn: "ব্যবহার করা সহজ",
      enDesc: "Clear inputs and results without unnecessary steps.",
      bnDesc: "কম ধাপে সহজ ইনপুট দিন, পরিষ্কার ফল দেখুন।",
    },
    {
      icon: "অ",
      en: "English & Bengali",
      bn: "ইংরেজি ও বাংলা",
      enDesc: "Choose the language that feels comfortable.",
      bnDesc: "আপনার সুবিধার ভাষায় টুল ব্যবহার করুন।",
    },
    {
      icon: "◇",
      en: "Made for everyday work",
      bn: "দৈনন্দিন কাজের জন্য",
      enDesc: "Useful calculations for common personal and work tasks.",
      bnDesc: "ব্যক্তিগত ও কাজের সাধারণ হিসাব সহজ করুন।",
    },
  ];

  const services = [
    {
      en: "Excel & Google Sheets",
      bn: "Excel ও Google Sheets",
    },
    {
      en: "Data cleaning & organization",
      bn: "ডাটা পরিষ্কার ও গুছিয়ে দেওয়া",
    },
    {
      en: "Reports & dashboards",
      bn: "রিপোর্ট ও ড্যাশবোর্ড",
    },
    {
      en: "Spreadsheet automation",
      bn: "স্প্রেডশিটের কাজ অটোমেশন",
    },
    {
      en: "Custom utility & workflow solutions",
      bn: "কাজ অনুযায়ী কাস্টম টুল ও সমাধান",
    },
  ];

  return (
    <main className="homePage">
      <header className="homeHeader">
        <Link className="homeBrand" href="/" aria-label="Worklity home">
          <span>W</span>
          Worklity
        </Link>

        <div className="headerActions">
          <nav className="homeNav" aria-label={bn ? "মূল নেভিগেশন" : "Main navigation"}>
            <a href="#tools">{bn ? "ফ্রি টুল" : "Free Tools"}</a>
            <a href="#services">{bn ? "সার্ভিস" : "Services"}</a>
          </nav>

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
        </div>
      </header>

      <ToolTabs language={lang} />

      <section className="homeHero">
        <div className="heroContent">
          <span className="heroBadge">
            {bn ? "ফ্রি · সাইন-আপ লাগবে না" : "Free tools · No sign-up"}
          </span>

          <h1>{bn ? "সহজ টুল। স্মার্ট কাজ।" : "Simple Tools. Smarter Work."}</h1>

          <p>
            {bn
              ? "জমির মাপ, শতাংশ ও বয়সের হিসাব সহজে করুন। অফিস ও ডাটার কাজেও সহায়তা নিন।"
              : "Free calculators for land area, percentages and age, plus practical help for office and data work."}
          </p>

          <div className="heroActions">
            <a className="primaryCta" href="#tools">
              {bn ? "ফ্রি টুল দেখুন" : "Explore Free Tools"}
            </a>
          </div>
        </div>

        <div className="heroSignal" aria-hidden="true">
          <div className="signalCore">W</div>
          <span className="signalOne">%</span>
          <span className="signalTwo">⌗</span>
          <span className="signalThree">◷</span>
        </div>
      </section>

      <section className="toolsSection" id="tools">
        <div className="sectionHeading toolsHeading">
          <div>
            <small>{bn ? "ফ্রি অনলাইন টুল" : "FREE ONLINE TOOLS"}</small>
            <h2>{bn ? "কোন হিসাবটি করতে চান?" : "What do you need to calculate?"}</h2>
          </div>
          <p>
            {bn
              ? "আপনার কাজের টুলটি বেছে নিয়ে এখনই হিসাব শুরু করুন।"
              : "Choose the tool that matches your task and start right away."}
          </p>
        </div>

        <div className="toolGrid">
          {tools.map((tool) => {
            const content = (
              <>
                <div className={`toolIcon ${tool.accent}`} aria-hidden="true">
                  {tool.icon}
                </div>
                <span className="toolCategory">
                  {bn ? tool.categoryBn : tool.categoryEn}
                </span>
                <h3>{bn ? tool.bn : tool.en}</h3>
                <p>{bn ? tool.bnDesc : tool.enDesc}</p>
                <span className={tool.active ? "toolAction" : "comingSoon"}>
                  {tool.active
                    ? bn
                      ? tool.bnAction || "হিসাব করুন"
                      : tool.enAction || "Calculate Now"
                    : bn
                    ? "শীঘ্রই আসছে"
                    : "Coming Soon"}
                </span>
              </>
            );

            return tool.active ? (
              <Link className="toolCard" href={tool.link} key={tool.en}>
                {content}
              </Link>
            ) : (
              <article className="toolCard unavailable" aria-disabled="true" key={tool.en}>
                {content}
              </article>
            );
          })}
        </div>
      </section>

      <section className="valueSection" aria-labelledby="why-worklity">
        <div className="sectionHeading valueHeading">
          <div>
            <small>{bn ? "সহজ ও ব্যবহারযোগ্য" : "CLEAR AND PRACTICAL"}</small>
            <h2 id="why-worklity">{bn ? "কেন Worklity ব্যবহার করবেন?" : "Why use Worklity?"}</h2>
          </div>
        </div>

        <div className="valueGrid">
          {values.map((value) => (
            <article className="valueCard" key={value.en}>
              <span aria-hidden="true">{value.icon}</span>
              <div>
                <h3>{bn ? value.bn : value.en}</h3>
                <p>{bn ? value.bnDesc : value.enDesc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="servicesSection" id="services">
        <div className="servicesIntro">
          <small>{bn ? "ডাটা ও অফিসের কাজে সহায়তা" : "DATA & OFFICE SOLUTIONS"}</small>
          <h2>
            {bn
              ? "কাজের জন্য দরকারি বাস্তব সমাধান"
              : "Practical solutions for the work behind the numbers"}
          </h2>
          <p>
            {bn
              ? "স্প্রেডশিট, ডাটা ও বারবার করতে হয় এমন কাজ আরও গুছিয়ে ও সহজ করতে সহায়তা নিন।"
              : "Get help organizing spreadsheets, improving data, and simplifying repeatable work."}
          </p>
          <Link className="serviceCta" href="/contact">
            {bn ? "কাজ নিয়ে যোগাযোগ করুন →" : "Discuss Your Work →"}
          </Link>
        </div>

        <div className="serviceList">
          {services.map((service, index) => (
            <div key={service.en}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <strong>{bn ? service.bn : service.en}</strong>
            </div>
          ))}
        </div>
      </section>

      <footer className="homeFooter">
        <div className="footerBrand">
          <Link className="homeBrand footerLogo" href="/">
            <span>W</span>
            Worklity
          </Link>
          <p>
            {bn
              ? "সহজ টুল। স্মার্ট কাজ।"
              : "Simple Tools. Smarter Work."}
          </p>
        </div>

        <nav className="footerLinks" aria-label={bn ? "ফুটার লিংক" : "Footer links"}>
          <Link href="/about">{bn ? "আমাদের সম্পর্কে" : "About"}</Link>
          <Link href="/privacy-policy">{bn ? "গোপনীয়তা নীতি" : "Privacy Policy"}</Link>
          <Link href="/disclaimer">{bn ? "দায়মুক্তি" : "Disclaimer"}</Link>
          <Link href="/contact">{bn ? "যোগাযোগ" : "Contact"}</Link>
        </nav>
      </footer>

      <style jsx>{`
        .homePage {
          --navy: #111a3a;
          --indigo: #29377a;
          --violet: #7656d8;
          --cyan: #25a6b8;
          --ink: #17213f;
          --muted: #64708a;
          min-height: 100vh;
          color: var(--ink);
          background:
            radial-gradient(circle at 0 30%, rgba(118, 86, 216, 0.06), transparent 28rem),
            radial-gradient(circle at 100% 58%, rgba(37, 166, 184, 0.06), transparent 28rem),
            #f8f9fc;
        }

        .homeHeader {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 76px;
          max-width: 1180px;
          margin: auto;
          padding: 10px 22px;
          border-bottom: 1px solid #e7e9f1;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(14px);
        }

        :global(.homeBrand) {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--navy);
          font-size: 23px;
          font-weight: 800;
          letter-spacing: -0.025em;
        }

        :global(.homeBrand span) {
          display: grid;
          width: 40px;
          height: 40px;
          place-items: center;
          border-radius: 11px;
          color: #fff;
          background: linear-gradient(145deg, var(--indigo), var(--violet));
          box-shadow: 0 9px 22px rgba(72, 58, 153, 0.22);
        }

        .headerActions,
        .homeNav,
        .languageSwitch {
          display: flex;
          align-items: center;
        }

        .headerActions {
          gap: 22px;
        }

        .homeNav {
          gap: 24px;
        }

        .homeNav a {
          padding: 11px 2px;
          color: #4f5971;
          font-weight: 700;
        }

        .homeNav a:hover {
          color: var(--violet);
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
        }

        .languageButton[aria-pressed="true"] {
          color: #fff;
          background: linear-gradient(135deg, var(--indigo), var(--violet));
          box-shadow: 0 6px 16px rgba(63, 54, 147, 0.22);
        }

        .homeHero {
          position: relative;
          isolation: isolate;
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(240px, 0.65fr);
          align-items: center;
          gap: 42px;
          max-width: 1180px;
          min-height: 304px;
          margin: 0 auto;
          padding: 34px;
          overflow: hidden;
          border-radius: 0 0 28px 28px;
          background:
            linear-gradient(135deg, rgba(245, 247, 255, 0.98), rgba(245, 240, 255, 0.95) 58%, rgba(236, 250, 250, 0.94));
        }

        .homeHero::before {
          position: absolute;
          z-index: -1;
          width: 310px;
          height: 310px;
          top: -225px;
          left: 34%;
          border: 1px solid rgba(118, 86, 216, 0.17);
          border-radius: 50%;
          box-shadow: 0 0 0 36px rgba(118, 86, 216, 0.035);
          content: "";
        }

        .heroContent {
          max-width: 700px;
        }

        .heroBadge {
          display: inline-flex;
          padding: 8px 12px;
          border: 1px solid rgba(118, 86, 216, 0.2);
          border-radius: 99px;
          color: #5541b1;
          background: rgba(255, 255, 255, 0.78);
          box-shadow: 0 8px 24px rgba(50, 48, 110, 0.07);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .homeHero h1 {
          max-width: 690px;
          margin: 16px 0 12px;
          color: var(--navy);
          font-size: clamp(42px, 5.2vw, 61px);
          line-height: 1.04;
          letter-spacing: -0.05em;
          text-wrap: balance;
        }

        .homeHero p {
          max-width: 650px;
          margin: 0;
          color: #5d6882;
          font-size: 17.5px;
          line-height: 1.62;
        }

        .heroActions {
          display: flex;
          gap: 12px;
          margin-top: 18px;
          flex-wrap: wrap;
        }

        .primaryCta,
        .secondaryCta,
        :global(.serviceCta) {
          display: inline-flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          padding: 12px 19px;
          border-radius: 11px;
          font-weight: 800;
        }

        .primaryCta {
          color: #fff;
          background: linear-gradient(135deg, var(--indigo), var(--violet));
          box-shadow: 0 12px 26px rgba(64, 52, 146, 0.23);
        }

        .secondaryCta {
          border: 1px solid #d9ddeb;
          color: var(--indigo);
          background: rgba(255, 255, 255, 0.84);
        }

        .heroSignal {
          position: relative;
          display: grid;
          width: 196px;
          height: 196px;
          margin: auto;
          place-items: center;
          border: 1px solid rgba(91, 76, 178, 0.16);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          box-shadow: 0 22px 58px rgba(53, 50, 116, 0.1), inset 0 0 0 25px rgba(118, 86, 216, 0.025);
        }

        .signalCore {
          display: grid;
          width: 78px;
          height: 78px;
          place-items: center;
          border-radius: 26px;
          color: #fff;
          background: linear-gradient(145deg, var(--indigo), var(--violet));
          box-shadow: 0 20px 38px rgba(65, 50, 151, 0.25);
          font-size: 35px;
          font-weight: 900;
        }

        .heroSignal > span {
          position: absolute;
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          border: 1px solid #e0e3ee;
          border-radius: 14px;
          color: var(--indigo);
          background: #fff;
          box-shadow: 0 10px 24px rgba(31, 39, 82, 0.1);
          font-size: 18px;
          font-weight: 800;
        }

        .signalOne { top: 18px; right: 22px; }
        .signalTwo { bottom: 22px; right: 12px; color: var(--cyan) !important; }
        .signalThree { bottom: 28px; left: 16px; color: var(--violet) !important; }

        .toolsSection,
        .valueSection {
          max-width: 1180px;
          margin: auto;
          padding: 38px 22px 50px;
          scroll-margin-top: 20px;
        }

        .sectionHeading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 25px;
        }

        .sectionHeading small,
        .servicesIntro small {
          color: #6550bd;
          font-weight: 900;
          letter-spacing: 0.09em;
        }

        .sectionHeading h2,
        .servicesIntro h2 {
          margin: 9px 0 0;
          color: var(--navy);
          font-size: clamp(30px, 3.6vw, 44px);
          line-height: 1.12;
          letter-spacing: -0.035em;
        }

        .sectionHeading > p {
          max-width: 390px;
          margin: 0 0 5px;
          color: var(--muted);
          line-height: 1.55;
        }

        .toolGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 17px;
        }

        :global(.toolCard) {
          position: relative;
          display: flex;
          min-width: 0;
          min-height: 294px;
          padding: 22px;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(65, 60, 125, 0.14);
          border-radius: 20px;
          color: var(--ink);
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 13px 34px rgba(31, 39, 82, 0.07);
          transition: transform 170ms ease, border-color 170ms ease, box-shadow 170ms ease;
        }

        :global(.toolCard:not(.unavailable):hover) {
          border-color: rgba(118, 86, 216, 0.3);
          box-shadow: 0 20px 42px rgba(42, 42, 101, 0.13);
          transform: translateY(-4px);
        }

        :global(.toolCard::after) {
          position: absolute;
          width: 120px;
          height: 120px;
          top: -82px;
          right: -75px;
          border-radius: 50%;
          background: rgba(118, 86, 216, 0.06);
          content: "";
        }

        .toolIcon {
          display: grid;
          width: 46px;
          height: 46px;
          margin-bottom: 19px;
          place-items: center;
          border-radius: 14px;
          font-size: 21px;
          font-weight: 900;
        }

        .toolIcon.violet { color: #694fc7; background: #f0ebff; }
        .toolIcon.cyan { color: #147f91; background: #e5f7f8; }
        .toolIcon.indigo { color: #33458d; background: #e9edff; }
        .toolIcon.muted { color: #737b8e; background: #eff1f5; }

        .toolCategory {
          color: #68728a;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        :global(.toolCard h3) {
          margin: 8px 0 10px;
          color: var(--navy);
          font-size: 22px;
          line-height: 1.22;
          letter-spacing: -0.025em;
        }

        :global(.toolCard p) {
          margin: 0 0 20px;
          color: var(--muted);
          line-height: 1.55;
        }

        .toolAction,
        .comingSoon {
          margin-top: auto;
          font-weight: 900;
        }

        .toolAction {
          display: inline-flex;
          min-height: 42px;
          align-items: center;
          justify-content: center;
          align-self: flex-start;
          padding: 9px 13px;
          border: 1px solid rgba(118, 86, 216, 0.18);
          border-radius: 10px;
          color: #6049ba;
          background: rgba(118, 86, 216, 0.075);
        }

        .comingSoon {
          align-self: flex-start;
          padding: 7px 10px;
          border: 1px solid #d8dce5;
          border-radius: 99px;
          color: #667085;
          background: #f3f4f7;
          font-size: 13px;
        }

        :global(.unavailable) {
          border-style: dashed;
          box-shadow: none;
          cursor: not-allowed;
        }

        .valueSection {
          padding-top: 34px;
        }

        .valueHeading {
          margin-bottom: 20px;
        }

        .valueGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .valueCard {
          display: flex;
          min-width: 0;
          padding: 19px;
          gap: 13px;
          border: 1px solid #e2e5ee;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.8);
        }

        .valueCard > span {
          display: grid;
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          place-items: center;
          border-radius: 10px;
          color: #fff;
          background: linear-gradient(145deg, var(--indigo), var(--violet));
          font-weight: 900;
        }

        .valueCard h3 {
          margin: 1px 0 5px;
          color: var(--navy);
          font-size: 16px;
        }

        .valueCard p {
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.45;
        }

        .servicesSection {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 48px;
          max-width: 1136px;
          margin: 28px auto 72px;
          padding: 46px;
          border: 1px solid rgba(94, 77, 179, 0.2);
          border-radius: 26px;
          color: #fff;
          background:
            radial-gradient(circle at 90% 5%, rgba(56, 205, 208, 0.17), transparent 35%),
            linear-gradient(135deg, #121b3d, #273471 64%, #4d3e91);
          box-shadow: 0 24px 58px rgba(31, 36, 82, 0.18);
          scroll-margin-top: 24px;
        }

        .servicesIntro small {
          color: #8fe4e6;
        }

        .servicesIntro h2 {
          color: #fff;
        }

        .servicesIntro p {
          margin: 17px 0 24px;
          color: rgba(239, 242, 255, 0.75);
          font-size: 17px;
          line-height: 1.65;
        }

        :global(.serviceCta) {
          color: var(--navy);
          background: #fff;
          box-shadow: 0 10px 25px rgba(5, 10, 33, 0.2);
        }

        .serviceList {
          display: grid;
          align-content: center;
          gap: 10px;
        }

        .serviceList > div {
          display: flex;
          min-width: 0;
          padding: 14px 16px;
          align-items: center;
          gap: 14px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.07);
        }

        .serviceList span {
          color: #81d9de;
          font-size: 12px;
          font-weight: 900;
        }

        .serviceList strong {
          overflow-wrap: anywhere;
        }

        .homeFooter {
          display: flex;
          max-width: 1180px;
          margin: auto;
          padding: 36px 22px 46px;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          border-top: 1px solid #e1e4ed;
          color: var(--muted);
        }

        .footerBrand p {
          margin: 9px 0 0;
          font-size: 14px;
        }

        :global(.footerLogo) {
          font-size: 20px;
        }

        :global(.footerLogo span) {
          width: 35px;
          height: 35px;
          border-radius: 10px;
        }

        .footerLinks {
          display: flex;
          gap: 22px;
          flex-wrap: wrap;
        }

        :global(.footerLinks a) {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          color: #526078;
          font-weight: 700;
        }

        :global(.footerLinks a:hover) {
          color: var(--violet);
        }

        :global(.homeBrand:focus-visible),
        .homeNav a:focus-visible,
        .languageButton:focus-visible,
        .primaryCta:focus-visible,
        .secondaryCta:focus-visible,
        :global(.toolCard:focus-visible),
        :global(.serviceCta:focus-visible),
        :global(.footerLinks a:focus-visible) {
          outline: 3px solid rgba(37, 166, 184, 0.58);
          outline-offset: 3px;
        }

        @media (max-width: 980px) {
          .toolGrid,
          .valueGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .homeHero {
            grid-template-columns: minmax(0, 1fr) 210px;
          }

          .heroSignal {
            width: 195px;
            height: 195px;
          }

          .servicesSection {
            margin-right: 20px;
            margin-left: 20px;
          }
        }

        @media (max-width: 720px) {
          .homeHeader {
            flex-wrap: wrap;
            gap: 10px;
            padding-top: 12px;
            padding-bottom: 12px;
          }

          .headerActions {
            width: 100%;
            justify-content: space-between;
            gap: 10px;
          }

          .homeNav {
            gap: 14px;
          }

          .homeNav a {
            min-height: 44px;
            display: inline-flex;
            align-items: center;
            font-size: 14px;
          }

          .languageButton {
            min-height: 44px;
            padding: 9px 12px;
          }

          .homeHero {
            display: block;
            min-height: auto;
            margin: 0;
            padding: 40px 22px 38px;
            border-radius: 0;
          }

          .heroSignal {
            display: none;
          }

          .homeHero h1 {
            margin-top: 17px;
            font-size: clamp(38px, 11vw, 52px);
          }

          .toolsSection,
          .valueSection {
            padding: 38px 16px;
          }

          .sectionHeading {
            display: block;
          }

          .sectionHeading > p {
            margin-top: 12px;
          }

          .servicesSection {
            grid-template-columns: 1fr;
            gap: 30px;
            margin: 18px 14px 52px;
            padding: 30px 23px;
          }

          .homeFooter {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 520px) {
          .homeHeader {
            padding-right: 16px;
            padding-left: 16px;
          }

          .headerActions {
            align-items: center;
            flex-direction: row;
          }

          .languageSwitch {
            flex: 0 0 auto;
          }

          .homeNav {
            min-width: 0;
            justify-content: flex-start;
          }

          .homeHero {
            padding: 22px 18px 23px;
          }

          .homeHero p {
            font-size: 16.5px;
          }

          .heroActions {
            display: block;
          }

          .primaryCta {
            width: 100%;
          }

          .toolGrid,
          .valueGrid {
            grid-template-columns: 1fr;
          }

          :global(.toolCard) {
            min-height: 230px;
          }

          .toolsSection {
            padding-top: 23px;
          }

          .toolsHeading {
            margin-bottom: 18px;
          }

          .toolsHeading > p {
            display: none;
          }

          .valueSection {
            padding-top: 20px;
          }

          .servicesIntro h2,
          .sectionHeading h2 {
            font-size: 31px;
          }

          :global(.serviceCta) {
            width: 100%;
          }

          .footerLinks {
            display: grid;
            width: 100%;
            grid-template-columns: 1fr 1fr;
            gap: 4px 18px;
          }
        }
      `}</style>
    </main>
  );
}
