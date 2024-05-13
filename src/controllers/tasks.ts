import { Request, Response } from "express";

import {
  getPaginationQueryData,
  getPaginationInfo,
} from "../helpers/pagination";
import {
  fetch,
  countDocuments,
  fetchById,
  create,
  update,
  deleteById,
} from "../providers/tasks";
import { CustomRequest } from "../types/customRequest";
import httpResponseMessages from "../constants/httpResponseMessages";
import { transformTaskUpdatePayload } from "../helpers/tasks";
import { TASKS_STATUS } from "../constants/tasks";

export const getTasks = async (request: CustomRequest, response: Response) => {
  try {
    const query: any = { user: request?.user?._id, isActive: true };
    const { status } = request.query;
    if (status) {
      query['status'] = status;
    }
    const { skip, limit, currentPage } = getPaginationQueryData(request.query);
    const [data, total] = await Promise.all([
      fetch(query, skip, limit),
      countDocuments(query),
    ]);
    const pagination = getPaginationInfo(total, limit, currentPage);

    return response.status(200).json({
      success: true,
      message: httpResponseMessages.TASK_FETCH_SUCCESS,
      pagination,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

export const getTask = async (request: CustomRequest, response: Response) => {
  try {

    const { taskId } = request.params;
    const optionalQuery = { user: request?.user?._id, isActive: true };
    const data = await fetchById(taskId, optionalQuery);
    return response.status(200).json({
      success: true,
      message: httpResponseMessages.TASK_FETCH_SUCCESS,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

export const addTask = async (request: CustomRequest, response: Response) => {
  try {
    let requestPayload = request.body;
    requestPayload = {
      ...requestPayload,
      user: request?.user?._id,
    };
    const data = await create(requestPayload);
    return response.status(200).json({
      success: true,
      message: httpResponseMessages.TASK_CREATE_SUCCESS,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

export const updateTask = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    let requestPayload = request.body;
    requestPayload = transformTaskUpdatePayload(requestPayload);
    const { taskId } = request.params;
    const query = { _id: taskId, user: request?.user?._id };
    const data = await update(query, requestPayload);
    return response.status(200).json({
      success: true,
      message: httpResponseMessages.TASK_UPDATE_SUCCESS,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

export const deleteTask = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    const { taskId } = request.params;
    const optionalQuery = { user: request?.user?._id };
    const data = await deleteById(taskId, optionalQuery);
    return response.status(200).json({
      success: true,
      message: httpResponseMessages.TASK_DELETED_SUCCESS,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};
export const updateTaskStatus = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    let { taskId, status } = request.params;
    if (!status) {
      return response.status(200).json({
        success: true,
        message: httpResponseMessages.STATUS_MISSING,
        data: null,
      });
    }

    const query = { _id: taskId, user: request?.user?._id };
    status = status?.toUpperCase();
    const payload = {
      status
    };


    const data = await update(query, payload);
    return response.status(200).json({
      success: true,
      message: httpResponseMessages.TASK_UPDATE_SUCCESS,
      data,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

export default {
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};