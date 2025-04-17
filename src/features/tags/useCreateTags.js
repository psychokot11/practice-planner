import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTag as createTagService } from '../../services/apiTags'

export function useCreateTag() {
    const queryClient = useQueryClient()

    const { mutate: createTag, isLoading: isCreating } = useMutation({
        mutationFn: createTagService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] })
        },
    })

    return { createTag, isCreating }
}
