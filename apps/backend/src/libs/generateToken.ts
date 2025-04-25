import jwt from 'jsonwebtoken';

interface PayloadType {
    id?: string;
    username?: string;
    email?: string;
    role?: string;
}

const generateToken = (payload: PayloadType, expires: string) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "15d" });

    return token;
};

export default generateToken;