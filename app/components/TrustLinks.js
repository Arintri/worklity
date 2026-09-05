import Link from "next/link";
import styles from "./TrustLinks.module.css";

const LINKS = [
  { href: "/about", en: "About", bn: "আমাদের সম্পর্কে" },
  { href: "/contact", en: "Contact", bn: "যোগাযোগ" },
  { href: "/privacy-policy", en: "Privacy Policy", bn: "গোপনীয়তা নীতি" },
  { href: "/disclaimer", en: "Disclaimer", bn: "দায়মুক্তি" },
];

export default function TrustLinks({ language = "en" }) {
  const bn = language === "bn";

  return (
    <nav
      className={styles.trustLinks}
      aria-label={bn ? "Worklity তথ্য ও নীতিমালা" : "Worklity information and policies"}
    >
      {LINKS.map((link) => (
        <Link href={link.href} key={link.href}>
          {bn ? link.bn : link.en}
        </Link>
      ))}
    </nav>
  );
}
