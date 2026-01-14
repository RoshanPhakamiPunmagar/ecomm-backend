import {
  createNewOrder,
  getOrdersByUser,
} from "../models/orders/orderModel.js";
import Product from "../models/products/productSchema.js";

// Place order
export const placeOrder = async (req, res, next) => {
  try {
    const userId = req.userInfo._id;
    const { products } = req.body;

    if (!products || !products.length) {
      return res.status(400).json({
        status: "error",
        message: "No products in order",
      });
    }

    // Calculate total
    let totalAmount = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) throw new Error("Product not found");

      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product.name}`);
      }

      totalAmount += product.price * item.quantity;

      // reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await createNewOrder({
      userId,
      products,
      totalAmount,
      status: "pending",
    });

    res.json({
      status: "success",
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// Get my orders
export const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.userInfo._id;

    const orders = await getOrdersByUser(userId);

    res.json({
      status: "success",
      orders,
    });
  } catch (error) {
    next(error);
  }
};
