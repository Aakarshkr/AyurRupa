import orderModel from "../models/orderModel.js";   
import userModel from "../models/userModel.js";
   
   //placing by cod

   const placeOrder =async (req,res)=>{
    try {
        console.log(req.body);
        
        const {userId,items,amount,address}= req.body;
        

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
        console.log('userid for place order',userId);
        

const newOrder = new orderModel(orderData);

await newOrder.save();
await userModel.findByIdAndUpdate(userId,{cartData: { }})
res.json({success:true, message:'Order Placed'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

   }


   //stripe order placed
   const stripePlaceOrder =async (req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        
        
    }

   }

//razorpay order placed
   const razorPayPlaceOrder =async (req,res)=>{

   }


   //all orders data for admin panel 

   const allOrders = async (req, res) => {
    console.log('Reached all orders');

    try {
        const orders = await orderModel.find({});
        console.log('Orders:', orders);

        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

   

   //user order data for front end
   
   const userOrders =async (req,res)=>{
try {
    // console.log(req);
    
     
const {userId} = req.body;
const orders = await orderModel.find({userId});
res.json({success:true,orders});

} catch (error) {
    res.json({success:false,message:error.message})
}
   }

   //updateOrder status from admin panel
   
   const updateStatus =async (req,res)=>{

   }


   export {allOrders,userOrders,placeOrder,stripePlaceOrder,razorPayPlaceOrder,updateStatus}