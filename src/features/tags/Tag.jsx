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
        <div className="group text-sm px-3 py-2 rounded-lg bg-white border border-blue-500 hover:border-blue-600 flex items-center transition-all duration-500 shadow-sm hover:shadow-md hover:px-2">
            <span className="font-medium text-blue-800 transition-all duration-300 lowercase">{tag}</span>
            <button 
                onClick={handleOpenModal} 
                disabled={isDeleting}
                className="text-blue-600 hover:text-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100 w-0 group-hover:w-6 overflow-hidden group-hover:ml-2 p-0 group-hover:p-1 flex items-center justify-center"
            >
                <IoMdClose className="w-3 h-3" />
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
