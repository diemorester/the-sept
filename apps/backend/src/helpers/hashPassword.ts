import { genSalt, hash } from "bcryptjs"

export const hashPassword = async (pass: string) => {
    const salt = await genSalt(10);
    const hashPassword = await hash(pass, salt);

    return hashPassword;
};