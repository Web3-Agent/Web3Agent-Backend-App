import TaskModel from "../models/tasks";
import { ALLOW_USER_FIELDS } from "../projection/users";

export const create = async (payload: any = {}) => {
  try {
    const result = await TaskModel.create(payload);
    return result;
  } catch (error) {
    throw error;
  }
};

export const update = async (query: any = {}, payload: any = {}) => {
  try {
    const result = await TaskModel.findOneAndUpdate(query, payload, {
      new: true,
    }).lean();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetch = async (
  query: any,
  skip: number = 0,
  limit: number = 0,
  sort: Record<string, any> = { updatedAt: -1 }
) => {
  try {
    const result = await TaskModel.find(query)
      .populate({
        path: "user",
        select: ALLOW_USER_FIELDS.join(" ") || "",
      }).sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchById = async (_id: string, optional: any = {}) => {
  try {
    const query = { _id, ...optional };
    const result = await TaskModel.findOne(query)
      .populate({
        path: "user",
        select: ALLOW_USER_FIELDS.join(" ") || "",
      })
      .lean();
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteById = async (_id: string, optional: any = {}) => {
  try {
    const query = { _id, ...optional };
    const result = await TaskModel.findOneAndUpdate(
      query,
      {
        isActive: false,
      },
      { new: true }
    ).lean();
    return result;
  } catch (error) {
    throw error;
  }
};

export const countDocuments = async (query: any = {}) => {
  try {
    const result = await TaskModel.countDocuments(query).lean();
    return result;
  } catch (error) {
    throw error;
  }
};