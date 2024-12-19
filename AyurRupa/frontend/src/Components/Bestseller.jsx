import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './title';
import ProductItem from './ProductItem';

const Bestseller = () => {
    const {products}=useContext(ShopContext);
    const[bestSeller,setBestSeller]= useState([]);

    useEffect(()=>{
        const bestProducts = products.filter((item)=>(item.bestSeller));
        setBestSeller(bestProducts.slice(0,6))
    },[products])

    
  return (
    <div className='my-10'>
      <div className='text-center text-3xl p-8'>
<Title text1={'Best'} text2={'Sellers'}/>
<p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
Our BestSelling Products</p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
           bestSeller.map((item, index) => (
            <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
            />
            
            
        ))
        
        
        
        }
      </div>
    </div>
  )
}

export default Bestseller
