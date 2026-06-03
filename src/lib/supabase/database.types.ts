export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      captures: {
        Row: {
          body: string;
          capture_type: string;
          created_at: string;
          id: string;
          life_domain: string;
          priority: string | null;
          status: string;
          sub_domain: string | null;
          tags: string[];
          title: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          body: string;
          capture_type?: string;
          created_at?: string;
          id?: string;
          life_domain?: string;
          priority?: string | null;
          status?: string;
          sub_domain?: string | null;
          tags?: string[];
          title?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          body?: string;
          capture_type?: string;
          created_at?: string;
          id?: string;
          life_domain?: string;
          priority?: string | null;
          status?: string;
          sub_domain?: string | null;
          tags?: string[];
          title?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      memories: {
        Row: {
          body: string;
          created_at: string;
          emotional_tone: string | null;
          id: string;
          importance: string | null;
          life_domain: string | null;
          source_capture_id: string | null;
          sub_domain: string | null;
          tags: string[];
          title: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          body: string;
          created_at?: string;
          emotional_tone?: string | null;
          id?: string;
          importance?: string | null;
          life_domain?: string | null;
          source_capture_id?: string | null;
          sub_domain?: string | null;
          tags?: string[];
          title?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          emotional_tone?: string | null;
          id?: string;
          importance?: string | null;
          life_domain?: string | null;
          source_capture_id?: string | null;
          sub_domain?: string | null;
          tags?: string[];
          title?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      notes: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          life_domain: string | null;
          source_capture_id: string | null;
          sub_domain: string | null;
          tags: string[];
          title: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          body: string;
          created_at?: string;
          id?: string;
          life_domain?: string | null;
          source_capture_id?: string | null;
          sub_domain?: string | null;
          tags?: string[];
          title?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          life_domain?: string | null;
          source_capture_id?: string | null;
          sub_domain?: string | null;
          tags?: string[];
          title?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      study_submodule_content: {
        Row: {
          content: string;
          created_at: string;
          field_name: string;
          id: string;
          submodule_slug: string;
          unit_slug: string;
          updated_at: string;
          user_id: string;
          week_slug: string;
        };
        Insert: {
          content?: string;
          created_at?: string;
          field_name: string;
          id?: string;
          submodule_slug: string;
          unit_slug: string;
          updated_at?: string;
          user_id: string;
          week_slug: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          field_name?: string;
          id?: string;
          submodule_slug?: string;
          unit_slug?: string;
          updated_at?: string;
          user_id?: string;
          week_slug?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          life_domain: string | null;
          name: string;
          source_capture_id: string | null;
          status: string;
          sub_domain: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          life_domain?: string | null;
          name: string;
          source_capture_id?: string | null;
          status?: string;
          sub_domain?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          life_domain?: string | null;
          name?: string;
          source_capture_id?: string | null;
          status?: string;
          sub_domain?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          created_at: string;
          description: string | null;
          due_date: string | null;
          id: string;
          life_domain: string | null;
          priority: string | null;
          source_capture_id: string | null;
          status: string;
          sub_domain: string | null;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          due_date?: string | null;
          id?: string;
          life_domain?: string | null;
          priority?: string | null;
          source_capture_id?: string | null;
          status?: string;
          sub_domain?: string | null;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          due_date?: string | null;
          id?: string;
          life_domain?: string | null;
          priority?: string | null;
          source_capture_id?: string | null;
          status?: string;
          sub_domain?: string | null;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
