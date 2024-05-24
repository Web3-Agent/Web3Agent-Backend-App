import { Router, Response } from "express";
import controllers from "../controllers/compile-contract";
import validator from "../middlewares/requestValidators/compile-contract";
import validateAccess from "../middlewares/validateToken";
import { CustomRequest } from "../types/customRequest";
import { getTransactionDetailsByHash } from "../controllers/transaction-details";
import { getBlockDetailsByNumber } from "../controllers/block-details";
import { getGasPrice } from "../controllers/gas-price";
import { getTokenBalanceForAddress } from "../controllers/token-balance";
import { getLatestTokenList } from "../controllers/tokenList";

const DataApiRouter: Router = Router();

const ACTIONS = {
    BLOCK_DETAILS_BY_BLOCK_NUMBER: 'BLOCK_DETAILS_BY_BLOCK_NUMBER',
    TRANSACTION_DETAILS_BY_HASH: 'TRANSACTION_DETAILS_BY_HASH',
    GAS_PRICE: 'GAS_PRICE',
    TOKEN_BALANCE_FOR_ADDRESS: 'TOKEN_BALANCE_FOR_ADDRESS',
    LATEST_TOKEN_LIST: 'LATEST_TOKEN_LIST',
}

const navigateController = (request: CustomRequest, response: Response) => {
    try {
        const { body } = request;
        const { action } = body;
        switch (action) {
            case ACTIONS.BLOCK_DETAILS_BY_BLOCK_NUMBER:
                return getBlockDetailsByNumber(request, response);
            case ACTIONS.TRANSACTION_DETAILS_BY_HASH:
                return getTransactionDetailsByHash(request, response);
            case ACTIONS.GAS_PRICE:
                return getGasPrice(request, response);
            case ACTIONS.TOKEN_BALANCE_FOR_ADDRESS:
                return getTokenBalanceForAddress(request, response);
            case ACTIONS.LATEST_TOKEN_LIST:
                return getLatestTokenList(request, response);
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