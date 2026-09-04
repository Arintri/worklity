"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./ToolTabs.module.css";

const TOOLS = [
  {
    href: "/",
    en: "Home",
    bn: "হোম",
    descriptionEn: "Explore Worklity",
    descriptionBn: "সব টুল দেখুন",
  },
  {
    href: "/land-area-calculator",
    en: "Land Area",
    bn: "জমির মাপ",
    descriptionEn: "Measure land",
    descriptionBn: "জমির হিসাব",
  },
  {
    href: "/age-calculator",
    en: "Age",
    bn: "বয়স",
    descriptionEn: "Age & birthday",
    descriptionBn: "বয়স ও জন্মদিন",
  },
  {
    href: "/edd-calculator",
    en: "EDD",
    bn: "EDD",
    descriptionEn: "Pregnancy due date",
    descriptionBn: "প্রসবের সম্ভাব্য তারিখ",
  },
  {
    href: "/bmi-calculator",
    en: "BMI",
    bn: "BMI",
    descriptionEn: "Adult weight & health",
    descriptionBn: "বড়দের ওজন ও স্বাস্থ্য",
  },
  {
    href: "/vaccination-calculator",
    en: "Vaccination",
    bn: "টিকাদান",
    descriptionEn: "Child vaccine schedule",
    descriptionBn: "শিশুর টিকার সময়সূচি",
  },
  {
    href: "/percentage-calculator",
    en: "Percentage",
    bn: "শতাংশ",
    descriptionEn: "Calculate %",
    descriptionBn: "শতাংশ হিসাব",
  },
  {
    href: "/emi-calculator",
    en: "EMI",
    bn: "EMI",
    descriptionEn: "Loan installment",
    descriptionBn: "লোনের কিস্তি",
  },
];

export default function ToolTabs({ language = "en" }) {
  const pathname = usePathname();
  const bn = language === "bn";

  return (
    <nav
      className={styles.workspace}
      aria-label={bn ? "Worklity টুলসমূহ" : "Worklity tools"}
    >
      <div className={styles.scroller}>
        <ul className={styles.list}>
          {TOOLS.map((tool) => {
            const active = pathname === tool.href;

            return (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className={`${styles.link} ${active ? styles.active : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <strong>{bn ? tool.bn : tool.en}</strong>
                  <small>
                    {bn ? tool.descriptionBn : tool.descriptionEn}
                  </small>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
