import { v4 as uuidv4 } from 'uuid';

export async function generateUUId(size = 12) {
    return uuidv4()
}

export function payloadId() {
    const datePart = new Date().getTime() * Math.pow(10, 3);
    const extraPart = Math.floor(Math.random() * Math.pow(10, 3));
    const id = datePart + extraPart;
    return id;
}