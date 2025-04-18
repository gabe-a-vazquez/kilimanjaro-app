import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";

let supabaseInstance: ReturnType<typeof createSupabaseClient<Database>> | null =
  null;

export const createClient = () => {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }

  supabaseInstance = createSupabaseClient<Database>(supabaseUrl, supabaseKey);
  return supabaseInstance;
};

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: Error | unknown): string => {
  console.error("Supabase error:", error);
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
};
