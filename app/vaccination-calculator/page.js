import VaccinationCalculatorClient from "./VaccinationCalculatorClient";

export const metadata = {
  title: "Vaccination Due Date Calculator India - Child Vaccine Schedule",
  description:
    "Calculate a child's vaccination due dates from date of birth using the India immunization schedule, record actual vaccine dates, and print a personal vaccination plan.",
};

export default function VaccinationCalculatorPage() {
  return <VaccinationCalculatorClient />;
}
