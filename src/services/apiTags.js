import supabase from './supabase'

export async function getTags() {
    const { data: tags, error } = await supabase.from('tags').select('*')

    if (error) {
        console.error(error)
        throw new Error('An error occurred while fetching tags')
    }

    return tags
}

export async function createTag(newTag) {
    const { data, error } = await supabase
        .from('tags')
        .insert([{ ...newTag }])
        .select('*')

    if (error) {
        console.error(error)
        // Check if error is due to duplicate key constraint
        if (error.code === '23505' || error.message?.includes('duplicate key')) {
            throw new Error('Tag already exists')
        }
        throw new Error('An error occurred while creating a new tag')
    }

    return data
}

export async function deleteTag(id) {
    const { data: tags, error } = await supabase
        .from('tags')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('An error occurred while deleting the tag')
    }

    return tags
}
