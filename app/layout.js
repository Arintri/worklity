import "./globals.css";

export const metadata = {
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

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "Worklity",
    title: "Worklity | Simple Tools. Smarter Work.",
    description:
      "Free practical online calculators and utility tools for everyday work.",
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
      <body>{children}</body>
    </html>
  );
}
