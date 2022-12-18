import type { NextApiRequest, NextApiResponse } from "next";
import { ExitContent } from "types";
import { queryTable } from "services/supabase";
import {
  handleApiError,
  handleSupabaseApiError,
  ResponseError,
} from "utils/api";

export interface ResponseData {
  type: "exit";
  data: ExitContent;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>
) {
  try {
    if (req.method !== "GET") {
      handleApiError(res, { status: 405, error: "Only GET requests allowed" });
      return;
    }

    const id = String(req.query.id);

    const result = await queryTable("exits").eq("id", id);
    if (!handleSupabaseApiError(res, result, { data: true })) {
      return;
    }

    res.status(200).json({
      type: "exit",
      data: result.data[0],
    });
  } catch (error) {
    handleApiError(res, {
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
