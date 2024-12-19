
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Collection from './Pages/Collection'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Product from './Pages/Product'
import Cart from './Pages/Cart'

import PlaceOrder from './Pages/PlaceOrder'
import Orders from './Pages/Orders'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer'
import SearchBar from './Components/searchBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login/Login'


const App = () => {
  return (
    <div className='px-4 sm:px-[5w] md:px-[7vw] lg:px-[pvw]'>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/collections' element={<Collection/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/product/:ProductId' element={<Product/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<Login/>}/>
     
      <Route path='/place-order' element={<PlaceOrder/>}/>
      <Route path='/orders' element={<Orders/>}/>

     </Routes>
     <Footer/>
    </div>
  )
}

export default App
