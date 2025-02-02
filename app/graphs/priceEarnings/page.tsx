import { Metadata } from "next";
import PEGraph from "./PEGraph";
import styles from "./Graph.module.scss";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Tag } from "@/app/_components/Tag";

export const metadata: Metadata = {
  title: "Price to earnings",
};

export default async function DemoGraphPage() {
  return (
    <div className={styles.wrapper}>
      <Typography variant="h1" fontSize="48px">
        Price to earnings
      </Typography>
      <Typography sx={{ marginBottom: "20px" }}>
        Graph shows price to earnings ratio of tech companies for the last 15
        years.
      </Typography>

      <Box display="flex" alignItems="center" mb={2}>
        <Tag>Info</Tag>
        <Typography>
          You can highlight points of data to see more information.
        </Typography>
      </Box>

      <div>
        <PEGraph />
      </div>
    </div>
  );
}
