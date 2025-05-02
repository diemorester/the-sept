import prisma from "../../prisma.js";

export const getMeService = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            username: true,
            email: true,
            avatar: true,
            phoneNumber: true,
            isVerified: true,
            point: true,
            referralCode: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    if (!user) throw new Error('User not found');

    return user;
};