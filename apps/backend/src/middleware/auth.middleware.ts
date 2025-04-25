import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
    id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { verify } = jwt

    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith('Bearer')
        ? authHeader.split(' ')[1]
        : null;

    const token = tokenFromHeader || req.cookies.jwt;

    if (!token) {
        return res.status(401).json({
            status: 'UNAUTHORIZED',
            message: 'No Token provided',
        });
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
    };

    next();
};