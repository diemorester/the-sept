import prisma from "../../prisma.js";
import { hashPassword } from "../../helpers/hashPassword.js";
import { referralGenerator } from "../../helpers/referralGenerator.js";
import { RegisterUser } from "../../types/auth.js";

export const registerUserService = async (body: RegisterUser) => {
    try {
        const { username, email, password } = body;
        const userUsername = await prisma.user.findFirst({ where: { username } });
        const userEmail = await prisma.user.findFirst({ where: { email } });

        if (userUsername?.username)
            throw new Error('name already exists');

        if (userEmail?.email)
            throw new Error('email already exists');

        const newPass = await hashPassword(password);

        const referralCode = await referralGenerator();
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: newPass,
                referralCode,
                role: 'USER'
            },
        });

        return newUser
    } catch (error) {
        throw error;
    }
};