import React, { useContext, useState } from 'react';
import Title from '../Components/title';
import CartTotal from '../Components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const { navigate , backendUrl, token, cartItems, getCartAmount, delivery_fee, products , setCartItems} =  useContext(ShopContext);
const[method, setMethod]= useState('razorpay')
const[formData,setFormData]=useState({
  firstName:'',
  lastName:'',
  email:'',
  street:'',
  city:'',
  state:'',
  zipcode:'',
  country:'',
  phone:''
})

const onchangeHandler = (e)=>{
const name=e.target.name;
const value=e.target.value;

setFormData(data => ({...data,[name]:value}))

console.log(formData);


  
}

const onsubmitHandler = async (e)=>{
e.preventDefault()

try {
  let orderItems = [];
  for(const items in cartItems ){
    for(const item in cartItems[items]){
      if (cartItems[items][item]>0) {
        const itemsInfo= structuredClone(products.find(product =>product._id === items))
        if (itemsInfo) {
          itemsInfo.size= item
          itemsInfo.quantity= cartItems[items][item];
          orderItems.push(itemsInfo)
        }
      }
    }
  }
  let orderData={
    address:formData,
    items:orderItems,
    amount:getCartAmount()+delivery_fee,

  }
  switch (method) {
    // For cod
    case 'cod':
      try {
        const res = await axios.post(backendUrl + '/api/order/place', orderData, {
          headers: { token: token },
        });
        if (res.data.success) {
          setCartItems({})
          navigate('/orders')
        }else{
          toast .error(res.data.message)
        }
        
      } catch (error) {
        console.error('Error placing order:', error);
      }
      break;
  

      
    default:
      console.log('Unknown payment method:', method);
      break;
  }
  
  

} catch (error) {
  console.log(error);
  toast.error(error.message)
  
}


}

  return (
    <form onSubmit={onsubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1='Delivery ' text2='Information' />
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex gap-3'>
            <input required onChange={onchangeHandler} name='firstName'   value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name' />
            <input required onChange={onchangeHandler} name='lastName'   value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name' />
          </div>
          <input required onChange={onchangeHandler} name='email'   value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email address' />
          <input required onChange={onchangeHandler} name='street'   value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />
          <div className='flex gap-3'>
            <input required onChange={onchangeHandler} name='city'   value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
            <input required onChange={onchangeHandler} name='state'   value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
          </div>
          <div className='flex gap-3'>
            <input required onChange={onchangeHandler} name='zipcode'   value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Zip code' />
            <input required onChange={onchangeHandler} name='country'   value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
          </div>
          <input required onChange={onchangeHandler} name='phone'   value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone' />
        </div>
      </div>

      {/* right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-0'>
          <CartTotal/>

        </div>

        <div  className='mt-12'>
          <Title text1={'Payment'} text2={'Method'}/>
          {/*  payment methoid */}
          <div className='flex flex-col gap-4 lg:flex-row'>
            <div onClick={()=>setMethod('stripe')}  className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={` min-w-3.5 h-3.5 border rounded-full ${method==='stripe'? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={` min-w-3.5 h-3.5 border rounded-full ${method==='razorpay'? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={` min-w-3.5 h-3.5 border rounded-full ${method==='cod'? 'bg-green-400' : ''}`}></p>
              <h1>Cash On Delivery</h1>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button  type='submit' className='bg-black text-white px-16 py-3 text-sm'>Place Order</button>
          </div>

        </div>

      </div>
    </form>
  );
};

export default PlaceOrder;
