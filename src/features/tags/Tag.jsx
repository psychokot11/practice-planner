import { useState } from 'react'
import { useDeleteTag } from './useDeleteTags'
import { IoMdClose } from 'react-icons/io'
import DeleteModal from '../../ui/DeleteModal'

function Tag({ id, tag }) {
    const { isDeleting, deleteTag } = useDeleteTag()
    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleOpenModal() {
        setIsModalOpen(true)
    }

    function handleConfirmDelete() {
        deleteTag(id)
        setIsModalOpen(false)
    }

    function handleCancelDelete() {
        setIsModalOpen(false)
    }

    return (
        <div className="text-m px-3 py-1 max-w-fit rounded-lg bg-neutral-200 border-2 border-neutral-300 flex items-center gap-2">
            {tag}
            <button onClick={handleOpenModal} disabled={isDeleting}>
                <IoMdClose />
            </button>
            {isModalOpen && (
                <DeleteModal
                    item="tag"
                    onAccept={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    onClose={handleCancelDelete}
                />
            )}
        </div>
    )
}

export default Tag
