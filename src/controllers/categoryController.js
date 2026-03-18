import { getCategories } from "../models/categories/categoryModel.js";

export const fetchCategories = async (req, res, next) => {
  try {
    const categories = await getCategories();

    return res.json({
      status: "success",
      categories,
    });
  } catch (error) {
    next(error);
  }
};
