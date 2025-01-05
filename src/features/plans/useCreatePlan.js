import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditPlan as createPlanService } from "../../services/apiPlans";

export function useCreatePlan() {
    const queryClient = useQueryClient();

    const {mutate: createPlan, isLoading: isCreating} = useMutation({
        mutationFn: createPlanService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: 'plans' });
        }
    })

    return {createPlan, isCreating}
}