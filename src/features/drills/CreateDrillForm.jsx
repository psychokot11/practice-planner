import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTags } from "../tags/useTags";
import { useCreateDrill } from "./useCreateDrill";
import { useEditDrill } from "./useEditDrill";
import TagsCheckboxList from "../tags/TagsCheckboxList";
import Button from "../../ui/Button";

function CreateDrillForm({ drill, type, onClose }) {
    const { tags, isLoading } = useTags();
    const { createDrill, isCreating } = useCreateDrill();
    const { editDrill, isEditing } = useEditDrill();

    const isWorking = isCreating || isEditing;
    const drillId = drill ? drill.id : null;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState(drill?.tags ? drill.tags : []);

    const { register, handleSubmit, setValue, reset, formState } = useForm();
    const { errors } = formState;

    const handleTagChange = (event) => {
        const { value, checked } = event.target;

        let tagsArray = [];
        
        if (typeof selectedTags === "string" ) {
            tagsArray = selectedTags.split(',').map(tag => tag.trim())
        }
        
        if (checked) {
            if (!tagsArray.includes(value)) {
                tagsArray.push(value);
            }
            setSelectedTags(tagsArray.join(', '));
        } else {
            const filteredTags = tagsArray.filter(tag => tag !== value);
            setSelectedTags(filteredTags.join(', '));
        }
    };

    useEffect(() => {
        console.log(selectedTags);
        //TODO this is ugly, refactor
        if (selectedTags === "[]" || selectedTags.legth === 0) {
            setValue("tags", "");
        } else {
            setValue("tags", selectedTags);
        }
    }, [selectedTags, setValue]);
    
    function onSubmit(data) {
        if (type === "create") { 
            createDrill(data, {
                onSuccess: () => {
                    reset();
                    onClose();
                  }
            });
        } else {
            editDrill({newDrillData: data, id: drillId}, {
                onSuccess: () => {
                    reset();
                    onClose();
                }
            })
        }
    }    
    
    function onError(errors) {
        console.log(errors);
    }

    function handleDropdownToggle() {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <div>
            <div tabIndex="-1" 
                aria-hidden="true" 
                className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                               {type === 'create' ? 'Create new drill' : 'Edit drill'} 
                            </h3>
                            <button type="button"
                                onClick={onClose}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit, onError)} 
                            className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" 
                                        name="name" 
                                        id="name"
                                        defaultValue={type === "edit" ? drill.name : ''}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        {...register("name", {
                                            required: "This field is required",
                                        })} />
                                        {errors.name && <span className="block py-2 text-red-600">{errors.name.message}</span>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="minNumPlayers" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min. number of players</label>
                                    <input type="number" 
                                        name="minNumPlayers" 
                                        id="minNumPlayers" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        defaultValue={type === "edit" ? drill.minNumPlayers : 2}
                                        {...register("minNumPlayers")} />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
                                    <Button 
                                        onClick={handleDropdownToggle}
                                        type="button"
                                        subtype="normal"
                                        center
                                        fullWidth
                                        flex
                                    > Choose tags  
                                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                        </svg>
                                    </Button>
                                    <div className={`${!isDropdownOpen && 'hidden'} z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                                        <TagsCheckboxList 
                                            tags={tags} 
                                            isLoadingTags={isLoading} 
                                            handleTagChange={handleTagChange} 
                                            type={type} 
                                            drill={drill} />
                                    </div>
                                    <input type="hidden" 
                                        name="tags" 
                                        value={selectedTags}
                                        {...register("tags")} />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea id="description"
                                        name="description"
                                        rows="4"
                                        defaultValue={type === "edit" ? drill.description : ''}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Write drill description here"
                                        {...register("description")} />                   
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Link</label>
                                    <input type="url" 
                                        id="link" 
                                        name="link"
                                        defaultValue={type === "edit" ? drill.link : ''}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        {...register("link")}/>                   
                                </div>
                            </div>
                            <Button
                                type="submit"
                                subtype="normal"
                                center
                                disabled={isWorking}
                            >   {type === "create" && <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>}
                                {type === "create" ? "Add new drill" : "Edit drill"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <div className={`${type === 'create' ? 'bg-gray-900/50' : 'bg-gray-900/10'} dark:bg-gray-900/80 fixed inset-0 z-40`}></div>
        </div>
    )
}

export default CreateDrillForm;