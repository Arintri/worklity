"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ToolBannerCarousel.module.css";

const AUTO_ADVANCE_MS = 4500;
const SWIPE_THRESHOLD = 45;

const BANNERS = [
  {
    href: "/edd-calculator",
    name: "Pregnancy EDD Calculator",
    nameBn: "প্রেগন্যান্সি EDD ক্যালকুলেটর",
    benefit: "Estimate your due date and pregnancy timeline.",
    benefitBn: "প্রসবের সম্ভাব্য তারিখ ও গর্ভকাল দেখুন।",
    symbol: "✦",
    accent: "violet",
  },
  {
    href: "/vaccination-calculator",
    name: "Vaccination Calculator",
    nameBn: "টিকাদান ক্যালকুলেটর",
    benefit: "See a child's vaccine schedule from date of birth.",
    benefitBn: "জন্মতারিখ থেকে শিশুর টিকার সময়সূচি দেখুন।",
    symbol: "+",
    accent: "teal",
  },
  {
    href: "/bmi-calculator",
    name: "BMI Calculator",
    nameBn: "BMI ক্যালকুলেটর",
    benefit: "Check adult BMI with useful health guidance.",
    benefitBn: "বড়দের BMI ও স্বাস্থ্য সচেতনতার তথ্য দেখুন।",
    symbol: "BMI",
    accent: "cyan",
  },
  {
    href: "/age-calculator",
    name: "Age Calculator",
    nameBn: "বয়স ক্যালকুলেটর",
    benefit: "Find age in years, months and days.",
    benefitBn: "বছর, মাস ও দিনে সঠিক বয়স হিসাব করুন।",
    symbol: "◷",
    accent: "indigo",
  },
  {
    href: "/land-area-calculator",
    name: "Land Area Calculator",
    nameBn: "জমির মাপ ক্যালকুলেটর",
    benefit: "Convert Katha, Bigha, Decimal, Acre and more.",
    benefitBn: "কাঠা, বিঘা, ডেসিমেল, একরসহ জমির মাপ দেখুন।",
    symbol: "⌗",
    accent: "rose",
  },
  {
    href: "/percentage-calculator",
    name: "Percentage Calculator",
    nameBn: "শতাংশ ক্যালকুলেটর",
    benefit: "Calculate percentages, increases and decreases.",
    benefitBn: "শতাংশ এবং বৃদ্ধি বা হ্রাস হিসাব করুন।",
    symbol: "%",
    accent: "amber",
  },
  {
    href: "/emi-calculator",
    name: "EMI Calculator",
    nameBn: "EMI ক্যালকুলেটর",
    benefit: "Estimate loan EMI, interest and total repayment.",
    benefitBn: "লোনের EMI, সুদ ও মোট পরিশোধ দেখুন।",
    symbol: "₹",
    accent: "blue",
  },
];

export default function ToolBannerCarousel() {
  const [position, setPosition] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef(null);
  const resumeTimer = useRef(null);

  const activeIndex = position;
  const paused = userPaused || hoverPaused || focusPaused || interactionPaused;

  const move = useCallback((direction) => {
    setPosition(
      (current) => (current + direction + BANNERS.length) % BANNERS.length,
    );
  }, []);

  const pauseBriefly = useCallback(() => {
    setInteractionPaused(true);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setInteractionPaused(false), 6500);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const timer = window.setInterval(() => move(1), AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [move, paused, reducedMotion]);

  useEffect(() => () => window.clearTimeout(resumeTimer.current), []);

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
    setInteractionPaused(true);
    window.clearTimeout(resumeTimer.current);
  }

  function handleTouchEnd(event) {
    if (touchStartX.current !== null) {
      const distance = event.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(distance) >= SWIPE_THRESHOLD) move(distance < 0 ? 1 : -1);
    }
    touchStartX.current = null;
    pauseBriefly();
  }

  return (
    <section
      className={styles.section}
      aria-roledescription="carousel"
      aria-label="Featured Worklity calculators"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocusPaused(false);
      }}
    >
      <div className={styles.headingRow}>
        <div>
          <span>FEATURED WORKLITY TOOLS</span>
          <h2>Try another useful calculator</h2>
          <p>আরও দরকারি ক্যালকুলেটর ব্যবহার করুন</p>
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => {
              move(-1);
              pauseBriefly();
            }}
            aria-label="Show previous calculator"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => setUserPaused((current) => !current)}
            aria-label={userPaused ? "Resume automatic slides" : "Pause automatic slides"}
            aria-pressed={userPaused}
          >
            <span aria-hidden="true">{userPaused ? "▶" : "Ⅱ"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              move(1);
              pauseBriefly();
            }}
            aria-label="Show next calculator"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        className={styles.viewport}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`${styles.track} ${styles.moving}`}
          style={{ transform: `translateX(-${position * 100}%)` }}
        >
          {BANNERS.map((banner, index) => {
            const isActive = index === position;
            return (
              <article
                className={`${styles.slide} ${styles[banner.accent]}`}
                aria-hidden={!isActive}
                key={`${banner.href}-${index}`}
              >
                <Link
                  className={styles.banner}
                  href={banner.href}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`Open ${banner.name}`}
                >
                  <div className={styles.copy}>
                    <div className={styles.brandLine}>
                      <Image src="/brand/worklity-mark.png" alt="" width={27} height={27} />
                      <strong>Worklity</strong>
                    </div>
                    <p className={styles.eyebrow}>FREE ONLINE TOOL</p>
                    <h3>{banner.name}</h3>
                    <p className={styles.nameBn} lang="bn">{banner.nameBn}</p>
                    <div className={styles.benefits}>
                      <p>{banner.benefit}</p>
                      <p lang="bn">{banner.benefitBn}</p>
                    </div>
                    <span className={styles.cta}>
                      Open Tool <span aria-hidden="true">→</span>
                      <small lang="bn">ব্যবহার করুন →</small>
                    </span>
                  </div>
                  <div className={styles.visual} aria-hidden="true">
                    <span className={styles.orbitOne} />
                    <span className={styles.orbitTwo} />
                    <div className={styles.symbol}>{banner.symbol}</div>
                    <span className={styles.sparkle}>✦</span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      <div className={styles.dots} aria-label="Choose a featured calculator">
        {BANNERS.map((banner, index) => (
          <button
            type="button"
            key={banner.href}
            className={index === activeIndex ? styles.activeDot : ""}
            aria-label={`Show ${banner.name}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => {
              setPosition(index);
              pauseBriefly();
            }}
          />
        ))}
      </div>
    </section>
  );
}
