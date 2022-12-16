import "styles/globals.css";
import { Session } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { PolarisProvider } from "components/PolarisProvider";
import { ToastsProvider } from "components/ToastsProvider";
import { ThemeToggle } from "components/ThemeToggle";

export interface Props {
  initialSession: Session;
}

export default function App({ Component, pageProps }: AppProps<Props>) {
  return (
    <ThemeProvider>
      <PolarisProvider>
        <ToastsProvider>
          <ThemeToggle />
          <Component {...pageProps} />
        </ToastsProvider>
      </PolarisProvider>
    </ThemeProvider>
  );
}
