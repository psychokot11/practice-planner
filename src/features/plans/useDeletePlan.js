import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlan as deletePlanApi } from "../../services/apiPlans";

export function useDeletePlan() {
    const queryClient = useQueryClient();
  
    const {isLoading: isDeleting, mutate: deletePlan } = useMutation({
      mutationFn: deletePlanApi,
      onSuccess: () => {    
        queryClient.invalidateQueries({ queryKey: 'plans' })
      },
    })

    return { isDeleting, deletePlan }
}