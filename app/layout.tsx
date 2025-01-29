import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { PropsWithChildren } from "react";
import Header from "./_components/Header";
import "@/app/_styles/globals.scss";
import Footer from "./_components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Grafflo",
    template: "%s | Grafflo",
  },
};

export default function RootLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body>
          <Header />
          <AppRouterCacheProvider>
            <main>{children}</main>
          </AppRouterCacheProvider>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
