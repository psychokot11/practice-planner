import supabase from './supabase'
import { Tag } from '../types'

export async function getTags(): Promise<Tag[]> {
    const { data: tags, error } = await supabase.from('tags').select('*')

    if (error) {
        console.error(error)
        throw new Error('An error occurred while fetching tags')
    }

    return tags
}

export async function createTag(newTag: Omit<Tag, 'id'>): Promise<Tag[]> {
    const { data, error } = await supabase
        .from('tags')
        .insert([{ ...newTag }])
        .select('*')

    if (error) {
        console.error(error)

        if (
            error.code === '23505' ||
            error.message?.includes('duplicate key')
        ) {
            throw new Error('Tag already exists')
        }
        throw new Error('An error occurred while creating a new tag')
    }

    return data
}

export async function deleteTag(id: number): Promise<void> {
    const { error } = await supabase.from('tags').delete().eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('An error occurred while deleting the tag')
    }
}
