import { useForm } from 'react-hook-form'
import { useCreateTag } from './useCreateTags'
import { useTags } from './useTags'
import { IoMdAddCircle } from 'react-icons/io'
import { toast } from 'react-hot-toast'
import ButtonIcon from '../../ui/buttons/ButtonIcon'

const labelClasses =
    'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
const textInputClasses =
    'bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:max-w-48'

function CreateTagForm() {
    const { register, handleSubmit, reset, formState, setError } = useForm()
    const { createTag, isCreating } = useCreateTag()
    const { tags } = useTags()
    const { errors } = formState

    const isWorking = isCreating

    function onSubmit(data) {
        if (data.name?.trim()) {
            const trimmedName = data.name.trim()
            // Check if tag already exists (case-insensitive)
            const existingTag = tags?.find(
                (tag) => tag.name.toLowerCase() === trimmedName.toLowerCase()
            )
            
            if (existingTag) {
                setError('name', {
                    type: 'manual',
                    message: 'Tag already exists',
                })
                toast.error('Tag already exists')
                return
            }

            createTag({ name: trimmedName }, {
                onSuccess: () => {
                    reset()
                },
            })
        }
    }

    function onError(errors) {
        console.log(errors)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
                <div className="relative flex-1">
                    <input
                        id="name"
                        className={textInputClasses}
                        type="text"
                        placeholder="new tag"
                        disabled={isWorking}
                        {...register('name', {
                            required: 'This field is required',
                        })}
                    />
                    {errors.name && (
                        <span className="absolute py-2 text-red-600">
                            {errors.name.message}
                        </span>
                    )}
                </div>
                <ButtonIcon text="Add tag" onClick={handleSubmit(onSubmit, onError)}>
                    <IoMdAddCircle className="size-9 text-blue-500 bg-white rounded-full shadow-lg" />
                </ButtonIcon>
            </div>
        </form>
    )
}

export default CreateTagForm
