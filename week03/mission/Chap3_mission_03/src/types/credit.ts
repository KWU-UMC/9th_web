export type Cast = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    profile_path: string;
    character: string;
};

export type Crew = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    profile_path: string;
    job: string;
};


export type CreditResponse = {
    id: number;
    cast: Cast[];
    crew: Crew[]; 
};