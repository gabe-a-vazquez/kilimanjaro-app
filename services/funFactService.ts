import { createClient } from "@/lib/supabase";
import { Database } from "@/lib/database.types";

export type FunFact = Database["public"]["Tables"]["fun_facts"]["Row"];

export async function getFunFactForDate(date: Date): Promise<FunFact | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("fun_facts")
    .select()
    .eq("display_date", date.toISOString().split("T")[0])
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No fact found for this date
      return null;
    }
    console.error("Error fetching fun fact:", error);
    throw error;
  }

  return data;
}

export async function getFunFactsByDateRange(
  startDate: Date,
  endDate: Date
): Promise<FunFact[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("fun_facts")
    .select()
    .gte("display_date", startDate.toISOString().split("T")[0])
    .lte("display_date", endDate.toISOString().split("T")[0])
    .order("display_date");

  if (error) {
    console.error("Error fetching fun facts:", error);
    throw error;
  }

  return data;
}

export async function getFunFactsByCategory(
  category: string
): Promise<FunFact[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("fun_facts")
    .select()
    .eq("category", category);

  if (error) {
    console.error("Error fetching fun facts:", error);
    throw error;
  }

  return data;
}
