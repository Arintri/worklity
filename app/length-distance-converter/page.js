import LengthDistanceConverterClient from "./LengthDistanceConverterClient";

const title = "Length & Distance Converter - Meter, Feet, Inch, KM & Mile";
const description = "Convert meter to feet, feet to meter, inch to feet, kilometer to mile, mile to kilometer, and other common length and distance units.";

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/length-distance-converter" },
  openGraph: { type: "website", siteName: "Worklity", title, description, url: "/length-distance-converter" },
  twitter: { title, description },
};

export default function Page() {
  return <LengthDistanceConverterClient />;
}
