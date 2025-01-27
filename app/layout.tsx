import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { PropsWithChildren } from "react";
import Header from "./_components/Header";
import "@/app/_styles/globals.scss";
import Footer from "./_components/Footer";

export default function RootLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body>
          <Header />
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
