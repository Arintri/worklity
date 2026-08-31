import AgeCalculatorClient from "./AgeCalculatorClient";

export const metadata = {
  title: {
    absolute: "Age Calculator - Calculate Age & Next Birthday",
  },
  description:
    "Calculate age in years, months and days, completed years, total elapsed days, the next birthday, days until the next birthday, or age on a custom date.",
};

export default function Page() {
  return <AgeCalculatorClient />;
}
