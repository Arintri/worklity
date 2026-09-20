import Link from "next/link";
import { GuideArticle, guideMetadata, styles } from "../GuideChrome";

const title = "West Bengal Land Measurement Guide: Katha, Bigha, Decimal & Square Feet";
const description = "Understand West Bengal land measurement in Katha, Bigha, Decimal, Acre and square feet using clear conversion assumptions, tables and examples.";

export const metadata = guideMetadata(title, description, "/guides/west-bengal-land-measurement-guide");

export default function LandGuidePage() {
  return (
    <GuideArticle
      eyebrow="WEST BENGAL LAND GUIDE"
      title={title}
      intro="Land area can be expressed in square feet, Decimal, Katha, Bigha, Acre or metric units. Worklity converts every result through one stated mathematical basis, while recognising that traditional unit usage can vary by locality and official record."
      calculatorHref="/land-area-calculator"
      calculatorLabel="Land Area Calculator"
      relatedTools={[
        { href: "/land-area-calculator", label: "Land Area Calculator" },
        { href: "/length-distance-converter", label: "Length & Distance Converter" },
      ]}
      verificationNote="For deeds, registration, mutation, survey work, valuation, boundaries or legal disputes, use the applicable official record and a qualified survey or land professional rather than this educational conversion alone."
    >
      <section>
        <h2>Common land units used in West Bengal</h2>
        <p>
          Land descriptions often combine international area units with
          traditional local units. The same plot may appear as square feet in a
          building plan, Decimal in a record, Katha or Bigha in conversation,
          and square metres in a metric document. A conversion is reliable only
          when the value assigned to each traditional unit is clearly stated.
        </p>
        <h3>Square foot</h3>
        <p>
          A square foot is the area of a square measuring one foot by one foot.
          For a rectangular plot measured in feet, multiply length by width to
          obtain square feet.
        </p>
        <h3>Decimal or Disimil</h3>
        <p>
          Decimal is commonly used for land area. Worklity uses 1 Decimal =
          435.6 square feet, so 100 Decimal equals one Acre under this basis.
        </p>
        <h3>Katha and Bigha</h3>
        <p>
          Katha and Bigha are traditional units whose values can change across
          regions. For its West Bengal calculations, Worklity uses 1 Katha =
          720 square feet and 1 Bigha = 14,400 square feet = 20 Katha.
        </p>
        <h3>Acre</h3>
        <p>
          Acre is a larger area unit. One Acre equals 43,560 square feet. On the
          Worklity basis, that is 100 Decimal, 60.5 Katha or 3.025 Bigha.
        </p>
        <h3>Square metre and hectare</h3>
        <p>
          A square metre is the area of a one-metre square. Worklity converts
          one square metre to 10.7639104167 square feet. One hectare equals
          10,000 square metres, approximately 107,639.1 square feet.
        </p>
      </section>

      <section>
        <h2>Worklity conversion assumptions</h2>
        <p>
          These are the exact values used by the current calculator. Keeping
          them visible prevents a result based on one regional convention from
          being mistaken for another.
        </p>
        <div className={styles.tableWrap} tabIndex="0" aria-label="Land conversion table; scroll horizontally if needed">
          <table>
            <thead><tr><th>Unit</th><th>Worklity conversion basis</th><th>Useful relationship</th></tr></thead>
            <tbody>
              <tr><td>1 Decimal / Disimil</td><td>435.6 sq ft</td><td>100 Decimal = 1 Acre</td></tr>
              <tr><td>1 Katha</td><td>720 sq ft</td><td>20 Katha = 1 Bigha</td></tr>
              <tr><td>1 Bigha</td><td>14,400 sq ft</td><td>20 Katha</td></tr>
              <tr><td>1 Acre</td><td>43,560 sq ft</td><td>100 Decimal</td></tr>
              <tr><td>1 square metre</td><td>10.7639104167 sq ft</td><td>Metric area conversion</td></tr>
              <tr><td>1 hectare</td><td>10,000 m²</td><td>About 107,639.1 sq ft</td></tr>
            </tbody>
          </table>
        </div>
        <div className={styles.note}>
          The West Bengal Directorate of Registration and Stamp Revenue
          <a href="https://wbregistration.gov.in/faq.aspx" target="_blank" rel="noopener noreferrer"> Land Measurement FAQ</a>
          {" "}lists commonly used relationships including 1 Katha = 720 sq ft
          and 1 Bigha = 14,400 sq ft. Its approximate Decimal figure may differ
          slightly from the exact 435.6 sq ft basis used by Worklity. Linking to
          the source does not imply official endorsement of Worklity.
        </div>
      </section>

      <section>
        <h2>Core conversion formulas</h2>
        <div className={styles.formula}>
          Decimal = Square Feet ÷ 435.6<br />
          Katha = Square Feet ÷ 720<br />
          Bigha = Square Feet ÷ 14,400<br />
          Katha = Bigha × 20<br />
          Square Feet = Acre × 43,560
        </div>
        <p>
          A good method is to convert the starting area to square feet or square
          metres first, then convert that common base into the requested unit.
          This is also how one result can be presented consistently in several
          units.
        </p>
      </section>

      <section>
        <h2>Worked example 1: a 50 ft × 30 ft plot</h2>
        <p>
          For a rectangular plot, area equals length multiplied by width. A
          length of 50 feet and width of 30 feet gives 1,500 square feet.
        </p>
        <div className={styles.example}>
          Area = 50 × 30 = 1,500 sq ft<br />
          Decimal = 1,500 ÷ 435.6 ≈ 3.4435<br />
          Katha = 1,500 ÷ 720 ≈ 2.0833<br />
          Bigha = 1,500 ÷ 14,400 ≈ 0.1042
        </div>
        <p>
          Keep the original 1,500 square feet in your notes. Rounded display
          values are convenient for reading, but repeated conversion from a
          rounded number can introduce small differences.
        </p>
      </section>

      <section>
        <h2>Worked example 2: Acre to local units</h2>
        <p>
          One Acre is 43,560 square feet. Divide that value by each local-unit
          factor rather than guessing from a rounded relationship.
        </p>
        <div className={styles.example}>
          43,560 ÷ 435.6 = 100 Decimal<br />
          43,560 ÷ 720 = 60.5 Katha<br />
          43,560 ÷ 14,400 = 3.025 Bigha
        </div>
        <p>
          For 0.03 Acre, multiply 43,560 by 0.03 to get 1,306.8 square feet.
          Dividing by 720 gives approximately 1.815 Katha.
        </p>
      </section>

      <section>
        <h2>Worked example 3: Katha to Decimal</h2>
        <p>
          A stated area of 2.5 Katha equals 2.5 × 720 = 1,800 square feet on the
          Worklity basis. Then 1,800 ÷ 435.6 ≈ 4.1322 Decimal. This two-step
          method makes the assumptions visible and easy to verify.
        </p>
      </section>

      <section>
        <h2>Why Katha and Bigha can vary by region</h2>
        <p>
          Traditional land units developed through local practice rather than
          one universal international definition. A Katha or Bigha used in one
          state, district or historical record may not equal the value used in
          another. Even when a relationship is commonly used in West Bengal,
          the controlling value for a particular property may come from its
          deed, record-of-rights, survey map or applicable registration record.
        </p>
        <p>
          For that reason, a calculator should identify its basis rather than
          simply label a result “Katha” or “Bigha.” Worklity labels these as
          commonly used West Bengal units and keeps the original square-foot
          result visible.
        </p>
      </section>

      <section>
        <h2>Mathematical conversion versus official land records</h2>
        <p>
          A mathematical conversion changes the unit used to express a known
          area. It does not establish ownership, locate boundaries, correct a
          deed, resolve encroachment or certify the physical size of a plot.
          Those matters depend on official records and, when necessary, a
          qualified survey.
        </p>
        <p>
          If a deed says one value and a fresh physical measurement suggests
          another, converting both values does not resolve the discrepancy.
          Preserve the source documents and seek the appropriate official or
          professional review.
        </p>
      </section>

      <section>
        <h2>Common land-measurement mistakes</h2>
        <ul>
          <li>Mixing feet and metres in the same length × width calculation.</li>
          <li>Using a Katha or Bigha definition from another region.</li>
          <li>Confusing linear feet with square feet.</li>
          <li>Rounding each intermediate conversion too aggressively.</li>
          <li>Applying a rectangle formula to an irregular plot without dividing it into appropriate shapes.</li>
          <li>Treating an online calculation as a substitute for a deed or survey.</li>
        </ul>
      </section>

      <section>
        <h2>How to use the Worklity Land Area Calculator</h2>
        <ol>
          <li>Enter the rectangular plot’s length and width.</li>
          <li>Select the same unit used for both measurements.</li>
          <li>Calculate to see square feet, square metres, square yards, Decimal, Katha, Bigha, Acre and hectare.</li>
          <li>Use the copy summary when you need a plain-text record of the result.</li>
        </ol>
        <p>
          If your measurements need conversion first, the <Link href="/length-distance-converter">Length &amp; Distance Converter</Link>
          can convert metres, feet, inches, kilometres and miles. For an
          irregular or important property measurement, use an appropriate
          survey rather than assuming a rectangle.
        </p>
      </section>

      <section>
        <h2>Frequently asked questions</h2>
        <h3>How many square feet are in one West Bengal Katha?</h3>
        <p>Worklity uses the commonly used relationship of 720 square feet.</p>
        <h3>How many Katha are in one Bigha?</h3>
        <p>On the stated Worklity West Bengal basis, one Bigha equals 20 Katha.</p>
        <h3>How many square feet are in one Decimal?</h3>
        <p>The calculator uses exactly 435.6 square feet per Decimal.</p>
        <h3>Can I use these results for registration?</h3>
        <p>
          Use them for general conversion and checking only. Registration and
          legal measurement should follow the applicable official record.
        </p>
      </section>
    </GuideArticle>
  );
}
