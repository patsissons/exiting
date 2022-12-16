import type { NextApiRequest, NextApiResponse } from "next";
import { ExitRow } from "types";
import { queryTable } from "services/supabase";
import { handleSupabaseApiError, ResponseError } from "utils/api";

export interface ResponseData {
  type: "exits";
  data: ExitRow[];
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>
) {
  const result = await queryTable("exits");
  if (!handleSupabaseApiError(res, result, { data: true })) {
    return;
  }

  const { data } = result;

  res.status(200).json({
    type: "exits",
    data,
  });
}
