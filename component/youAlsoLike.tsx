import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

const YouMayAlsoLike = ({ products }: any) => {
  const router=useRouter()


  const handleProductClick=(product:any)=>{
    const {slug}=product
    router.push(`/product/${slug}`)
  }
  

  return (
   <>
   
   { products?.similar?.length>0 &&
     <div className="flex flex-col text-black mt-7 mx-auto  w-[90%] lg:w-[85%] 2xl:w-[75%] ">
     <h1 className="text-lg md:text-xl  text-orange-600 font-extrabold my-2">
       You May Also Like
     </h1>
     <div className="similar-content grid xl:grid-cols-5 gap-2 md:gap-4">
       {products?.similar?.map((product: any) => {
         const imageUrl = product.images[0]?.url || 'https://ofc-ecom-web.exceloid.in/_nuxt/img/no-image.327c892.jpg';
         const tagImages = [];
 if (product.tags.newProduct) {
   tagImages.push('https://organicfoodsandcafe.com/_nuxt/img/newProduct.ee42881.svg');
 }
 if (product.tags.glutenFree) {
   tagImages.push('https://organicfoodsandcafe.com/_nuxt/img/glutenFree.a766ddd.svg');
 }
 if (product.tags.noAddedHormones) {
   tagImages.push('https://organicfoodsandcafe.com/_nuxt/img/noAddedHormones.68a4a99.svg');
 }
 if (product.tags.organicLarder) {
   tagImages.push('https://organicfoodsandcafe.com/_nuxt/img/organicLarder.b7076ee.svg');
 }
 if (product.tags.vegan) {
   tagImages.push('https://organicfoodsandcafe.com/_nuxt/img/vegan.10d49fb.svg');
 }
         return (
           <div key={product.id} className="relative h-full w-full" onClick={()=>handleProductClick(product)}>
             <div
               className="border h-full border-gray-200 bg-white rounded-lg flex flex-col justify-between cursor-pointer p-2 sm:p-5 "
             >
               <div
                 className="bg-white bg-contain bg-center m-auto flex items-center justify-center h-[120px] w-[120px] md:h-[150px] md:w-[150px]"
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
                 <p className="text-sm  ">
                   {` AED ${product.price}/${product.splitUnit}`}
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
                 className=" text-white text-xs md:text-sm my-2  rounded-full w-4/5 sm:w-3/5 mx-auto  p-2 relative bottom-0"
                 style={{backgroundColor:'#29a637'}}
              >
                 Add to cart
               </button>
               <div>
               <div
                 className="absolute top-2 right-2 rounded-full text-white text-center flex items-center justify-center"
                 style={{
                   backgroundColor:'#29a637',
                   height: '35px',
                   width: '35px',
                 }}
               >
                 <FontAwesomeIcon icon={faHeart} />
               </div>
               </div>
               <div>
                 {tagImages.map((tag,i)=>(
                    <div key={i}
                    className=" rounded-fulltext-center flex items-center justify-center absolute top-2 left-2"
                    style={{
                      height: '40px',
                      width: '40px',
                    }}>
                      
                    <img src={tag} alt="logo" />
                  </div>
                 ))}
               </div>
             </div>
           </div>
         );
       })}
     </div>
   </div>
   }
   </>
  );
};

export default YouMayAlsoLike;
