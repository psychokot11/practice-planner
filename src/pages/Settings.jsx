import { useSettings } from '../features/settings/useSettings'
import Spinner from '../ui/Spinner'

function Settings() {
    const { isLoading, settings } = useSettings()
    const stages = settings ? settings[0].stages : []

    if (isLoading) return <Spinner />
    return (
        <>
            <div className="flex justify-between items-center">
                <h1>Settings:</h1>
            </div>
            <div className="flex flex-wrap gap-5">
                {stages.map((stage) => (
                    <div key={stage.key}>{stage.name}</div>
                ))}
            </div>
        </>
    )
}

export default Settings
