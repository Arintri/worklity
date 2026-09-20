import Image from "next/image";
import Link from "next/link";
import styles from "./Guides.module.css";

export function guideMetadata(title, description, path) {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName: "Worklity",
      title,
      description,
      url: path,
    },
    twitter: { card: "summary", title, description },
  };
}

export function GuideFrame({ children }) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Worklity home">
          <Image src="/brand/worklity-mark.png" alt="" width={40} height={40} />
          <span>Worklity</span>
        </Link>
        <nav className={styles.nav} aria-label="Guide navigation">
          <Link href="/">Home</Link>
          <Link href="/#tools">Free Tools</Link>
          <Link href="/guides">Guides</Link>
        </nav>
      </header>
      {children}
      <footer className={styles.footer}>
        <span>Worklity · Simple Tools. Smarter Work.</span>
        <nav aria-label="Trust and information links">
          <Link href="/guides">Guides</Link>
          <Link href="/editorial-policy">Editorial Policy</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </footer>
    </main>
  );
}

export function GuideArticle({
  eyebrow,
  title,
  intro,
  calculatorHref,
  calculatorLabel,
  children,
  relatedTools,
  verificationNote,
}) {
  return (
    <GuideFrame>
      <article className={styles.article}>
        <header className={styles.articleHero}>
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          <Link className={styles.primaryLink} href={calculatorHref}>
            Open {calculatorLabel} →
          </Link>
        </header>

        <div className={styles.articleBody}>{children}</div>

        <section className={styles.related} aria-labelledby="related-tools">
          <h2 id="related-tools">Related tools</h2>
          <div>
            {relatedTools.map((tool) => (
              <Link href={tool.href} key={tool.href}>{tool.label} →</Link>
            ))}
          </div>
        </section>

        <section className={styles.aboutGuide} aria-labelledby="about-this-guide">
          <h2 id="about-this-guide">About this guide</h2>
          <p>
            Worklity provides this guide for general educational use. The
            calculation examples have been checked against the method used by
            the related Worklity calculator.
          </p>
          <p>{verificationNote}</p>
          <p><strong>Last reviewed: September 2026</strong></p>
        </section>
      </article>
    </GuideFrame>
  );
}

export { styles };
