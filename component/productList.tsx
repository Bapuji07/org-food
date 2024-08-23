'use client';
import { useRouter } from 'next/navigation';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ProductList({ products }:any) {
  const router = useRouter();

  const handleClick = (product:any) => {
    const { id } = product;
    router.push(`/product/${id}`);
  };

  return (
    <div className="flex flex-row" style={{ backgroundColor: '#f2f2f2', paddingTop: '10px' }}>
      <div className="gap-3 w-full">
        <div className="flex flex-col flex-shrink text-black my-8">
          <div className="grid h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {products.map((product:any) => (
              <div key={product.id} className="relative">
                <div
                  onClick={() => handleClick(product)}
                  className="border border-gray-200 bg-white rounded-lg flex flex-col justify-between cursor-pointer p-5 relative"
                  style={{ height: '350px',width:'200px' }} // Fixed height for all cards
                >
                  <div className="flex justify-center items-center bg-white h-36">
                    <img
                      src={product.images[0]?.url}
                      alt={product.shortName}
                      className="max-h-full max-w-full"
                    />
                  </div>
                  <div className="text-center flex-grow">
                    <div className="font-bold pb-2" style={{ fontSize: "14px" }}>
                      {product.shortName}
                    </div>
                    <p className="text-sm font-semibold pr-2" style={{ fontSize: "12px" }}>
                      {`AED ${product.price}/${product.splitUnit}`}
                    </p>
                    <div
                      className="text-gray-400 mt-1"
                      style={{ color: "GrayText", fontSize: "12px", marginTop: "4px" }}
                    >
                      {product.presentation}
                    </div>
                    <p
                      className="text-gray-400 mb-1"
                      style={{ color: "GrayText", fontSize: "12px", marginBottom: "6px" }}
                    >
                      Origin: {product.originCountry}
                    </p>
                  </div>
                    <button
                      className="bg-green-600 text-white text-sm px-4 py-2 mt-auto relative bottom-0"
                      style={{ borderRadius: "30px", fontSize: "13px" }}
                    >
                      Add to cart
                    </button>
                  <div
                    className="bg-green-700 text-white text-center flex items-center justify-center"
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      height: "35px",
                      width: "35px",
                      borderRadius: "50%",
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
