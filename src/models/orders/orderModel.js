import OrderSchema from "./orderSchema.js";

export const createNewOrder = (orderObj) => {
  return OrderSchema.create(orderObj);
};

export const getOrdersByUser = (userId) => {
  return OrderSchema.find({ userId })
    .populate("products.productId", "name price images")
    .sort({ createdAt: -1 });
};

export default OrderSchema;
