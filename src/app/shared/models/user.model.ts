export interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    job: UserJob;
}

export interface UserJob {
    id: number;
    name: string;
}