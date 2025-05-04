import generateToken from "../../libs/generateToken.js";
import prisma from "../../prisma.js";
import { EditUser } from "../../types/user.js";

export const getMeService = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
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

// export const editUserService = async (userId: string, data: Partial<EditUser>) => {
//     const updateData: Partial<EditUser> = {};

//     if (data.name !== undefined) {
//         if (!data.name.trim()) throw new Error("Name cannot be empty");
//         updateData.name = data.name.trim();
//     }

//     if (data.username !== undefined) {
//         updateData.username = data.username.trim();
//     }

//     if (data.phoneNumber !== undefined) {
//         if (!/^[0-9]{10,15}$/.test(data.phoneNumber)) {
//             throw new Error("Invalid phone number");
//         }
//         updateData.phoneNumber = data.phoneNumber;
//     }

//     if (data.avatar !== undefined) {
//         updateData.avatar = data.avatar;
//     }

//     if (Object.keys(updateData).length === 0) {
//         throw new Error("No valid data provided");
//     }

//     const updatedUser = await prisma.user.update({
//         where: { id: userId },
//         data: updateData,
//     });

//     return updatedUser;
// };

export const editUserService = async (body: EditUser, id: string, file?: string) => {
    const user = await prisma.user.findUnique({
        where: { id }
    });

    if (!user) throw new Error('User not found');

    const avatar = file
        ? `${process.env.BASE_URL}/public/avatar/${file}`
        : user.avatar;

    const updatedUser = await prisma.user.update({
        where: { id },
        data: { ...body, avatar }
    });

    const payload = {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        avatar: updatedUser.avatar,
        phoneNumber: updatedUser.phoneNumber
    };

    const token = generateToken(payload, '1d');

    return { updatedUser, token };
};