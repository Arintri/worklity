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

        <h2>Calculator inputs and local processing</h2>

        <p>
          Worklity calculators may process information you enter to
          produce the calculation or result you request. Depending on
          the calculator, this may include:
        </p>

        <ul>
          <li>
            land measurements, units and numerical land values;
          </li>
          <li>
            numerical values used for percentage calculations;
          </li>
          <li>
            a date of birth and a selected or reference &quot;age as
            of&quot; date;
          </li>
          <li>
            loan amount, interest rate and tenure entered for an EMI
            estimate;
          </li>
          <li>
            a last menstrual period (LMP) date and relevant reference
            date for an estimated due date calculation;
          </li>
          <li>
            a child&apos;s date of birth, optional child name, optional
            actual vaccination dates, and optional vaccination-record
            selections such as missed or not available; and
          </li>
          <li>
            age, sex, height, weight, optional waist measurement, and
            optional NCD-awareness checklist selections for the BMI
            Calculator.
          </li>
        </ul>

        <p>
          In the current implementation, these calculator values are
          processed in your browser during the current page session.
          Worklity does not currently provide an application mechanism
          that stores these calculator inputs in a Worklity database,
          and the calculators do not intentionally transmit these values
          to Worklity for calculation. Reloading, closing or leaving the
          relevant page may clear its in-memory state, as applicable.
        </p>

        <p>
          The optional BMI NCD-awareness checklist is informational
          only. Its selections are not used to generate a clinical
          diagnosis or a disease-risk probability.
        </p>

        <h2>Personal information</h2>

        <p>
          You can use the currently available Worklity calculators
          without creating an account or providing an email address or
          other contact information. Some tools may accept optional
          report details, such as a child&apos;s name in the Vaccination
          Calculator, as described above.
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
          to generate a schedule and may accept the optional child and
          vaccination-record details described above. These inputs use
          the local-processing approach explained in this policy. Users
          should avoid entering unnecessary personal or sensitive
          information into online tools.
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
          If you voluntarily contact Worklity by email, Worklity may
          receive and process your email address, the contents of your
          message, and any attachments or other information you choose
          to provide. This information is used to review and respond to
          your enquiry. The relevant email service or provider may also
          process the correspondence as part of delivering the email
          service.
        </p>

        <p>
          Please do not send passwords, OTPs, banking credentials or
          unnecessary sensitive information by email.
        </p>

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
