import supabase from "./supabase";

export async function getDrills() {
  const { data: drills, error } = await supabase.from("drills").select("*");

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching drills");
  }

  return drills;
}

export async function createEditDrill(newDrill, id) {
  let query;

  if (!id) {
    query = supabase.from('drills').insert([newDrill]);
  }

  if (id) {
    query = supabase.from('drills').update({...newDrill}).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('An error occurred while creating/updating the drill');
  }

  return data;
}

export async function deleteDrill(id) {
  const { data: drills, error } = await supabase
  .from('drills')
  .delete()
  .eq('id', id)

  if (error) {
      console.error(error)
      throw new Error('An error occurred while deleting the drill')
  }

  return drills;
}