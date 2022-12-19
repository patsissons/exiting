import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from "utils/env";

export interface Props {
  initialSession: Session;
}

export function SupabaseProvider({
  children,
  initialSession,
}: PropsWithChildren<Props>) {
  const [supabase, setSupabase] =
    useState<ReturnType<typeof createBrowserSupabaseClient>>();

  useEffect(() => {
    if (
      supabase ||
      !NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      !NEXT_PUBLIC_SUPABASE_URL
    ) {
      return;
    }

    setSupabase(createBrowserSupabaseClient());
  }, [supabase]);

  if (!supabase) {
    return <>{children}</>;
  }

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={initialSession}
    >
      {children}
    </SessionContextProvider>
  );
}
