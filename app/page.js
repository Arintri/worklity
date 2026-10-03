"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ToolTabs from "./components/ToolTabs";
import ToolBannerCarousel from "./components/ToolBannerCarousel";

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
      collection: "local",
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
      collection: "everyday",
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
      collection: "everyday",
    },
    {
      categoryEn: "Adult Health",
      categoryBn: "প্রাপ্তবয়স্কদের স্বাস্থ্য",
      en: "BMI Calculator India",
      bn: "BMI ক্যালকুলেটর — ভারত",
      enDesc: "Check adult BMI from height and weight, with Indian references and health-awareness guidance.",
      bnDesc: "উচ্চতা ও ওজন থেকে বড়দের BMI দেখুন, ভারতীয় মানদণ্ড ও স্বাস্থ্য সচেতনতার পরামর্শসহ।",
      enAction: "Calculate BMI",
      bnAction: "BMI হিসাব করুন",
      link: "/bmi-calculator",
      icon: "BMI",
      accent: "cyan",
      collection: "health",
    },
    {
      categoryEn: "Liver Health",
      categoryBn: "লিভার স্বাস্থ্য",
      en: "FIB-4 Liver Risk Calculator",
      bn: "FIB-4 লিভার ঝুঁকি ক্যালকুলেটর",
      enDesc: "Calculate a FIB-4 score from age, AST, ALT and platelet count for MASLD/NAFLD risk guidance.",
      bnDesc: "বয়স, AST, ALT ও প্লেটলেট দিয়ে MASLD/NAFLD-এর জন্য FIB-4 ঝুঁকি নির্দেশনা দেখুন।",
      enAction: "Calculate FIB-4",
      bnAction: "FIB-4 হিসাব করুন",
      link: "/fib-4-calculator",
      icon: "F4",
      accent: "violet",
      collection: "health",
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
      collection: "health",
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
      collection: "everyday",
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
      collection: "local",
    },
    {
      categoryEn: "Measurement",
      categoryBn: "পরিমাপ",
      en: "Length & Distance Converter",
      bn: "দৈর্ঘ্য ও দূরত্ব রূপান্তরকারী",
      enDesc: "Convert Meter, Feet, Inch, Kilometer and Mile quickly.",
      bnDesc: "মিটার, ফুট, ইঞ্চি, কিলোমিটার ও মাইল সহজে রূপান্তর করুন।",
      enAction: "Convert Distance",
      bnAction: "দূরত্ব রূপান্তর করুন",
      link: "/length-distance-converter",
      icon: "↔",
      accent: "cyan",
      collection: "everyday",
    },
  ];

  const toolCollections = [
    {
      key: "everyday",
      en: "Everyday calculation tools",
      bn: "দৈনন্দিন হিসাবের টুল",
      enDesc: "For quick number, date, loan and distance calculations.",
      bnDesc: "সংখ্যা, তারিখ, ঋণ ও দূরত্বের দ্রুত হিসাবের জন্য।",
    },
    {
      key: "local",
      en: "India & local planning",
      bn: "ভারত ও স্থানীয় পরিকল্পনা",
      enDesc: "For West Bengal land measurements and child vaccination planning in India.",
      bnDesc: "পশ্চিমবঙ্গের জমির মাপ ও ভারতে শিশুর টিকাদান পরিকল্পনার জন্য।",
    },
    {
      key: "health",
      en: "Health awareness & planning",
      bn: "স্বাস্থ্য সচেতনতা ও পরিকল্পনা",
      enDesc: "Informational tools for adult health awareness, pregnancy planning and liver-risk discussion.",
      bnDesc: "প্রাপ্তবয়স্কদের স্বাস্থ্য সচেতনতা, গর্ভকাল পরিকল্পনা ও লিভার ঝুঁকি বোঝার তথ্যভিত্তিক টুল।",
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

  const guides = [
    {
      href: "/guides/percentage-calculation-guide",
      en: "Percentage Calculation Guide",
      bn: "শতাংশ হিসাবের গাইড",
      enDesc: "Learn the formulas for percentages, changes and percentage points with clear examples.",
      bnDesc: "সহজ উদাহরণে শতাংশ, পরিবর্তন ও পার্সেন্টেজ পয়েন্টের সূত্র বুঝুন।",
    },
    {
      href: "/guides/emi-calculation-guide",
      en: "EMI Calculation Guide",
      bn: "EMI হিসাবের গাইড",
      enDesc: "Understand monthly EMI, reducing-balance interest, tenure and total repayment.",
      bnDesc: "মাসিক EMI, কমতে থাকা বকেয়ার সুদ, মেয়াদ ও মোট পরিশোধ বুঝুন।",
    },
    {
      href: "/guides/west-bengal-land-measurement-guide",
      en: "West Bengal Land Measurement Guide",
      bn: "পশ্চিমবঙ্গ জমির মাপের গাইড",
      enDesc: "Compare Katha, Bigha, Decimal, Acre and square feet using a stated conversion basis.",
      bnDesc: "নির্দিষ্ট রূপান্তর মানে কাঠা, বিঘা, ডেসিমেল, একর ও স্কয়ার ফিট তুলনা করুন।",
    },
    {
      href: "/guides/age-date-calculation-guide",
      en: "Exact Age & Date Guide",
      bn: "সঠিক বয়স ও তারিখের গাইড",
      enDesc: "See how calendar years, months, days, leap years and birthdays are handled.",
      bnDesc: "ক্যালেন্ডার বছর, মাস, দিন, অধিবর্ষ ও জন্মদিনের হিসাব বুঝুন।",
    },
  ];

  return (
    <main className="homePage">
      <header className="homeHeader">
        <Link className="homeBrand" href="/" aria-label="Worklity home">
          <Image className="headerBrandMark" src="/brand/worklity-mark.png" alt="" width={40} height={40} />
          Worklity
        </Link>

        <div className="headerActions">
          <nav className="homeNav" aria-label={bn ? "মূল নেভিগেশন" : "Main navigation"}>
            <a href="#tools">{bn ? "ফ্রি টুল" : "Free Tools"}</a>
            <Link href="/guides">{bn ? "গাইড" : "Guides"}</Link>
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

      <ToolBannerCarousel />

      <section className="homeHero">
        <div className="heroContent">
          <span className="heroBadge">
            {bn ? "ফ্রি · সাইন-আপ লাগবে না" : "Free tools · No sign-up"}
          </span>

          <h1>{bn ? "সহজ টুল। স্মার্ট কাজ।" : "Simple Tools. Smarter Work."}</h1>

          <p>
            {bn
              ? "দৈনন্দিন হিসাব, জমির মাপ, অর্থ, বয়স ও তারিখ এবং স্বাস্থ্য সচেতনতা ও পরিকল্পনার জন্য বাংলা ও ইংরেজিতে সহজ ব্যবহারিক টুল।"
              : "Free practical calculators and planning tools in English and Bengali for everyday numbers, dates, measurement, finance and health awareness."}
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

        <div className="toolCollections">
          {toolCollections.map((collection) => (
            <section className="toolCollection" aria-labelledby={`collection-${collection.key}`} key={collection.key}>
              <div className="toolCollectionHeading">
                <h3 id={`collection-${collection.key}`}>{bn ? collection.bn : collection.en}</h3>
                <p>{bn ? collection.bnDesc : collection.enDesc}</p>
              </div>
              <div className="toolGrid">
                {tools.filter((tool) => tool.collection === collection.key).map((tool) => (
                  <Link className="toolCard" href={tool.link} key={tool.en}>
                    <div className={`toolIcon ${tool.accent}`} aria-hidden="true">
                      {tool.icon}
                    </div>
                    <span className="toolCategory">
                      {bn ? tool.categoryBn : tool.categoryEn}
                    </span>
                    <h3>{bn ? tool.bn : tool.en}</h3>
                    <p>{bn ? tool.bnDesc : tool.enDesc}</p>
                    <span className="toolAction">
                      {bn ? tool.bnAction || "হিসাব করুন" : tool.enAction || "Calculate Now"}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
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

      <section className="guidesSection" aria-labelledby="practical-guides">
        <div className="sectionHeading">
          <div>
            <small>{bn ? "সহজ ব্যাখ্যা ও উদাহরণ" : "LEARN THE METHOD"}</small>
            <h2 id="practical-guides">{bn ? "ব্যবহারিক গাইড" : "Practical Guides"}</h2>
          </div>
          <p>
            {bn
              ? "হিসাবের সূত্র, ধারণা ও উদাহরণ সহজভাবে পড়ুন। পূর্ণ গাইডগুলো বর্তমানে ইংরেজিতে।"
              : "Understand the formulas, concepts and examples behind useful everyday calculations."}
          </p>
        </div>
        <div className="guideGrid">
          {guides.map((guide) => (
            <Link className="homeGuideCard" href={guide.href} key={guide.href}>
              <h3>{bn ? guide.bn : guide.en}</h3>
              <p>{bn ? guide.bnDesc : guide.enDesc}</p>
              <span>{bn ? "গাইড পড়ুন →" : "Read guide →"}</span>
            </Link>
          ))}
        </div>
        <Link className="allGuidesLink" href="/guides">
          {bn ? "সব গাইড দেখুন →" : "View all practical guides →"}
        </Link>
        <p className="editorialTrust">
          {bn ? "Worklity কীভাবে হিসাবের পদ্ধতি ও তথ্য যাচাই করে তা জানুন: " : "Learn how Worklity checks calculator methods and content: "}
          <Link href="/editorial-policy">
            {bn ? "সম্পাদনা ও হিসাব নীতি →" : "Editorial & Calculation Policy →"}
          </Link>
        </p>
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
          <Link href="/guides">{bn ? "গাইড" : "Guides"}</Link>
          <Link href="/editorial-policy">{bn ? "সম্পাদনা নীতি" : "Editorial Policy"}</Link>
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

        :global(.headerBrandMark) {
          display: block;
          flex: 0 0 40px;
          width: 40px;
          height: 40px;
          object-fit: contain;
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
        .secondaryCta {
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
        .valueSection,
        .guidesSection {
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

        .sectionHeading small {
          color: #6550bd;
          font-weight: 900;
          letter-spacing: 0.09em;
        }

        .sectionHeading h2 {
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

        .toolCollections {
          display: grid;
          gap: 34px;
        }

        .toolCollection {
          min-width: 0;
        }

        .toolCollectionHeading {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e2e5ee;
        }

        .toolCollectionHeading h3 {
          margin: 0;
          color: var(--navy);
          font-size: 20px;
          line-height: 1.25;
        }

        .toolCollectionHeading p {
          max-width: 500px;
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.5;
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

        :global(.toolCard:hover) {
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

        .toolAction {
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

        .guidesSection {
          padding-top: 30px;
        }

        .guideGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
        }

        :global(.homeGuideCard) {
          display: flex;
          min-width: 0;
          min-height: 220px;
          padding: 22px;
          flex-direction: column;
          border: 1px solid rgba(65, 60, 125, 0.14);
          border-radius: 18px;
          color: var(--ink);
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 12px 30px rgba(31, 39, 82, 0.07);
          transition: transform 170ms ease, box-shadow 170ms ease, border-color 170ms ease;
        }

        :global(.homeGuideCard:hover) {
          transform: translateY(-3px);
          border-color: rgba(118, 86, 216, 0.3);
          box-shadow: 0 18px 38px rgba(31, 39, 82, 0.12);
        }

        :global(.homeGuideCard h3) {
          margin: 0 0 10px;
          color: var(--navy);
          font-size: 21px;
          line-height: 1.25;
        }

        :global(.homeGuideCard p) {
          margin: 0 0 18px;
          color: var(--muted);
          line-height: 1.58;
        }

        :global(.homeGuideCard span) {
          margin-top: auto;
          color: #6049ba;
          font-weight: 850;
        }

        :global(.allGuidesLink) {
          display: inline-flex;
          min-height: 44px;
          margin-top: 18px;
          align-items: center;
          color: var(--indigo);
          font-weight: 850;
        }

        .editorialTrust {
          margin: 18px 0 0;
          color: var(--muted);
          line-height: 1.6;
        }

        :global(.editorialTrust a) {
          color: var(--indigo);
          font-weight: 800;
          text-decoration: underline;
          text-underline-offset: 3px;
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
        :global(.homeGuideCard:focus-visible),
        :global(.allGuidesLink:focus-visible),
        :global(.editorialTrust a:focus-visible),
        :global(.footerLinks a:focus-visible) {
          outline: 3px solid rgba(37, 166, 184, 0.58);
          outline-offset: 3px;
        }

        @media (max-width: 980px) {
          .toolGrid,
          .valueGrid,
          .guideGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .homeHero {
            grid-template-columns: minmax(0, 1fr) 210px;
          }

          .heroSignal {
            width: 195px;
            height: 195px;
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
          .valueSection,
          .guidesSection {
            padding: 38px 16px;
          }

          .sectionHeading {
            display: block;
          }

          .sectionHeading > p {
            margin-top: 12px;
          }

          .toolCollectionHeading {
            display: block;
          }

          .toolCollectionHeading p {
            margin-top: 6px;
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
          .valueGrid,
          .guideGrid {
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

          .sectionHeading h2 {
            font-size: 31px;
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
