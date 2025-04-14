import { useDrills } from '../drills/useDrills'

export function useCopyPlan() {
    const { drills } = useDrills()

    function copyPlan(data) {
        const title = data.name
        const players = data.minNumPlayers
        const mainFocus = data.tags?.length ? data.tags.join(', ') : ''
        const comments = data.comments?.trim()
        const planDrills = data.drills

        const drillOrder = ['warmUp', 'coreSession', 'finalChallenge']
        const drillLines = []

        drillOrder.forEach((section) => {
            if (Array.isArray(planDrills[section])) {
                planDrills[section].forEach((drill) => {
                    const matchedDrill = drills.find((d) => d.id === drill.id)
                    if (matchedDrill) {
                        const name = matchedDrill.name || 'Unnamed drill'
                        const description = matchedDrill.description?.trim()
                        const link = matchedDrill.link?.trim()
                        const descriptionText = description
                            ? ` (${description})`
                            : ''
                        const linkText = link ? ` [link](${link})` : ''
                        drillLines.push(
                            `- ${name}${descriptionText}${linkText}`
                        )
                    } else {
                        drillLines.push(`- Unknown Drill (ID: ${drill.id})`)
                    }
                })
            }
        })

        let textToCopy = `**${title || 'Untitled'}**`

        if (players) {
            textToCopy += `\nplayers: ${players}`
        }

        if (mainFocus) {
            textToCopy += `\nfocus: ${mainFocus}`
        }

        if (drillLines.length > 0) {
            textToCopy += `\n${drillLines.join('\n')}`
        }

        if (comments) {
            textToCopy += `\n${comments}`
        }

        navigator.clipboard.writeText(textToCopy)
    }

    return {
        copyPlan,
    }
}
