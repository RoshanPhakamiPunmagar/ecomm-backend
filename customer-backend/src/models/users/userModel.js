import userSchema from "./userSchema.js";

export const createNewUser = (userObj) => {
  return userSchema(userObj).save();
};

export const getUserByEmail = (email) => {
  return userSchema.findOne({ email });
};

export const updateUser = async (filter, obj) => {
  return await userSchema.findOneAndUpdate(filter, obj).select("-password");
};

export const getUsers = async (filter) => {
  return await userSchema.find(filter).select("-password");
};
