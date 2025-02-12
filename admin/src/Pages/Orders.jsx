import React, { useState, useEffect } from "react";
import axios from 'axios'
import { backendURL, currency } from "../App";
import { toast } from "react-toastify";
import assets from "../assets/assets";

// eslint-disable-next-line react/prop-types
const Orders = ({ token }) => {
  console.log('token from orders', token);


  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) {
      return null
    }
    try {
      const res = await axios.post(backendURL + '/api/order/list', {}, { headers: { token } })
      if (res.data.success) {
        setOrders(res.data.orders)
      } else {
        toast(res.data.message)
      }

    } catch (error) {

      console.log(error);

    }
  };


  const statusHandler = async (event,orderId)=>{
    try {
      const response = await axios.post(backendURL + '/api/order/status' , {orderId, status:event.target.value},  {headers:{token}})
      if (response.data.success) {
        await fetchOrders()
        
      }
    } catch (error) {
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (<div>
    <h3>Orders</h3>
    <div>
      {orders.map((order, index) => (
        <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 " key={index}>
          <img className="w-12" src={assets.parcel_icon} alt="" />
          <div>
            <div>
              {order.items.map((item, index) => {
                if (index === order.items.length) {
                  return <p className="py-0.5" key={index}>{item.name} X {item.quantity} <span>{item.size}</span></p>
                }
                else {
                  return <p className="py-0.5" key={index}>{item.name} X {item.quantity} <span>{item.size}</span>,</p>
                }
              })}
            </div>
            <p className="mt-3 mb-2 font-medium ">{order.address.firstName + "" + order.address.lastName}</p>
            <div>
              <p>{order.address.street + ","}</p>
              <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
            </div>
            <p>{order.address.phone}</p>

          </div>
          <div>
            <p className="text-sm sm:text--15px">Items : {order.items.length}</p>
            <p className="mt-3">Method : {order.paymentMethod}</p>
            <p className="">Payment : {order.payment ? 'Done': 'Pending'}</p>
            <p className="">Date : {new Date(order.date).toLocaleDateString()}</p>
          </div>
          <p>{currency}{order.amount}</p>
          <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipping">Shipping</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  </div>);
};

export default Orders;
