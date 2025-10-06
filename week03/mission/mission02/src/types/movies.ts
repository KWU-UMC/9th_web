export type Movie  = {
    id : number
    title : string
    poster_path : string
    release_data : string
    overview : string
}

export type Movies = {
    page : number
    results : Movie[]
    total_pages : number
    total_results : number
}