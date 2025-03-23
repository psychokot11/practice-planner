import supabase from './supabase'

export async function getSettings() {
    const { data: settings, error } = await supabase
        .from('settings')
        .select('*')

    if (error) {
        console.error(error)
        throw new Error('An error occurred while fetching settings')
    }

    return settings
}
