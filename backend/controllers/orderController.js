import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing by cod

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//stripe order placed
const stripePlaceOrder = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

//razorpay order placed
const razorPayPlaceOrder = async (req, res) => {};

//all orders data for admin panel

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
   
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//user order data for front end

const userOrders = async (req, res) => {
  try {
    console.log(req);

    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//updateOrder status from admin panel

const updateStatus = async (req, res) => {
  try {
    const {orderId ,status} = req.body 
    await orderModel.findByIdAndUpdate(orderId,{status})
    res.json({success:true , message:"Status Upgraded"})
  } catch (error) {
    res.json({ success: false, message: error.message });
    
  }
};

export {
  allOrders,
  userOrders,
  placeOrder,
  stripePlaceOrder,
  razorPayPlaceOrder,
  updateStatus,
};
