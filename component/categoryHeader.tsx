'use client';

import { useEffect, useState,useContext } from 'react';
import { useRouter } from 'next/navigation';
import { faAngleDown, faAngleRight,faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelectedCategory } from '../context/selectedCategory';
import { useCategories } from '../hooks/useGetCategories';
import SideNavCategoryContext from '../context/sideNavCategory';
interface Category {
  name: string;
  slug: string;
  children?: Category[];
}

export default function CategoryFilter({onCategoryChange}:any) {
  const router = useRouter();
  // const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [lastCategories, setLastCategories] = useState<Category[]>([]);
  const {selectedCategory,setSelectedCategory}=useSelectedCategory()
  const { allCategoriesss, fetchCategories } = useCategories();

  // const context = useContext(SideNavCategoryContext);
  // if (!context) {
  //   throw new Error("LayoutContent must be used within a SideNavCategoryProvider");
  // }

  // const { setShowSideNavCategory } = context;
  const handleSideNavCategories=(value:boolean)=>{
    onCategoryChange(value)
  }

  console.log(selectedCategory,'selected')
  useEffect(()=>{
    fetchCategories()
    // setAllCategories(allCategoriesss)
  },[])

  console.log(allCategoriesss,'fffffffffffffffffff')
  // console.log(allCategories,'pppppppppppppppppp')

  // useEffect(() => {
  //   const getCategories = async () => {
  //     try {
  //       const response = await fetch('/api/category');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch categories');
  //       }
  //       const data: Category[] = await response.json();
  //       console.log(data,'ggg')
  //       setAllCategories(data);
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };

  //   getCategories();
  // }, []);

  const handleCategoryClick = (selectedCategory: string,selectedCategoryName:string) => {
    setSelectedCategory(selectedCategoryName);
    router.push(`/category/${selectedCategory}`);
    setShowCategory(false); 
  };

  const handleMouseEnter = (cat: Category, level: 'sub' | 'last') => {
    if (level === 'sub') {
      setSubCategories(cat.children || []); // Set subcategories
      setLastCategories([]); 
    } else if (level === 'last') {
      setLastCategories(cat.children || []); // Set last-level categories
    }
  };

  const handleCategoryMouseEnter = () => setShowCategory(true);
  const handleMouseLeave = () => {
    setShowCategory(false);
    setSubCategories([]);
    setLastCategories([]);
  };

  return (
    < div >
      <div
        className="flex gap-4 hidden lg:block   py-4 border-b-4 border-green-600  bg-white">
        <div className="relative flex  w-[90%] lg:w-[85%] 2xl:w-[75%] mx-auto" onMouseLeave={handleMouseLeave}>
          <div
            className="flex items-center gap-2 font-extrabold text-green-600 text-xl p-3 ">
            <div onMouseEnter={handleCategoryMouseEnter}  className='inline-flex gap-2 items-center cursor-pointer'>
            <p>ALL CATEGORIES</p>
            <FontAwesomeIcon icon={faAngleDown} className="text-xl" />

            </div>
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
                      onClick={() => handleCategoryClick(cat.slug,cat.name)}
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
                        onClick={() => handleCategoryClick(subCat.slug,subCat.name)}
                      >
                        {subCat.name} <FontAwesomeIcon className="text-green-600" icon={faAngleRight} />
                      </div>
                    ))}
                  </div>
                )}

                {lastCategories.length > 0 && (
                  <div className="w-1/3 ">
                    {lastCategories.map((lastCat, i) => (
                      <div
                        key={i}
                        className="flex justify-between border-b border-gray-300 p-2 cursor-pointer"
                        onClick={() => handleCategoryClick(lastCat.slug,lastCat.name)}
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
      <div className='side-nav  block py-3 bg-green-600 lg:hidden'>
        <div className='w-[90%]  mx-auto'>
      <FontAwesomeIcon size='3x' icon={faBars} onClick={()=>handleSideNavCategories(prev=>!prev)} className='text-white' />
        </div>
      </div>
    </div>
  );
}
