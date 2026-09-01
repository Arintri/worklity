import EMICalculatorClient from "./EMICalculatorClient";

export const metadata = {
  title: {
    absolute: "EMI Calculator - Loan EMI, Interest & Repayment",
  },
  description:
    "Calculate monthly loan EMI, total interest and total repayment with a detailed reducing-balance amortization schedule.",
};

export default function Page() {
  return <EMICalculatorClient />;
}
