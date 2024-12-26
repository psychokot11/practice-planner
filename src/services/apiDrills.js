import supabase from "./supabase";

export async function getDrills() {
  const { data: drills, error } = await supabase.from("drills").select("*");

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching drills");
  }

  return drills;
}

export async function createDrill(newDrill) {
  const { data, error } = await supabase
      .from('drills')
      .insert([
          {...newDrill},
      ])
      .select('*')

  if (error) {
      console.error(error)
      throw new Error('An error occurred while creating a new drill')
  }

  return data
}