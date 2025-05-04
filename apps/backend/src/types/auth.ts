export type RegisterUser = {
    username: string;
    email: string;
    password: string;
};

export type LoginUser = {
    emailOrUsername: string;
    password: string;
};