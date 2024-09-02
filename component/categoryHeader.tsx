'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { faAngleDown, faAngleRight, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelectedCategory } from '../context/selectedCategory';
import { useCategories } from '../hooks/useGetCategories';

interface Category {
  name: string;
  slug: string;
  children?: Category[];
}

interface UseCategoriesReturn {
  allCategoriesss: Category[];
  fetchCategories: () => void;
}

interface CategoryFilterProps {
  onCategoryChange: (isOpen: boolean) => void;
}

export default function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
  const router = useRouter();
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [lastCategories, setLastCategories] = useState<Category[]>([]);
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();
  const { allCategoriesss, fetchCategories }: UseCategoriesReturn = useCategories();
  const [isSideNavOpen, setSideNavOpen] = useState<boolean>(false);

  const handleSideNavCategories = () => {
    setSideNavOpen(prev => !prev);
    onCategoryChange(!isSideNavOpen);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (selectedCategory: string, selectedCategoryName: string) => {
    setSelectedCategory(selectedCategoryName);
    router.push(`/category/${selectedCategory}`);
    setShowCategory(false);
  };

  const handleMouseEnter = (cat: Category, level: 'sub' | 'last') => {
    if (level === 'sub') {
      setSubCategories(cat.children || []);
      setLastCategories([]);
    } else if (level === 'last') {
      setLastCategories(cat.children || []);
    }
  };

  const handleCategoryMouseEnter = () => setShowCategory(true);
  const handleMouseLeave = () => {
    setShowCategory(false);
    setSubCategories([]);
    setLastCategories([]);
  };

  return (
    <div>
      <div className="flex gap-4 hidden lg:block py-4 border-b-4 border-green-600 bg-white">
        <div
          className="relative flex w-[90%] lg:w-[85%] 2xl:w-[75%] mx-auto"
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex items-center gap-2 font-extrabold text-green-600 text-xl p-3 cursor-pointer"
            onMouseEnter={handleCategoryMouseEnter}
          >
            <p>ALL CATEGORIES</p>
            <FontAwesomeIcon icon={faAngleDown} className="text-xl" />
          </div>
          {showCategory && (
            <div
              className="absolute z-10 top-full w-[80vw] left-0 bg-white shadow-lg rounded-lg p-2"
              onMouseEnter={handleCategoryMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex">
                <div className="w-1/3 ps-2">
                  {allCategoriesss.map((cat, i) => (
                    <div
                      key={i}
                      className="flex justify-between border-b border-gray-300 p-2 font-bold cursor-pointer"
                      onMouseEnter={() => handleMouseEnter(cat, 'sub')}
                      onClick={() => handleCategoryClick(cat.slug, cat.name)}
                    >
                      {cat.name} <FontAwesomeIcon className="text-green-600" icon={faAngleRight} />
                    </div>
                  ))}
                </div>

                {subCategories.length > 0 && (
                  <div className="w-1/3">
                    {subCategories.map((subCat, i) => (
                      <div
                        key={i}
                        className="flex justify-between border-b border-gray-300 p-2 cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(subCat, 'last')}
                        onClick={() => handleCategoryClick(subCat.slug, subCat.name)}
                      >
                        {subCat.name} <FontAwesomeIcon className="text-green-600" icon={faAngleRight} />
                      </div>
                    ))}
                  </div>
                )}

                {lastCategories.length > 0 && (
                  <div className="w-1/3">
                    {lastCategories.map((lastCat, i) => (
                      <div
                        key={i}
                        className="flex justify-between border-b border-gray-300 p-2 cursor-pointer"
                        onClick={() => handleCategoryClick(lastCat.slug, lastCat.name)}
                      >
                        {lastCat.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <span className="font-extrabold text-xl p-3">{selectedCategory}</span>
        </div>
      </div>
      <div className="side-nav block py-3 bg-green-600 lg:hidden">
        <div className="w-[90%] mx-auto">
          <FontAwesomeIcon
            size="3x"
            icon={faBars}
            onClick={handleSideNavCategories}
            className="text-white cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
