import supabase from './supabase.ts'
import { Drill } from '../types'

export async function getDrills(): Promise<Drill[]> {
    const { data: drills, error } = await supabase.from('drills').select('*')

    if (error) {
        console.error(error)
        throw new Error('An error occurred while fetching drills')
    }

    return drills
}

export async function createEditDrill(
    newDrill: Omit<Drill, 'id'>,
    id?: number
): Promise<Drill> {
    const query = id
        ? supabase
              .from('drills')
              .update({ ...newDrill })
              .eq('id', id)
        : supabase.from('drills').insert([newDrill])

    const { data, error } = await query.select().single()

    if (error) {
        console.error(error)
        throw new Error('An error occurred while creating/updating the drill')
    }

    return data
}

export async function deleteDrill(id: number): Promise<void> {
    const { error } = await supabase.from('drills').delete().eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('An error occurred while deleting the drill')
    }
}
