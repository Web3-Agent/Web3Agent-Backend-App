export const TASKS_WHITELIST_KEYS_FOR_UPDATE = [];
export const TASKS_BLACKLIST_KEYS_FOR_UPDATE = [
  "_id",
  "__v",
  "status",
  "isActive",
  "author",
  "completionDate",
];
export const TASKS_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
};
export default {
  TASKS_WHITELIST_KEYS_FOR_UPDATE,
  TASKS_BLACKLIST_KEYS_FOR_UPDATE,
  TASKS_STATUS,
};