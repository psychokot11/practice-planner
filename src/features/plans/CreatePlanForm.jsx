import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDrills } from "../drills/useDrills";
import { useTags } from "../tags/useTags";
import { useCreatePlan } from "./useCreatePlan";
import { useEditPlan } from "./useEditPlan";
import Spinner from "../../ui/Spinner";

function CreatePlanForm({ plan, type, onClose }) {
    const { tags, isLoading: isLoadingTags } = useTags();
    const { drills, isLoading: isLoadingDrills } = useDrills();
    const { createPlan, isCreating } = useCreatePlan();
    const { editPlan, isEditing } = useEditPlan();

    const isWorking = isCreating || isEditing;
    const planId = plan ? plan.id : null;

    const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState(plan?.focus ? plan.focus : []);
    const [isDrillsDropdownOpen, setIsDrillsDropdownOpen] = useState(false);
    const [selectedDrills, setSelectedDrills] = useState(plan?.drills ? plan.drills : []);

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
        //TODO this is ugly, refactor
        if (selectedTags == "[]") {
            setValue("focus", "");
        } else {
            setValue("focus", selectedTags);
        }       
    }, [selectedTags, setValue]);

    const handleDrillChange = (event) => {
        const { value, checked } = event.target;
        console.log(value);

        let drillsArray;
        
        if (!selectedDrills.length) {
            drillsArray = [];
        } else {
            drillsArray = selectedDrills.split(',').map(drill => drill.trim());
            // drillsArray = selectedDrills;
        }
        
        if (checked) {
            if (!drillsArray.includes(value)) {
                drillsArray.push(value);
            }                      
            console.log(drillsArray);
            setSelectedDrills(drillsArray);
            // setSelectedTags(tagsArray.join(', '));
        } else {
            const filteredDrills = drillsArray.filter(tag => tag !== value);
            setSelectedDrills(filteredDrills);
            // setSelectedTags(filteredTags.join(', '));
        }
    };

    useEffect(() => {
        // setValue("focus", selectedTags);
        // console.log(selectedDrills);
    }, [selectedDrills]);

    function onSubmit(data) {
        if (type === "create") { 
            createPlan(data, {
                onSuccess: () => {
                    reset();
                    onClose();
                  }
            });
        } else {
            editPlan({newPlanData: data, id: planId}, {
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

    function handleDropdownToggle(item) {
        item === "tags" && setIsTagsDropdownOpen(!isTagsDropdownOpen);
        item === "drills" && setIsDrillsDropdownOpen(!isDrillsDropdownOpen);
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
                               {type === 'create' ? 'Create new plan' : 'Edit plan'} 
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
                                        defaultValue={type === "edit" ? plan.name : ''}
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
                                        defaultValue={type === "edit" ? plan.minNumPlayers : 2}
                                        {...register("minNumPlayers")} />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Focus</label>
                                    <button onClick={() => handleDropdownToggle("tags")} 
                                        className="w-full justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                        Choose main focus areas 
                                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                        </svg>
                                    </button>
                                    <div className={`${!isTagsDropdownOpen && 'hidden'} z-10 w-full bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                                        <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                                            {isLoadingTags ? <Spinner /> : tags.map((tag) => (
                                                <li key={tag.id}>
                                                    <div className="flex items-center">
                                                        <input  onChange={handleTagChange}
                                                            type="checkbox" 
                                                            id={tag.id} 
                                                            name={tag.name} 
                                                            value={tag.name}
                                                            defaultChecked={(type === "edit" && plan.focus) && plan.focus.includes(tag.name)}
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                        <label htmlFor={tag.id} 
                                                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{tag.name}</label>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <input type="hidden" 
                                        name="focus" 
                                        value={selectedTags}
                                        {...register("focus")} />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Focus</label>
                                    <button onClick={() => handleDropdownToggle("drills")} 
                                        className="w-full justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                        Choose drills 
                                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                        </svg>
                                    </button>
                                        <div className={`${!isDrillsDropdownOpen && 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 w-full`}>
                                            <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                                            {isLoadingDrills ? <Spinner /> : drills.map((drill) => (
                                                <li key={drill.id}>
                                                    <div className="flex items-center">
                                                        <input  onChange={handleDrillChange}
                                                            type="checkbox" 
                                                            id={drill.id} 
                                                            name={drill.name} 
                                                            value={drill.name}
                                                            defaultChecked={(type === "edit" && plan.focus) && plan.focus.includes(drill.name)}
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                        <label htmlFor={drill.id} 
                                                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{drill.name}</label>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>               
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="comments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comments</label>
                                        <textarea id="comments"
                                            name="comments"
                                            rows="4"
                                            defaultValue={type === "edit" ? plan.comments : ''}
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Write comments here"
                                            {...register("comments")} />          
                                </div>
                            </div>
                            <button type="submit"
                                disabled={isWorking}
                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {type === "create" && <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>}
                                {type === "create" ? "Add new plan" : "Edit plan"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className={`${type === 'create' ? 'bg-gray-900/50' : 'bg-gray-900/10'} dark:bg-gray-900/80 fixed inset-0 z-40`}></div>
        </div>
    )
}

export default CreatePlanForm;

CreatePlanForm.propTypes = {
    plan: PropTypes.object,
    type: PropTypes.string,
    onClose: PropTypes.func,
};