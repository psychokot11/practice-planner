import supabase from "./supabase";

export async function getDrills() {
  const { data: drills, error } = await supabase.from("drills").select("*");

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching drills");
  }

  return drills;
}
