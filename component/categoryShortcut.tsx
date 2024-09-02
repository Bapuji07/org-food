'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelectedCategory } from '../context/selectedCategory';

export default function CategoryShortcut() {
  const { slug } = useParams(); 
  const router = useRouter();

  // State for categories and products
  const [categories, setCategories] = useState<any>({});
  const {setSelectedCategory}=useSelectedCategory()
    
  useEffect(() => {
    const getCategories = async () => {
      if (!slug) return; // Ensure slug is available
      try {
        const response = await fetch(`/api/category/${slug}?returnParent=true`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        console.log(data,'cat')
        setCategories(data); // Store fetched data in state
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
  }, [slug]);


  const handleCategoryClick = (slug: string,name:string) => {
    setSelectedCategory(name)
    router.push(`/category/${slug}`);
  };

  return (
          <div className="scroll-container flex flex-wrap gap-1 mb-5 w-full">
            {categories.children?.map((category:any, i:any) => (
              <div
                key={i}
                className={`border h-10 border-gray-300 cursor-pointer rounded-full px-4 py-2 text-center text-sm font-semibold shadow-md ${
                  category.slug == slug ? 'bg-green-600 text-white' : 'bg-white'
                } transition-shadow duration-300`}
                onClick={() => handleCategoryClick(category.slug,category.name)}
              >
                {category.name}
              </div>
            ))}
          </div>  
  );
}
