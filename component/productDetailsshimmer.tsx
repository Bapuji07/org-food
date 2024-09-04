import React from 'react'

const ProductDetailShimmer = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 w-[90%] mt-20 lg:w-[85%] 2xl:w-[75%] mx-auto'>
        <div className='shimmer rounded-md bg-gray-200 border w-full h-[320px] md:h-[450px] '></div>
        <div className='shimmer rounded-md  bg-gray-200 border w-full h-[320px] md:h-[450px]'></div>
    </div>
  )
}

export default ProductDetailShimmer