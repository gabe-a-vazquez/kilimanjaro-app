export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      camps: {
        Row: {
          created_at: string | null
          display_order: number
          elevation: string
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_order: number
          elevation: string
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number
          elevation?: string
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      exercise_sets: {
        Row: {
          created_at: string | null
          id: number
          is_completed: boolean
          set_number: number
          updated_at: string | null
          weight: number
          workout_exercise_id: number
        }
        Insert: {
          created_at?: string | null
          id?: never
          is_completed?: boolean
          set_number: number
          updated_at?: string | null
          weight?: number
          workout_exercise_id: number
        }
        Update: {
          created_at?: string | null
          id?: never
          is_completed?: boolean
          set_number?: number
          updated_at?: string | null
          weight?: number
          workout_exercise_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercise_sets_workout_exercise_id_fkey"
            columns: ["workout_exercise_id"]
            isOneToOne: false
            referencedRelation: "workout_exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          created_at: string | null
          default_reps: number
          default_rest_time: number
          default_sets: number
          id: number
          is_unilateral: boolean | null
          name: string
          starting_weight_recommendation_lbs: number | null
          updated_at: string | null
          video_url: string | null
          weight_type: string | null
        }
        Insert: {
          created_at?: string | null
          default_reps: number
          default_rest_time: number
          default_sets: number
          id?: number
          is_unilateral?: boolean | null
          name: string
          starting_weight_recommendation_lbs?: number | null
          updated_at?: string | null
          video_url?: string | null
          weight_type?: string | null
        }
        Update: {
          created_at?: string | null
          default_reps?: number
          default_rest_time?: number
          default_sets?: number
          id?: number
          is_unilateral?: boolean | null
          name?: string
          starting_weight_recommendation_lbs?: number | null
          updated_at?: string | null
          video_url?: string | null
          weight_type?: string | null
        }
        Relationships: []
      }
      fun_facts: {
        Row: {
          created_at: string | null
          display_date: string | null
          fact_text: string
          id: number
          link: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_date?: string | null
          fact_text: string
          id?: number
          link?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_date?: string | null
          fact_text?: string
          id?: number
          link?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      weeks: {
        Row: {
          created_at: string | null
          description: string
          end_date: string
          id: number
          phase_type: string
          progress: string | null
          start_date: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          end_date: string
          id?: number
          phase_type: string
          progress?: string | null
          start_date: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          end_date?: string
          id?: number
          phase_type?: string
          progress?: string | null
          start_date?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      workout_exercises: {
        Row: {
          created_at: string | null
          exercise_id: number
          id: number
          reps: number
          rest_time: number
          sequence_number: number
          sets: number
          status: string
          updated_at: string | null
          workout_id: number
        }
        Insert: {
          created_at?: string | null
          exercise_id: number
          id?: never
          reps: number
          rest_time: number
          sequence_number: number
          sets: number
          status?: string
          updated_at?: string | null
          workout_id: number
        }
        Update: {
          created_at?: string | null
          exercise_id?: number
          id?: never
          reps?: number
          rest_time?: number
          sequence_number?: number
          sets?: number
          status?: string
          updated_at?: string | null
          workout_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          benefit: string | null
          created_at: string | null
          date: string
          day_number: number
          id: number
          name: string
          status: string
          summary: string
          type: string
          updated_at: string | null
          warmup: string | null
          week_id: number
        }
        Insert: {
          benefit?: string | null
          created_at?: string | null
          date: string
          day_number: number
          id?: number
          name: string
          status: string
          summary: string
          type: string
          updated_at?: string | null
          warmup?: string | null
          week_id: number
        }
        Update: {
          benefit?: string | null
          created_at?: string | null
          date?: string
          day_number?: number
          id?: number
          name?: string
          status?: string
          summary?: string
          type?: string
          updated_at?: string | null
          warmup?: string | null
          week_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workouts_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "weeks"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      complete_workout: {
        Args: { workout_id: number }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
