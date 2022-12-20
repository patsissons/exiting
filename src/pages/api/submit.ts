import type { NextApiRequest, NextApiResponse } from "next";
import { ExitRow, ExitInsert, ExitUpdate } from "types";
import { saveExit, saveExitTags } from "services/supabase";
import {
  handleApiError,
  handleSupabaseApiError,
  ResponseError,
} from "utils/api";
import { MAX_EXIT_CONTENT_LENGTH } from "src/utils/exits";

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
  try {
    if (req.method !== "POST") {
      handleApiError(res, { status: 405, error: "Only POST requests allowed" });
      return;
    }

    const { body } = req;

    if (!isValidBody(body)) {
      handleApiError(res, { error: "Invalid exit", data: body });
      return;
    }

    if (
      body.data.markdown &&
      body.data.markdown?.length > MAX_EXIT_CONTENT_LENGTH
    ) {
      handleApiError(res, { error: "Markdown content too large", data: body });
      return;
    }

    const response = await saveExit(body.data);
    if (!handleSupabaseApiError(res, response, { data: true })) {
      return;
    }

    const [exit] = response.data;

    const tagResponse = await saveExitTags(exit);
    if (tagResponse && !handleSupabaseApiError(res, tagResponse)) {
      return;
    }

    res.status(200).json({
      type: "exit",
      data: exit,
    });
  } catch (error) {
    handleApiError(res, {
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
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
