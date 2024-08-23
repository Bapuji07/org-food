'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams,useParams } from "next/navigation";
export default function ProductDetails() {
interface Product{
  image:string,
  name:string,
  brand:string,
  sku:string,
  origin:string,
  weight:string,
  price:string

}

const [productDetails, setProductDetails] = useState<Product | undefined>(undefined);
const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useParams();
  const id = searchParams.slug;
  console.log(id,'lll')
  const products = [
    {
      id: 1,
      name: "Organic Salad",
      price: "AED 37.90/Unit",
      weight: "Approx. 350g per unit",
      origin: "UAE",
      brand: "OFC",
      sku: "8342",
      category: "Salads",
      image: "https://organic-public.s3.us-west-1.amazonaws.com/product/7b182363-2dc7-11ee-8884-0a520340c4c4/64c5f8f8dbc739.02519163.jpg",
      dietary: "Vegetarian"
    },
    {
      id: 2,
      name: "Eggs",
      price: "AED 18.90/Unit",
      weight: "Approx. 350g per unit",
      origin: "UAE",
      brand: "Farm Fresh",
      sku: "8343",
      category: "Dairy",
      image: "https://organic-public.s3.us-west-1.amazonaws.com/product/9e1f7d31-5443-11ed-b4fc-0a520340c4c4/6357c983d2ef70.59298634.jpg",
      dietary: "Non-Vegetarian"
    },
    {
      id: 3,
      name: "Harvest Salad",
      price: "AED 37.90/Unit",
      weight: "Approx. 350g per unit",
      origin: "UAE",
      brand: "OFC",
      sku: "8344",
      category: "Salads",
      image: "https://organic-public.s3.us-west-1.amazonaws.com/product/fe5c37f0-e271-11ec-9db7-0a520340c4c4/6630a36c7d7bb1.60836521.png",
      dietary: "Vegetarian"
    },
    {
      id: 4,
      name: "Organic",
      price: "AED 29.90/Unit",
      weight: "Approx. 400g per unit",
      origin: "UAE",
      brand: "Green Harvest",
      sku: "8345",
      category: "Salads",
      image: "https://organic-public.s3.us-west-1.amazonaws.com/product/66629258-e748-11ee-89d3-0a0cbbd54eed/65fc661d773ee3.32808221.jpg",
      dietary: "Vegetarian"
    },
    {
      id: 5,
      name: "Organic Harvest Salad",
      price: "AED 37.90/Unit",
      weight: "Approx. 350g per unit",
      origin: "UAE",
      brand: "OFC",
      sku: "8346",
      category: "Salads",
      image: "https://organic-public.s3.us-west-1.amazonaws.com/product/1d6935d2-8eb8-11ee-9a11-0afbcec79ac8/65673b2b2257f3.82970231.png",
      dietary: "Vegetarian"
    },
    {
      id: 6,
      name: "Organic Salad Croutons",
      price: "AED 12.90/Unit",
      weight: "Approx. 150g per unit",
      origin: "UAE",
      brand: "OFC",
      sku: "8347",
      category: "Salad Toppings",
      image: "https://organic-public.s3.us-west-1.amazonaws.com/product/3fc382fb-0eb2-11ef-a3ca-0adac72e5651/663f133b8abc62.00147960.jpg",
      dietary: "Vegetarian"
    },
    {
      id: 7,
      name: "Organic Chicken Salad",
      price: "AED 45.90/Unit",
      weight: "Approx. 400g per unit",
      origin: "UAE",
      brand: "Farm Fresh",
      sku: "8348",
      category: "Salads",
      image: "https://organic-public.s3.us-west-1.amazonaws.com/product/3fc382fb-0eb2-11ef-a3ca-0adac72e5651/663f133b8abc62.00147960.jpg",
      dietary: "Non-Vegetarian"
    },
    {
      id: 8,
      name: "Organic Coleslaw",
      price: "AED 20.90/Unit",
      weight: "Approx. 350g per unit",
      origin: "UAE",
      brand: "Green Harvest",
      sku: "8349",
      category: "Salads",
      image: "https://organic-public.s3.us-west-1.amazonaws.com/product/9e1f7d31-5443-11ed-b4fc-0a520340c4c4/6357c983d2ef70.59298634.jpg",
      dietary: "Vegetarian"
    },
    {
      id: 9,
      name: "Almond Milk",
      price: "AED 15.90/Unit",
      weight: "Approx. 1L per unit",
      origin: "UAE",
      brand: "Nutty Delights",
      sku: "8350",
      category: "Dairy",
      image: "https://organic-public.s3.us-west-1.amazonaws.com/product/9e1f7d31-5443-11ed-b4fc-0a520340c4c4/6357c983d2ef70.59298634.jpg",
      dietary: "Vegan"
    },
    {
      id: 10,
      name: "Organic Yogurt",
      price: "AED 12.90/Unit",
      weight: "Approx. 500g per unit",
      origin: "UAE",
      brand: "Farm Fresh",
      sku: "8351",
      category: "Dairy",
      image: "https://organic-public.s3.us-west-1.amazonaws.com/product/7b182363-2dc7-11ee-8884-0a520340c4c4/64c5f8f8dbc739.02519163.jpg",
      dietary: "Vegetarian"
    },
    {
      id: 11,
      name: "Granola Mix",
      price: "AED 18.90/Unit",
      weight: "Approx. 350g per unit",
      origin: "UAE",
      brand: "Green Harvest",
      sku: "8352",
      category: "Breakfast",
      image: "https://organic-public.s3.us-west-1.amazonaws.com/product/fe5c37f0-e271-11ec-9db7-0a520340c4c4/6630a36c7d7bb1.60836521.png",
      dietary: "Vegetarian"
    },
    {
      id: 12,
      name: "Organic Oats",
      price: "AED 10.90/Unit",
      weight: "Approx. 500g per unit",
      origin: "UAE",
      brand: "OFC",
      sku: "8353",
      category: "Breakfast",
      image: "https://organic-public.s3.us-west-1.amazonaws.com/product/66629258-e748-11ee-89d3-0a0cbbd54eed/65fc661d773ee3.32808221.jpg",
      dietary: "Vegetarian"
    },
    {
      id: 13,
      name: "Organic Honey",
      price: "AED 45.90/Unit",
      weight: "Approx. 250g per unit",
      origin: "UAE",
      brand: "Pure Gold",
      sku: "8354",
      category: "Condiments",
      image: "https://organic-public.s3.us-west-1.amazonaws.com/product/7b182363-2dc7-11ee-8884-0a520340c4c4/64c5f8f8dbc739.02519163.jpg",
      dietary: "Vegetarian"
    },
    {
      id: 14,
      name: "Chia Seeds",
      price: "AED 20.90/Unit",
      weight: "Approx. 200g per unit",
      origin: "UAE",
      brand: "Superfoods",
      sku: "8355",
      category: "Condiments",
      image: "https://organic-public.s3.us-west-1.amazonaws.com/product/9e1f7d31-5443-11ed-b4fc-0a520340c4c4/6357c983d2ef70.59298634.jpg",
      dietary: "Vegan"
    },
    {
      id: 15,
      name: "Organic Peanut Butter",
      price: "AED 25.90/Unit",
      weight: "Approx. 350g per unit",
      origin: "UAE",
      brand: "Pure Gold",
      sku: "8356",
      category: "Condiments",
      image: "https://organic-public.s3.us-west-1.amazonaws.com/product/7b182363-2dc7-11ee-8884-0a520340c4c4/64c5f8f8dbc739.02519163.jpg",
      dietary: "Vegetarian"
    }
  ];

  useEffect(() => {
    if (id) {
      // const selectedProduct = products.find((p) => p.id === parseInt(id));
      // setProductDetails(selectedProduct);
    }
  }, [id]);



  
  console.log(productDetails, 'products')
  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {loading ? (<div>Loading...</div>) : (

        <div className="bg-gray-300">

          <h3 className="text-xl ml-36 pt-10 ">Home / Ready To Eat / Salads / Salads</h3>

          <div className="md:flex   md:px-12 mt-2">
            <div className="flex justify-center align-middle ">
              {/*left container */}
              <div className="md:w-2/5 p-5 m-5 sm:w-full  bg-white rounded-md">
                <div className="relative">
                  <img className="border h-102" src={productDetails.image} alt='ppp'></img>
                </div>
              </div>

              {/*right container */}
              <div className="md:w-2/5 p-5 m-5 sm:w-full  bg-white rounded-md ">
                <div className="ff-inter md:text-3xl text-xl font-medium pb-2">
                  {productDetails.name}
                </div>
                <p className="ff-inter    pr-2">{productDetails.price}</p>

                <div className="ff-inter text-[10px] font-medium pb-2">{productDetails.weight}</div>
                <p className="ff-inter    pr-2">Origin: {productDetails.origin}</p>
                <p className="ff-inter    pr-2">Brand: {productDetails.brand}</p>
                <p className="ff-inter    pr-2">SKU: {productDetails.sku}</p>
                <button className="bg-green-600 text-white px-2 py-1 rounded-md">Add to cart</button>

              </div>
            </div>

          </div>
          <div className="mt-5 p-2 rounded-md w-4/5 bg-white m-auto">
            {/*Description */}
            <div className=" space-x-5">
              <span className="ff-inter  text-base font-semibold bg-custom-color-heading">Description</span>
              <span className="ff-inter  text-base font-medium color-remember-checkbox">Nutritional Values</span>
              <span className="ff-inter  text-base font-medium color-remember-checkbox">ingredients</span>

            </div>
            <hr className="border mt-4  bg-green-700 h-1"></hr>
            <p className="p-3">Organic Harvest Salad</p>
          </div>
          <div>
            {/* carousals */}
            <div className="flex flex-col text-black mt-7 px-8 ">
              <h1 className="ff-inter text-lg md:text-lg text-green-600 lg:text-3xl font-semibold mb-8 mt-5">
                you may also like
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2">
                <div className="border border-gray-200 bg-white rounded-lg  flex flex-col justify-between">
                  <div className="flex justify-center items-center">
                    <img src='https://organic-public.s3.us-west-1.amazonaws.com/product/7b182363-2dc7-11ee-8884-0a520340c4c4/64c5f8f8dbc739.02519163.jpg' alt='ppp' width={100} height={100} className="w-[7.5rem] h-[10rem] mb-4" />
                  </div>
                  <div className="text-center">
                    <div className="ff-inter text-2xl  font-medium pb-2">
                      Organic Salad
                    </div>
                    <p className="ff-inter    pr-2">AED 37.90/Unit</p>

                    <div className="ff-inter text-[10px] font-medium pb-2">Approx. 350g per unit</div>
                    <p className="ff-inter    pr-2">Origin: UAE</p>
                    <p className="ff-inter    pr-2">Brand: OFC</p>
                    <p className="ff-inter    pr-2">SKU: 8342</p>
                    <button className="bg-green-600 text-white px-2 py-1 rounded-md">Add to cart</button>

                  </div>

                </div>
                <div className="border border-gray-200 bg-white rounded-lg flex flex-col justify-between">
                  <div className="flex justify-center items-center">
                    <img src='https://organic-public.s3.us-west-1.amazonaws.com/product/9e1f7d31-5443-11ed-b4fc-0a520340c4c4/6357c983d2ef70.59298634.jpg' alt='ppp' width={100} height={100} className="w-[7.5rem] h-[10rem] mb-4" />
                  </div>
                  <div className="text-center">
                    <div className="ff-inter md:text-2xl  font-medium pb-2">
                      Eggs
                    </div>
                    <p className="ff-inter    pr-2">AED 37.90/Unit</p>

                    <div className="ff-inter text-[10px] font-medium pb-2">Approx. 350g per unit</div>
                    <p className="ff-inter    pr-2">Origin: UAE</p>
                    <p className="ff-inter    pr-2">Brand: OFC</p>
                    <p className="ff-inter    pr-2">SKU: 8342</p>
                    <button className="bg-green-600 text-white px-2 py-1 rounded-md">Add to cart</button>

                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg bg-white flex flex-col justify-between">
                  <div className="flex justify-center items-center">
                    <img src='https://organic-public.s3.us-west-1.amazonaws.com/product/fe5c37f0-e271-11ec-9db7-0a520340c4c4/6630a36c7d7bb1.60836521.png' alt='ppp' width={100} height={100} className="w-[7.5rem] h-[10rem] mb-4" />
                  </div>
                  <div className="text-center">
                    <div className="ff-inter md:text-2xl  font-medium pb-2">
                       Harvest Salad
                    </div>
                    <p className="ff-inter    pr-2">AED 37.90/Unit</p>

                    <div className="ff-inter text-[10px] font-medium pb-2">Approx. 350g per unit</div>
                    <p className="ff-inter    pr-2">Origin: UAE</p>
                    <p className="ff-inter    pr-2">Brand: OFC</p>
                    <p className="ff-inter    pr-2">SKU: 8342</p>
                    <button className="bg-green-600 text-white px-2 py-1 rounded-md">Add to cart</button>

                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg bg-white flex flex-col justify-between">
                  <div className="flex justify-center items-center">
                    <img src='https://organic-public.s3.us-west-1.amazonaws.com/product/66629258-e748-11ee-89d3-0a0cbbd54eed/65fc661d773ee3.32808221.jpg' alt='ppp' width={100} height={100} className="w-[7.5rem] h-[10rem] mb-4" />
                  </div>
                  <div className="text-center">
                    <div className="ff-inter md:text-2xl  font-medium pb-2">
                      Organic 
                    </div>
                    <p className="ff-inter    pr-2">AED 37.90/Unit</p>

                    <div className="ff-inter text-[10px] font-medium pb-2">Approx. 350g per unit</div>
                    <p className="ff-inter    pr-2">Origin: UAE</p>
                    <p className="ff-inter    pr-2">Brand: OFC</p>
                    <p className="ff-inter    pr-2">SKU: 8342</p>
                    <button className="bg-green-600 text-white px-2 py-1 rounded-md">Add to cart</button>

                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-black mt-7 px-8 mb-6">
              <h1 className="text-lg md:text-lg lg:text-2xl text-green-600 font-semibold mb-12 mt-5">
                Alternative
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-2">
                <div className="border border-gray-200 rounded-lg bg-white flex flex-col justify-between">
                  <div className="flex justify-center items-center">
                    <img src='https://organic-public.s3.us-west-1.amazonaws.com/product/1d6935d2-8eb8-11ee-9a11-0afbcec79ac8/65673b2b2257f3.82970231.png' alt='ppp' width={100} height={100} className="w-[7.5rem] h-[10rem] mb-4" />
                  </div>
                  <div className="text-center">
                    <div className="ff-inter md:text-2xl  font-medium pb-2">
                      Organic Harvest Salad
                    </div>
                    <p className="ff-inter    pr-2">AED 37.90/Unit</p>

                    <div className="ff-inter text-[10px] font-medium pb-2">Approx. 350g per unit</div>
                    <p className="ff-inter    pr-2">Origin: UAE</p>
                    <p className="ff-inter    pr-2">Brand: OFC</p>
                    <p className="ff-inter    pr-2">SKU: 8342</p>
                    <button className="bg-green-600 text-white px-2 py-1 rounded-md">Add to cart</button>

                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg bg-white flex flex-col justify-between">
                  <div className="flex justify-center items-center">
                    <img src='https://organic-public.s3.us-west-1.amazonaws.com/product/3fc382fb-0eb2-11ef-a3ca-0adac72e5651/663f133b8abc62.00147960.jpg' alt='ppp' width={100} height={100} className="w-[7.5rem] h-[10rem] mb-4" />
                  </div>
                  <div className="text-center">
                    <div className="ff-inter md:text-2xl  font-medium pb-2">
                      Organic salad crutons
                    </div>
                    <p className="ff-inter    pr-2">AED 37.90/Unit</p>

                    <div className="ff-inter text-[10px] font-medium pb-2">Approx. 350g per unit</div>
                    <p className="ff-inter    pr-2">Origin: UAE</p>
                    <p className="ff-inter    pr-2">Brand: OFC</p>
                    <p className="ff-inter    pr-2">SKU: 8342</p>
                    <button className="bg-green-600 text-white px-2 py-1 rounded-md">Add to cart</button>

                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg bg-white flex flex-col justify-between">
                  <div className="flex justify-center items-center">
                    <img src='https://organic-public.s3.us-west-1.amazonaws.com/product/3fc382fb-0eb2-11ef-a3ca-0adac72e5651/663f133b8abc62.00147960.jpg' alt='ppp' width={100} height={100} className="w-[7.5rem] h-[10rem] mb-4" />
                  </div>
                  <div className="text-center">
                    <div className="ff-inter md:text-2xl  font-medium pb-2">
                      Organic chicken Salad
                    </div>
                    <p className="ff-inter    pr-2">AED 37.90/Unit</p>

                    <div className="ff-inter text-[10px] font-medium pb-2">Approx. 350g per unit</div>
                    <p className="ff-inter    pr-2">Origin: UAE</p>
                    <p className="ff-inter    pr-2">Brand: OFC</p>
                    <p className="ff-inter    pr-2">SKU: 8342</p>
                    <button className="bg-green-600 text-white px-2 py-1 rounded-md">Add to cart</button>

                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg bg-white flex flex-col justify-between">
                  <div className="flex justify-center items-center">
                    <img src='https://organic-public.s3.us-west-1.amazonaws.com/product/9e1f7d31-5443-11ed-b4fc-0a520340c4c4/6357c983d2ef70.59298634.jpg' alt='ppp' width={100} height={100} className="w-[7.5rem] h-[10rem] mb-4" />
                  </div>
                  <div className="text-center">
                    <div className="ff-inter md:text-2xl  font-medium pb-2">
                      Organic colwslow
                    </div>
                    <p className="ff-inter    pr-2">AED 37.90/Unit</p>

                    <div className="ff-inter text-[10px] font-medium pb-2">Approx. 350g per unit</div>
                    <p className="ff-inter    pr-2">Origin: UAE</p>
                    <p className="ff-inter    pr-2">Brand: OFC</p>
                    <p className="ff-inter    pr-2">SKU: 8342</p>
                    <button className="bg-green-600 text-white px-2 py-1 rounded-md">Add to cart</button>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}