const Order = require("../models/orderModel");

const createOrder = async (req, res) => {

  try {

    const {
      customerName,
      email,
      phone,
      address,
      products,
      totalAmount,
    } = req.body;

    const order = await Order.create({

      customerName,
      email,
      phone,
      address,

      products: JSON.parse(products),

      totalAmount,

      paymentScreenshot:
        req.file
          ? req.file.filename
          : "",

    });

    
    res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
const updateOrderStatus = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const { status } = req.body;

    const order =
      await Order.findByIdAndUpdate(
        id,
        {
          orderStatus: status,
        },
        {
          new: true,
        }
      );

    res.status(200).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
const getUserOrders = async (
  req,
  res
) => {

  try {

    const { email } = req.params;

    const orders =
      await Order.find({
        email,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json(
      orders
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getUserOrders,
};