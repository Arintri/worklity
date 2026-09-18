# WORKLITY MASTER CONTINUITY

_Last updated: 2026-09-17_

This document is the permanent project handoff/continuity reference for Worklity. It is designed so that a future developer or AI assistant can continue the project without needing earlier chat history.

## 1. Project Overview
- Brand: Worklity
- Website: https://worklity.in
- Website stack: Next.js
- Android app: Native Kotlin + Jetpack Compose
- Tagline: Simple Tools. Smarter Work.
- Public-facing brand should remain Worklity.

## 2. Current Website Tools
1. Land Area Calculator
2. Percentage Calculator
3. Age Calculator
4. BMI Calculator
5. FIB-4 Calculator
6. Pregnancy EDD Calculator
7. EMI Calculator
8. Vaccination Calculator
9. Length & Distance Converter

Do not remove or reorder tools casually. Any future reordering should be based on real usage/search-demand data.

## 3. Locked Calculator Logic

Verified calculator engines and medical/financial rules must not be changed without explicit re-verification.

### 3.1 Length & Distance Converter
Verified constants:
- METER = 1.0
- FOOT = 0.3048
- INCH = 0.0254
- KILOMETER = 1000.0
- MILE = 1609.344

Formula:
`result = value * fromUnit.metersFactor / toUnit.metersFactor`

Verified examples:
- 1 Meter ≈ 3.280839895 Feet
- 12 Inches = 1 Foot
- 1 Foot = 0.3048 Meter
- 1 Kilometer ≈ 0.621371192 Mile
- 1 Mile = 1.609344 Kilometer
- 1000 Meters = 1 Kilometer
- 1609.344 Meters = 1 Mile

### 3.2 FIB-4
Formula:
`FIB-4 = (Age × AST) / (Platelets × sqrt(ALT))`

Platelet support:
- ×10^9/L
- lakh/µL
- 1 lakh/µL = 100 ×10^9/L

MASLD/NAFLD interpretation:
- Age <35: limited-reliability warning
- Age 35–64: <1.3 lower, 1.3–2.67 intermediate, >2.67 higher
- Age ≥65: <2.0 lower, 2.0–2.67 intermediate, >2.67 higher

Never present FIB-4 as a diagnosis.

Verified example:
- Age 50, AST 40, ALT 40, platelets 250 → FIB-4 ≈ 1.26

### 3.3 BMI
Adult only: 18+

Asian Indian:
- <18.5 Underweight
- 18.5–<23 Normal
- 23–<25 Overweight
- ≥25 Obesity

WHO:
- <18.5 Underweight
- 18.5–<25 Normal
- 25–<30 Overweight
- ≥30 Obesity

Waist flags:
- Male ≥90 cm
- Female ≥80 cm

Verified example:
- Age 37 male, 5'8", 69 kg → BMI ≈ 23.1
- Asian Indian → Overweight
- WHO → Normal
- WHO healthy weight range ≈ 55.2–74.3 kg

### 3.4 EMI
Use the current verified reducing-balance EMI implementation.

Verified example:
- Principal ₹100,000
- Interest 12% p.a.
- Tenure 12 months
- EMI ≈ ₹8,885
- Total interest ≈ ₹6,619
- Total repayment ≈ ₹106,619

Do not present Worklity as a lender or financial adviser.

### 3.5 Percentage
Current implementation is verified and locked. Preserve all existing formulas and operations.

### 3.6 Land Area
Current West Bengal conversion references:
- 1 Acre = 43,560 sq ft
- 1 Acre = 4,046.86 sq m
- 1 Acre = 100 Decimal
- 1 Acre = 60.5 Katha
- 1 Acre = 3.025 Bigha
- 1 Bigha = 20 Katha

Use current source/tests as canonical.

### 3.7 Age Calculator
Current date-difference engine is verified and locked.
Supports exact age, years/months/days, total age information, weekday/birthday details, next birthday, target-date calculation, and current February 29 convention.

### 3.8 Pregnancy EDD
Current project logic is verified and locked.
Verified example:
- LMP 01-01-2026 → EDD 08-10-2026

Gestational-age and date rules must remain unchanged. Use cautious wording: estimate only.

### 3.9 Vaccination
Current India vaccination schedule implementation is verified and locked.
- Vitamin A is separate supplementation.
- JE is conditional/endemic-area dependent.
- Existing DOB-based schedule remains unchanged.
- Optional catch-up logic must not silently rewrite the original DOB schedule.
- For Pentavalent delayed-dose logic, a minimum 28-day interval is used only where explicitly implemented.
- Do not assume one interval rule applies to all vaccines.
- Do not alter schedule data without source verification and regression testing.

## 4. SEO Status
Main SEO coding sprint is complete.

Completed/updated:
- Land Area
- FIB-4
- Vaccination
- Pregnancy EDD
- Age
- BMI
- EMI
- Percentage audit
- Length & Distance
- About/internal linking
- sitemap
- robots
- canonical audit
- Open Graph/Twitter metadata audit

Rule: do not repeatedly rewrite titles/meta descriptions without Google Search Console evidence.

Recent SEO-related commits:
- 89bd1a8d4e807eca2cc3d931c0fb5e184d83a353 — Land Area SEO
- 2adc084f0bd0454cb452c42b3fd4e0e7db3a48b6 — Length & Distance Converter
- fe69aa2650dfa41d6d545013d8b18ad83c142d91 — FIB-4 SEO
- 94579461d44f8292d3401960454efc330536c1bd — Vaccination SEO
- be181d58f3190b8c7986cb3d5e36822643cbf866 — EDD SEO
- 7278ef1c1c19a00e511a0a95042109f94cdf2f6f — Age SEO
- 806712297bcd2949ccddc528b5aa1bda044c42f1 — Final SEO cleanup

## 5. Search Console / AdSense

### Search Console
Google Search Console is active.
As of 2026-09-17:
- pages are receiving impressions and clicks
- health calculators, land calculator and age calculator have appeared in search
- Length & Distance route was submitted for indexing

Do not treat short-term Search Console data as permanent.

### AdSense
As of 2026-09-17:
- worklity.in status: Getting ready
- ads.txt: Authorized
- no known active AdSense error requiring code changes

Do not disturb AdSense integration during review unless Google reports a specific issue.

## 6. Android App Status
- applicationId: in.worklity.app
- namespace: in.worklity.app
- versionCode: 1
- versionName: 1.0
- Native Kotlin + Jetpack Compose
- minSdk 24
- targetSdk 36
- Room DB: worklity_local.db
- DataStore: worklity_preferences
- R8/minify enabled

Release readiness:
- signed release APK generated
- release APK tested on physical phone
- release app open test passed
- final runtime tests passed
- signed release AAB generated successfully
- upload keystore backed up securely

Android Studio is the source of truth.

## 7. Android Release / Google Play
Current status:
- Worklity Udyam registration completed
- D-U-N-S request submitted
- awaiting D-U-N-S response/verification
- intended Google Play route: organization verification
- full app includes health-related calculators
- publishing paused until D-U-N-S progresses

Do not include private Aadhaar, PAN, bank details, passwords, keystore passwords, phone, address, or other sensitive identifiers in the repository.

## 8. Brand Rules
- Name: Worklity
- Tagline: Simple Tools. Smarter Work.
- distinct stylized W
- cyan/blue → violet → pink gradient
- small four-point sparkle
- dark navy wordmark
- canonical website logo asset: public/brand/worklity-mark.png

Avoid accidental .png.png duplicates or filename variants that break imports.
Design direction: premium, mobile-first, clean, bilingual.

## 9. Development Rules
Website:
- main branch is canonical
- one focused change at a time
- no unrelated refactors
- full tests before commit
- production build before commit
- run git diff --check
- preserve mobile and EN/BN
- preserve AdSense unless specifically working on it

Android:
- Android Studio is canonical
- preserve package identity
- preserve Room/DataStore structure
- preserve verified formulas
- test signed/minified release builds before publishing

General:
- do not silently change verified formulas
- do not invent medical thresholds
- do not change financial logic casually
- do not mix unrelated tasks in one commit
- do not introduce a second localization system
- do not expose secrets

## 10. Release Checklists

### Website change
- focused diff only
- EN/BN preserved
- mobile responsive
- internal links checked
- full tests pass
- production build passes
- git diff --check
- clear commit
- push origin/main
- working tree clean

### Calculator change
- formula/source verified
- known-value tests updated
- validation checked
- EN/BN checked
- mobile checked
- share/save checked if relevant
- full tests pass
- production build passes

### SEO change
- use Search Console evidence
- preserve calculation logic
- preserve canonical
- unique title/description
- no keyword stuffing
- no hidden SEO text
- no speculative schema
- sitemap/internal links checked
- wait before rewriting again

### Android release
- version code/name checked
- release signing confirmed
- R8/minify build passes
- install signed release APK
- fresh-open test
- EN/BN test
- calculator smoke test
- Saved/Room persistence test
- share/export test
- close/reopen test
- final AAB preserved
- keystore securely backed up

## 11. Future Roadmap

### Phase A — Observe Search Console / AdSense
- let SEO settle
- monitor query/page trends
- monitor AdSense review
- fix only specific issues

### Phase B — Traffic and Content Growth
- prioritize pages with search visibility
- improve only where data supports it
- add tools based on actual search demand

### Phase C — Android Publishing
- complete D-U-N-S
- complete Google Play organization verification
- finish Play Console
- prepare store listing
- upload final AAB
- complete health/data declarations
- testing/review
- production release

### Phase D — Monetization Beyond AdSense
- Android monetization later
- digital products
- remote services
- appropriate affiliate/lead opportunities
- downloadable templates/tools

Do not depend only on local-area customers.

### Phase E — New Tool Expansion
Only after:
- demand research
- usefulness check
- competition review
- formula/source verification
- SEO intent verification

## 12. Monetization Roadmap
Potential channels:
1. AdSense
2. Android app monetization later
3. Digital products
4. Remote services
5. Appropriate affiliate/lead opportunities

Milestones:
- first ₹1
- first ₹1,000
- first ₹5,000/month

Targets are not guarantees.

## 13. New Calculator Template
Idea → demand research → formula/source verification → engine → EN/BN UI → navigation → save/share/export if needed → known-value tests → full tests → production build → SEO → commit/push → Search Console indexing

## 14. Important Do-Not-Do List
Do not:
- expose API keys, passwords, Aadhaar, PAN, bank data, keystore passwords or secrets
- commit signing keys
- change locked formulas casually
- silently alter medical thresholds
- remove bilingual support
- remove mobile responsiveness
- redesign branding casually
- rename official logo asset casually
- add random SEO keywords
- repeatedly rewrite metadata without Search Console evidence
- use medical calculators as diagnosis/treatment claims
- present EMI as lending/personal financial advice
- invent vaccination catch-up intervals
- mix unrelated refactors with focused work
- change AdSense during review without a concrete reason

### Bing Webmaster Tools and IndexNow
- Bing Webmaster Tools is configured for `worklity.in`.
- The Worklity sitemap has been submitted and processed successfully.
- A lightweight IndexNow integration is available for newly added, updated or deleted URLs.
- Use IndexNow only when a URL genuinely changes; do not submit the full sitemap on every deployment.
- IndexNow notifies participating search engines about URL changes but does not guarantee indexing.

## 15. Immediate Next Steps
1. Keep current SEO pages unchanged for an observation period.
2. Monitor Search Console and AdSense.
3. Wait for D-U-N-S contact/response.
4. Resume Google Play organization verification when D-U-N-S is available.
5. Build a data-driven 90-day traffic + earning roadmap.
6. Research alternative earning channels that do not depend on the local market.

## 16. Continuity Principle
The Worklity project must remain independent of any one chat, AI assistant, or coding session.

A future assistant/developer should:
- read this file first
- inspect current Git status
- inspect latest source/tests
- make one focused change
- preserve locked logic
- keep Worklity branding consistent
- document important milestones back into this file
