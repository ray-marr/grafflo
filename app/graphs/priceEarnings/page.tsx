import { Metadata } from "next";
import PEGraph from "./PEGraph";

export const metadata: Metadata = {
  title: "Price to earnings",
};

export default async function DemoGraphPage() {
  return (
    <div>
      <PEGraph />
    </div>
  );
}
