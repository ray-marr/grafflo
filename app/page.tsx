import styles from "./page.module.scss";
import { Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.hero}>
          <Typography variant="h1" fontWeight="bold">
            Graphs, sure! ✔
          </Typography>
          <Typography fontSize="24px" style={{ marginTop: "8px" }}>
            Create wonderful graphs for your presentation!
          </Typography>
          <div className={styles.cta}>
            <Button variant="contained">Go build</Button>
            <Typography fontSize="18px">From £5 / month</Typography>
          </div>
        </div>
      </main>
    </div>
  );
}
