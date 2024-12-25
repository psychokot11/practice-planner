import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTag as deleteTagApi } from "../../services/apiTags";

export function useDeleteTag() {
    const queryClient = useQueryClient();
  
    const {isLoading: isDeleting, mutate: deleteTag } = useMutation({
      mutationFn: deleteTagApi,
      onSuccess: () => {    
        queryClient.invalidateQueries({ queryKey: 'tags' })
      },
    })

    return { isDeleting, deleteTag }
}