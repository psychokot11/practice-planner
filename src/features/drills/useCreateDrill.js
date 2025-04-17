import { toast } from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditDrill as createDrillService } from '../../services/apiDrills'

export function useCreateDrill() {
    const queryClient = useQueryClient()

    const { mutate: createDrill, isLoading: isCreating } = useMutation({
        mutationFn: createDrillService,
        onSuccess: () => {
            toast.success('Drill created')
            queryClient.invalidateQueries({ queryKey: ['drills'] })
        },

        onError: (err) => toast.error(err.message + '. Please try again'),
    })

    return { createDrill, isCreating }
}
