"use client";
import { deepOrange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "EuclidFlex",
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: deepOrange,
    secondary: {
      main: "#3f51b5",
    },
  },
});

export default theme;
