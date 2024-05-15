import { Router, Response } from "express";
import controllers from "../controllers/compile-contract";
import validator from "../middlewares/requestValidators/compile-contract";
import validateAccess from "../middlewares/validateToken";
import { CustomRequest } from "../types/customRequest";
import { getBlockDetailsByNumber } from "../controllers/block-details";
const DataApiRouter: Router = Router();
const ACTIONS = {
    BLOCK_DETAILS_BY_BLOCK_NUMBER: 'BLOCK_DETAILS_BY_BLOCK_NUMBER'
}
const navigateController = (request: CustomRequest, response: Response) => {
    try {
        const { body } = request;
        const { action } = body;
        switch (action) {
            case ACTIONS.BLOCK_DETAILS_BY_BLOCK_NUMBER:
                return getBlockDetailsByNumber(request, response)
            default:
                return response.status(400).json({
                    success: false,
                    message: 'UNKNOWN_REQUEST'
                })
        }
    } catch (error) {
        return response.status(400).json({
            success: false,
            message: 'UNABLE_TO_PROCESS_REQUEST'
        })
    }
}

DataApiRouter.post(
    "/",
    // validateAccess,
    navigateController
    // validator.compileContractValidation,
    // controllers.compileContract
);


export default DataApiRouter;