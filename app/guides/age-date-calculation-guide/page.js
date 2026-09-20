import Link from "next/link";
import { GuideArticle, guideMetadata, styles } from "../GuideChrome";

const title = "Exact Age & Date Calculation Guide: Years, Months and Days Explained";
const description = "Learn how exact age and date differences are calculated in calendar years, months and days, including leap years and February 29 birthdays.";

export const metadata = guideMetadata(title, description, "/guides/age-date-calculation-guide");

export default function AgeGuidePage() {
  return (
    <GuideArticle
      eyebrow="AGE & DATE GUIDE"
      title={title}
      intro="Exact age is a calendar difference between a date of birth and a chosen target date. It counts completed years first, then completed calendar months, then the remaining days; it is not total days divided by 365."
      calculatorHref="/age-calculator"
      calculatorLabel="Age Calculator"
      relatedTools={[{ href: "/age-calculator", label: "Age Calculator" }]}
      verificationNote="For legal, school, employment, benefit or other official age requirements, verify the governing rule and use accepted records or documents."
    >
      <section>
        <h2>What exact age means</h2>
        <p>
          Exact age describes how much calendar time has passed from a birth
          date to a reference date. A result such as 24 years, 5 months and 5
          days means 24 complete calendar years were reached, followed by five
          complete calendar months and five remaining days.
        </p>
        <p>
          The reference date matters. “Age today” uses today as the target;
          “age on 1 January” uses that date instead. Worklity calls this second
          input “Age as of.” It must be the same as or later than the date of
          birth.
        </p>
      </section>

      <section>
        <h2>Completed years versus running age</h2>
        <p>
          Completed years are the number of birthdays already reached by the
          target date. A person becomes 25 only when the calculator’s birthday
          convention reaches the 25th birthday. Before then, completed age is
          24 even though people may informally say the person is “running 25.”
        </p>
        <p>
          Running age is conversational and can be interpreted differently. For
          forms and comparisons, completed years and a clearly stated reference
          date are usually less ambiguous.
        </p>
      </section>

      <section>
        <h2>How years, months and days are calculated</h2>
        <p>
          Worklity first finds the latest birthday anniversary on or before the
          target date. It then advances from that anniversary through complete
          calendar months. If the original day does not exist in a shorter
          month, the month anchor is clamped to that month’s final day. The
          remaining elapsed calendar days form the day component.
        </p>
        <div className={styles.example}>
          Date of birth: 15 January 2000<br />
          Age as of: 20 June 2024<br />
          Result: <strong>24 years, 5 months and 5 days</strong>
        </div>
        <p>
          This decomposition never treats every month as an equal block. January
          has 31 days, February has 28 or 29, and other months have 30 or 31.
        </p>
      </section>

      <section>
        <h2>Why total days divided by 365 is not exact age</h2>
        <p>
          Dividing elapsed days by 365 gives an approximation in decimal years.
          It cannot reproduce a calendar birthday reliably because leap years
          contain 366 days and calendar months have different lengths. A result
          of 24.43 years also does not directly mean 24 years, 5 months and a
          fixed number of days.
        </p>
        <p>
          Total Days is still useful as a separate fact. Worklity counts elapsed
          calendar days from the birth date to the target date using UTC-midnight
          arithmetic. If both dates are the same, zero days have elapsed even
          though the displayed dates include that calendar day.
        </p>
      </section>

      <section>
        <h2>Leap years and February 29 birthdays</h2>
        <p>
          A leap year adds February 29. The extra day must be counted in total
          elapsed days, but a February 29 birthday also needs a consistent rule
          in a year without that date.
        </p>
        <div className={styles.note}>
          Worklity’s calculator convention treats February 28 as the birthday
          for a person born on February 29 when the target year is not a leap
          year. This is a calculator convention, not a universal legal rule.
        </div>
        <div className={styles.example}>
          29 February 2020 → 28 February 2021 = <strong>1 completed year</strong><br />
          29 February 2020 → 29 February 2024 = <strong>4 completed years</strong>
        </div>
        <p>
          On 28 February 2021, the calculator may show the next birthday as that
          same date with zero days remaining. An authority may apply a different
          rule for a legal age threshold, so official requirements need their
          own verification.
        </p>
      </section>

      <section>
        <h2>Month-end dates and short months</h2>
        <p>
          A common source of negative or confusing day values is subtracting day
          numbers directly. For example, “1 March minus 31 January” cannot be
          solved by writing 1 − 31. Worklity advances calendar months with an
          end-of-month clamp and then counts the remaining days.
        </p>
        <div className={styles.example}>
          31 January 2023 → 1 March 2023 = <strong>0 years, 1 month, 1 day</strong><br />
          31 January 2024 → 1 March 2024 = <strong>0 years, 1 month, 1 day</strong>
        </div>
        <p>
          In 2023 the one-month anchor is 28 February; in 2024 it is 29 February.
          The decomposition stays non-negative and internally consistent even
          though the total elapsed-day counts differ.
        </p>
      </section>

      <section>
        <h2>Age on a past or future reference date</h2>
        <p>
          A target date can answer questions such as “How old was I when this
          form was signed?” or “What will my completed age be on an application
          deadline?” Choose the relevant date in the Age as of field. It may be
          in the past or future, provided it is not earlier than the birth date.
        </p>
        <p>
          Future results are calendar projections, not proof that an official
          rule will accept the result. Requirements can define age using a
          specific cut-off date or document.
        </p>
      </section>

      <section>
        <h2>What “next birthday” means</h2>
        <p>
          The next birthday is the birthday date on or after the selected target
          date. If the target date is the birthday itself, Worklity shows that
          day and zero days until birthday. Otherwise it uses the next matching
          birthday under the February 29 convention described above.
        </p>
        <p>
          This is different from completed years: one tells you the age already
          reached, while the other identifies the next birthday date and the
          calendar days remaining until it.
        </p>
      </section>

      <section>
        <h2>Date difference and practical uses</h2>
        <p>
          The same calendar approach helps explain date differences for school
          or application cut-offs, form preparation, employment records and
          personal timelines. Always record both the start and target date so a
          reader knows what the result measures.
        </p>
        <ul>
          <li>Check completed age on a stated admission or examination date.</li>
          <li>Prepare a form that requests years, months and days.</li>
          <li>Compare age today with age on a past event date.</li>
          <li>See total elapsed days separately from calendar age.</li>
          <li>Find the next birthday and days remaining.</li>
        </ul>
      </section>

      <section>
        <h2>Common age-calculation mistakes</h2>
        <ul>
          <li>Subtracting years without checking whether the birthday has occurred.</li>
          <li>Treating every month as 30 days.</li>
          <li>Dividing by 365 and calling the decimal an exact calendar age.</li>
          <li>Ignoring February 29 or using an unstated convention.</li>
          <li>Entering the reference date before the date of birth.</li>
          <li>Comparing dates with local times that can shift a calendar day.</li>
          <li>Using an informational result as official proof of age.</li>
        </ul>
      </section>

      <section>
        <h2>Frequently asked questions</h2>
        <h3>Does the calculator show age in years, months and days?</h3>
        <p>Yes. It reports completed calendar years and months plus remaining days.</p>
        <h3>Can I calculate age on a specific date?</h3>
        <p>Yes. Enter that date in the Age as of field if it is not before the birth date.</p>
        <h3>What happens when both dates are the same?</h3>
        <p>The result is 0 years, 0 months, 0 days, with zero total elapsed days.</p>
        <h3>Is the result official proof of age?</h3>
        <p>
          No. Use accepted documents and the applicable official rule. The
          <Link href="/age-calculator">Worklity Age Calculator</Link> is an
          informational date-calculation tool.
        </p>
      </section>
    </GuideArticle>
  );
}
