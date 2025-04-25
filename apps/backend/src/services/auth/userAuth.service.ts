import prisma from "../../prisma.js";
import { hashPassword } from "../../helpers/hashPassword.js";
import { referralGenerator } from "../../libs/generateReferral.js";
import { LoginUser, RegisterUser } from "../../types/auth.js";
import { compare } from "bcryptjs";
import generateToken from "../../libs/generateToken.js";
import sendMail from "../../libs/sendMail.js";

export const registerUserService = async (body: RegisterUser) => {
    const { username, email, password } = body;

    const userUsername = await prisma.user.findFirst({ where: { username } });
    const userEmail = await prisma.user.findFirst({ where: { email } });

    if (userUsername?.username)
        throw new Error('name already exists');

    if (userEmail?.email)
        throw new Error('email already exists');

    if (!username)
        throw new Error('invalid username format');

    if (!email || !email.includes("@") || !email.includes("."))
        throw new Error('invalid email format');

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

    const payload = {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
    };
    const token = generateToken(payload, '5m');

    await sendMail({
        to: newUser.email,
        subject: 'Verify Your Account',
        template: 'verify',
        context: {
            name: newUser.username,
            link: `${process.env.BASE_URL_WEB}/verify/${token}`,
        }
    })

    return { newUser, token };
};

export const verifyUserService = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        throw new Error('User not found');
    }

    if (user.isVerified) {
        throw new Error('User has already been verified');
    }

    const verifiedUser = await prisma.user.update({
        where: { id },
        data: { isVerified: true },
    });

    return verifiedUser
};

export const loginUserService = async (body: LoginUser) => {
    const { emailOrUsername, password } = body;

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { username: emailOrUsername },
                { email: emailOrUsername }
            ],
        },
    });

    if (!user) throw new Error('User not found');
    if (!user.isVerified) throw new Error('User not verified');

    const isValidPassword = await compare(password!, user.password);

    if (!isValidPassword) throw new Error('Incorrect Password');

    const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
    }

    const token = generateToken(payload, "1d");

    return { user, token };
};

export const forgotPasswordService = async (email: string) => {
    if (!email || !email.includes("@") || !email.includes("."))
        throw new Error('invalid email format');

    const user = await prisma.user.findFirst({
        where: { email }
    });

    if (!user) throw new Error('Email not found!');

    const payload = {
        email: user.email
    };

    const token = generateToken(payload, '15m');

    await sendMail({
        to: user.email,
        subject: 'Reset Password',
        template: 'forgot-password',
        context: {
            name: user.username,
            link: `${process.env.BASE_URL_WEB}/forgot-password/${token}`
        },
    });

    return user;
};