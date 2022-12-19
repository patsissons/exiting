/* eslint-disable no-process-env */

export const NODE_ENV = process.env.NODE_ENV;
export const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const isDevelopment = Boolean(NODE_ENV === "development");
export const isProduction = Boolean(NODE_ENV === "production");
