import { createClient } from "@/lib/supabase";

export type Camp = {
  id: number;
  name: string;
  elevation: string;
  display_order: number;
};

export async function getCamps(): Promise<Camp[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("camps")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching camps:", error);
    throw new Error("Failed to fetch camps");
  }

  return data || [];
}
