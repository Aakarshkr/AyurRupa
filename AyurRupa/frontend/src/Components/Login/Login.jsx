import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../../Context/ShopContext";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setcurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");




  useEffect(()=>{
    if(token) {
      navigate('/')
    }
  },[token]);


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState ==='SignUp') {
        const res = await axios.post(backendUrl + '/api/user/register',{name , email , password});
        console.log(res.data);
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem('token',res.data.token);
          toast.success(res.data.message);
          setcurrentState('Login')
      
        }else{
          toast.error(res.data.message)
        }
        
     
        
      }else{
        const res = await axios.post(backendUrl + '/api/user/login', {email , password});
        console.log(res.data);
        if ((res.data.success)) {
          setToken(res.data.token);
          localStorage.setItem('token',res.data.token)
          toast.success(res.data.message);
          navigate('/')
        }else{
          toast.error(res.data.message)
        }
        
        
        
      }
      
    } catch (error) {
      toast.error(error.message)
      console.log(error);
      
    }

  };


  
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10 ">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5pxw-8] bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          className="w-full px-4  py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        className="w-full px-4  py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        type="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        className="w-full px-4  py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === "Login" ? (
          ""
        ) : (
          <p className="cursor-pointer">Forgot ur password</p>
        )}
        {currentState === "Login" ? (
          <p
            onClick={() => setcurrentState("SignUp")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setcurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Login" : "Sign In"}
      </button>
    </form>
  );
};

export default Login;
