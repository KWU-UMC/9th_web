export type Cast = {
    name: string;
    original_name: string;
    profile_path: string;
    character: string;
};

export type Crew = {
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