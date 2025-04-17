import { toast } from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteDrill as deleteDrillApi } from '../../services/apiDrills'

export function useDeleteDrill() {
    const queryClient = useQueryClient()

    const { isLoading: isDeleting, mutate: deleteDrill } = useMutation({
        mutationFn: deleteDrillApi,
        onSuccess: () => {
            toast.success('Drill deleted')
            queryClient.invalidateQueries({ queryKey: ['drills'] })
        },

        onError: (err) => toast.error(err.message + '. Please try again'),
    })

    return { isDeleting, deleteDrill }
}
