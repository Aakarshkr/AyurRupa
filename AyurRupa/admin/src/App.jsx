import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";
import Add from "./Pages/Add";
import List from "./Pages/List";
import Orders from "./Pages/Orders";
import { useState } from "react";
import Login from "./Components/Login";
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
export const backendURL= import.meta.env.VITE_BACKEND_URL;
export const currency = 'Rs:'
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):'');
  console.log(token);

  


  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer/>
      {token === "" ? (
        <Login path='/login' setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken}/>

          <hr />
          <div className="flex w-full ">
            <SideBar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] m-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/orders" element={<Orders token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
