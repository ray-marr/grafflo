import AssistantIcon from "@mui/icons-material/Assistant";
import styles from "./page.module.scss";
import { Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <div>
      <div className={styles.hero}>
        <Typography variant="h1" fontWeight="bold">
          Graphs, sure! ✔
        </Typography>
        <Typography
          className={styles.subText}
          fontSize="24px"
          style={{ marginTop: "8px" }}
        >
          Create wonderful graphs for your presentation!
        </Typography>
        <div className={styles.cta}>
          <Button href="/graphs" variant="contained">
            Start building
          </Button>
          <Typography fontSize="18px">From £5 / month</Typography>
        </div>
      </div>
      <div className={styles.comingSoon}>
        <div className={styles.aiHeading}>
          <AssistantIcon sx={{}} />
          <Typography fontSize="24px" fontWeight="bold">
            Graffdalf
          </Typography>
        </div>
        <Typography
          sx={{ display: { xs: "none", sm: "block" } }}
          fontSize="24px"
        >
          AI-powered graph creation!
        </Typography>

        <Typography
          sx={{ display: { xs: "block", sm: "none" } }}
          fontSize="24px"
        >
          AI graphs!
        </Typography>
      </div>
    </div>
  );
}
