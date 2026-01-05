import productSchema from "./productSchema.js";

import "../categories/categorySchema.js"; // Import Category schema

export const createNewProduct = (prodObj) => {
  return productSchema(prodObj).save();
};

export const getProductById = (id) => {
  return productSchema.findById(id).populate("category", "name");
};

export const updateProduct = async (filter, obj) => {
  return await productSchema.findOneAndUpdate(filter, obj);
};

export const getProducts = ({ filter, skip, limit, sort }) => {
  return productSchema
    .find(filter)
    .populate("category", "name")
    .skip(skip)
    .limit(limit)
    .sort(sort);
};

export const countProducts = (filter) => {
  return productSchema.countDocuments(filter);
};
