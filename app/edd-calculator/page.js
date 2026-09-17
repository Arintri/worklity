import EDDCalculatorClient from "./EDDCalculatorClient";

export const metadata = {
  title: {
    absolute: "EDD Calculator - Pregnancy Due Date from LMP",
  },
  description:
    "Use this EDD calculator to estimate a pregnancy due date and expected date of delivery from LMP, with gestational age and pregnancy timeline information.",
  alternates: {
    canonical: "/edd-calculator",
  },
  openGraph: {
    type: "website",
    siteName: "Worklity",
    title: "EDD Calculator - Pregnancy Due Date from LMP",
    description:
      "Use this EDD calculator to estimate a pregnancy due date and expected date of delivery from LMP, with gestational age and pregnancy timeline information.",
    url: "/edd-calculator",
  },
  twitter: {
    title: "EDD Calculator - Pregnancy Due Date from LMP",
    description:
      "Use this EDD calculator to estimate a pregnancy due date and expected date of delivery from LMP, with gestational age and pregnancy timeline information.",
  },
};

export default function Page() {
  return <EDDCalculatorClient />;
}
