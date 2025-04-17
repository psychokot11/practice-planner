import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditPlan } from '../../services/apiPlans'

export function useEditPlan() {
    const queryClient = useQueryClient()

    const { mutate: editPlan, isLoading: isEditing } = useMutation({
        mutationFn: ({ newPlanData, id }) => createEditPlan(newPlanData, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans'] })
        },
    })

    return { editPlan, isEditing }
}
