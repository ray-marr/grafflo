import styles from "@/app/_styles/graphSelection.module.scss";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import GraphPreview from "./GraphPreview";

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
          title="Mega graph"
          caption="This mega graph shows the meganess of time"
          name="megaGraph"
        />
        <GraphPreview
          title="Super graph"
          caption="This super graph shows the relative superbness"
          name="superGraph"
        />
      </Grid>
    </div>
  );
}
