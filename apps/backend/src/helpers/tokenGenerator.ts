import jwt from 'jsonwebtoken';
import { Response } from 'express';

interface PayloadType {
    id: string;
    username: string;
    role?: string;
}

const generateToken = (payload: PayloadType, res: Response) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "15d"
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
};

export default generateToken;