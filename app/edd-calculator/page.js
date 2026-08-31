import EDDCalculatorClient from "./EDDCalculatorClient";

export const metadata = {
  title: {
    absolute: "Estimated Due Date Calculator - Pregnancy EDD",
  },
  description:
    "Calculate an estimated due date from the first day of the last menstrual period (LMP), with gestational age, trimester and pregnancy progress.",
};

export default function Page() {
  return <EDDCalculatorClient />;
}
