import supabase from './supabase'
import { Plan } from '../types'

export async function getPlans(): Promise<Plan[]> {
    const { data: plans, error } = await supabase.from('plans').select('*')

    if (error) {
        console.error(error)
        throw new Error('An error occurred while fetching plans')
    }

    return plans
}

export async function createEditPlan(
    newPlan: Omit<Plan, 'id'>,
    id?: number
): Promise<Plan> {
    const query = id
        ? supabase
              .from('plans')
              .update({ ...newPlan })
              .eq('id', id)
        : supabase.from('plans').insert([newPlan])

    const { data, error } = await query.select().single()

    if (error) {
        console.error(error)
        throw new Error('An error occurred while creating/updating the plan')
    }

    return data
}

export async function deletePlan(id: number): Promise<void> {
    const { error } = await supabase.from('plans').delete().eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('An error occurred while deleting the plan')
    }
}
