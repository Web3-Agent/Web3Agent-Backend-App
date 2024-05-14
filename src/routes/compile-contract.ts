import { Router } from "express";
import controllers from "../controllers/compile-contract";
import validator from "../middlewares/requestValidators/compile-contract";
import { validateToken } from "../middlewares/validateToken";
const CompileContractRouter: Router = Router();

CompileContractRouter.post(
    "/",
    // validateToken,
    validator.compileContractValidation,
    controllers.compileContract
);


export default CompileContractRouter;