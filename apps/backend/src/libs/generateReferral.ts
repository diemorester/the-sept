import prisma from "../prisma.js";

export const referralGenerator = async (): Promise<string> => {
    const character: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length: number = 8;

    let referralCode: string;
    let existingReferral;

    do {
        referralCode = Array.from({ length }, () => character.charAt(Math.floor(Math.random() * character.length))).join("");
        existingReferral = await prisma.user.findUnique({
            where: { referralCode },
        });
    } while (existingReferral);

    return referralCode;
};
