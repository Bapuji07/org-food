'use client';
import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductList from '../../../../component/productList';
import CategoryShortcut from '../../../../component/categoryShortcut';
import Shimmer from '../../../../component/shimmerui';
import { lazy } from 'react';
import dynamic from 'next/dynamic';
// const ProductList=dynamic(()=>import('../../../../component/productList'),{
//   loading:()=><Shimmer/>,
//   ssr:false
// }
// )

export default function CategoryPage() {
  const { slug } = useParams(); 
  const router = useRouter();

  // State for categories and products
  const [categories, setCategories] = useState<any>({});
  const [products, setProducts] = useState<any[]>([]);
  const shortHandCategory = categories.children || [];
  console.log(categories,'p')
  console.log(shortHandCategory,'l')
    
  useEffect(() => {
    const getCategories = async () => {
      if (!slug) return; // Ensure slug is available
      try {
        const response = await fetch(`/api/category/${slug}?returnParent=false`);
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

   // Utility function to collect all category IDs (including nested children)
   const collectCategoryIds = (category: any): string => {
    const categoryIds:any = [];
    const gatherIds = (cat: any) => {
      categoryIds.push(cat.id);
      if (cat.children) {
        cat.children.forEach((child: any) => gatherIds(child));
      }
    };

    gatherIds(category);
    return categoryIds.join(',');
  };

  // Fetch products when categories are loaded
  useEffect(() => {
    const getProducts = async () => {
      if (!categories.id) return; // Ensure categories have been loaded

      const categoryIds =categories.children? collectCategoryIds(categories):categories.id
      console.log(categoryIds, 'collected category IDs');

      try {
        const response = await fetch(`/api/products?categoryId=${categoryIds}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log(data,'pro')
        setProducts(data.items);
        console.log(products,'ppppppppp')
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
  }, [categories]); // Dependency array includes categories to refetch when categories change

  const handleClick = (product: any) => {
    const { id } = product;
    router.push(`/product/${id}`);
  };


  const handleCategoryClick = (slug: string) => {
    router.push(`/category/${slug}`);
  };

  return (
    <div className="bg-gray-100">
      <div className='container p-5'>
        <div className="flex flex-col ps-20  " style={{width:'75%'}} >
          <CategoryShortcut/>
          <Suspense fallback={<Shimmer/>}>

          <ProductList products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
