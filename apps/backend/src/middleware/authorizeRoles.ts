import { NextFunction, Request, Response } from "express";

export const authorizeRole = (role: 'USER' | 'EO' | 'ADMIN') => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user?.role !== role) {
            return res.status(403).json({
                status: 'FORBIDDEN',
                message: 'You do not have access to this resource',
            });
        }
        next();
    };
};