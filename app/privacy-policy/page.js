import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Worklity free online calculators and utility tools.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    type: "website",
    siteName: "Worklity",
    title: "Privacy Policy",
    description:
      "Privacy Policy for Worklity free online calculators and utility tools.",
    url: "/privacy-policy",
  },
  twitter: {
    title: "Privacy Policy",
    description:
      "Privacy Policy for Worklity free online calculators and utility tools.",
  },
};

export default function PrivacyPolicy() {
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
        <h1>Privacy Policy</h1>

        <p>
          This Privacy Policy explains how information is handled when
          you use Worklity.
        </p>
      </section>

      <section className="explain">
        <p>
          <b>Last updated: August 30, 2026</b>
        </p>

        <h2>Information you enter into our tools</h2>

        <p>
          Worklity provides calculators and utility tools designed to
          perform calculations directly for the user. Unless clearly
          stated otherwise on a specific tool, information entered into
          these tools is not intentionally collected or stored by
          Worklity.
        </p>

        <h2>Personal information</h2>

        <p>
          You can use the currently available Worklity calculators
          without creating an account or providing your name, email
          address or other contact information.
        </p>

        <h2>Hosting and technical information</h2>

        <p>
          Worklity is hosted using third-party web infrastructure.
          Hosting providers may process limited technical information
          necessary to deliver, secure and operate the website, such as
          request, device, browser or network-related information,
          according to their own policies.
        </p>

        <h2>Cookies, analytics and advertising</h2>

        <p>
          Worklity may introduce analytics, advertising or other
          third-party services in the future. If such services are
          added, this Privacy Policy will be updated to explain their
          use where appropriate.
        </p>

        <h2>External links</h2>

        <p>
          Worklity may contain links to other websites. We are not
          responsible for the privacy practices or content of
          third-party websites.
        </p>

        <h2>Children&apos;s privacy</h2>

        <p>
          The Vaccination Calculator requires a child&apos;s date of birth
          to generate a schedule and may also accept the child&apos;s name
          as an optional report detail. These calculator inputs are
          processed in the current browser page session and are not
          saved by Worklity&apos;s calculator. Users should avoid entering
          unnecessary personal or sensitive information into online
          tools.
        </p>

        <h2>Changes to this policy</h2>

        <p>
          This Privacy Policy may be updated when Worklity adds new
          tools, services, analytics, advertising or other website
          features. The updated date shown on this page will reflect
          significant revisions.
        </p>

        <h2>Contact</h2>

        <p>
          You can contact Worklity through the <Link href="/contact">Contact page</Link>
          {" "}or by email at{" "}
          <a href="mailto:worklity.contact@gmail.com">
            worklity.contact@gmail.com
          </a>.
        </p>
      </section>

      <footer>
        Worklity · Simple Tools. Smarter Work.
      </footer>
    </main>
  );
}
