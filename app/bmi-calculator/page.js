import BMICalculatorClient from "./BMICalculatorClient";

const title = "BMI Calculator India - Adult BMI, Indian & WHO Ranges";
const description = "Use this adult BMI calculator for India with height and weight in kg/cm or feet/inches, and view separate Indian and WHO BMI reference ranges.";
export const metadata = {
  title,
  description,
  alternates: { canonical: "https://worklity.in/bmi-calculator" },
  openGraph: { type: "website", siteName: "Worklity", title, description, url: "/bmi-calculator" },
  twitter: { card: "summary", title, description },
};
export default function Page() { return <BMICalculatorClient />; }
