import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDrill as deleteDrillApi } from "../../services/apiDrills";

export function useDeleteDrill() {
    const queryClient = useQueryClient();
  
    const {isLoading: isDeleting, mutate: deleteDrill } = useMutation({
      mutationFn: deleteDrillApi,
      onSuccess: () => {    
        queryClient.invalidateQueries({ queryKey: 'drills' })
      },
    })

    return { isDeleting, deleteDrill }
}