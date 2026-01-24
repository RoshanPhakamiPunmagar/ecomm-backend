import { createNewReview, getReviews } from "../models/reviews/reviewModel.js";
import Order from "../models/orders/orderModel.js";

export const submitReview = async (req, res, next) => {
  try {
    const userId = req.userInfo._id;
    const { productId, rating, comment } = req.body;

    if (!productId || !rating) {
      return res.status(400).json({
        status: "error",
        message: "productId and rating are required",
      });
    }

    const hasBought = await Order.findOne({
      userId,
      "products.productId": productId,
    });

    if (!hasBought) {
      return res.status(403).json({
        status: "error",
        message: "You can only review products you purchased",
      });
    }

    const review = await createNewReview({
      productId,
      userId,
      rating,
      comment,
      approved: false,
    });

    res.json({
      status: "success",
      message: "Review submitted and awaiting approval",
      review,
    });
  } catch (error) {
    // Duplicate review
    if (error.code === 11000) {
      return res.status(400).json({
        status: "error",
        message: "You have already reviewed this product",
      });
    }
    next(error);
  }
};

export const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const reviews = await getReviews({
      productId,
      approved: true,
    });

    res.json({
      status: "success",
      reviews,
    });
  } catch (error) {
    next(error);
  }
};
