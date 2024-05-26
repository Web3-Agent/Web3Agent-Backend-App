import express, { Express, Request, Response } from "express";
import cors from "cors";
import HTTP_RESPONSE_MESSAGES from "../constants/httpResponseMessages";
import userRouter from "../routes/user";
import morgan from "morgan";
import CompileContractRouter from "../routes/compile-contract";
import ChatRouter from "../routes/chat";
import DataApiRouter from "../routes/data-api";
import HardhatRoute from "../routes/hardhat";

export function createServer() {
  const app: Express = express();
  let corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(morgan("dev"));

  // Route endpoints
  app.use("/api/v1/user/", userRouter);
  app.use("/api/v1/compile-contract/", CompileContractRouter);
  app.use("/api/v1/chat/", ChatRouter);
  app.use("/api/v1/data-api/", DataApiRouter);
  app.use("/api/v1/hardhat", HardhatRoute)

  app.get("/", (request: Request, response: Response) => {
    return response.status(200).json({
      success: true,
      message: HTTP_RESPONSE_MESSAGES.SERVER_UP_AND_RUNNING,
      data: new Date(),
    });
  });
  return app;
}

export default createServer;