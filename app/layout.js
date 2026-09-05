import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://worklity.in"),
  title: {
    default: "Worklity | Simple Tools. Smarter Work.",
    template: "%s | Worklity",
  },

  description:
    "Free practical online calculators and utility tools for everyday calculations, land and area, finance, dates, office work and data tasks.",

  keywords: [
    "Worklity",
    "online calculator",
    "free online tools",
    "utility tools",
    "land area calculator",
    "percentage calculator",
    "age calculator",
    "office tools",
    "data tools",
  ],

  authors: [{ name: "Worklity" }],
  creator: "Worklity",
  publisher: "Worklity",
  other: {
    "google-adsense-account": "ca-pub-3771343820567497",
  },

  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
verification: {
  google: "m5K_NDh2xxLNWb9Jd0N2JdpkLmDGePn6SzXJu3XXZAs",
},
  openGraph: {
    type: "website",
    siteName: "Worklity",
    title: "Worklity | Simple Tools. Smarter Work.",
    description:
      "Free practical online calculators and utility tools for everyday work.",
    url: "/",
  },

  twitter: {
    card: "summary",
    title: "Worklity | Simple Tools. Smarter Work.",
    description:
      "Free practical online calculators and utility tools for everyday work.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3771343820567497"
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      />
      <body>{children}</body>
    </html>
  );
}
