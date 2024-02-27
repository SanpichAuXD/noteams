export type SignupRequest = {
    email: string;
    password: string;
    username: string;
    dob: string;
    phone :string;
    };
    export type SignupResponse = {
        id: string;
        email: string;
        username: string;
    
    }
export type SignInRequest = {
    email: string;
    password: string;
    };

export type SignInResponse = {
    user: User;
    token: Token;
}

export type Token = {
    id: string;
    access_token: string;
    refresh_token: string;   
}
export type User = {
    id: string;
    email: string;
    username: string;
}