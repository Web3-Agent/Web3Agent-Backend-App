import { v4 as uuidv4 } from 'uuid';

export async function generateUUId(size = 12) {
    return uuidv4()
} 