import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditDrill as createDrillService } from "../../services/apiDrills";

export function useCreateDrill() {
    const queryClient = useQueryClient();

    const {mutate: createDrill, isLoading: isCreating} = useMutation({
        mutationFn: createDrillService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: 'drills' });
        }
    })

    return {createDrill, isCreating}
}