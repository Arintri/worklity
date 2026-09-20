import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Worklity Editorial & Calculation Policy",
  description:
    "Learn how Worklity documents calculator methods, checks examples, uses reference sources, reviews content and handles corrections.",
  alternates: { canonical: "/editorial-policy" },
  openGraph: {
    type: "website",
    siteName: "Worklity",
    title: "Worklity Editorial & Calculation Policy",
    description:
      "How Worklity documents calculator methods, checks examples, uses references and handles corrections.",
    url: "/editorial-policy",
  },
  twitter: {
    title: "Worklity Editorial & Calculation Policy",
    description:
      "How Worklity documents calculator methods, checks examples, uses references and handles corrections.",
  },
};

export default function EditorialPolicyPage() {
  return (
    <main>
      <header className="nav">
        <Link className="brand" href="/" aria-label="Worklity home">
          <Image
            src="/brand/worklity-mark.png"
            alt=""
            width={40}
            height={40}
            style={{ display: "block", flex: "0 0 40px", width: 40, height: 40, objectFit: "contain" }}
          />
          Worklity
        </Link>
        <Link href="/">← Home</Link>
      </header>

      <article>
        <header className="toolHero">
          <b>EDITORIAL &amp; CALCULATION POLICY</b>
          <h1>How Worklity develops and reviews its tools</h1>
          <p>
            This policy explains how Worklity documents calculation methods,
            checks educational content and examples, uses reference sources,
            and responds when something needs correction.
          </p>
        </header>

        <div className="explain">
          <h2>Purpose of Worklity content</h2>
          <p>
            Worklity publishes practical calculators and guides intended to
            make common calculations easier to understand and perform. The
            site covers everyday mathematics, dates, measurements, finance
            estimates, and health-awareness or planning tools. Each page is
            written to explain what information a tool needs, what it returns,
            and the important limits on how its result should be used.
          </p>
          <p>
            Worklity is the publisher of this site. It is an independent tools
            website, not a Government website, healthcare provider, financial
            institution, lender, land-record authority, or professional
            certification service.
          </p>

          <h2>Calculator methods and conversion rules</h2>
          <p>
            A calculator is built around a stated mathematical method, date
            convention, conversion basis, or published schedule. Where a
            formula is useful to visitors, the related page or guide explains
            it in readable form. Where a traditional unit can vary by region,
            the assumptions used by the calculator are stated instead of being
            presented as universal values.
          </p>
          <p>
            Calculation code is kept separate from presentation where the
            architecture permits. This helps the same rule be tested without
            depending on the appearance of a page. Changes to a calculator
            should preserve documented boundaries, rounding rules, units, and
            special cases unless a verified correction requires otherwise.
          </p>

          <h2>Examples and automated checks</h2>
          <p>
            Worked examples are checked against the method used by the related
            Worklity calculator. Calculation engines with important boundaries
            or date behaviour use automated tests for representative values,
            invalid inputs, and edge cases. A successful test does not make a
            result an official record or professional opinion; it shows that
            the implementation behaves consistently with its documented rule.
          </p>

          <h2>Health-related information</h2>
          <p>
            Health pages are presented for information, screening awareness,
            or planning assistance. They use cautious language and should not
            diagnose a condition, determine treatment, assess medical fitness,
            or replace a qualified healthcare professional. When a health tool
            depends on a published schedule, threshold, or clinical method,
            Worklity identifies authoritative sources where appropriate and
            describes meaningful limitations near the tool.
          </p>
          <p>
            A reference link means that the source informs the stated method or
            context. It does not mean the source organization has reviewed,
            approved, or endorsed Worklity. Worklity does not claim independent
            review by a doctor or other specialist unless that has actually
            occurred and is explicitly disclosed.
          </p>

          <h2>Finance, property, and official decisions</h2>
          <p>
            Finance calculators provide estimates based on the inputs and
            stated formula. They do not include every lender rule, fee, tax,
            rate change, or contractual condition and are not loan offers or
            financial advice. Land and measurement conversions are mathematical
            aids; deeds, surveys, registration records, and applicable official
            measurements remain the appropriate sources for legal or property
            decisions.
          </p>

          <h2>Sources and original explanations</h2>
          <p>
            Worklity prefers official Government publications, primary
            guidance, recognized standards bodies, and established professional
            organizations when a claim requires an external basis. Explanations
            and worked examples are written in Worklity&apos;s own words. We do not
            use a citation to imply affiliation or endorsement, and we avoid
            adding a source that does not support the nearby claim.
          </p>

          <h2>Reviews, dates, and updates</h2>
          <p>
            Pages are reviewed when a tool is created, when its underlying rule
            or source is updated, or when a credible correction is reported.
            A visible “Last reviewed” date indicates a deliberate content review
            rather than an automatically changing timestamp. Not every page
            displays a review date, and an older date does not by itself mean a
            calculator is incorrect; time-sensitive guidance should still be
            checked against the linked current source.
          </p>

          <h2>Corrections and user feedback</h2>
          <p>
            If you find a calculation error, outdated statement, broken source
            link, or factual issue, please use the <Link href="/contact">Contact page</Link> or
            email <a href="mailto:worklity.contact@gmail.com">worklity.contact@gmail.com</a>.
            Include the page address, the input or text involved, the result you
            received, and a reliable source when relevant. Reports are reviewed
            before a change is made so that a correction does not introduce a
            new inconsistency.
          </p>

          <h2>Limits of online calculators</h2>
          <p>
            Online calculators simplify a defined problem. They cannot know all
            personal, clinical, contractual, legal, regional, or administrative
            circumstances. Results should be treated according to the limitation
            stated on each page and independently verified for important
            decisions. Worklity guides are general educational material, not a
            substitute for professional advice or an official record.
          </p>

          <p><strong>Last reviewed: September 2026</strong></p>
        </div>
      </article>

      <footer>
        Worklity · Simple Tools. Smarter Work. · <Link href="/guides">Guides</Link> ·{" "}
        <Link href="/about">About</Link> · <Link href="/privacy-policy">Privacy Policy</Link> ·{" "}
        <Link href="/disclaimer">Disclaimer</Link> · <Link href="/contact">Contact</Link>
      </footer>
    </main>
  );
}
