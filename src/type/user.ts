export type SignupRequest = {
    email: string;
    password: string;
    username: string;
    };
    export type SignupResponse = {
        id: string;
        email: string;
        username: string;
    
    }
export type LoginRequest = {
    email: string;
    password: string;
    };

export type LoginResponse = {
    id: string;
    email: string;
    username: string;
}