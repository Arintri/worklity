"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [lang, setLang] = useState("en");
  const bn = lang === "bn";

  const tools = [
    {
      en: "Land & Area",
      bn: "জমি ও ক্ষেত্রফল",
      enDesc: "Calculate and convert common land and area units.",
      bnDesc: "জমির ক্ষেত্রফল এবং বিভিন্ন জমির এককের হিসাব করুন।",
      link: "/land-area-calculator",
      active: true,
    },
    {
      en: "Finance",
      bn: "টাকা ও হিসাব",
      enDesc: "Simple finance and percentage tools.",
      bnDesc: "টাকা, সুদ, শতাংশ এবং অন্যান্য সাধারণ হিসাব।",
      link: "#",
      active: false,
    },
    {
      en: "Date & Time",
      bn: "তারিখ ও সময়",
      enDesc: "Age and date utilities.",
      bnDesc: "বয়স, তারিখ এবং সময়ের দরকারি হিসাব।",
      link: "#",
      active: false,
    },
    {
      en: "Office & Data",
      bn: "অফিস ও ডাটা",
      enDesc: "Spreadsheet and data helpers.",
      bnDesc: "Excel, Google Sheets এবং ডাটার দরকারি টুল।",
      link: "#",
      active: false,
    },
  ];

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
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <nav>
            <a href="#tools">{bn ? "টুলস" : "Tools"}</a>
            <a href="#services">{bn ? "সার্ভিস" : "Services"}</a>
          </nav>

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
        </div>
      </header>

      <section className="hero">
        <b>
          {bn
            ? "১০০% ফ্রি · কোনো সাইন-আপ লাগবে না"
            : "100% free · No sign-up"}
        </b>

        <h1>
          {bn ? (
            <>
              সহজ অনলাইন টুল
              <br />
              দৈনন্দিন কাজের সহজ সমাধান
            </>
          ) : (
            <>
              Simple online tools
              <br />
              that get the work done
            </>
          )}
        </h1>

        <p>
          {bn
            ? "হিসাব, জমির মাপ, তারিখ এবং অফিসের দৈনন্দিন কাজ সহজ করার জন্য দ্রুত ও ব্যবহারযোগ্য অনলাইন টুল।"
            : "Practical calculators and office helpers designed to be fast, clear and easy to use."}
        </p>

        <a className="button" href="#tools">
          {bn ? "টুল দেখুন" : "Browse tools"}
        </a>
      </section>

      <section className="section" id="tools">
        <small>{bn ? "ফ্রি অনলাইন টুল" : "FREE UTILITIES"}</small>

        <h2>
          {bn
            ? "দৈনন্দিন কাজের দরকারি টুল"
            : "Useful tools for everyday work"}
        </h2>

        <div className="grid">
          {tools.map((tool) => (
            <Link
              className="card"
              href={tool.link}
              key={tool.en}
            >
              <h3>{bn ? tool.bn : tool.en}</h3>

              <p>
                {bn ? tool.bnDesc : tool.enDesc}
              </p>

              <strong>
                {tool.active
                  ? bn
                    ? "টুল খুলুন →"
                    : "Open tool →"
                  : bn
                  ? "শীঘ্রই আসছে"
                  : "Coming soon"}
              </strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="services" id="services">
        <b>
          {bn
            ? "নিজের কাজের জন্য সাহায্য দরকার?"
            : "Need it done for you?"}
        </b>

        <h2>
          {bn
            ? "ডাটা ও অফিসের কাজের বাস্তব সমাধান"
            : "Practical data & office services"}
        </h2>

        <p>
          Excel · Google Sheets · Data Cleaning · Dashboards ·
          Reports · Automation · Custom Tools
        </p>

        {bn && (
          <p>
            এক্সেল · গুগল শিট · ডাটা পরিষ্কার · রিপোর্ট ·
            ড্যাশবোর্ড · অটোমেশন · কাস্টম টুল
          </p>
        )}
      </section>

      <footer>
        {bn
          ? "Worklity · সহজ টুল। স্মার্ট কাজ।"
          : "Worklity · Simple Tools. Smarter Work."}
      </footer>
    </main>
  );
}
