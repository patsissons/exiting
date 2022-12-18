import type { PostgrestResponse } from "@supabase/supabase-js";
import type { NextApiResponse } from "next/types";
import { ExitInsert, ExitRow, ExitUpdate } from "types";
import { logging } from "./logging";

export interface ResponseError {
  type: "error";
  error: string;
  data?: unknown;
}

export interface HandleApiErrorOptions {
  status?: number;
  error?: string;
  data?: unknown;
}

export function handleApiError(
  res: NextApiResponse<ResponseError>,
  {
    status = 500,
    error = "Invalid API response",
    data,
  }: HandleApiErrorOptions = {}
) {
  res.status(status).json({
    type: "error",
    error,
    data,
  });
}

export interface HandleSupabaseErrorOptions {
  data?: boolean;
}

export function handleSupabaseApiError<T>(
  res: NextApiResponse<ResponseError>,
  response: PostgrestResponse<T>,
  options: HandleSupabaseErrorOptions = {}
): response is PostgrestResponse<T> & { data: T[] } {
  const { data, error } = response;

  if (error) {
    res.status(500).json(responseError(error.message));
    return false;
  }

  if (options.data && (!data || data.length === 0)) {
    res.status(500).json(responseError());
    return false;
  }

  return true;

  function responseError(error = "Invalid database response"): ResponseError {
    return {
      type: "error",
      error,
      data: response,
    };
  }
}

export async function submitExit(
  exit: ExitInsert | ExitUpdate
): Promise<ExitRow> {
  const response = await fetch("/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "exit",
      data: exit,
    }),
  });
  const json = await response.json();

  if (!isValidResponse(json)) {
    logging.error("Invalid submit response", json);
    throw new Error("Submit failed");
  }

  return json.data;

  function isValidResponse(json: any): json is { data: ExitRow } {
    if (
      !("type" in json) ||
      typeof json.type !== "string" ||
      json.type !== "exit"
    )
      return false;
    if (!("data" in json) || typeof json.data !== "object") return false;

    return true;
  }
}
