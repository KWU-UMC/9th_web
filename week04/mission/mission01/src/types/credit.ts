export type Credit = {
    id: number
    name : string
    profile_path: string
    character: string
}

export type Credits = {
    id: number,
    cast : Credit[]
}