import express, { Express, Request, Response } from "express";
import cors from "cors";
import HTTP_RESPONSE_MESSAGES from "../constants/httpResponseMessages";
import authenticationRouter from "../routes/authentications";
import TaskRouter from "../routes/tasks";
import morgan from "morgan";
import CompileContractRouter from "../routes/compile-contract";

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
  app.use("/api/v1/task/", TaskRouter);
  app.use("/api/v1/authentication/", authenticationRouter);
  app.use("/api/v1/compile-contract/", CompileContractRouter);

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