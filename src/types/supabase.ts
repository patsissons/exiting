// supabase gen types typescript --local > src/types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      exit_tags: {
        Row: {
          id: number;
          exit_id: string;
          tag_id: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          exit_id: string;
          tag_id: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          exit_id?: string;
          tag_id?: number;
          created_at?: string;
        };
      };
      exits: {
        Row: {
          markdown: string;
          tags: string[] | null;
          id: string;
          created_at: string;
          updated_at: string;
          edit_token: string;
        };
        Insert: {
          markdown: string;
          tags?: string[] | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          edit_token?: string;
        };
        Update: {
          markdown?: string;
          tags?: string[] | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          edit_token?: string;
        };
      };
      tags: {
        Row: {
          id: number;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
