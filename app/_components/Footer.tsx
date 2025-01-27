import * as React from "react";
import styles from "@/app/_styles/footer.module.scss";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton, Typography } from "@mui/material";

const pages = [
  { name: "HOME", href: "/" },
  { name: "GRAPHS", href: "/graphs" },
];

function Footer(): React.JSX.Element {
  return (
    <div className={styles.footer}>
      <div className={styles.followMe}>
        <Typography fontWeight="bold" variant="h6">
          Follow me
        </Typography>
        <div className={styles.icons}>
          <IconButton
            href="https://www.linkedin.com/in/ray-marr-668764bb/"
            aria-label="Linked in link"
          >
            <LinkedInIcon sx={{ color: "white" }} />
          </IconButton>

          <IconButton
            href="https://github.com/ray-marr"
            aria-label="Github link"
          >
            <GitHubIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
      </div>
      <div className={styles.attribution}>
        <Typography>© 2025 Ray Marr. Built with ☕ in London.</Typography>
      </div>
    </div>
  );
}
export default Footer;
