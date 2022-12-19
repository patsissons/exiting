import "styles/globals.css";
import { Session } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { SupabaseProvider } from "components/SupabaseProvider";
import { ToastsProvider } from "components/ToastsProvider";
import { PolarisProvider } from "components/PolarisProvider";
import { ThemeToggle } from "src/components/ThemeToggle";

export interface Props {
  initialSession: Session;
}

export default function App({ Component, pageProps }: AppProps<Props>) {
  return (
    <SupabaseProvider initialSession={pageProps.initialSession}>
      <ThemeProvider>
        <PolarisProvider>
          <ToastsProvider>
            <ThemeToggle />
            <Component {...pageProps} />
          </ToastsProvider>
        </PolarisProvider>
      </ThemeProvider>
    </SupabaseProvider>
  );
}
