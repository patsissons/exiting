import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database, ExitInsert, ExitUpdate, Tables } from "types";
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

  return supabase.from(table).select();
}

export function saveExit(exit: ExitInsert | ExitUpdate) {
  const supabase = createClient();
  const exits = supabase.from("exits");

  return isUpdate(exit)
    ? exits.update(exit).select()
    : exits.insert(exit).select();

  function isUpdate(exit: ExitInsert | ExitUpdate): exit is ExitUpdate {
    return Boolean(exit.id);
  }
}
