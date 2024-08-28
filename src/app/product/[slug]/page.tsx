'use client';
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import YouMayAlsoLike from "../../../../component/youAlsoLike";
import Alternative from "../../../../component/alternative";

interface ProductDetails {
  id:string
  name: string;
  price: string;
  images?: { url: string }[];
  brand?: { name: string };
  ingredients: string;
  description: string;
  nutritional: string;
  originCountry: string;
  weight: string;
  presentation: string;
  sku: string;
}

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('description');
  const [relatedProducts,setRelatedProducts]=useState([])
  const [error, setError] = useState<string | null>(null);
  const searchParams = useParams();
  const name = searchParams.slug;

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await fetch(`/api/products/${name}`);
        const data = await response.json();
        if (data.length > 0) {
          setProductDetails(data[0]);
        }
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };
    getProductDetails();
  }, [name]);


  useEffect(() => {
    const getRelatedProduct = async () => {
      if (productDetails?.id) {
        try {
          const response = await fetch(`/api/relatedProducts/${productDetails.id}`);
          const result = await response.json();
          setRelatedProducts(result);
        } catch (err) {
          setError("Failed to fetch related products");
        }
      }
    };
  
    getRelatedProduct();

  }, [productDetails?.id]);

  console.log(relatedProducts,'related products')



  const handleSectionClick = useCallback((section: string) => {
    setActiveSection(section);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!productDetails) {
    return <div>No product details found.</div>;
  }

  const imgUrl = productDetails.images?.[0]?.url || '/placeholder-image.png';
  const brandName = productDetails.brand?.name || 'Unknown Brand';
  console.log(relatedProducts?.similar,'relative')

  return (
    <div className="bg-gray-100">
      <h3 className="text-xl ml-36 pt-10">Home / Ready To Eat / Salads / Salads</h3>
      <div className="md:flex    md:px-12 mt-2 m-auto" style={{width:'85%'}}>
        <div className="flex mx-auto w-full space-x-5 justify-center align-middle" style={{ height: '450px' }}>
        {/* Left container */}
          <div className=" p-5 sm:w-full bg-white rounded-md">
            <div className="relative  h-full w-full">
              <Image
                              src={imgUrl}
                alt={productDetails.name}
                width={400}
                height={400}
                priority
              />
              <div
                className="bg-green-700 text-white text-center flex items-center justify-center"
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  height: '50px',
                  width: '50px',
                  borderRadius: '50%',
                }}
              >
                <FontAwesomeIcon size="2x" icon={faHeart} />
              </div>
            </div>
          </div>

          {/* Right container */}
          <div className=" p-7  w-full  bg-white rounded-md">
            <div className="md:text-2xl text-xl font-bold pb-2">{productDetails.name}</div>
            <p className="font-semibold pr-2">AED {productDetails.price}</p>
            <div className="pb-2 text-gray-600">{productDetails.presentation}</div>
            <div className="font-bold pb-2">{productDetails.weight}</div>
            <p className="pr-2 text-gray-600">Origin: <span className="font-bold">{productDetails.originCountry}</span></p>
            <p className="pr-2 text-gray-600">Brand: <span className="font-bold">{brandName}</span></p>
            <p className="pr-2 text-gray-600">SKU: <span className="font-bold">{productDetails.sku}</span></p>
            <button className="bg-green-600 text-white text-sm px-5 py-2 mt-5" style={{ borderRadius: '30px' }}>
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 p-2 rounded-md w-4/5 bg-white m-auto">
        <div className="space-x-5">
          <span
            className={`text-base cursor-pointer font-medium ${activeSection === 'description' ? 'font-semibold' : 'text-gray-700'}`}
            onClick={() => handleSectionClick('description')}
          >
            Description
          </span>
          <span
            className={`text-base cursor-pointer font-medium ${activeSection === 'nutritional' ? 'font-semibold' : 'text-gray-700'}`}
            onClick={() => handleSectionClick('nutritional')}
          >
            Nutritional Values
          </span>
          <span
            className={`text-base cursor-pointer font-medium ${activeSection === 'ingredients' ? 'font-semibold' : 'text-gray-700'}`}
            onClick={() => handleSectionClick('ingredients')}
          >
            Ingredients
          </span>
        </div>

        <hr className="border mt-4 bg-green-700 h-1" />

        <div className="p-3 font-semibold">
          {activeSection === 'description' && <p>{productDetails.description || 'No description available'}</p>}
          {activeSection === 'nutritional' && <p>{productDetails.nutritional || 'Nutritional values not available'}</p>}
          {activeSection === 'ingredients' && <p>{productDetails.ingredients || 'Ingredients not available'}</p>}
        </div>
      </div>
      <YouMayAlsoLike products={relatedProducts.data?.similar} />
      <Alternative products={relatedProducts.data?.alternatives}/>
    </div>
  );
}
