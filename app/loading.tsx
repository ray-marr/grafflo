"use client";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

// Pretty fallback loader while data is loading
const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        />
      </Box>
    </Box>
  );
};

export default Loading;
