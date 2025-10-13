export type Movie  = {
    id : number
    title : string
    poster_path : string
    release_date : string
    overview : string
    backdrop_path : string
}

export type Movies = {
    page : number
    results : Movie[]
    total_pages : number
    total_results : number
}