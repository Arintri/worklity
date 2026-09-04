import BMICalculatorClient from "./BMICalculatorClient";

const title = "BMI Calculator India – Adult BMI & NCD Health Guidance";
const description = "Calculate adult BMI for India using kg/cm or feet/inches. View Indian and WHO references, optional waist information and NCD health awareness in English or Bengali.";
export const metadata = {
  title,
  description,
  alternates: { canonical: "https://worklity.in/bmi-calculator" },
  openGraph: { type: "website", siteName: "Worklity", title, description, url: "/bmi-calculator" },
  twitter: { card: "summary", title, description },
};
export default function Page() { return <BMICalculatorClient />; }
