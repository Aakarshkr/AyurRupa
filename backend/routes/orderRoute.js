import express from 'express'
import  {allOrders,userOrders,placeOrder,stripePlaceOrder,razorPayPlaceOrder,updateStatus} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)


//Payment feature
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,stripePlaceOrder)
orderRouter.post('/razorpay',authUser,razorPayPlaceOrder)


//user featurte
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter;