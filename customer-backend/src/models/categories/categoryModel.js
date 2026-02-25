import CategorySchema from "./categorySchema.js";

export const createNewCategory = (catObj) => {
  return CategorySchema(catObj).save();
};

export const getCategoryByName = (name) => {
  return CategorySchema.findOne({ name });
};

export const updateCategory = async (filter, obj) => {
  return await CategorySchema.findOneAndUpdate(filter, obj);
};

//get all categories
export const getCategories = async (filter) => {
  return await CategorySchema.find(filter);
};
