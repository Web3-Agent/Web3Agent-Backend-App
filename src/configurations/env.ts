import * as dotenv from "dotenv";
dotenv.config();

export const ENV_VARIABLES = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/task-management",
    MONGODB_OPTIONS: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    SERVER: process.env.SERVER || `http://localhost:3020`,
    JWT_SECRET: process.env.JWT_SECRET || "ManVsWildIsAwsomeShow",
}