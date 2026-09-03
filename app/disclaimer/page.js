import Link from "next/link";

export const metadata = {
  title: "Disclaimer",
  description:
    "Important information and disclaimers for Worklity calculators, tools and content.",
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    type: "website",
    siteName: "Worklity",
    title: "Disclaimer",
    description:
      "Important information and disclaimers for Worklity calculators, tools and content.",
    url: "/disclaimer",
  },
  twitter: {
    title: "Disclaimer",
    description:
      "Important information and disclaimers for Worklity calculators, tools and content.",
  },
};

export default function DisclaimerPage() {
  return (
    <main>
      <header className="nav">
        <Link className="brand" href="/">
          <span>W</span>
          Worklity
        </Link>

        <Link href="/">← Home</Link>
      </header>

      <section className="toolHero">
        <b>LEGAL</b>
        <h1>Disclaimer</h1>
        <p>
          Important information about using Worklity calculators,
          tools and website content.
        </p>
      </section>

      <section className="explain">
        <p>
          <b>Last updated: August 31, 2026</b>
        </p>

        <h2>General information</h2>
        <p>
          Worklity provides calculators, utility tools and informational
          content for general convenience and educational purposes.
          Results should not be treated as professional, legal,
          financial, medical or other specialist advice.
        </p>

        <h2>Accuracy of calculations</h2>
        <p>
          We aim to make Worklity tools useful and accurate, but errors,
          differences in conventions or changes in official rules may
          occur. Please independently verify any result before using it
          for an important, official, financial, legal or health-related
          decision.
        </p>

        <h2>Land and area calculations</h2>
        <p>
          Traditional units such as Katha and Bigha can vary by region
          and local practice. Worklity conversions are provided for
          general reference only. For property records, registration,
          legal boundaries or official land transactions, verify the
          applicable measurement with local official records or a
          qualified professional.
        </p>

        <h2>Financial calculations</h2>
        <p>
          Percentage and other financial calculators are general
          calculation tools and do not constitute financial, tax,
          investment or accounting advice.
        </p>

        <h2>Date and age calculations</h2>
        <p>
          Date and age results are provided for convenience. If an age
          or date is required for an official application, eligibility
          decision or legal purpose, verify it against the relevant
          documents and rules.
        </p>

        <h2>Health and medical tools</h2>
        <p>
          Any pregnancy, estimated due date, vaccination or other
          health-related tool that may be provided by Worklity is for
          general informational and educational purposes only. It is not
          a diagnosis, treatment recommendation or substitute for advice
          from a doctor or other qualified healthcare professional.
        </p>

        <p>
          Pregnancy dates are estimates, and vaccination recommendations
          can vary by country, age, medical history and current official
          guidance. Always follow advice from a qualified healthcare
          professional and the applicable official health authority.
        </p>

        <h2>External links</h2>
        <p>
          Worklity may link to third-party websites for additional
          information. We do not control and are not responsible for
          third-party content, availability or practices.
        </p>

        <h2>Use of Worklity</h2>
        <p>
          You are responsible for deciding whether a Worklity result is
          appropriate for your situation and for obtaining professional
          or official verification when needed.
        </p>
      </section>

      <footer>Worklity · Simple Tools. Smarter Work.</footer>
    </main>
  );
}
