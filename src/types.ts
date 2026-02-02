export interface Tag {
    id: number
    name: string
}

export interface Drill {
    id: number
    name: string
    description?: string
    tags?: Tag[]
    minNumPlayers?: number
    maxNumPlayers?: number
    link?: string
    stage?: { stage: string }[]
}

export interface Plan {
    id: number
    name: string
    description?: string
    comments?: string
    tags?: Tag[]
    drills?: Record<string, Drill[]>
    minNumPlayers?: number
    maxNumPlayers?: number
}

export interface Section {
    key: string
    title: string
}
