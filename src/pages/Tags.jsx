import { useTags } from "../features/tags/useTags";
import CreateTagForm from "../features/tags/CreateTagForm";
import Spinner from "../ui/Spinner";
import Tag from "../features/tags/Tag";

function Tags() {
    const { isLoading, tags } = useTags();
  
    if (isLoading) return <Spinner />;
  
    return (
      <>
        <h1>Available Tags:</h1>
        <div className="flex flex-wrap gap-5">
            {tags.map((tag) => (
                <Tag key={tag.id} id={tag.id} tag={tag.name} />
            ))}
        </div>
        <CreateTagForm />
      </>
    );
  }
  
  export default Tags;