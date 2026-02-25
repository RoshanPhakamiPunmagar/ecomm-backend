import mongoose from "mongoose";
import reviewSchema from "./reviewSchema.js";

const Review = mongoose.model("Review", reviewSchema);

// Create review
export const createNewReview = (revObj) => {
  return Review.create(revObj);
};

// Get reviews by filter
export const getReviews = (filter) => {
  return Review.find(filter).populate("userId", "name").sort({ createdAt: -1 });
};

export default Review;
