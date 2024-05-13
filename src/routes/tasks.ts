import { Router } from "express";
import controllers from "../controllers/tasks";
import validator from "../middlewares/requestValidators/tasks";
import { validateToken } from "../middlewares/validateToken";
const TaskRouter: Router = Router();

TaskRouter.get("/", validateToken, controllers.getTasks);
TaskRouter.get(
  "/:taskId",
  validateToken,
  validator.validateParams,
  controllers.getTask
);
TaskRouter.post(
  "/",
  validateToken,
  validator.addTaskValidation,
  controllers.addTask
);
TaskRouter.patch(
  "/:taskId/status/:status",
  validateToken,
  validator.validateParams,
  controllers.updateTaskStatus
);
TaskRouter.put(
  "/:taskId",
  validateToken,
  validator.validateParams,
  validator.updateTaskValidation,
  controllers.updateTask
);
TaskRouter.delete(
  "/:taskId",
  validateToken,
  validator.validateParams,
  controllers.deleteTask
);

export default TaskRouter;