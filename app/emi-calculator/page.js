import EMICalculatorClient from "./EMICalculatorClient";

export const metadata = {
  title: {
    absolute: "EMI Calculator - Loan EMI, Interest & Repayment Schedule",
  },
  description:
    "Use this loan EMI calculator with loan amount, interest rate and tenure to estimate monthly EMI, total interest, total repayment and a repayment schedule.",
  alternates: {
    canonical: "/emi-calculator",
  },
  openGraph: {
    type: "website",
    siteName: "Worklity",
    title: "EMI Calculator - Loan EMI, Interest & Repayment Schedule",
    description:
      "Use this loan EMI calculator with loan amount, interest rate and tenure to estimate monthly EMI, total interest, total repayment and a repayment schedule.",
    url: "/emi-calculator",
  },
  twitter: {
    title: "EMI Calculator - Loan EMI, Interest & Repayment Schedule",
    description:
      "Use this loan EMI calculator with loan amount, interest rate and tenure to estimate monthly EMI, total interest, total repayment and a repayment schedule.",
  },
};

export default function Page() {
  return <EMICalculatorClient />;
}
