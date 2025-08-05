import { useTags } from '../features/tags/useTags'
import CreateTagForm from '../features/tags/CreateTagForm'
import Spinner from '../ui/Spinner'
import Tag from '../features/tags/Tag'

function Tags() {
    const { isLoading, tags } = useTags()

    if (isLoading) return <Spinner />

    return (
        <>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                <h1>Available Tags:</h1>
                <CreateTagForm />
            </div>
            <div className="flex flex-wrap gap-5">
                {tags.map((tag) => (
                    <Tag key={tag.id} id={tag.id} tag={tag.name} />
                ))}
            </div>
        </>
    )
}

export default Tags
