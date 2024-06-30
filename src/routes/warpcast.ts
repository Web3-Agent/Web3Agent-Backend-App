import { Router, Response } from "express";
import { CustomRequest } from "../types/customRequest";
import { getUsersByUsername } from "../controllers/warpcast/usernames";
import { getUsersByFID } from "../controllers/warpcast/usersByFID";
import { getFollowersByFID } from "../controllers/warpcast/followersByFID";

const WarpcastRouter: Router = Router();

const ACTIONS = {
    SEARCH_FOR_USERNAMES: 'SEARCH_FOR_USERNAMES',
    FETCH_USER_DETAILS_BY_GIVEN_FID: 'FETCH_USER_DETAILS_BY_GIVEN_FID',
    FOLLOWERS_BY_FID: 'FOLLOWERS_BY_FID'
}

const navigateController = (request: CustomRequest, response: Response) => {
    try {
        const { body } = request;
        const { action } = body;
        switch (action) {
            case ACTIONS.SEARCH_FOR_USERNAMES:
                return getUsersByUsername(request, response);
            case ACTIONS.FETCH_USER_DETAILS_BY_GIVEN_FID:
                return getUsersByFID(request, response);
            case ACTIONS.FOLLOWERS_BY_FID:
                return getFollowersByFID(request, response);
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

WarpcastRouter.post(
    "/",
    navigateController
);


export default WarpcastRouter;