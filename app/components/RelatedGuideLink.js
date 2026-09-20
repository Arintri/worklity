import Link from "next/link";
import styles from "./RelatedGuideLink.module.css";

export default function RelatedGuideLink({
  language = "en",
  href,
  title,
  description,
}) {
  const bn = language === "bn";

  return (
    <aside className={styles.card} aria-label={bn ? "সম্পর্কিত ব্যবহারিক গাইড" : "Related practical guide"}>
      <div>
        <span>{bn ? "ব্যবহারিক গাইড" : "PRACTICAL GUIDE"}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Link href={href}>{bn ? "গাইড পড়ুন →" : "Read the guide →"}</Link>
    </aside>
  );
}
