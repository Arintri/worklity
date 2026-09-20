import Link from "next/link";
import { GuideFrame, guideMetadata, styles } from "./GuideChrome";

export const metadata = guideMetadata(
  "Practical Guides & Everyday Calculations | Worklity",
  "Read practical Worklity guides explaining percentage, EMI, exact age and West Bengal land measurement calculations with clear formulas and examples.",
  "/guides",
);

const guides = [
  {
    href: "/guides/percentage-calculation-guide",
    label: "PERCENTAGES",
    title: "Percentage Calculation Guide",
    summary: "Understand percentage formulas, increases, decreases and percentage points through worked everyday examples.",
    tool: "Works with the Percentage Calculator",
  },
  {
    href: "/guides/emi-calculation-guide",
    label: "LOANS & REPAYMENT",
    title: "EMI Calculation Guide",
    summary: "Learn how principal, interest rate and tenure shape monthly EMI, total interest and a reducing-balance schedule.",
    tool: "Works with the EMI Calculator",
  },
  {
    href: "/guides/west-bengal-land-measurement-guide",
    label: "LAND & MEASUREMENT",
    title: "West Bengal Land Measurement Guide",
    summary: "Compare Katha, Bigha, Decimal, Acre, square feet and metric units using Worklity’s stated conversion basis.",
    tool: "Works with the Land Area Calculator",
  },
  {
    href: "/guides/age-date-calculation-guide",
    label: "DATES & AGE",
    title: "Exact Age & Date Calculation Guide",
    summary: "See why exact age uses calendar years, months and days, including leap years and February 29 birthdays.",
    tool: "Works with the Age Calculator",
  },
];

export default function GuidesPage() {
  return (
    <GuideFrame>
      <section className={styles.hubHero}>
        <span>WORKLITY GUIDES</span>
        <h1>Practical Guides &amp; Everyday Calculations</h1>
        <p>
          Worklity guides explain the calculations and concepts behind our
          free tools. Use them to understand a method, follow an example and
          check what a result means before opening the related calculator.
        </p>
      </section>
      <section className={styles.hubGrid} aria-label="Practical calculation guides">
        {guides.map((guide) => (
          <Link className={styles.guideCard} href={guide.href} key={guide.href}>
            <small>{guide.label}</small>
            <h2>{guide.title}</h2>
            <p>{guide.summary}</p>
            <strong>{guide.tool} →</strong>
          </Link>
        ))}
      </section>
    </GuideFrame>
  );
}
