"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
interface PropsProvider {
  children: React.ReactNode;
}
const UIProviders = ({ children }: PropsProvider) => {
  return (
    <NextUIProvider>
      {/* <NextThemesProvider attribute="class" defaultTheme="darkmode">{children}</NextThemesProvider> */}
      {children}
    </NextUIProvider>
  );
};

export default UIProviders;
