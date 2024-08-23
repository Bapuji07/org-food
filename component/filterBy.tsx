'use client';
import { useState } from 'react';
import { faSliders, faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterComponent = ({ products, onFilter }: { products: any[]; onFilter: (filteredProducts: any[]) => void }) => {
  const [brand, setBrand] = useState('All Brands');
  const [priceOrder, setPriceOrder] = useState('');
  const [nameOrder, setNameOrder] = useState('');
  const [dietary, setDietary] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [showBrandFilter, setShowBrandFilter] = useState(false);
  const [showDietaryFilter, setShowDietaryFilter] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');

  const brands = Array.from(new Set(products.map((product) => product.brand)));
  const dietaryOptions = Array.from(new Set(products.map((product) => product.dietary)));

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => setBrand(e.target.value);
  const handlePriceOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPriceOrder(e.target.value);
  const handleNameOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => setNameOrder(e.target.value);
  const handleDietaryChange = (e: React.ChangeEvent<HTMLInputElement>) => setDietary(e.target.value);
  const handleShowFilter = () => setShowFilter((prev) => !prev);
  const handleShowBrandFilter = () => setShowBrandFilter((prev) => !prev);
  const handleShowDietaryFilter = () => setShowDietaryFilter((prev) => !prev);

  const filteredBrands = brands.filter(brand => brand.toLowerCase().includes(brandSearch.toLowerCase()));
  const applyFilters = () => {
    let filtered = products;

    if (brand !== 'All Brands') {
      filtered = filtered.filter((product) => product.brand === brand);
    }

    if (dietary !== 'All') {
      filtered = filtered.filter((product) => product.dietary === dietary);
    }

    if (priceOrder === 'asc') {
      filtered = filtered.sort((a, b) => parseFloat(a.price.replace('AED ', '')) - parseFloat(b.price.replace('AED ', '')));
    } else if (priceOrder === 'desc') {
      filtered = filtered.sort((a, b) => parseFloat(b.price.replace('AED ', '')) - parseFloat(a.price.replace('AED ', '')));
    }

    if (nameOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (nameOrder === 'desc') {
      filtered = filtered.sort((b, a) => a.name.localeCompare(b.name));
    }

    onFilter(filtered);
  };

  const cancelFilters = () => {
    setBrand('All Brands');
    setPriceOrder('');
    setNameOrder('');
    setDietary('All');
    setBrandSearch('');
    applyFilters();
  };

  return (
    <div className='relative right-4'>
      <div onClick={handleShowFilter} style={{ padding: '10px 20px' }} className='rounded-md text-2xl font-bold bg-green-500 text-white cursor-pointer flex gap-5 justify-items-center justify-center'>
        <FontAwesomeIcon className='text-2xl' icon={faSliders} /> Filter By
        {showFilter ? <FontAwesomeIcon className='text-2xl' icon={faAngleDown} /> : <FontAwesomeIcon className='text-2xl' icon={faAngleRight} />}
      </div>
      {showFilter && (
        <div className='flex flex-col gap-2  border border-gray bg-white ' style={{transition: 'all .3s ease'}}>
          <div>
            <div onClick={handleShowBrandFilter} className='p-3 border-b border-green-600 rounded cursor-pointer'>
              <div className='flex justify-between'>
                <span>Brand</span>
                {showBrandFilter ? <FontAwesomeIcon className='text-xl text-green-600' icon={faAngleDown} /> : <FontAwesomeIcon className='text-xl text-green-600' icon={faAngleRight} />}
              </div>
            </div>
            {showBrandFilter && (
              <div className='flex flex-col gap-2 p-2 ' style={{height:'150px',overflowY:'scroll',backgroundColor:'#f2f2f2'}}>
                <input
                  type='text'
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  placeholder='Filter by name'
                  className='p-2 border border-gray-300 bg-white rounded-full'
                />
                {filteredBrands.map((brand, i) => (
                  <label key={i} className='flex items-center'>
                    <input
                      type='radio'
                      name='brand'
                      value={brand}
                      checked={brand === brand}
                      onChange={handleBrandChange}
                      className='mr-2'
                    />
                    {brand}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div>
            <div onClick={handleShowDietaryFilter} className='p-2 border-b border-green-600 rounded cursor-pointer'>
              <div className='flex justify-between'>
                <span>Special Diet</span>
                {showDietaryFilter ? <FontAwesomeIcon className='text-xl text-green-600' icon={faAngleDown} /> : <FontAwesomeIcon className='text-xl text-green-600' icon={faAngleRight} />}
              </div>
            </div>
            {showDietaryFilter && (
              <div className='flex flex-col gap-2 p-2'>
                {dietaryOptions.map((option, i) => (
                  <label key={i} className='flex items-center'>
                    <input
                      type='radio'
                      name='dietary'
                      value={option}
                      checked={option === dietary}
                      onChange={handleDietaryChange}
                      className='mr-2'
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>

          <select value={priceOrder} onChange={handlePriceOrderChange} className='p-2 border border-gray-300 rounded'>
            <option value=''>Price</option>
            <option value='asc'>Price: Low to High</option>
            <option value='desc'>Price: High to Low</option>
          </select>

          <select value={nameOrder} onChange={handleNameOrderChange} className='p-2 border border-gray-300 rounded'>
            <option value=''>Name</option>
            <option value='asc'>Name: A to Z</option>
            <option value='desc'>Name: Z to A</option>
          </select>

          <div className='flex flex-row gap-5'>
            <button onClick={cancelFilters} className='bg-gray-500 text-white text-sm px-4 py-2 rounded-full mt-2'>
              Cancel Filters
            </button>
            <button onClick={applyFilters} className='bg-green-600 text-white text-sm px-4 py-2 rounded-full mt-2'>
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
