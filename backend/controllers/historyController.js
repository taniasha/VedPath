const { Order } = require("../models/orderModels");

const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({
      userId,
      paymentStatus: "paid"
    }).sort({ date: -1 });
     console.log("Request body:", req.body);

    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching order history", error: err.message });
  }
};

module.exports = { getOrderHistory };
