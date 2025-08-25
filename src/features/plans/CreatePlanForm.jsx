import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDrills } from '../drills/useDrills'
import { useTags } from '../tags/useTags'
import { useCreatePlan } from './useCreatePlan'
import { useCreateRandomPlan } from './useCreateRandomPlan'
import { useEditPlan } from './useEditPlan'
import { useFilterByPlayerCount } from './useFilterByplayerCount'
import { useSelectTag } from '../tags/useSelectTag'
import { useSelectDrill } from '../drills/useSelectDrill'
import { useSetPlan } from './useSetPlan'
import { useCopyPlan } from './useCopyPlan'
import TagsCheckboxList from '../tags/TagsCheckboxList'
import DropdownList from '../../ui/DropdownList'
import Button from '../../ui/buttons/Button'
import ConfirmationModal from '../../ui/ConfirmationModal'

const labelClasses =
    'block mb-2 text-sm font-medium text-gray-900 dark:text-white'

function CreatePlanForm({ plan, type, onClose, planSections }) {
    const { drills } = useDrills()
    const { tags } = useTags()

    const sections = planSections

    const { createPlan, isCreating } = useCreatePlan()
    const { editPlan, isEditing } = useEditPlan()

    const isWorking = isCreating || isEditing
    const planId = plan ? plan.id : null

    const { register, handleSubmit, setValue, reset, formState } = useForm()
    const { errors } = formState
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [hasUserMadeChanges, setHasUserMadeChanges] = useState(false)

    const formItem = plan

    const { filteredByCountDrills, setPlayersCount } = useFilterByPlayerCount(
        drills,
        plan
    )

    const {
        handleTagDropdownToggle,
        isTagsDropdownOpen,
        handleTagChange,
        selectedTags,
        filteredDrills,
    } = useSelectTag(formItem, filteredByCountDrills)

    const {
        selectedDrills,
        setSelectedDrills,
        isDrillsDropdownOpen,
        handleDrillChange,
        handleRemoveDrill,
        handleDrillDropdownToggle,
    } = useSelectDrill(
        sections.map((section) => section.key),
        plan
    )

    const {
        handleSetRandomPlan,
        handleDrillsCountChange,
        warningMessage: randomPlanWarningMessage,
    } = useCreateRandomPlan(
        sections,
        selectedTags,
        filteredByCountDrills,
        setSelectedDrills
    )

    const { handleSortedListChange, practicePlan } = useSetPlan(plan)

    function handlePlayersCountChange(e) {
        setPlayersCount(Number(e.target.value))
    }

    useEffect(() => {
        setValue('tags', selectedTags)
    }, [selectedTags, setValue])

    useEffect(() => {
        setValue('drills', practicePlan)
    }, [practicePlan, setValue, selectedDrills])

    const { copyPlan } = useCopyPlan()

    function onCopyPlan(data) {
        copyPlan(data)
    }

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
        console.error('Form validation errors:', errors)
        
        const firstErrorField = Object.keys(errors)[0]
        if (firstErrorField) {
            const element = document.getElementById(firstErrorField)
            element?.focus()
        }
    }

    function handleClose() {
        if (hasUserMadeChanges) {
            setShowConfirmation(true)
        } else {
            onClose()
        }
    }

    function handleConfirmClose() {
        setShowConfirmation(false)
        onClose()
    }

    function handleCancelClose() {
        setShowConfirmation(false)
    }

    return (
        <div>
            <div
                tabIndex="-1"
                aria-hidden="true"
                className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        handleClose()
                    }
                }}
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
                                onClick={handleClose}
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
                            onChange={() => setHasUserMadeChanges(true)}
                        >
                            <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-3">
                                <div className="col-span-1">
                                    <label
                                        htmlFor="name"
                                        className={labelClasses}
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
                                            required: 'Plan name is required',
                                            minLength: {
                                                value: 2,
                                                message: 'Plan name must be at least 2 characters'
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: 'Plan name must be less than 100 characters'
                                            }
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
                                        className={labelClasses}
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
                                        onChange={handlePlayersCountChange}
                                        {...register('minNumPlayers', {
                                            required: 'Number of players is required',
                                            min: {
                                                value: 1,
                                                message: 'Must have at least 1 player'
                                            },
                                            max: {
                                                value: 50,
                                                message: 'Maximum 50 players allowed'
                                            }
                                        })}
                                    />
                                    {errors.minNumPlayers && (
                                        <span className="block py-2 text-red-600">
                                            {errors.minNumPlayers.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-1">
                                    <label
                                        htmlFor="tags"
                                        className={labelClasses}
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
                                <div className="col-span-1 md:col-span-3 grid gap-4 mb-4 grid-cols-1 md:grid-cols-3 p-5 bg-neutral-100 rounded-lg">
                                    {sections.map(({ key, title }) => (
                                        <div className="col-span-1" key={key}>
                                            <DropdownList
                                                details={{
                                                    key,
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
                                                handleRemoveDrill={
                                                    handleRemoveDrill
                                                }
                                                handleChange={(event, item) =>
                                                    handleDrillChange(
                                                        key,
                                                        event,
                                                        item
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
                                                {...register('drills')}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {type === 'create' && (
                                    <div className="col-span-1 md:col-span-3 mb-4 grid-cols-1 md:grid-cols-3 p-5 bg-neutral-100 rounded-lg">
                                        <div className="flex gap-4">
                                            <Button
                                                type="button"
                                                subtype="primary"
                                                onClick={handleSetRandomPlan}
                                            >
                                                Randomize
                                            </Button>
                                            {sections.map(({ key, title }) => (
                                                <div
                                                    key={key}
                                                    className="flex gap-2 items-center"
                                                >
                                                    <label
                                                        htmlFor="players"
                                                        className={labelClasses}
                                                    >
                                                        {title}
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="players"
                                                        id="players"
                                                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                        min="0"
                                                        max="99"
                                                        defaultValue={0}
                                                        onChange={(event) =>
                                                            handleDrillsCountChange(
                                                                event,
                                                                key
                                                            )
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        {randomPlanWarningMessage && (
                                            <div className="w-1/2 text-xs mt-3 text-red-500">
                                                {randomPlanWarningMessage}
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="col-span-1 md:col-span-3">
                                    <label
                                        htmlFor="description"
                                        className={labelClasses}
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="4"
                                        defaultValue={
                                            type === 'edit' ? plan.description : ''
                                        }
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Provide short description"
                                        {...register('description', {
                                            maxLength: {
                                                value: 500,
                                                message: 'Description must be less than 500 characters'
                                            }
                                        })}
                                    />
                                    {errors.description && (
                                        <span className="block py-2 text-red-600">
                                            {errors.description.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-1 md:col-span-3">
                                    <label
                                        htmlFor="comments"
                                        className={labelClasses}
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
                                        {...register('comments', {
                                            maxLength: {
                                                value: 1000,
                                                message: 'Comments must be less than 1000 characters'
                                            }
                                        })}
                                    />
                                    {errors.comments && (
                                        <span className="block py-2 text-red-600">
                                            {errors.comments.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    subtype="primary"
                                    icon={type === 'create' ? 'add' : ''}
                                    iconPosition="left"
                                    disabled={isWorking}
                                    flex
                                >
                                    {type === 'create'
                                        ? 'Add new plan'
                                        : 'Edit plan'}
                                </Button>
                                <Button
                                    type="button"
                                    subtype="solo-icon"
                                    icon="copy"
                                    onClick={handleSubmit(onCopyPlan, onError)}
                                ></Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
            {showConfirmation && (
                <ConfirmationModal
                    title="Unsaved changes"
                    message="You have unsaved changes. Are you sure you want to close this form?"
                    onConfirm={handleConfirmClose}
                    onCancel={handleCancelClose}
                    onClose={handleCancelClose}
                />
            )}
        </div>
    )
}

export default CreatePlanForm
