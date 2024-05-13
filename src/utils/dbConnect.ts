import mongoose from "mongoose";
import { ENV_VARIABLES } from "../configurations/env";

async function dbConnect() {
    try {
        await mongoose.connect(ENV_VARIABLES.MONGODB_URL);
        console.log(
            `Mongoose default connection is open to ${ENV_VARIABLES.MONGODB_URL}`
        );
    } catch (err) {
        console.log(`Mongoose default connection has occurred ${err} error`);
        process.exit(1);
    }
}

export default dbConnect;