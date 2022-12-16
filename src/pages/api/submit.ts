import type { NextApiRequest, NextApiResponse } from "next";
import { ExitRow, ExitInsert, ExitUpdate } from "types";
import { saveExit } from "services/supabase";
import {
  handleApiError,
  handleSupabaseApiError,
  ResponseError,
} from "utils/api";

export interface RequestData {
  type: "exit";
  data: ExitInsert | ExitUpdate;
}

export interface ResponseData {
  type: "exit";
  data: ExitRow;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>
) {
  const { body } = req;

  if (!isValidBody(body)) {
    handleApiError(res, { error: "Invalid exit", data: body });
    return;
  }

  const response = await saveExit(body.data);
  if (!handleSupabaseApiError(res, response, { count: true })) {
    return;
  }

  const [exit] = response.data;

  res.status(200).json({
    type: "exit",
    data: exit,
  });
}

function isValidBody(body: any): body is RequestData {
  if (
    !("type" in body) ||
    typeof body.type !== "string" ||
    body.type !== "exit"
  )
    return false;
  if (!("data" in body) || typeof body.data !== "object") return false;

  const { data } = body;
  if (!("markdown" in data) || typeof data.markdown !== "string") return false;
  if ("tags" in data && !Array.isArray(data.tags)) return false;
  if ("password" in data && typeof data.password !== "string") return false;

  const tags: any[] = data.tags ?? [];
  if ((tags || []).some((tag) => typeof tag !== "string")) return false;

  return true;
}
