import { Database } from "./supabase";

export type { Database };

export type Schema = Database["public"];
export type Tables = Schema["Tables"];

type Exits = Tables["exits"];
export type ExitRow = Exits["Row"];
export type ExitInsert = Exits["Insert"];
export type ExitUpdate = Exits["Update"];

type Tags = Tables["tags"];
export type TagRow = Tags["Row"];
export type TagInsert = Tags["Insert"];
export type TagUpdate = Tags["Update"];

type ExitTags = Tables["exit_tags"];
export type ExitTagRow = ExitTags["Row"];
export type ExitTagInsert = ExitTags["Insert"];
export type ExitTagUpdate = ExitTags["Update"];
