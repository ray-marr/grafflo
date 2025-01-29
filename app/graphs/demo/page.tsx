import { Metadata } from "next";
import D3DemoGraph from "./D3DemoGraph";

export const metadata: Metadata = {
  title: "Demo graph",
};

export default async function DemoGraphPage() {
  return (
    <div>
      <D3DemoGraph />
    </div>
  );
}
