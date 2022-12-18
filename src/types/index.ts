import { Database } from "./supabase";

export type { Database };

export type Schema = Database["public"];
export type Tables = Schema["Tables"];

type Exits = Tables["exits"];
export type ExitRow = Exits["Row"];
export type ExitContent = Omit<ExitRow, "edit_token">;
export type ExitInsert = Omit<
  Exits["Insert"],
  "created_at" | "updated_at" | "edit_token"
>;
export type ExitUpdate = Omit<Exits["Update"], "created_at" | "updated_at">;

type Tags = Tables["tags"];
export type TagRow = Tags["Row"];
export type TagInsert = Tags["Insert"];
export type TagUpdate = Tags["Update"];

type ExitTags = Tables["exit_tags"];
export type ExitTagRow = ExitTags["Row"];
export type ExitTagInsert = ExitTags["Insert"];
export type ExitTagUpdate = ExitTags["Update"];
