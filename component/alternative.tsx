import { useEffect, useState } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Alternative = ({products}:any) => {
  return (
    <div className="flex flex-col text-black mt-7 w-[90%] lg:w-[85%] 2xl:w-[75%] mx-auto ">
      <h1 className="text-lg md:text-xl  text-green-600 font-extrabold my-2">
Alternative
      </h1>
      <div className="similar-content grid xl:grid-cols-5 gap-2 md:gap-4">
      {products?.alternatives?.map((product: any) => {
              const imageUrl = product.images[0]?.url || 'https://ofc-ecom-web.exceloid.in/_nuxt/img/no-image.327c892.jpg';
              return (
                <div key={product.id} className="relative h-full w-full">
                  <div
                    className="border border-gray-200 bg-white rounded-lg flex flex-col justify-between cursor-pointer p-5 relative"
                  >
                      <div
                  className="bg-white bg-contain bg-center m-auto flex items-center justify-center  h-[120px] w-[120px] md:h-[150px] md:w-[150px]"
                >
                  <img
                    src={imageUrl}
                    alt={product.shortName}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                    <div className="text-center">
                  <h1 className="font-bold my-3 text-xs sm:text-sm" >
                    {product.shortName}
                  </h1>
                  <p className="text-sm">
                    {`AED ${product.price}/${product.splitUnit}`}
                  </p>
                  <p
                    className="text-gray-400 text-xs mt-1">
                    {product.presentation}
                  </p>
                  <p
                    className="text-gray-400 text-xs mb-1">
                    Origin: {product.originCountry}
                  </p>
                </div>
                <button
                  className="bg-green-600 text-white text-xs md:text-sm  rounded-full w-4/5 sm:w-3/5 mx-auto my-2 p-2 relative bottom-0"
                >
                  Add to cart
                </button>
                <div
                  className="bg-green-700 absolute top-2 right-2 rounded-full text-white text-center flex items-center justify-center"
                  style={{
                    height: '35px',
                    width: '35px',
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Alternative;
