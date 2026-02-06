import { useQuery } from '@tanstack/react-query'
import { getTags } from '../../services/apiTags'

export function useTags() {
    const {
        isLoading,
        data: tags,
        error,
    } = useQuery({
        queryKey: ['tags'],
        queryFn: getTags,
    })

    const sortedTags = tags?.sort((a, b) => a.name.localeCompare(b.name))

    return { tags: sortedTags, isLoading, error }
}
