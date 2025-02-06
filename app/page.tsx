import AssistantIcon from "@mui/icons-material/Assistant";
import styles from "./page.module.scss";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import { Metadata } from "next";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import TimelineIcon from "@mui/icons-material/Timeline";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "Home | Grafflo",
};

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
          <AssistantIcon />
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
      <Box sx={{ backgroundColor: "#d4d4d4", display: "flex" }}>
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            margin: "20px 20px",
            placeContent: "center",
          }}
        >
          <Box sx={{ flexWrap: "wrap", maxWidth: "540px", color: "#444" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                flexWrap: { xs: "wrap", sm: "nowrap" },
                fontSize: { xs: "24px", sm: "32px" },
              }}
            >
              Einfach, schnell, schön
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textWrap: "wrap",
                fontSize: { xs: "12px", sm: "24px" },
              }}
            >
              In a world of mediocore graphs, Grafflo brings you the best of the
              best in visualization.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              fontSize: "80px",
              flexWrap: { xs: "wrap", sm: "nowrap" },
              textWrap: "nowrap",
              alignItems: "center",
            }}
          >
            <Box sx={{ textWrap: "nowrap" }}>
              <EqualizerIcon
                fontSize="inherit"
                sx={{ color: "rgb(75, 131, 161)" }}
              />
              <TimelineIcon
                fontSize="inherit"
                sx={{ color: "rgb(92, 161, 75)" }}
              />
              <DonutSmallIcon
                fontSize="inherit"
                sx={{ color: "rgb(224, 78, 78)" }}
              />
            </Box>
            <Box
              sx={{
                textWrap: "nowrap",
                margin: "0px 60px",
                display: "inline block",
              }}
            >
              <Typography variant="body1">
                <Link
                  component={NextLink}
                  href="/graphs"
                  sx={{ fontWeight: "bold", fontFamily: "consolas" }}
                >
                  2 Whole graphs! &gt;
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
