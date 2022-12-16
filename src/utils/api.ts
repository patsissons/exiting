import type { PostgrestResponse } from "@supabase/supabase-js";
import type { NextApiResponse } from "next/types";

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
  count?: boolean;
  data?: boolean;
}

export function handleSupabaseApiError<T>(
  res: NextApiResponse<ResponseError>,
  response: PostgrestResponse<T>,
  options: HandleSupabaseErrorOptions = {}
): response is PostgrestResponse<T> & { data: T[] } {
  const { count, data, error } = response;

  if (error) {
    res.status(500).json(responseError(error.message));
    return false;
  }

  if (options.count) {
    options.data = true;
  }

  if (options.data && !data) {
    res.status(500).json(responseError());
    return false;
  }

  if (options.count && count === 0) {
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
