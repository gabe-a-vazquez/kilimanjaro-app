export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      camps: {
        Row: {
          created_at: string | null;
          display_order: number;
          elevation: string;
          id: number;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          display_order: number;
          elevation: string;
          id?: number;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          display_order?: number;
          elevation?: string;
          id?: number;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      exercises: {
        Row: {
          created_at: string | null;
          default_reps: number;
          default_rest_time: number;
          default_sets: number;
          id: number;
          is_unilateral: boolean | null;
          name: string;
          starting_weight_recommendation_lbs: number | null;
          updated_at: string | null;
          video_url: string | null;
          weight_type: string | null;
        };
        Insert: {
          created_at?: string | null;
          default_reps: number;
          default_rest_time: number;
          default_sets: number;
          id?: number;
          is_unilateral?: boolean | null;
          name: string;
          starting_weight_recommendation_lbs?: number | null;
          updated_at?: string | null;
          video_url?: string | null;
          weight_type?: string | null;
        };
        Update: {
          created_at?: string | null;
          default_reps?: number;
          default_rest_time?: number;
          default_sets?: number;
          id?: number;
          is_unilateral?: boolean | null;
          name?: string;
          starting_weight_recommendation_lbs?: number | null;
          updated_at?: string | null;
          video_url?: string | null;
          weight_type?: string | null;
        };
        Relationships: [];
      };
      fun_facts: {
        Row: {
          category: string | null;
          created_at: string | null;
          fact_text: string;
          id: number;
          image_alt: string | null;
          image_url: string | null;
          link: string | null;
          title: string;
          updated_at: string | null;
          display_date: string | null;
        };
        Insert: {
          category?: string | null;
          created_at?: string | null;
          fact_text: string;
          id?: number;
          image_alt?: string | null;
          image_url?: string | null;
          link?: string | null;
          title: string;
          updated_at?: string | null;
          display_date?: string | null;
        };
        Update: {
          category?: string | null;
          created_at?: string | null;
          fact_text?: string;
          id?: number;
          image_alt?: string | null;
          image_url?: string | null;
          link?: string | null;
          title?: string;
          updated_at?: string | null;
          display_date?: string | null;
        };
        Relationships: [];
      };
      weeks: {
        Row: {
          created_at: string | null;
          description: string;
          end_date: string;
          id: number;
          phase_type: string;
          progress: string | null;
          start_date: string;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description: string;
          end_date: string;
          id?: number;
          phase_type: string;
          progress?: string | null;
          start_date: string;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string;
          end_date?: string;
          id?: number;
          phase_type?: string;
          progress?: string | null;
          start_date?: string;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      weight_equipment: {
        Row: {
          created_at: string | null;
          id: number;
          quantity_available: number;
          status: string;
          type: string;
          updated_at: string | null;
          weight_lbs: number;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          quantity_available: number;
          status: string;
          type: string;
          updated_at?: string | null;
          weight_lbs: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          quantity_available?: number;
          status?: string;
          type?: string;
          updated_at?: string | null;
          weight_lbs?: number;
        };
        Relationships: [];
      };
      weight_progression: {
        Row: {
          created_at: string | null;
          exercise_id: number | null;
          id: number;
          progression_notes: string | null;
          recommended_weight_range_max_lbs: number | null;
          recommended_weight_range_min_lbs: number | null;
          updated_at: string | null;
          week_number: number;
        };
        Insert: {
          created_at?: string | null;
          exercise_id?: number | null;
          id?: number;
          progression_notes?: string | null;
          recommended_weight_range_max_lbs?: number | null;
          recommended_weight_range_min_lbs?: number | null;
          updated_at?: string | null;
          week_number: number;
        };
        Update: {
          created_at?: string | null;
          exercise_id?: number | null;
          id?: number;
          progression_notes?: string | null;
          recommended_weight_range_max_lbs?: number | null;
          recommended_weight_range_min_lbs?: number | null;
          updated_at?: string | null;
          week_number?: number;
        };
        Relationships: [
          {
            foreignKeyName: "weight_progression_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "exercises";
            referencedColumns: ["id"];
          }
        ];
      };
      weight_tracking: {
        Row: {
          created_at: string | null;
          date_recorded: string;
          exercise_id: number | null;
          id: number;
          notes: string | null;
          perceived_difficulty: number | null;
          reps_completed: number;
          set_number: number;
          updated_at: string | null;
          user_id: string | null;
          weight_lbs: number;
          workout_id: number | null;
        };
        Insert: {
          created_at?: string | null;
          date_recorded?: string;
          exercise_id?: number | null;
          id?: number;
          notes?: string | null;
          perceived_difficulty?: number | null;
          reps_completed: number;
          set_number: number;
          updated_at?: string | null;
          user_id?: string | null;
          weight_lbs: number;
          workout_id?: number | null;
        };
        Update: {
          created_at?: string | null;
          date_recorded?: string;
          exercise_id?: number | null;
          id?: number;
          notes?: string | null;
          perceived_difficulty?: number | null;
          reps_completed?: number;
          set_number?: number;
          updated_at?: string | null;
          user_id?: string | null;
          weight_lbs?: number;
          workout_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "weight_tracking_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "exercises";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "weight_tracking_workout_id_fkey";
            columns: ["workout_id"];
            isOneToOne: false;
            referencedRelation: "workouts";
            referencedColumns: ["id"];
          }
        ];
      };
      workout_exercises: {
        Row: {
          created_at: string | null;
          exercise_id: number;
          reps: number;
          rest_time: number;
          sequence_number: number;
          sets: number;
          updated_at: string | null;
          workout_id: number;
        };
        Insert: {
          created_at?: string | null;
          exercise_id: number;
          reps: number;
          rest_time: number;
          sequence_number: number;
          sets: number;
          updated_at?: string | null;
          workout_id: number;
        };
        Update: {
          created_at?: string | null;
          exercise_id?: number;
          reps?: number;
          rest_time?: number;
          sequence_number?: number;
          sets?: number;
          updated_at?: string | null;
          workout_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "workout_exercises_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "exercises";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workout_exercises_workout_id_fkey";
            columns: ["workout_id"];
            isOneToOne: false;
            referencedRelation: "workouts";
            referencedColumns: ["id"];
          }
        ];
      };
      workouts: {
        Row: {
          benefit: string | null;
          created_at: string | null;
          date: string;
          day_number: number;
          id: number;
          name: string;
          status: string;
          summary: string;
          type: string;
          updated_at: string | null;
          warmup: string | null;
          week_id: number;
        };
        Insert: {
          benefit?: string | null;
          created_at?: string | null;
          date: string;
          day_number: number;
          id?: number;
          name: string;
          status: string;
          summary: string;
          type: string;
          updated_at?: string | null;
          warmup?: string | null;
          week_id: number;
        };
        Update: {
          benefit?: string | null;
          created_at?: string | null;
          date?: string;
          day_number?: number;
          id?: number;
          name?: string;
          status?: string;
          summary?: string;
          type?: string;
          updated_at?: string | null;
          warmup?: string | null;
          week_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "workouts_week_id_fkey";
            columns: ["week_id"];
            isOneToOne: false;
            referencedRelation: "weeks";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      complete_workout: {
        Args: { workout_id: number };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
