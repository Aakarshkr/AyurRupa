import { createContext,  useEffect,  useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log(backendUrl);


const ShopContextProvider = (props) => {
  const currency = "Rs ";
  const delivery_fee = 50.00;
  

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products,setProducts] = useState([]);
  const [token ,setToken]= useState('')
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if(!size){
        toast.error('Select Product Size');
        return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      console.log(token);
      
      try {
        await axios.post(backendUrl + '/api/cart/add', 
          { itemId, size },
          {headers:{token : token}}  
        )
      } catch (error) {
        console.log(error);
      toast.error(error.message)
      }
    }
  };

  const updateQuantity = async (itemId,size,quantity)=>{
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', {itemId,size,quantity}, {headers:{token : token}} )
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
    }
  }


  const getCartCount = ()=>{
    let totalCount = 0;
    for(const items in cartItems){
        for( const item in cartItems[items]){
            try {
if(cartItems[items][item]> 0){
    totalCount += cartItems[items][item];

}
            }catch (error){
              toast.error(error)

            }
        }
    }
    return totalCount;
}

const getCartAmount = () => {
    let totalAmount = 0;
    for( const items in cartItems){
        let itemInfo = products.find((product)=> product._id ===items);
for (const item in cartItems[items]){
    try{
        if(cartItems[items][item]>0){
            totalAmount += itemInfo.price * cartItems[items][item]
        }
    } catch(error){
toast.error(error)
    }
}
    }
    return totalAmount;
}

const getProductsData =  async ()=>{
  try {
    const res = await axios.get(backendUrl + '/api/product/list');

    if (res.data.success) {
      
      
      setProducts(res.data.products)
    }else{
      toast.error(res.data.message)
    }
    
  } catch (error) {
    console.log(error);
    toast.error(error.message)
    
  }
}

const getUserCart = async (token) => {
  try {
    const res = await axios.post(
      backendUrl + '/api/cart/get', 
      {}, 
      { headers: { token: token } }
    );
    console.log('Cart API Response:', res); // Log entire response
    if (res.data.success) {
      console.log('Cart Data:', res.data.cartData); // Log cartData specifically
      setCartItems(res.data.cartData);
    } else {
      console.error('Error Message:', res.data.message);
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error('API Error:', error);
    toast.error("error on get usercart" + error.message);
  }
};


useEffect(()=>{
getProductsData()
},[])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    setCartItems,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("token:" + storedToken);
    
    if (!token && storedToken) {
      setToken(storedToken);
      getUserCart(storedToken); // Use the stored token directly to fetch cart
    }
  }, [token]);
  
    


  return (
    // eslint-disable-next-line react/prop-types
    <ShopContext.Provider value={value} >{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
