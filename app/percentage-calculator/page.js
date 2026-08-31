import PercentageCalculatorClient from "./PercentageCalculatorClient";

export const metadata = {
  title: {
    absolute: "Percentage Calculator - Percentage, Increase & Decrease",
  },
  description:
    "Use this free calculator to calculate a percentage of a number, find what percentage one number is of another, or calculate percentage increase and decrease.",
};

export default function Page() {
  return <PercentageCalculatorClient />;
}
