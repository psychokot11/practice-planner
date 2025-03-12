import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTags } from '../tags/useTags'
import { useCreateDrill } from './useCreateDrill'
import { useEditDrill } from './useEditDrill'
import TagsCheckboxList from '../tags/TagsCheckboxList'
import Button from '../../ui/buttons/Button'
import { useDrills } from './useDrills'
import { useSelectTag } from '../tags/useSelectTag'

function CreateDrillForm({ drill, type, onClose }) {
    const { tags } = useTags()
    const { drills } = useDrills()
    const { createDrill, isCreating } = useCreateDrill()
    const { editDrill, isEditing } = useEditDrill()

    const isWorking = isCreating || isEditing
    const drillId = drill ? drill.id : null

    const formItem = drill

    const {
        handleTagDropdownToggle,
        isTagsDropdownOpen,
        handleTagChange,
        selectedTags,
    } = useSelectTag(formItem, drills)

    const { register, handleSubmit, setValue, reset, formState } = useForm()
    const { errors } = formState

    useEffect(() => {
        //TODO this is ugly, refactor
        if (selectedTags === '[]' || selectedTags.legth === 0) {
            setValue('tags', '')
        } else {
            setValue('tags', selectedTags)
        }
    }, [selectedTags, setValue])

    function onSubmit(data) {
        if (type === 'create') {
            createDrill(data, {
                onSuccess: () => {
                    reset()
                    onClose()
                },
            })
        } else {
            editDrill(
                { newDrillData: data, id: drillId },
                {
                    onSuccess: () => {
                        reset()
                        onClose()
                    },
                }
            )
        }
    }

    function onError(errors) {
        console.log(errors)
    }

    return (
        <div>
            <div
                tabIndex="-1"
                aria-hidden="true"
                className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {type === 'create'
                                    ? 'Create new drill'
                                    : 'Edit drill'}
                            </h3>
                            <Button
                                onClick={onClose}
                                type="button"
                                subtype="close"
                                icon="close"
                            >
                                <span className="sr-only">Close modal</span>
                            </Button>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit, onError)}
                            className="p-4 md:p-5"
                        >
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        defaultValue={
                                            type === 'edit' ? drill.name : ''
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        {...register('name', {
                                            required: 'This field is required',
                                        })}
                                    />
                                    {errors.name && (
                                        <span className="block py-2 text-red-600">
                                            {errors.name.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label
                                        htmlFor="minNumPlayers"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Min. number of players
                                    </label>
                                    <input
                                        type="number"
                                        name="minNumPlayers"
                                        id="minNumPlayers"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        defaultValue={
                                            type === 'edit'
                                                ? drill.minNumPlayers
                                                : 2
                                        }
                                        {...register('minNumPlayers')}
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label
                                        htmlFor="tags"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Tags
                                    </label>
                                    <TagsCheckboxList
                                        tags={tags}
                                        handleTagChange={handleTagChange}
                                        handleDropdownToggle={() =>
                                            handleTagDropdownToggle('tags')
                                        }
                                        isDropdownOpen={isTagsDropdownOpen}
                                        type={type}
                                        item={drill}
                                    />
                                    <input
                                        type="hidden"
                                        name="tags"
                                        {...register('tags')}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="4"
                                        defaultValue={
                                            type === 'edit'
                                                ? drill.description
                                                : ''
                                        }
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write drill description here"
                                        {...register('description')}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="link"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Link
                                    </label>
                                    <input
                                        type="url"
                                        id="link"
                                        name="link"
                                        defaultValue={
                                            type === 'edit' ? drill.link : ''
                                        }
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        {...register('link')}
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                subtype="normal"
                                icon="add"
                                iconPosition="left"
                                center
                                disabled={isWorking}
                                flex
                            >
                                {type === 'create'
                                    ? 'Add new drill'
                                    : 'Edit drill'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <div
                className={`${
                    type === 'create' ? 'bg-gray-900/50' : 'bg-gray-900/10'
                } dark:bg-gray-900/80 fixed inset-0 z-40`}
            ></div>
        </div>
    )
}

export default CreateDrillForm
