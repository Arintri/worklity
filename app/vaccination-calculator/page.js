import VaccinationCalculatorClient from "./VaccinationCalculatorClient";

export const metadata = {
  title: "Vaccine Due Date Calculator - India Vaccination Schedule",
  description:
    "Use this vaccine due date calculator to estimate baby vaccination dates and the next vaccine due date from a child's date of birth using the vaccination schedule in India.",
  alternates: {
    canonical: "/vaccination-calculator",
  },
  openGraph: {
    type: "website",
    siteName: "Worklity",
    title: "Vaccine Due Date Calculator - India Vaccination Schedule",
    description:
      "Use this vaccine due date calculator to estimate baby vaccination dates and the next vaccine due date from a child's date of birth using the vaccination schedule in India.",
    url: "/vaccination-calculator",
  },
  twitter: {
    title: "Vaccine Due Date Calculator - India Vaccination Schedule",
    description:
      "Use this vaccine due date calculator to estimate baby vaccination dates and the next vaccine due date from a child's date of birth using the vaccination schedule in India.",
  },
};

export default function VaccinationCalculatorPage() {
  return <VaccinationCalculatorClient />;
}
