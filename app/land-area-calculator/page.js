import LandAreaCalculatorClient from "./LandAreaCalculatorClient";

export const metadata = {
  title: {
    absolute: "Land Area Calculator - Katha, Bigha, Decimal & Acre",
  },
  description:
    "Convert land area between square feet, square meter, square yard, Decimal or Disimil, Katha, Bigha, Acre, and Hectare, including commonly used West Bengal land units.",
  alternates: {
    canonical: "/land-area-calculator",
  },
  openGraph: {
    type: "website",
    siteName: "Worklity",
    title: "Land Area Calculator - Katha, Bigha, Decimal & Acre",
    description:
      "Convert land area between square feet, square meter, square yard, Decimal or Disimil, Katha, Bigha, Acre, and Hectare, including commonly used West Bengal land units.",
    url: "/land-area-calculator",
  },
  twitter: {
    title: "Land Area Calculator - Katha, Bigha, Decimal & Acre",
    description:
      "Convert land area between square feet, square meter, square yard, Decimal or Disimil, Katha, Bigha, Acre, and Hectare, including commonly used West Bengal land units.",
  },
};

export default function Page() {
  return <LandAreaCalculatorClient />;
}
