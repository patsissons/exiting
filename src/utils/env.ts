/* eslint-disable no-process-env */

// general env
export const NODE_ENV = process.env.NODE_ENV;

// supabase env
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// env transformations
export const isDevelopment = Boolean(NODE_ENV === "development");
export const isProduction = Boolean(NODE_ENV === "production");
