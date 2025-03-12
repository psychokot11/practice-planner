import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDrills } from '../drills/useDrills'
import { useTags } from '../tags/useTags'
import { useCreatePlan } from './useCreatePlan'
import { useEditPlan } from './useEditPlan'
import { useSelectTag } from '../tags/useSelectTag'
import { useSelectDrill } from '../drills/useSelectDrill'
import { useSetPlan } from './useSetPlan'
import TagsCheckboxList from '../tags/TagsCheckboxList'
import DropdownList from '../../ui/DropdownList'
import Button from '../../ui/buttons/Button'

function CreatePlanForm({ plan, type, onClose, planSections }) {
    const { tags } = useTags()
    const { drills } = useDrills()

    const sections = planSections

    const { createPlan, isCreating } = useCreatePlan()
    const { editPlan, isEditing } = useEditPlan()

    const isWorking = isCreating || isEditing
    const planId = plan ? plan.id : null

    const { register, handleSubmit, setValue, reset, formState } = useForm()
    const { errors } = formState

    const { handleSortedListChange, practicePlan } = useSetPlan(plan)

    const formItem = plan

    const {
        handleTagDropdownToggle,
        isTagsDropdownOpen,
        handleTagChange,
        selectedTags,
        filteredDrills,
    } = useSelectTag(formItem, drills)

    const {
        selectedDrills,
        isDrillsDropdownOpen,
        handleDrillChange,
        handleDrillDropdownToggle,
    } = useSelectDrill(
        sections.map((section) => section.key),
        plan
    )

    useEffect(() => {
        //TODO this is ugly and doesn't work, refactor
        if (selectedTags == '[]') {
            setValue('tags', '')
        } else {
            setValue('tags', selectedTags)
        }
    }, [selectedTags, setValue])

    useEffect(() => {
        setValue('drills', practicePlan)
    }, [practicePlan, setValue])

    function onSubmit(data) {
        if (type === 'create') {
            createPlan(data, {
                onSuccess: () => {
                    reset()
                    onClose()
                },
            })
        } else {
            editPlan(
                { newPlanData: data, id: planId },
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
                <div className="relative p-4 w-full max-w-4xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {type === 'create'
                                    ? 'Create new plan'
                                    : 'Edit plan'}
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
                            <div className="grid gap-4 mb-4 grid-cols-3">
                                <div className="col-span-1">
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
                                            type === 'edit' ? plan.name : ''
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
                                <div className="col-span-1">
                                    <label
                                        htmlFor="minNumPlayers"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Number of players
                                    </label>
                                    <input
                                        type="number"
                                        name="minNumPlayers"
                                        id="minNumPlayers"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        defaultValue={
                                            type === 'edit'
                                                ? plan.minNumPlayers
                                                : 2
                                        }
                                        {...register('minNumPlayers')}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label
                                        htmlFor="tags"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Focus
                                    </label>
                                    <TagsCheckboxList
                                        tags={tags}
                                        handleTagChange={handleTagChange}
                                        handleDropdownToggle={() =>
                                            handleTagDropdownToggle('tags')
                                        }
                                        isDropdownOpen={isTagsDropdownOpen}
                                        type={type}
                                        item={plan}
                                    />
                                    <input
                                        type="hidden"
                                        name="tags"
                                        value={selectedTags}
                                        {...register('tags')}
                                    />
                                </div>
                                <div className="col-span-3 grid gap-4 mb-4 grid-cols-3 p-5 bg-neutral-100 rounded-lg">
                                    {sections.map(({ key, title }) => (
                                        <div className="col-span-1" key={key}>
                                            <DropdownList
                                                details={{
                                                    title,
                                                    dropDownText:
                                                        'Choose drills',
                                                    isSortable: true,
                                                    type,
                                                }}
                                                sectionKey={key}
                                                plan={plan}
                                                items={filteredDrills}
                                                selectedItems={
                                                    selectedDrills[key]
                                                }
                                                handleChange={(event) =>
                                                    handleDrillChange(
                                                        key,
                                                        event
                                                    )
                                                }
                                                isDropdownOpen={
                                                    isDrillsDropdownOpen[key]
                                                }
                                                handleDropdownToggle={() =>
                                                    handleDrillDropdownToggle(
                                                        key
                                                    )
                                                }
                                                handleSortedListChange={(
                                                    sortedList
                                                ) =>
                                                    handleSortedListChange(
                                                        sortedList,
                                                        key
                                                    )
                                                }
                                            />
                                            <input
                                                type="hidden"
                                                name="drills"
                                                // value={selectedDrills[key]}
                                                {...register('drills')}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="col-span-3">
                                    <label
                                        htmlFor="comments"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Comments
                                    </label>
                                    <textarea
                                        id="comments"
                                        name="comments"
                                        rows="4"
                                        defaultValue={
                                            type === 'edit' ? plan.comments : ''
                                        }
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write comments here"
                                        {...register('comments')}
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                icon={type === 'create' ? 'add' : ''}
                                iconPosition="left"
                                disabled={isWorking}
                                flex
                            >
                                {type === 'create'
                                    ? 'Add new plan'
                                    : 'Edit plan'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
        </div>
    )
}

export default CreatePlanForm
