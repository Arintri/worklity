import LandAreaCalculatorClient from "./LandAreaCalculatorClient";

export const metadata = {
  title: {
    absolute: "West Bengal Land Area Calculator - Katha, Bigha, Decimal & Acre",
  },
  description:
    "Use this West Bengal land area conversion calculator for Katha, Bigha, Decimal, Acre, square feet, square meter, square yard, and Hectare conversions.",
  alternates: {
    canonical: "/land-area-calculator",
  },
  openGraph: {
    type: "website",
    siteName: "Worklity",
    title: "West Bengal Land Area Calculator - Katha, Bigha, Decimal & Acre",
    description:
      "Use this West Bengal land area conversion calculator for Katha, Bigha, Decimal, Acre, square feet, square meter, square yard, and Hectare conversions.",
    url: "/land-area-calculator",
  },
  twitter: {
    title: "West Bengal Land Area Calculator - Katha, Bigha, Decimal & Acre",
    description:
      "Use this West Bengal land area conversion calculator for Katha, Bigha, Decimal, Acre, square feet, square meter, square yard, and Hectare conversions.",
  },
};

export default function Page() {
  return <LandAreaCalculatorClient />;
}
