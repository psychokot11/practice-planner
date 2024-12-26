import PropTypes from "prop-types";
import { useState } from "react";
import { useDeleteTag } from "./useDeleteTags";
import { IoMdClose } from "react-icons/io";
import DeleteModal from "../../ui/DeleteModal";

function Tag({ id, tag }) {
    const { isDeleting, deleteTag } = useDeleteTag();
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleDeleteTag() {
        setIsModalOpen(true);
    }

    function handleConfirmDelete() {
        deleteTag(id);
        setIsModalOpen(false);
    }

    function handleCancelDelete() {
        setIsModalOpen(false);
    }

    return (
        <div className="text-m px-5 py-3 max-w-fit rounded-full bg-neutral-200 border-2 border-neutral-300 flex items-center gap-2">
            {tag}{" "}
            <button
                onClick={handleDeleteTag}
                disabled={isDeleting}
            >
                <IoMdClose />
            </button>
            {isModalOpen && (
                <DeleteModal
                    id={id}
                    item='tag'
                    onAccept={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    onClose={handleCancelDelete}
                />
            )}
        </div>
    );
}

Tag.propTypes = {
    tag: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export default Tag;