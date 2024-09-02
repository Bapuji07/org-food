'use client';

import { useState, useEffect } from 'react';
import { faSliders, faAngleRight, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Utility to convert strings to camelCase
const toCamelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/\s+/g, '');
};

// Define types
interface Brand {
  id: string;
  name: string;
  shortName: string;
}

interface FilterProps {
  onFilterChange: (filters: Record<string, any>) => void;
}

const FilterComponent: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [allBrands, setAllBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [nameOrder, setNameOrder] = useState<'asc' | 'desc'>('asc');
  const [dietary, setDietary] = useState<string[]>([]);
  const [newProducts, setNewProducts] = useState(false);
  const [offers, setOffers] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showBrandFilter, setShowBrandFilter] = useState(false);
  const [showDietaryFilter, setShowDietaryFilter] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [filterCount, setFilterCount] = useState(0);

  const specialDietOptions: string[] = [
    'Dairy free', 'Gluten free', 'Kosher', 'Lactose free', 
    'No added hormones', 'Organic larder', 'Vegan', 'Vegetarian'
  ];

  useEffect(() => {
    const getAllBrands = async () => {
      try {
        const response = await fetch('/api/brands');
        const result = await response.json();
        setAllBrands(result.data);
      } catch (err) {
        console.error('Failed to fetch brands:', err);
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
    if (nameOrder) count++;
    setFilterCount(count);
  }, [selectedBrand, dietary, newProducts, offers, nameOrder]);

  const handleBrandChange = (value: string) => {
    setSelectedBrand(prev => (prev === value ? null : value));
  };

  const handleDietaryChange = (value: string) => {
    setDietary(prevDietary =>
      prevDietary.includes(value)
        ? prevDietary.filter(item => item !== value)
        : [...prevDietary, value]
    );
  };

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(prev => !prev);
  };

  const filteredBrands = allBrands.filter(brand =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const applyFilters = () => {
    setShowFilter(false);
    const filters: Record<string, any> = {};
    filters.orderDirection = nameOrder;
    if (selectedBrand) filters.brand = selectedBrand;
    if (newProducts) filters.newProduct = 1;
    if (offers) filters.discount = 1;
    dietary.forEach(diet => {
      filters[toCamelCase(diet)] = 1;
    });
    onFilterChange(filters);
  };

  const cancelFilters = () => {
    setSelectedBrand(null);
    setNameOrder('asc');
    setDietary([]);
    setBrandSearch('');
    setNewProducts(false);
    setOffers(false);
    onFilterChange({ orderDirection: 'asc' });
  };

  return (
    <div>
      <div
        onClick={() => handleToggle(setShowFilter)}
        className={`filter-header p-3 rounded-md text-xl font-bold text-white cursor-pointer flex gap-5 justify-center items-center ${
          showFilter ? 'rounded-bl-none rounded-br-none' : ''
        }`}
      >
        <div>
          <FontAwesomeIcon className="text-xl" icon={faSliders} /> Filter By{' '}
          {filterCount > 0 ? `(${filterCount})` : ''}
        </div>
        <div>
          {showFilter ? (
            <FontAwesomeIcon className="text-xl" icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon className="text-xl" icon={faAngleRight} />
          )}
        </div>
      </div>
      {showFilter && (
        <div
          className={`flex flex-col border border-gray bg-white shadow-md ${
            showFilter ? 'rounded-tl-none rounded-tr-none' : ''
          }`}
        >
          {/* Brand Filter */}
          <div
            className="p-3 border-b border-green-600 cursor-pointer"
            onClick={() => handleToggle(setShowBrandFilter)}
          >
            <div className="flex justify-between">
              <span className="font-bold">Brand</span>
              {showBrandFilter ? (
                <FontAwesomeIcon
                  className="text-xl text-green-600"
                  icon={faAngleDown}
                />
              ) : (
                <FontAwesomeIcon
                  className="text-xl text-green-600"
                  icon={faAngleRight}
                />
              )}
            </div>
          </div>
          {showBrandFilter && (
            <div
              className="p-2"
              style={{ height: '150px', overflowY: 'scroll', backgroundColor: '#f2f2f2' }}
            >
              <div className="flex justify-center">
                <input
                  type="text"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  placeholder="Filter by name"
                  className="p-2 border text-sm w-[85%] mx-auto border-gray-300 bg-white rounded-full"
                />
              </div>
              {filteredBrands.map((brand) => (
                <label key={brand.shortName} className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    value={brand.id}
                    checked={brand.id === selectedBrand}
                    onChange={() => handleBrandChange(brand.id)}
                    className="hidden"
                  />
                  <div className="flex items-center w-full p-2">
                    <div
                      className={`w-5 h-5 absolute right-1 text-[8px] rounded-full border-2 ${
                        brand.id === selectedBrand ? 'border-green-600' : 'border-gray-300'
                      } flex items-center justify-center`}
                    >
                      {brand.id === selectedBrand && (
                        <FontAwesomeIcon icon={faCheck} className="text-green-600" />
                      )}
                    </div>
                    <span className="ml-2 text-sm">{brand.name}</span>
                  </div>
                </label>
              ))}
            </div>
          )}

          {/* Dietary Filter */}
          <div
            className="p-3 border-b border-green-600 cursor-pointer"
            onClick={() => handleToggle(setShowDietaryFilter)}
          >
            <div className="flex justify-between">
              <span className="font-bold">Special Diet</span>
              {showDietaryFilter ? (
                <FontAwesomeIcon
                  className="text-xl text-green-600"
                  icon={faAngleDown}
                />
              ) : (
                <FontAwesomeIcon
                  className="text-xl text-green-600"
                  icon={faAngleRight}
                />
              )}
            </div>
          </div>
          {showDietaryFilter && (
            <div
              className="p-2"
              style={{ height: '150px', overflowY: 'scroll', backgroundColor: '#f2f2f2' }}
            >
              {specialDietOptions.map((option) => (
                <label key={option} className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    value={option}
                    checked={dietary.includes(option)}
                    onChange={() => handleDietaryChange(option)}
                    className="hidden"
                  />
                  <div className="flex items-center w-full p-2">
                    <div
                      className={`w-5 h-5 absolute right-1 rounded-full text-[8px] border-2 ${
                        dietary.includes(option) ? 'border-green-600' : 'border-gray-300'
                      } flex items-center justify-center`}
                    >
                      {dietary.includes(option) && (
                        <FontAwesomeIcon icon={faCheck} className="text-green-600" />
                      )}
                    </div>
                    <span className="ml-2 text-sm">{option}</span>
                  </div>
                </label>
              ))}
            </div>
          )}

          {/* New Products and Offers */}
          <div className="p-3 border-b border-green-600">
            <label className="flex items-center cursor-pointer relative">
              <input
                type="checkbox"
                checked={newProducts}
                onChange={() => handleToggle(setNewProducts)}
                className="hidden"
              />
              <div className="flex items-center w-full p-2">
                <div
                  className={`w-5 h-5 absolute right-1 rounded-full text-[8px] border-2 ${
                    newProducts ? 'border-green-600' : 'border-gray-300'
                  } flex items-center justify-center`}
                >
                  {newProducts && (
                    <FontAwesomeIcon icon={faCheck} className="text-green-600" />
                  )}
                </div>
                <span className="font-bold">New Products</span>
              </div>
            </label>
          </div>

          <div className="p-3 border-b border-green-600">
            <label className="flex items-center cursor-pointer relative">
              <input
                type="checkbox"
                checked={offers}
                onChange={() => handleToggle(setOffers)}
                className="hidden"
              />
              <div className="flex items-center w-full p-2">
                <div
                  className={`w-5 h-5 absolute right-1 rounded-full text-[8px] border-2 ${
                    offers ? 'border-green-600' : 'border-gray-300'
                  } flex items-center justify-center`}
                >
                  {offers && (
                    <FontAwesomeIcon icon={faCheck} className="text-green-600" />
                  )}
                </div>
                <span className="font-bold">Offers</span>
              </div>
            </label>
          </div>

          {/* Name Order */}
          <div className="p-3 border-b border-green-600">
            <label className="flex items-center cursor-pointer relative">
              <input
                type="checkbox"
                name="nameOrder"
                checked={nameOrder === 'asc'}
                onChange={() => setNameOrder(nameOrder === 'asc' ? 'desc' : 'asc')}
                className="hidden"
              />
              <div className="flex items-center w-full p-2">
                <div
                  className={`w-5 h-5 absolute right-1 rounded-full text-[8px] border-2 ${
                    nameOrder === 'asc' ? 'border-green-600' : 'border-gray-300'
                  } flex items-center justify-center`}
                >
                  {nameOrder === 'asc' && (
                    <FontAwesomeIcon icon={faCheck} className="text-green-600" />
                  )}
                </div>
                <span className="font-bold">Name: A to Z</span>
              </div>
            </label>
          </div>

          <div className="p-3 space-x-3 mx-auto flex">
            <button
              onClick={cancelFilters}
              className="p-2 px-3 rounded-full text-sm bg-gray-600 text-white"
            >
              Cancel Filters
            </button>
            <button
              onClick={applyFilters}
              className="p-2 px-3 text-sm bg-green-600 text-white rounded-full"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
