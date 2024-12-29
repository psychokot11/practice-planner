import supabase from "./supabase";

export async function getPlans() {
  const { data: plans, error } = await supabase.from("plans").select("*");

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching plans");
  }

  return plans;
}
