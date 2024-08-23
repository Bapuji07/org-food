'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function CategoryShortcut() {
  const { slug } = useParams(); 
  const router = useRouter();

  // State for categories and products
  const [categories, setCategories] = useState<any>({});
  console.log(categories,'ffffffffffffffff')
    
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


  const handleCategoryClick = (slug: string) => {
    router.push(`/category/${slug}`);
  };

  return (
          <div className="flex flex-wrap gap-1">
            {categories.children?.map((category:any, i:any) => (
              <div
                key={i}
                className={`border h-10 border-gray-300 cursor-pointer rounded-full px-4 py-2 text-center text-sm font-semibold shadow-md ${
                  category.slug == slug ? 'bg-green-600 text-white' : 'bg-white'
                } transition-shadow duration-300`}
                onClick={() => handleCategoryClick(category.slug)}
              >
                {category.name}
              </div>
            ))}
          </div>  
  );
}
