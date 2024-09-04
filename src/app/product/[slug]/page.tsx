'use client';
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { faHeart, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import YouMayAlsoLike from "../../../../component/youAlsoLike";
import Alternative from "../../../../component/alternative";
import ShareModal from "../../../../component/shareModal";
import ProductDetailShimmer from "../../../../component/productDetailsshimmer";

interface ProductDetails {
  id: string
  name: string;
  price: string;
  images?: { url: string }[];
  brand?: { name: string };
  ingredients: string;
  description: string;
  nutritional: string;
  originCountry: string;
  presentation: string;
  sku: string;
  splitUnit: string
  tags: Tags
}
interface Tags {
  newProduct: boolean
  glutenFree:boolean
  noAddedHormones:boolean
  organicLarder:boolean
  vegan:boolean

}
interface RelatedProducts {
  data?: [];
}

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState<RelatedProducts | null>(null)
  const [error, setError] = useState<string | null>(null);
  const searchParams = useParams();
  const name = searchParams.slug;
  const [showShareModal, setShowShareModal] = useState<boolean | undefined>(false)

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

  console.log(relatedProducts, 'related products')



  const handleSectionClick = useCallback((section: string) => {
    setActiveSection(section);
  }, []);

  if (loading) {
    return <ProductDetailShimmer/>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!productDetails) {
    return <div>No product details found.</div>;
  }

  const imgUrl = productDetails.images?.[0]?.url || 'https://ofc-ecom-web.exceloid.in/_nuxt/img/no-image.327c892.jpg';
  const brandName = productDetails.brand?.name || 'Unknown Brand';
  const handleShowShareModal = () => {
    setShowShareModal(true)
  }

  const handleShareModal = (value: boolean) => {
    setShowShareModal(value)
  }
  const tagImages = [];
  if (productDetails.tags.newProduct) {
    tagImages.push('https://organicfoodsandcafe.com/_nuxt/img/newProduct.ee42881.svg');
  }
  if (productDetails.tags.glutenFree) {
    tagImages.push('https://organicfoodsandcafe.com/_nuxt/img/glutenFree.a766ddd.svg');
  }
  if (productDetails.tags.noAddedHormones) {
    tagImages.push('https://organicfoodsandcafe.com/_nuxt/img/noAddedHormones.68a4a99.svg');
  }
  if (productDetails.tags.organicLarder) {
    tagImages.push('https://organicfoodsandcafe.com/_nuxt/img/organicLarder.b7076ee.svg');
  }
  if (productDetails.tags.vegan) {
    tagImages.push('https://organicfoodsandcafe.com/_nuxt/img/vegan.10d49fb.svg');
  }
  

  return (
    <div className="bg-gray-100">
      {/* <h3 className="text-xl ml-36 pt-10">Home / Ready To Eat / Salads / Salads</h3> */}
      <div className="max-w-[85%] 2xl:max-w-[75%] pt-5 mx-auto" >
        <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-5">
          {/* Left container */}
          <div className="md:p-5 p-2 relative w-full bg-white rounded-md h-[325px] md:h-[450px]">
            <div className=" h-full flex items-center justify-center">
              <Image
                src={imgUrl}
                alt={productDetails.name}
                width={400}
                height={400}
                priority
                className="m-auto"
                style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
              />
             
            </div>
            <div>
            <div
                className=" rounded-full text-white text-center flex items-center justify-center absolute top-2 right-2"
                style={{
                  backgroundColor:'#29a637',
                  height: '40px',
                  width: '40px',
                }}
              >
                <FontAwesomeIcon className="text-2xl" icon={faHeart} />
              </div>
              <div
                className=" rounded-full text-white text-center flex items-center justify-center absolute bottom-2 right-2"
                style={{
                  backgroundColor:'#29a637',
                  height: '40px',
                  width: '40px',
                }}
                onClick={handleShowShareModal}>
                <FontAwesomeIcon className="text-2xl" icon={faShareNodes} />
              </div>
            </div>
            <div>
              {tagImages.map((tag,i)=>(
               <div key={i}
               className=" rounded-fulltext-center flex items-center justify-center absolute top-2 left-2"
               style={{
                 height: '50px',
                 width: '50px',
               }}>
                 
               <img src={tag} alt="logo" />
             </div>
              ))}
            </div>

            {/* {
            productDetails.tags?.newProduct && <div
              className=" rounded-fulltext-center flex items-center justify-center absolute top-2 left-2"
              style={{
                height: '50px',
                width: '50px',
              }}>
                
              <img src="https://organicfoodsandcafe.com/_nuxt/img/newProduct.ee42881.svg" alt="logo" />
            </div>
          } */}
          </div>
          {showShareModal && <ShareModal handleShareModal={handleShareModal} showShareModal={showShareModal} />}
         


          {/* Right container */}
          <div className=" p-7  flex flex-col  items-center md:items-start bg-white rounded-md">
            <h1 className="text-2xl font-bold mb-3 md:5 ">{productDetails.name}</h1>
            <div className="space-y-1 mb-2">
              <p className="font-semibold ">{`AED ${productDetails.price}/${productDetails.splitUnit}`}</p>
              <p className=" text-gray-600">{productDetails.presentation}</p>
            </div>
            <div className="space-y-1 ">
              <p className=" text-gray-600">Origin: <span className="font-bold">{productDetails.originCountry}</span></p>
              <p className=" text-gray-600">Brand: <span className="font-bold">{brandName}</span></p>
              <p className=" text-gray-600">SKU: <span className="font-bold">{productDetails.sku}</span></p>
            </div>
            <button className=" text-white text-sm px-5 py-2 mt-5 rounded-full"
            style={{backgroundColor:'#29a637'}}>
              
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 p-6 rounded-md w-[85%] 2xl:w-[75%] bg-white m-auto">
        <div className="desc-content ">
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

        <hr className="border mt-4  h-1" style={{backgroundColor:'#29a637'}} />

        <div className="p-3 font-semibold">
          {activeSection === 'description' && <p>{productDetails.description || 'No description available'}</p>}
          {activeSection === 'nutritional' && <p>{productDetails.nutritional || 'Nutritional values not available'}</p>}
          {activeSection === 'ingredients' && <p>{productDetails.ingredients || 'Ingredients not available'}</p>}
        </div>
      </div>
      <YouMayAlsoLike products={relatedProducts?.data} />
      <Alternative products={relatedProducts?.data} />
    </div>
  );
}
