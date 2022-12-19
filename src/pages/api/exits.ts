import type { NextApiRequest, NextApiResponse } from "next";
import { ExitContent } from "types";
import { queryExits } from "services/supabase";
import {
  handleApiError,
  handleSupabaseApiError,
  ResponseError,
} from "utils/api";
import { arrayParam } from "utils/supabase";
import { sanitizeTag } from "utils/tags";

export interface ResponseData {
  type: "exits";
  data: ExitContent[];
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

    const tags = tagsFilter();

    let query = queryExits();
    if (tags) {
      query = query.filter("tags", "cs", arrayParam(tags));
    }

    const result = await query;
    if (!handleSupabaseApiError(res, result, { data: true })) {
      return;
    }

    const { data } = result;

    res.status(200).json({
      type: "exits",
      data,
    });
  } catch (error) {
    handleApiError(res, {
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }

  function tagsFilter() {
    const tagsParam = req.query.tags;
    if (!tagsParam) return;

    if (Array.isArray(tagsParam)) {
      return tagsParam.map((tag) => sanitizeTag(decodeURIComponent(tag)));
    }

    return decodeURIComponent(tagsParam).split(",").map(sanitizeTag);
  }
}
