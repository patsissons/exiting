import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import moment from "moment";
import { Database, ExitInsert, ExitRow, ExitUpdate, Tables } from "types";
import { SUPABASE_SERVICE_KEY, SUPABASE_URL } from "utils/env";

export function createClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error("Invalid database access");
  }

  return createSupabaseClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY);
}

export function queryTable<TableName extends string & keyof Tables>(
  table: TableName
) {
  const supabase = createClient();

  const query = supabase.from(table);

  switch (table) {
    case "exits":
      // exclude the edit_token
      return query.select("id, created_at, updated_at, markdown, tags");
    default:
      return query.select();
  }
}

export function saveExit(exit: ExitInsert | ExitUpdate) {
  const supabase = createClient();

  const exits = supabase.from("exits");

  if (!isUpdate(exit)) {
    const { markdown, tags } = exit;
    return exits.insert({ markdown, tags }).select();
  }

  const { id, edit_token, markdown, tags } = exit;
  const updated_at = moment().utc().toISOString();

  return exits
    .update({ markdown, tags, updated_at })
    .eq("id", id)
    .eq("edit_token", edit_token)
    .select();

  function isUpdate(exit: ExitInsert | ExitUpdate): exit is ExitUpdate {
    return Boolean(exit.id);
  }
}

export async function saveExitTags(exit: ExitRow) {
  const supabase = createClient();

  const { tags } = exit;
  const tagResponse = await (tags
    ? supabase
        .from("tags")
        .upsert(
          tags
            .map((tag) => tag.trim())
            .filter(Boolean)
            .map((name) => ({ name })),
          { onConflict: "name" }
        )
        .select("id")
    : undefined);
  if (tagResponse?.error) return tagResponse;

  const exitTags = supabase.from("exit_tags");

  const exitTagResponse = await exitTags.delete().eq("exit_id", exit.id);
  if (exitTagResponse.error) return exitTagResponse;

  const tagIds = tagResponse?.data?.map(({ id }) => id);
  if (tagIds) {
    const exit_id = exit.id;
    return exitTags.insert(tagIds.map((tag_id) => ({ exit_id, tag_id })));
  }
}
