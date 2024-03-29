export type SignupRequest = {
    user_id: string;
    email: string;
    password: string;
    username: string;
    dob: string;
    avatar: string;
    bio : string;
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
    oauth_id: string;
    access_token: string;
    refresh_token: string;   
}
export type User = {
    id: string;
    email: string;
    username: string;
}

export type MemberUser =  {member_id: string
username: string
email: string
role : 'OWNER' | 'MEMBER'
user_id: string
}

export type JwtPayload = {
    claims: {
        id: string;
    };
    iss: string;
    sub: string;
    aud: string[];
    exp: number;
    nbf: number;
    iat: number;
};
