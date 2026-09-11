import Fib4CalculatorClient from "./Fib4CalculatorClient";

const title = "FIB-4 Calculator – Liver Fibrosis Risk";
const description = "Calculate an adult FIB-4 score using age, AST, ALT and platelet count, with MASLD/NAFLD risk guidance for India in English and Bengali.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "https://worklity.in/fib-4-calculator" },
  openGraph: { type: "website", siteName: "Worklity", title, description, url: "/fib-4-calculator" },
  twitter: { card: "summary", title, description },
};

export default function Fib4CalculatorPage() {
  return <Fib4CalculatorClient />;
}
