import Fib4CalculatorClient from "./Fib4CalculatorClient";

const title = "FIB-4 Score Calculator - Liver Fibrosis Risk for MASLD/NAFLD";
const description = "Use this FIB-4 score calculator with age, AST, ALT and platelet count to estimate liver fibrosis risk in the MASLD/NAFLD screening context.";

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
