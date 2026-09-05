import Link from "next/link";
import Image from "next/image";

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
          <Image src="/brand/worklity-mark.png" alt="" width={40} height={40} style={{ display: "block", flex: "0 0 40px", width: 40, height: 40, objectFit: "contain" }} />
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
          <b>Last updated: September 5, 2026</b>
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
          Worklity does not currently use third-party advertising on its
          calculator pages. We may introduce analytics, advertising or
          other third-party services in the future. This Privacy Policy
          will be updated when those services are enabled.
        </p>

        <p>
          If Google AdSense or another advertising service is enabled,
          third-party vendors, including Google, may use cookies to serve
          ads based on a user&apos;s previous visits to Worklity or other
          websites. Google&apos;s advertising cookies allow Google and its
          partners to serve personalized or non-personalized ads. Users
          can manage or opt out of personalized advertising through
          Google&apos;s{" "}
          <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
            Ads Settings
          </a>.
        </p>

        <p>
          Advertising providers may place or read cookies in a user&apos;s
          browser, or use web beacons, IP addresses and similar
          identifiers as a result of ad serving. Learn more about{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            how Google uses information from sites or apps that use its services
          </a>.
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
