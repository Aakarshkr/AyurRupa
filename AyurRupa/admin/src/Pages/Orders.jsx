import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../App";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        `${backendURL}/api/order/list`,
        {},
        { headers: { token } }
      );
      console.log(res.data.orders);
      setOrders(res.data.orders);
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
      console.error(err);
    }
  };

  useEffect(() => {
    if ( !token  ||  token === undefined ) navigate('/login') ;
    fetchOrders();
  }, [token]);

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Please log in to view your orders.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {error && (
        <div className="bg-red-200 text-red-800 p-4 rounded mb-4">
          {error}
        </div>
      )}
     <h3>Orders Page</h3>
     <div>
      {
        orders.map((order,index)=>(
          <div key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>

            
            <div>
              {
                order.items.map((item,index)=>{
if (index === order.items.length-1) {
return <p key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
  
}else{
  return <p key={index}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>

}
                })
              }
            </div>
            <p>{order.address.firstName + "  " + order.address.lastName}</p>
            <div>
              <p>{order.address.street + ","}</p>
              <p>{order.address.city + ", "+ order.address.state + ", " +order.address.country + ", " +order.address.zipcode}</p>

            </div>
            <p>{order.address.phone}</p>
          </div>
          </div>
        ))
      }
     </div>
    </div>
  );
};

export default Orders;
 