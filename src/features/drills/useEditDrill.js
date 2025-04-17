import { toast } from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditDrill } from '../../services/apiDrills'

export function useEditDrill() {
    const queryClient = useQueryClient()

    const { mutate: editDrill, isLoading: isEditing } = useMutation({
        mutationFn: ({ newDrillData, id }) => createEditDrill(newDrillData, id),
        onSuccess: () => {
            toast.success('Drill updated')
            queryClient.invalidateQueries({ queryKey: ['drills'] })
        },

        onError: (err) => toast.error(err.message + '. Please try again'),
    })

    return { editDrill, isEditing }
}
