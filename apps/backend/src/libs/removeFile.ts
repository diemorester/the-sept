import { promises as fs } from 'fs';

export const removeExistingFiles = async (filePath: string) => {
    try {
        await fs.access(filePath);
        await fs.unlink(filePath);
    } catch (error) {
        console.warn(`File not found or failed to delete: ${filePath}`);
    }
};