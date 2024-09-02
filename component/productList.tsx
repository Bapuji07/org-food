'use client';
import { useRouter } from 'next/navigation';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export default function ProductList({ products }: any) {
  const router = useRouter();

  const handleClick = (product: any) => {
    const { slug } = product;
    router.push(`/product/${slug}`);
  };

  if (!products) {
    return <div>No products were found</div>;
  }

  return (
    <div className="flex ">
      <div className="product-container grid  gap-3 md:gap-4 ">
        {products.map((product: any) => {
          const imageUrl = product.images[0]?.url || 'https://ofc-ecom-web.exceloid.in/_nuxt/img/no-image.327c892.jpg';
          return (
            <div key={product.id} className="relative">
              <div
                onClick={() => handleClick(product)}
                className="border border-gray-200  bg-white rounded-lg flex flex-col  cursor-pointer px-1 py-4 relative"
                style={{ height: '100%', width: '100%' }}
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
                <div className="text-center w-[80%] m-auto flex-grow">
                  <p className="font-bold pb-2" style={{ fontSize: '14px' }}>
                    {product.shortName}
                  </p>
                  <p className="text-sm font-semibold pr-2" style={{ fontSize: '12px' }}>
                    {`AED ${product.price}/${product.splitUnit}`}
                  </p>
                  <p
                    className="text-gray-400 mt-1"
                    style={{ color: 'GrayText', fontSize: '12px', marginTop: '4px' }}
                  >
                    {product.presentation}
                  </p>
                  <p
                    className="text-gray-400 mb-1"
                    style={{ color: 'GrayText', fontSize: '12px', marginBottom: '6px' }}
                  >
                    Origin: {product.originCountry}
                  </p>
                </div>
                <button
                  className="bg-green-600 text-white text-xs w-2/3 mx-auto py-3 px-2 rounded-full  relative bottom-0"

                >
                  Add to cart
                </button>
                <div
                  className="bg-green-700 text-white text-center flex items-center justify-center"
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    height: '35px',
                    width: '35px',
                    borderRadius: '50%',
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
}
