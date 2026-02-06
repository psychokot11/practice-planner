import { toast } from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTag as createTagService } from '../../services/apiTags'

export function useCreateTag() {
    const queryClient = useQueryClient()

    const { mutate: createTag, isPending: isCreating } = useMutation({
        mutationFn: createTagService,
        onSuccess: () => {
            toast.success('Tag created')
            queryClient.invalidateQueries({ queryKey: ['tags'] })
        },

        onError: (err) => toast.error(err.message + ' Please try again'),
    })

    return { createTag, isCreating }
}
