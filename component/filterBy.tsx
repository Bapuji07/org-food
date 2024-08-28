'use client';
import { useState, useEffect } from 'react';
import { faSliders, faAngleRight, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterComponent = ({ onFilterChange }) => {
  const [allBrands, setAllBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [nameOrder, setNameOrder] = useState('asc'); // Default is ascending order
  const [dietary, setDietary] = useState<string[]>([]);
  const [newProducts, setNewProducts] = useState(false);
  const [offers, setOffers] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showBrandFilter, setShowBrandFilter] = useState(false);
  const [showDietaryFilter, setShowDietaryFilter] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [filterCount, setFilterCount] = useState(0);

  const specialDietOptions = ['Dairy free', 'Gluten free', 'Kosher', 'Lactose free', 'No added hormones', 'Organic', 'Larder', 'Vegan', 'Vegetarian'];

  useEffect(() => {
    const getAllBrands = async () => {
      try {
        const response = await fetch('/api/brands');
        const result = await response.json();
        setAllBrands(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllBrands();
  }, []);

  // Track filter count
  useEffect(() => {
    let count = 0;
    if (selectedBrand) count++;
    if (dietary.length > 0) count++;
    if (newProducts) count++;
    if (offers) count++;
    if (nameOrder ) count++; 
    setFilterCount(count);
  }, [selectedBrand, dietary, newProducts, offers, nameOrder]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedBrand(prev => prev === value ? null : value);
  };

  const handleDietaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDietary(prevDietary =>
      prevDietary.includes(value)
        ? prevDietary.filter(item => item !== value)
        : [...prevDietary, value]
    );
  };

  const handleNewProductsChange = () => setNewProducts(prev => !prev);
  const handleOffersChange = () => setOffers(prev => !prev);
  const handleNameOrderChange = (order: string) => setNameOrder(order);

  const handleShowFilter = () => setShowFilter(prev => !prev);
  const handleShowBrandFilter = () => setShowBrandFilter(prev => !prev);
  const handleShowDietaryFilter = () => setShowDietaryFilter(prev => !prev);

  const filteredBrands = allBrands.filter(brand =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  // Apply Filters and send to parent
  const applyFilters = () => {
    const filters: any = {};
    filters.orderDirection = nameOrder;
    if (selectedBrand) filters.brand = selectedBrand;
    // if (dietary.length > 0) filters.value = dietary.join(','); // Send as a comma-separated string
    if (newProducts) filters.newProduct = 1;
    if (offers) filters.discount = 1;
    
    onFilterChange(filters); // Send filters to parent
  };

  // Reset Filters
  const cancelFilters = () => {
    setSelectedBrand(null);
    setNameOrder('asc');
    setDietary([]);
    setBrandSearch('');
    setNewProducts(false);
    setOffers(false);
    applyFilters();
  };

  return (
    <div className='relative right-1' style={{ width: '250px' }}>
      <div onClick={handleShowFilter} className={`p-3 rounded-md text-xl font-bold bg-green-500 text-white cursor-pointer flex gap-5 justify-center items-center ${
        showFilter ? 'rounded-bl-none rounded-br-none' : ''
      }`}>
        <FontAwesomeIcon className='text-xl' icon={faSliders} /> Filter By {filterCount>0?`(${filterCount})`: ''}
        {showFilter ? <FontAwesomeIcon className='text-xl' icon={faAngleDown} /> : <FontAwesomeIcon className='text-xl' icon={faAngleRight} />}
      </div>
      {showFilter && (
        <div className={`flex flex-col border border-gray bg-white shadow-md ${showFilter ? 'rounded-tl-none rounded-tr-none' : ''}`}>
          {/* Brand Filter */}
          <div className='p-3 border-b border-green-600 cursor-pointer' onClick={handleShowBrandFilter}>
            <div className='flex justify-between'>
              <span className='font-bold'>Brand</span>
              {showBrandFilter ? <FontAwesomeIcon className='text-xl text-green-600' icon={faAngleDown} /> : <FontAwesomeIcon className='text-xl text-green-600' icon={faAngleRight} />}
            </div>
          </div>
          {showBrandFilter && (
            <div className='p-2' style={{ height: '150px', overflowY: 'scroll', backgroundColor: '#f2f2f2' }}>
              <input
                type='text'
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder='Filter by name'
                className='p-2 border text-sm border-gray-300 bg-white rounded-full'
              />
              {filteredBrands.map((brand) => (
                <label key={brand.id} className='flex items-center cursor-pointer relative'>
                  <input
                    type='checkbox'
                    name='brand'
                    value={brand.id}
                    checked={brand.id === selectedBrand}
                    onChange={handleBrandChange}
                    className='hidden'
                  />
                  <div className='flex items-center w-full p-2'>
                    <div className={`w-5 absolute right-1 h-5 rounded-full border-2 ${brand.id === selectedBrand ? 'border-green-600' : 'border-gray-300'} flex items-center justify-center`}>
                      {brand.id === selectedBrand && <FontAwesomeIcon icon={faCheck} className='text-green-600' />}
                    </div>
                    <span className='ml-2 text-sm'>{brand.name}</span>
                  </div>
                </label>
              ))}
            </div>
          )}

          {/* Dietary Filter */}
          <div className='p-3 border-b border-green-600 cursor-pointer' onClick={handleShowDietaryFilter}>
            <div className='flex justify-between'>
              <span className='font-bold'>Special Diet</span>
              {showDietaryFilter ? <FontAwesomeIcon className='text-xl text-green-600' icon={faAngleDown} /> : <FontAwesomeIcon className='text-xl text-green-600' icon={faAngleRight} />}
            </div>
          </div>
          {showDietaryFilter && (
            <div className='p-2 ' style={{ height: '150px', overflowY: 'scroll', backgroundColor: '#f2f2f2' }}>
              {specialDietOptions.map((option) => (
                <label key={option} className='flex items-center cursor-pointer relative'>
                  <input
                    type='checkbox'
                    value={option}
                    checked={dietary.includes(option)}
                    onChange={handleDietaryChange}
                    className='hidden'
                  />
                  <div className={`flex items-center w-full p-2`}>
                    <div className={`w-5 h-5 absolute right-1 rounded-full text-[8px] border-2 ${dietary.includes(option) ? 'border-green-600' : 'border-gray-300'} flex items-center justify-center`}>
                      {dietary.includes(option) && <FontAwesomeIcon icon={faCheck} className='text-green-600' />}
                    </div>
                    <span className='ml-2 text-sm'>{option}</span>
                  </div>
                </label>
              ))}
            </div>
          )}

          {/* New Products and Offers */}
          <div className='p-3 border-b border-green-600'>
            <label className='flex items-center cursor-pointer relative'>
              <input
                type='checkbox'
                checked={newProducts}
                onChange={handleNewProductsChange}
                className='hidden'
              />
              <div className='flex items-center w-full p-2'>
                <div className={`w-5 h-5 absolute right-1 rounded-full text-[8px] border-2 ${newProducts ? 'border-green-600' : 'border-gray-300'} flex items-center justify-center`}>
                  {newProducts && <FontAwesomeIcon icon={faCheck} className='text-green-600' />}
                </div>
                <span className='font-bold'>New Products</span>
              </div>
            </label>
          </div>

          <div className='p-3 border-b border-green-600'>
            <label className='flex items-center cursor-pointer relative'>
              <input
                type='checkbox'
                checked={offers}
                onChange={handleOffersChange}
                className='hidden'
              />
              <div className='flex items-center w-full p-2'>
                <div className={`w-5 h-5 absolute right-1 rounded-full text-[8px] border-2 ${offers ? 'border-green-600' : 'border-gray-300'} flex items-center justify-center`}>
                  {offers && <FontAwesomeIcon icon={faCheck} className='text-green-600' />}
                </div>
                <span className='font-bold'>Offers</span>
              </div>
            </label>
          </div>

          {/* Name Order */}
          <div className='p-3 border-b border-green-600'>
            <label className='flex items-center cursor-pointer relative'>
              <input
                type='checkbox'
                name='nameOrder'
                value='aToZ'
                checked={nameOrder === 'asc'}
                onChange={() => handleNameOrderChange(nameOrder==='asc'?'desc':'asc')}
                className='hidden'
              />
              <div className='flex items-center w-full p-2'>
                <div className={`w-5 h-5 absolute right-1 rounded-full text-[8px] border-2 ${nameOrder === 'asc' ? 'border-green-600' : 'border-gray-300'} flex items-center justify-center`}>
                  {nameOrder === 'asc' && <FontAwesomeIcon icon={faCheck} className='text-green-600' />}
                </div>
                <span className='font-bold'>Name: A to Z</span>
              </div>
            </label>
          </div>

          <div className='p-3 space-x-3 mx-auto flex'>
            <button onClick={cancelFilters} className='p-2 px-3 rounded-full  text-sm bg-gray-600 text-white '>
              Cancel Filters
            </button>
            <button onClick={applyFilters} className=' p-2 px-3 text-sm bg-green-600 text-white rounded-full'>
              search 
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
