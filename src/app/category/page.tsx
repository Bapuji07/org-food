'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoryPage() {
  const router = useRouter();
  const [category, setCategory] = useState('All Category');
  const [brand, setBrand] = useState('All Brands');
  const [priceOrder, setPriceOrder] = useState('');
  const [nameOrder, setNameOrder] = useState('');
  const [dietary, setDietary] = useState('All');
  const [showFilter, setShowFilter] = useState(false)

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
  
  const [filteredProducts, setFilteredProducts] = useState(products); // Initialize with all products

  const handleshowfilter=()=>{
    setShowFilter(prev=>!prev)
  }

  // Extract unique categories, brands, and dietary options
  const categories = Array.from(new Set(products.map(product => product.category)));
  const brands = Array.from(new Set(products.map(product => product.brand)));
  const dietaryOptions = ['All', 'Vegan', 'Vegetarian', 'Non-Vegetarian'];

  const handleClick = (product:any) => {
    const { id } = product;
    router.push(`/product/${id}`);
  };

  // Handle changes in filters
  const handleCategoryChange = (e:any) => setCategory(e.target.value);
  const handleBrandChange = (e:any) => setBrand(e.target.value);
  const handlePriceOrderChange = (e:any) => setPriceOrder(e.target.value);
  const handleNameOrderChange = (e:any) => setNameOrder(e.target.value);
  const handleDietaryChange = (e:any) => setDietary(e.target.value);

  const applyFilters = () => {
    let filtered = products;

    // Apply category filter independently
    if (category !== 'All Category') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Apply other filters
    if (brand !== 'All Brands') {
      filtered = filtered.filter(product => product.brand === brand);
    }

    if (dietary !== 'All') {
      filtered = filtered.filter(product => product.dietary === dietary);
    }

    if (priceOrder === 'asc') {
      filtered = filtered.sort((a, b) => parseFloat(a.price.replace('AED ', '')) - parseFloat(b.price.replace('AED ', '')));
    } else if (priceOrder === 'desc') {
      filtered = filtered.sort((a, b) => parseFloat(b.price.replace('AED ', '')) - parseFloat(a.price.replace('AED ', '')));
    }

    if (nameOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (nameOrder === 'desc') {
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    // Reset filters to initial state on category change
    setFilteredProducts(products.filter(product => category === 'All Category' || product.category === category));
  }, [category]);

  return (
    <div className="container mx-auto mt-8">
      {/* Top Section - Filters */}
      {/* <div className="flex flex-wrap gap-4 mb-8">
        <select value={category} onChange={handleCategoryChange} className="p-2 border border-gray-300 rounded">
          <option>All Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
        

      </div> */}

      {/* Main Content - Products List */}
      <div className="flex flex-row">
        <div className="gap-3">
          <div className="flex flex-col text-black my-7 px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleClick(product)}
                  className="border border-gray-200 bg-white rounded-lg flex flex-col justify-between cursor-pointer"
                >
                  <div className="flex justify-center items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="w-[7.5rem] h-[10rem] mb-4"
                    />
                  </div>
                  <div className="text-center">
                    <div className="ff-inter text-2xl font-medium pb-2">
                      {product.name}
                    </div>
                    <p className="ff-inter pr-2">{product.price}</p>
                    <div className="ff-inter text-[10px] font-medium pb-2">
                      {product.weight}
                    </div>
                    <p className="ff-inter pr-2">Origin: {product.origin}</p>
                    <p className="ff-inter pr-2">Brand: {product.brand}</p>
                    <p className="ff-inter pr-2">SKU: {product.sku}</p>
                    <button className="bg-green-600 text-white px-2 py-1 rounded-md">
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='fixed right-4'>
            <div onClick={handleshowfilter} className='px-6 py-2 w-40   bg-green-500 text-white'>Filter By</div>
       {showFilter && <div className='flex flex-col'>

        {/* Brand Filter */}
        <select value={brand} onChange={handleBrandChange} className="p-2 border border-gray-300 rounded">
          <option>All Brands</option>
          {brands.map((brand, i) => (
            <option key={i} value={brand}>{brand}</option>
          ))}
        </select>

        {/* Price Order Filter */}
        <select value={priceOrder} onChange={handlePriceOrderChange} className="p-2 border border-gray-300 rounded">
          <option value="">Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        {/* Name Order Filter */}
        <select value={nameOrder} onChange={handleNameOrderChange} className="p-2 border border-gray-300 rounded">
          <option value="">Name</option>
          <option value="asc">Name: A to Z</option>
          <option value="desc">Name: Z to A</option>
        </select>

        {/* Dietary Filter */}
        <select value={dietary} onChange={handleDietaryChange} className="p-2 border border-gray-300 rounded">
          {dietaryOptions.map((option, i) => (
            <option key={i} value={option}>{option}</option>
          ))}
        </select>

        {/* Apply Filters Button */}
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
        >
          Apply Filters
        </button>
        </div>}
        </div>
      </div>
    </div>
  );
}
