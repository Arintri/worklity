import Link from "next/link";
import { GuideArticle, guideMetadata, styles } from "../GuideChrome";

const title = "Percentage Calculation Guide: Formulas, Examples & Common Uses";
const description = "Learn percentage formulas with clear examples for finding a percentage of a number, percentage change, increases, decreases and percentage points.";

export const metadata = guideMetadata(title, description, "/guides/percentage-calculation-guide");

export default function PercentageGuidePage() {
  return (
    <GuideArticle
      eyebrow="PERCENTAGE GUIDE"
      title={title}
      intro="A percentage expresses a quantity as parts out of 100. The key to solving a percentage question is identifying the base value: the number that represents the whole, original amount or comparison total."
      calculatorHref="/percentage-calculator"
      calculatorLabel="Percentage Calculator"
      relatedTools={[{ href: "/percentage-calculator", label: "Percentage Calculator" }]}
      verificationNote="For contracts, tax filings, grading rules or other consequential decisions, confirm the required method and source figures independently."
    >
      <section>
        <h2>What is a percentage?</h2>
        <p>
          “Percent” means “per hundred.” A value of 20% represents 20 parts
          out of 100, which is also the decimal 0.20 and the fraction 20/100.
          Percentages make quantities with different totals easier to compare.
          A score of 45 out of 50 and a score of 81 out of 90 look different,
          but both equal 90%.
        </p>
        <p>
          A percentage is meaningful only when the whole is clear. Ten is 20%
          of 50, but it is 5% of 200. Before choosing a formula, ask: “Which
          number is the total or original value?”
        </p>
      </section>

      <section>
        <h2>How to find X% of a number</h2>
        <p>
          Divide the percentage by 100, then multiply by the number. This is
          useful for discounts, marks, commissions, portions and many routine
          calculations.
        </p>
        <div className={styles.formula}>Result = (Percentage ÷ 100) × Number</div>
        <h3>Worked example: 20% of 500</h3>
        <div className={styles.example}>
          20 ÷ 100 = 0.20<br />
          0.20 × 500 = 100<br />
          Therefore, 20% of 500 is <strong>100</strong>.
        </div>
        <h3>Worked example: a 15% discount</h3>
        <p>
          A product costs ₹1,200 before discount. The discount is
          (15 ÷ 100) × 1,200 = ₹180. Subtract the discount from the original
          price: ₹1,200 − ₹180 = ₹1,020. A common mistake is to report ₹180 as
          the final price; it is the discount amount, not the amount payable.
        </p>
      </section>

      <section>
        <h2>How to find what percentage one number is of another</h2>
        <p>
          Treat the first number as the part and the second as the total. Divide
          the part by the total and multiply by 100. The total cannot be zero,
          because division by zero is undefined.
        </p>
        <div className={styles.formula}>Percentage = (Number ÷ Total) × 100</div>
        <h3>Worked example: 50 out of 200</h3>
        <div className={styles.example}>
          50 ÷ 200 = 0.25<br />
          0.25 × 100 = 25%<br />
          Therefore, 50 is <strong>25%</strong> of 200.
        </div>
        <p>
          The order matters. Two hundred is 400% of 50, not 25%. Read the
          wording carefully: “A is what percentage of B?” means A goes above B
          in the division.
        </p>
      </section>

      <section>
        <h2>Percentage increase and percentage decrease</h2>
        <p>
          Percentage change compares the difference with the original value.
          Subtract the old value from the new value, divide by the absolute
          value of the old amount, and multiply by 100. A positive answer is an
          increase; a negative answer is a decrease. Worklity presents the
          direction in words.
        </p>
        <div className={styles.formula}>Percentage change = ((New Value − Old Value) ÷ |Old Value|) × 100</div>
        <h3>Increase from 100 to 125</h3>
        <div className={styles.example}>
          Change = 125 − 100 = 25<br />
          25 ÷ 100 × 100 = 25%<br />
          The value increased by <strong>25%</strong>.
        </div>
        <h3>Decrease from 100 to 75</h3>
        <p>
          The change is −25. Dividing −25 by 100 and multiplying by 100 gives
          −25%, so the value decreased by 25%. Percentage change from an old
          value of zero is undefined; there is no non-zero base for comparison.
        </p>
      </section>

      <section>
        <h2>Percentage change versus percentage points</h2>
        <p>
          Percentage points measure the direct gap between two rates.
          Percentage change measures that gap relative to the original rate.
          They answer different questions and should not be interchanged.
        </p>
        <div className={styles.example}>
          If a rate moves from 20% to 25%, the increase is <strong>5 percentage
          points</strong>. Relative to the original 20%, the increase is
          (25 − 20) ÷ 20 × 100 = <strong>25%</strong>.
        </div>
        <p>
          Saying the rate “rose by 5%” would be ambiguous here. Use “percentage
          points” when comparing the displayed rates directly.
        </p>
      </section>

      <section>
        <h2>Everyday uses of percentages</h2>
        <ul>
          <li><strong>Shopping:</strong> calculate a discount and the price after discount.</li>
          <li><strong>Scores:</strong> compare marks from tests with different totals.</li>
          <li><strong>Price changes:</strong> measure an increase or decrease from an earlier price.</li>
          <li><strong>Reports:</strong> show a category as a share of a total.</li>
          <li><strong>Growth and decline:</strong> compare a new count with its original baseline.</li>
        </ul>
        <p>
          Percentages describe arithmetic relationships; they do not by
          themselves explain why a change occurred or whether it is good or
          bad. Context and accurate source data still matter.
        </p>
      </section>

      <section>
        <h2>Reading and rounding a percentage result</h2>
        <p>
          Keep full precision while calculating, then round only the final
          answer to the number of decimal places the situation needs. Rounding
          every intermediate step can create a visible difference, especially
          with a large total or several repeated calculations. If a result is
          33.3333%, writing 33.33% may be appropriate for a summary, while a
          formal report may specify a different rule.
        </p>
        <p>
          Always label the rounded result and retain the original figures. A
          displayed percentage can look precise even when its source numbers
          were estimates, so the quality of the inputs matters as much as the
          formula.
        </p>
      </section>

      <section>
        <h2>Common percentage mistakes</h2>
        <ul>
          <li>Using the new value as the base when the question asks for change from the old value.</li>
          <li>Reversing the part and total in “what percentage is A of B?”</li>
          <li>Adding a percent sign to a raw decimal without multiplying by 100.</li>
          <li>Confusing a discount amount with the final discounted price.</li>
          <li>Using percentage change when the old value is zero.</li>
          <li>Confusing percentage points with relative percentage change.</li>
          <li>Rounding intermediate steps too early and creating avoidable errors.</li>
        </ul>
      </section>

      <section>
        <h2>Frequently asked questions</h2>
        <h3>How do I calculate 10% quickly?</h3>
        <p>Divide the number by 10. For example, 10% of 760 is 76.</p>
        <h3>Can a percentage be above 100%?</h3>
        <p>
          Yes. A value can exceed the reference total. For example, 150 is
          150% of 100. Whether that makes sense depends on the situation.
        </p>
        <h3>Why are increase and decrease not always reversible?</h3>
        <p>
          A 20% rise from 100 gives 120. A 20% fall from 120 subtracts 24 and
          gives 96. The second calculation uses a different base.
        </p>
        <h3>Can the calculator handle decimals?</h3>
        <p>
          Yes. The <Link href="/percentage-calculator">Worklity Percentage Calculator</Link>
          accepts ordinary decimal inputs and validates non-finite results.
        </p>
      </section>
    </GuideArticle>
  );
}
