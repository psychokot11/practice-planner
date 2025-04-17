import { toast } from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditPlan } from '../../services/apiPlans'

export function useEditPlan() {
    const queryClient = useQueryClient()

    const { mutate: editPlan, isLoading: isEditing } = useMutation({
        mutationFn: ({ newPlanData, id }) => createEditPlan(newPlanData, id),
        onSuccess: () => {
            toast.success('Plan updated')
            queryClient.invalidateQueries({ queryKey: ['plans'] })
        },

        onError: (err) => toast.error(err.message + '. Please try again'),
    })

    return { editPlan, isEditing }
}
