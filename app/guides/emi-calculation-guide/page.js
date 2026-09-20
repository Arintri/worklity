import Link from "next/link";
import { GuideArticle, guideMetadata, styles } from "../GuideChrome";

const title = "EMI Calculation Guide: Formula, Interest & Repayment Explained";
const description = "Understand EMI, principal, monthly reducing-balance interest, tenure, total repayment and amortization schedules with a worked loan example.";

export const metadata = guideMetadata(title, description, "/guides/emi-calculation-guide");

export default function EmiGuidePage() {
  return (
    <GuideArticle
      eyebrow="LOAN REPAYMENT GUIDE"
      title={title}
      intro="EMI is the regular monthly instalment used to repay a loan. Under the standard monthly reducing-balance method, each instalment contains interest on the outstanding balance and a portion that reduces the principal."
      calculatorHref="/emi-calculator"
      calculatorLabel="EMI Calculator"
      relatedTools={[
        { href: "/emi-calculator", label: "EMI Calculator" },
        { href: "/percentage-calculator", label: "Percentage Calculator" },
      ]}
      verificationNote="Loan documents and lender quotations may use different rounding, fees or rules. Verify important borrowing decisions directly with the lender; this guide is not financial advice or a loan offer."
    >
      <section>
        <h2>What EMI means</h2>
        <p>
          EMI stands for Equated Monthly Instalment. It is the scheduled amount
          paid each month during a loan term when the rate and repayment plan
          remain as assumed. “Equated” describes the regular payment amount,
          but the division between interest and principal changes from month to
          month. Early instalments generally contain more interest because the
          outstanding balance is larger.
        </p>
        <p>
          Three inputs drive the standard calculation: principal, annual
          interest rate and number of monthly instalments. Understanding each
          input is more useful than looking at EMI alone.
        </p>
      </section>

      <section>
        <h2>Principal, interest rate and tenure</h2>
        <h3>Principal</h3>
        <p>
          Principal is the loan amount used in the calculation. It does not
          automatically include a processing fee, insurance, tax or another
          charge unless a lender adds that amount to the financed balance.
        </p>
        <h3>Annual interest rate</h3>
        <p>
          The Worklity calculator accepts an annual percentage rate and converts
          it to a monthly rate without rounding the intermediate value.
        </p>
        <div className={styles.formula}>Monthly rate (r) = Annual rate ÷ 12 ÷ 100</div>
        <p>
          At 12% a year, the monthly rate used by the formula is 12 ÷ 12 ÷ 100
          = 0.01, or 1% per month.
        </p>
        <h3>Loan tenure</h3>
        <p>
          Tenure is the repayment period. The formula needs a whole number of
          months. One year is 12 instalments; 1.5 years is 18 instalments.
        </p>
      </section>

      <section>
        <h2>The monthly reducing-balance EMI formula</h2>
        <div className={styles.formula}>EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)</div>
        <p>
          Here, P is principal, r is the monthly interest rate, and n is the
          total number of monthly instalments. When the interest rate is zero,
          the formula’s fraction would divide by zero, so the correct special
          case is EMI = principal ÷ number of months.
        </p>
        <p>
          “Reducing balance” means interest for each month is calculated on the
          opening unpaid principal, not repeatedly on the original loan amount.
          After the principal portion of an instalment is deducted, the next
          month starts with a smaller balance.
        </p>
      </section>

      <section>
        <h2>Worked example: ₹1,00,000 at 12% for 12 months</h2>
        <p>
          For P = ₹1,00,000, r = 0.01 and n = 12, the regular EMI rounded to the
          nearest paise is ₹8,884.88 under the Worklity schedule method.
        </p>
        <div className={styles.tableWrap} tabIndex="0" aria-label="Worked EMI schedule excerpt; scroll horizontally if needed">
          <table>
            <thead><tr><th>Month</th><th>Opening balance</th><th>Payment</th><th>Interest</th><th>Principal repaid</th><th>Closing balance</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>₹1,00,000.00</td><td>₹8,884.88</td><td>₹1,000.00</td><td>₹7,884.88</td><td>₹92,115.12</td></tr>
              <tr><td>2</td><td>₹92,115.12</td><td>₹8,884.88</td><td>₹921.15</td><td>₹7,963.73</td><td>₹84,151.39</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Across the completed 12-month schedule, total interest is ₹6,618.53
          and total repayment is ₹1,06,618.53. Because every row is rounded to
          paise, the final payment may differ slightly from the regular EMI. The
          calculator adjusts only that final payment so the remaining principal
          becomes exactly zero.
        </p>
      </section>

      <section>
        <h2>Principal versus interest in each instalment</h2>
        <p>
          Monthly interest equals the opening balance multiplied by the monthly
          rate. Principal repaid equals payment minus interest. In the example,
          month one charges ₹1,000 interest and reduces principal by ₹7,884.88.
          Month two begins with ₹92,115.12, so interest falls to ₹921.15 and a
          larger part of the same regular payment reduces principal.
        </p>
        <p>
          An amortization schedule makes this movement visible. Its principal
          column should add back to the original loan amount; its interest
          column should equal total interest; and all payments should equal
          principal plus interest.
        </p>
      </section>

      <section>
        <h2>How tenure and interest rate affect repayment</h2>
        <h3>Longer tenure</h3>
        <p>
          Spreading the same loan over more months usually lowers the monthly
          EMI, but interest is charged over a longer period. The result is often
          a higher total interest amount even though each payment feels smaller.
        </p>
        <h3>Higher interest rate</h3>
        <p>
          A higher rate increases the interest charged on each outstanding
          balance. With principal and tenure unchanged, this normally raises
          EMI and total interest. You can use a <Link href="/percentage-calculator">percentage calculator</Link>
          to inspect rate differences, but a simple percentage of principal is
          not a substitute for the reducing-balance EMI formula.
        </p>
      </section>

      <section>
        <h2>Total interest versus total repayment</h2>
        <p>
          Total interest is the sum of interest charged across the schedule.
          Total repayment is original principal plus that interest. These
          figures do not necessarily represent the total cost quoted by a
          lender because fees, GST, insurance, penalties and other charges are
          outside the version-one Worklity calculation.
        </p>
        <div className={styles.note}>
          The calculator also does not model prepayments, daily-interest rules,
          floating-rate changes or lender-specific rounding and allocation.
        </div>
      </section>

      <section>
        <h2>Why a lender quotation may differ</h2>
        <ul>
          <li>The lender may use a different disbursement or first-payment date.</li>
          <li>Fees, taxes or insurance may be collected separately or financed.</li>
          <li>A floating interest rate can change during the tenure.</li>
          <li>Rounding and final-instalment rules can differ by lender.</li>
          <li>Prepayments, penalties or delayed payments alter the real schedule.</li>
        </ul>
        <p>
          Use the calculator as a transparent estimate, then compare it with the
          lender’s sanction letter, repayment schedule and applicable terms.
        </p>
      </section>

      <section>
        <h2>Common EMI calculation mistakes</h2>
        <ul>
          <li>Using the annual percentage directly as the monthly decimal rate.</li>
          <li>Entering years as months, or months as years.</li>
          <li>Calculating simple interest instead of reducing-balance interest.</li>
          <li>Assuming EMI × months always matches a paise-rounded schedule exactly.</li>
          <li>Treating fees and insurance as included when the calculation excludes them.</li>
          <li>Comparing loans only by EMI without reviewing total interest and terms.</li>
        </ul>
      </section>

      <section>
        <h2>Frequently asked questions</h2>
        <h3>Does a lower EMI always mean a cheaper loan?</h3>
        <p>No. A longer tenure can lower EMI while increasing total interest.</p>
        <h3>What happens at 0% interest?</h3>
        <p>The principal is divided equally across the number of monthly instalments.</p>
        <h3>Does Worklity include processing fees or GST?</h3>
        <p>No. The current calculator covers principal and reducing-balance interest only.</p>
        <h3>Where can I create the full schedule?</h3>
        <p>Enter the loan values in the <Link href="/emi-calculator">Worklity EMI Calculator</Link> to view every monthly row.</p>
      </section>

      <section>
        <h2>Informational disclaimer</h2>
        <p>
          This guide explains a standard calculation for general information.
          It is not financial advice, a lending decision or a guarantee of a
          lender’s EMI, interest, approval or repayment terms.
        </p>
      </section>
    </GuideArticle>
  );
}
