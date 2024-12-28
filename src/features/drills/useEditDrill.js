import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditDrill } from "../../services/apiDrills";

export function useEditDrill() {
    const queryClient = useQueryClient();
    
    const {mutate: editDrill, isLoading: isEditing} = useMutation({
        mutationFn: ({newDrillData, id}) => createEditDrill(newDrillData, id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: 'drills' })
        },
      });

  return { editDrill, isEditing };
}