import userModel from "../models/userModel.js";


//add product to user cart 
const addToCart = async (req, res) => {
    try {
      const { userId, itemId, size } = req.body;
  
      // Find the user data by userId
      const userData = await userModel.findById(userId);
  
      // Initialize cartData if it doesn't exist
      let cartData = userData.cartData || {};
  
      // Check if the item exists in the cart
      if (cartData[itemId]) {
        // Check if the size exists for the item
        if (cartData[itemId][size]) {
          // Increment quantity
          cartData[itemId][size] += 1;
        } else {
          // Initialize size with quantity 1 if it doesn't exist
          cartData[itemId][size] = 1;
        }
      } else {
        // Initialize item and size in cart if item doesn't exist
        cartData[itemId] = { [size]: 1 };
      }
  
      // Update the user's cart data in the database
      await userModel.findByIdAndUpdate(userId, { cartData });
  
      // Respond with success
      res.json({ success: true, message: 'Added to cart' });
  
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  


///update product 
const updateCart = async (req, res) => {
    try {
      console.log('ethuoooo ivde');
      const { userId, itemId, size, quantity } = req.body;
  
      // Find user data by userId
      const userData = await userModel.findById(userId);
  
      // Initialize cartData if it doesn't exist
      let cartData = userData.cartData || {};
  
      // Check if the item exists in the cart
      if (cartData[itemId]) {
        // Update the quantity of the specific size
        cartData[itemId][size] = quantity;
      } else {
        return res.json({ success: false, message: 'Item not found in cart' });
      }
  
      // Update the user's cart data in the database
      await userModel.findByIdAndUpdate(userId, { cartData });
  
      // Respond with success
      res.json({ success: true, message: 'Cart data updated' });
  
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  


//get user cartt data
const getUserCart = async (req, res) => {
  
  
    try {

      const { userId } = req.body;
  
      // Find the user data by userId
      const userData = await userModel.findById(userId);
      console.log(userData);
      
  
      // Initialize cartData if it doesn't exist
      let cartData = userData.cartData || {};
  
      // Respond with cart data
      res.json({
        success: true,
        cartData: cartData,
      });
  
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  


export {addToCart,updateCart,getUserCart};