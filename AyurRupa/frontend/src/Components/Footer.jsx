import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
        <div className=''>
            <img className='mb-5 w-32 ' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>asjkdhashdadhasldaskdjh asdsa dhfs ohapdua aihas  a</p>
        </div>
<div>
    <p className='text-xl font-medium mb-5'>Company</p>
    <ul className='flex flex-col gap-1 text-gray-600'>
        <li>Home</li>
        <li>About Us</li>
        <li>Delivery </li>
        <li>Privacy Policy</li>
    </ul>
</div>
<div >
    <p className='text-xl font-medium mb-5'>Get In touch</p>
    <ul className='flex flex-col gap-1 text-gray-600'>
        <li>+91 7306009940</li>
        <li>akarshkr.contact@gmail.com</li>
       
    </ul>
</div>



      </div>
      <div>
    <hr />
    <p className='py-5 text-sm text-center '>Copyright 2024 @AyurRupa All rights reserved </p>
</div>
    </div>
  )
}

export default Footer
