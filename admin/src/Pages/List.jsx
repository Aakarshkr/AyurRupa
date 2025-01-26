import { useEffect, useState } from "react";
import axios from "axios";
import { backendURL, currency } from "../App";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(backendURL + "/api/product/list", {
        headers: { token },
      });
      console.log("API Response:", res.data); // Log the response data
      if (Array.isArray(res.data)) {
        setList(res.data); // Ensure we are setting an array
      } else if (res.data && Array.isArray(res.data.products)) {
        // If the products are nested inside another object
        setList(res.data.products);
      } else {
        console.error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]);

  const removeProduct = async (id)=>{
    try {
      const res = await axios.post( backendURL + '/api/product/remove', {id},{headers: {token}});
      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
        fetchList();
      }else{
        toast.error(res.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  return (
    <div>
      <p className="mb-2">All Products</p>
      <div className="flex flex-col gap-2">
        {/* Table title list */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* PRODUCT LIST */}
        {Array.isArray(list) && list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border"
            >
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-16 h-16 object-cover"
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency + item.price}</p>
              <button onClick={()=>removeProduct(item._id)} className="text-red-500 hover:text-red-700" >X</button>
            </div>
          ))
        ) : (
          <p>
            No products available
          </p>    
        )}
      </div>
    </div>
  );
};

export default List;
