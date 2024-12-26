import { useForm } from "react-hook-form";
import { useCreateTag } from "./useCreateTags";

const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
const textInputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-80";
const buttonClasses = "focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900";

function CreateTagForm() {
    const { register, handleSubmit, reset, formState } = useForm();
    const { createTag, isCreating } = useCreateTag();
    const { errors } = formState;
    
    const isWorking = isCreating;
    
    function onSubmit(data) {
        createTag(data, {
            onSuccess: () => {
                reset();
              }
        });
      }
    
      function onError(errors) {
        console.log(errors);
      }
    
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <label 
                className={labelClasses}
                htmlFor="name">New tag:</label>
            <div className="flex flex-wrap gap-6 mb-6 items-center">
                <div className="relative"><input 
                    id="name" 
                    className={textInputClasses}
                    type="text" 
                    disabled={isWorking} 
                    {...register("name", {
                        required: "This field is required",
                    })}/>
                {errors.name && <span className="absolute py-2 text-red-600">{errors.name.message}</span>}
                </div>
                <button type="submit" className={buttonClasses}>Create tag</button>
            </div>
        </form>
    )
}

export default CreateTagForm