import { Metadata } from "next";
import PEGraphBar from "./PEGraphBar";
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
        Price to earnings Bar Chart
      </Typography>
      <Typography sx={{ marginBottom: "20px" }}>
        Graph shows price to earnings ratio of tech companies for the last 15
        years grouped by year.
      </Typography>

      <Box display="flex" alignItems="center" mb={2}>
        <Tag>Info</Tag>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Typography>
      </Box>

      <div>
        <PEGraphBar />
      </div>
    </div>
  );
}
