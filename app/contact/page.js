import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Contact Worklity",
  description:
    "Contact Worklity for questions, feedback, tool suggestions and practical data or spreadsheet services.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    siteName: "Worklity",
    title: "Contact Worklity",
    description:
      "Contact Worklity for questions, feedback, tool suggestions and practical data or spreadsheet services.",
    url: "/contact",
  },
  twitter: {
    title: "Contact Worklity",
    description:
      "Contact Worklity for questions, feedback, tool suggestions and practical data or spreadsheet services.",
  },
};

export default function ContactPage() {
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
        <b>CONTACT</b>
        <h1>Get in touch with Worklity</h1>
        <p>
          Have a question, found an issue, or want to suggest a useful
          tool? We would be happy to hear from you.
        </p>
      </section>

      <section className="explain">
        <h2>Contact Worklity</h2>

        <p>
          You can contact us for feedback, corrections, tool suggestions
          or general questions about Worklity.
        </p>

        <p>
          <b>Email:</b>{" "}
          <a href="mailto:worklity.contact@gmail.com">
            worklity.contact@gmail.com
          </a>
        </p>

        <h2>Need a practical solution?</h2>

        <p>
          Worklity also provides practical support for spreadsheet and
          data-related work, including:
        </p>

        <ul>
          <li>Excel and Google Sheets solutions</li>
          <li>Data cleaning and organization</li>
          <li>Reports and dashboards</li>
          <li>Spreadsheet automation</li>
          <li>Custom utility and workflow solutions</li>
        </ul>

        <p>
          For service enquiries, send a short description of your
          requirement by email. Please do not send passwords, OTPs,
          banking credentials or other sensitive information.
        </p>

        <h2>Response</h2>

        <p>
          We aim to review genuine messages as soon as reasonably
          possible. Please include a clear subject and enough information
          for us to understand your question or requirement.
        </p>
      </section>

      <footer>Worklity · Simple Tools. Smarter Work.</footer>
    </main>
  );
}
