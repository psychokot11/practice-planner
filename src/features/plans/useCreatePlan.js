import { toast } from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditPlan as createPlanService } from '../../services/apiPlans'

export function useCreatePlan() {
    const queryClient = useQueryClient()

    const { mutate: createPlan, isLoading: isCreating } = useMutation({
        mutationFn: createPlanService,
        onSuccess: () => {
            toast.success('Plan created')
            queryClient.invalidateQueries({ queryKey: ['plans'] })
        },

        onError: (err) => toast.error(err.message + '. Please try again'),
    })

    return { createPlan, isCreating }
}
