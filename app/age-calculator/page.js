import AgeCalculatorClient from "./AgeCalculatorClient";

export const metadata = {
  title: {
    absolute: "Age Calculator - Exact Age, Next Birthday & Date Difference",
  },
  description:
    "Use this age calculator to find exact age from a date of birth in years, months and days, compare a date difference, and see the next birthday.",
  alternates: {
    canonical: "/age-calculator",
  },
  openGraph: {
    type: "website",
    siteName: "Worklity",
    title: "Age Calculator - Exact Age, Next Birthday & Date Difference",
    description:
      "Use this age calculator to find exact age from a date of birth in years, months and days, compare a date difference, and see the next birthday.",
    url: "/age-calculator",
  },
  twitter: {
    title: "Age Calculator - Exact Age, Next Birthday & Date Difference",
    description:
      "Use this age calculator to find exact age from a date of birth in years, months and days, compare a date difference, and see the next birthday.",
  },
};

export default function Page() {
  return <AgeCalculatorClient />;
}
