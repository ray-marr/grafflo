import styles from "@/app/_styles/graphSelection.module.scss";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GraphPreview from "./GraphPreview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graph selection",
};

export default async function GraphSelection() {
  return (
    <div className={styles.wrapper}>
      <Typography variant="h1" fontSize="48px">
        Graphs
      </Typography>
      <Typography sx={{ marginBottom: "20px" }}>
        Select a graph to view.
      </Typography>

      <Grid container spacing={4}>
        <GraphPreview
          title="Tech P/E Ratio"
          caption="Price to earnings ratio of tech companies for the last 15 years"
          name="priceEarnings"
        />
        <GraphPreview
          title="Tech P/E Bar Chart"
          caption="Price to earnings ratio of tech companies for the last 15 years"
          name="priceEarningsBar"
        />
      </Grid>
    </div>
  );
}
