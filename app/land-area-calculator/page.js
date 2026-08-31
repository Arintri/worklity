import LandAreaCalculatorClient from "./LandAreaCalculatorClient";

export const metadata = {
  title: {
    absolute: "Land Area Calculator - Katha, Bigha, Decimal & Acre",
  },
  description:
    "Convert land area between square feet, square meter, square yard, Decimal or Disimil, Katha, Bigha, Acre, and Hectare, including commonly used West Bengal land units.",
};

export default function Page() {
  return <LandAreaCalculatorClient />;
}
