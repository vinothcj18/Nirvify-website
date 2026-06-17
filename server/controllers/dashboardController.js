const Product =
  require("../models/productModel");

const Order =
  require("../models/orderModel");

const getDashboardStats =
  async (req, res) => {

    try {

      const totalProducts =
        await Product.countDocuments();

      const totalOrders =
        await Order.countDocuments();

      const orders =
        await Order.find();

      const totalRevenue =
        orders.reduce(
          (sum, order) =>
            sum + order.totalAmount,
          0
        );

      const pendingOrders =
        await Order.countDocuments({
          orderStatus:
            "Pending",
        });

      res.status(200).json({
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingOrders,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

module.exports = {
  getDashboardStats,
};