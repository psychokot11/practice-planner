import PropTypes from "prop-types";
import { useDeleteTag } from "./useDeleteTags";
import { IoMdClose } from "react-icons/io";

function Tag({ id, tag }) {
    const { isDeleting, deleteTag } = useDeleteTag();

    function handleDeleteTag() {
        deleteTag(id);
    }

    return (
        <div className="text-m px-5 py-3 max-w-fit rounded-full bg-neutral-200 border-2 border-neutral-300 flex items-center gap-2">
            {tag} <button onClick={handleDeleteTag} disabled={isDeleting}><IoMdClose />
            </button>
        </div>
    )
}

export default Tag

Tag.propTypes = {
    tag: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
}