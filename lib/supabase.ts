import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./database.types";

export const createClient = () => {
  const supabase = createClientComponentClient<Database>();
  return supabase;
};

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: Error | unknown): string => {
  console.error("Supabase error:", error);
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
};
