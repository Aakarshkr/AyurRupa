import { useEffect, useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify";
import { backendURL } from "../App";




// eslint-disable-next-line react/prop-types
const Login = ({token,setToken}) => {
const [email,setEmail]=useState('');
const [password,setPassword]=useState('')

useEffect(()=>{
  localStorage.setItem('token', token )
  },[token])

    const onSubmitHandler = async (e)=>{

        try {
            e.preventDefault()
            const res = await axios.post( backendURL + '/api/user/adminlogin', { email, password });
            console.log('response after login for admin',res.data);  // Log the response data
            if (res.data.success) {
                setToken(res.data.token);
                localStorage.setItem('token',res.data.token)
                
            }else{
                toast.error(res.data.message)
            }
            
            
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
            
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="trext-2xl font-bold mb-4 flex items-center justify-center ">Admin Panel</h1>
        <form onSubmit={onSubmitHandler} action="">
            <div className="mb-3 min-w-72 "><p className="text-sm font-medium text-gray-700 mb-2">email address</p>
            <input onChange={(e)=>{setEmail(e.target.value)}} value={email} className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"   type="email"  placeholder="your@email.com" required/></div>
            <div className="mb-3 min-w-72"><p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input onChange={(e)=>{setPassword(e.target.value)}}  value={password} className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"  type="password"  placeholder="pass" required/></div>
            <button className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
