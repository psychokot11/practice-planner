import supabase from "./supabase";

export async function getPlans() {
  const { data: plans, error } = await supabase.from("plans").select("*");

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching plans");
  }

  return plans;
}

export async function createEditPlan(newPlan, id) {
  let query;

  if (!id) {
    query = supabase.from('plans').insert([newPlan]);
  }

  if (id) {
    query = supabase.from('plans').update({...newPlan}).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('An error occurred while creating/updating the plan');
  }

  return data;
}

export async function deletePlan(id) {
  const { data: plans, error } = await supabase
  .from('plans')
  .delete()
  .eq('id', id)

  if (error) {
      console.error(error)
      throw new Error('An error occurred while deleting the plan')
  }

  return plans;
}
