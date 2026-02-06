import { toast } from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTag as deleteTagApi } from '../../services/apiTags'

export function useDeleteTag() {
    const queryClient = useQueryClient()

    const { isPending: isDeleting, mutate: deleteTag } = useMutation({
        mutationFn: deleteTagApi,
        onSuccess: () => {
            toast.success('Tag deleted')
            queryClient.invalidateQueries({ queryKey: ['tags'] })
        },

        onError: (err) => toast.error(err.message + '. Please try again'),
    })

    return { isDeleting, deleteTag }
}
