import React, { useState, useEffect } from "react";
import axios from 'axios'
import { backendURL } from "../App";

// eslint-disable-next-line react/prop-types
const Orders = ({ token }) => {
  console.log('token from orders', token );
  
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) {
      return null
    }
    try {
      const res = await axios.post(backendURL + '/api/order/list' , { } , { headers:{token}})
      console.log(res.orders );
      
    } catch (error) {
      
      console.log(error);
      
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return <div></div>;
};

export default Orders;
