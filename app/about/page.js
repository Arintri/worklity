import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About Worklity",
  description:
    "Learn about Worklity — simple, free online calculators and practical tools for everyday work.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    siteName: "Worklity",
    title: "About Worklity",
    description:
      "Learn about Worklity — simple, free online calculators and practical tools for everyday work.",
    url: "/about",
  },
  twitter: {
    title: "About Worklity",
    description:
      "Learn about Worklity — simple, free online calculators and practical tools for everyday work.",
  },
};

export default function AboutPage() {
  return (
    <main>
      <header className="nav">
        <Link className="brand" href="/">
          <Image src="/brand/worklity-mark.png" alt="" width={40} height={40} style={{ display: "block", flex: "0 0 40px", width: 40, height: 40, objectFit: "contain" }} />
          Worklity
        </Link>

        <Link href="/">← Home</Link>
      </header>

      <section className="toolHero">
        <b>ABOUT WORKLITY</b>
        <h1>Simple tools for everyday work</h1>

        <p>
          Worklity is built to make common calculations and everyday
          digital tasks simpler, faster and easier to understand.
        </p>
      </section>

      <section className="explain">
        <h2>What is Worklity?</h2>

        <p>
          Worklity is a growing collection of free online calculators
          and practical utility tools for everyday calculations,
          measurements, finance, dates and health awareness. Our goal
          is to provide useful tools with a clean interface, simple
          instructions and no unnecessary complexity.
        </p>

        <h2>What can you find here?</h2>

        <p>
          Current tools include Land Area, Percentage, Age, EMI,
          Estimated Due Date (EDD), Vaccination Due Date and adult BMI
          calculators. Together they cover land and measurement tasks,
          finance calculations, date and age questions, and
          health-awareness or planning needs.
        </p>

        <h2>Independent tools website</h2>

        <p>
          Worklity is an independent tools website. It is not a
          Government website, healthcare provider, financial institution
          or lender. Important health, financial, legal or official
          decisions should be verified with the appropriate qualified
          professional or official source.
        </p>

        <h2>Why Worklity?</h2>

        <p>
          We believe a useful online tool should be quick, clear and
          easy to use. Many Worklity tools are also designed with
          simple English and Bengali support so that they can be
          useful to more people.
        </p>

        <h2>Practical services</h2>

        <p>
          Worklity also focuses on practical data and office solutions
          including spreadsheets, data cleaning, reports, dashboards
          and workflow automation.
        </p>

        <p>
          <b>Simple Tools. Smarter Work.</b>
        </p>
      </section>

      <footer>
        Worklity · Simple Tools. Smarter Work.
      </footer>
    </main>
  );
}
