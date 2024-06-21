import express, { Express, Request, Response } from "express";
import cors from "cors";
import HTTP_RESPONSE_MESSAGES from "../constants/httpResponseMessages";
import userRouter from "../routes/user";
import morgan from "morgan";
import CompileContractRouter from "../routes/compile-contract";
import ChatRouter from "../routes/chat";
import DataApiRouter from "../routes/data-api";

import TxnApiRouter from "../routes/txn-api";
import HardhatRoute from "../routes/hardhat";
import ContractTemplatesRouter from "../routes/contract-templates";
import ImageGeneratorRoute from "../routes/image-generator";
import ChatHistoryRouter from "../routes/chat-history";
import unstoppableRouter from "../routes/unstoppable";
import { Telegraf } from "telegraf";

export function createServer() {
  const bot = new Telegraf(process.env.TELEGRAM_API_KEY!);
  console.log('TELEGRAM KEY 👉🏻: ', process.env.TELEGRAM_API_KEY!);

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

  app.use("/api/v1/calldata/", TxnApiRouter);
  app.use("/api/v1/hardhat", HardhatRoute);
  app.use("/api/v1/contract-templates", ContractTemplatesRouter);
  app.use("/api/v1/image-generator", ImageGeneratorRoute);
  app.use("/api/v1/chat-history", ChatHistoryRouter);
  app.use("/api/v1/unstoppable", unstoppableRouter);
  /** TELEGRAM POC STARTS HERE */
  bot.start((ctx) => {
    console.log('TELEGRAM ctx👉🏻 : ',);
    ctx.reply('Welcome! Click the link below to open the app:-', {
      reply_markup: {
        keyboard: [[{ text: 'Web App', web_app: { url: 'https://my-telegram-bot-ruby.vercel.app' } }]]
      }
    });
    //ctx.reply('https://my-telegram-bot-ruby.vercel.app');
  });
  // Set the bot webhook
  app.use(bot.webhookCallback('/secret-path'));
  bot.telegram.setWebhook('https://api-core.web3agent.io/secret-path');
  /** TELEGRAM POC ENDS HERE */

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