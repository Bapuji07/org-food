'use client';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductList from '../../../../component/productList';
import CategoryShortcut from '../../../../component/categoryShortcut';
import Shimmer from '../../../../component/shimmerui';
import FilterComponent from '../../../../component/filterBy';
import debounce from 'debounce';

export default function CategoryPage() {
  const { slug } = useParams(); 

  const [categories, setCategories] = useState<any>({});
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Flag for more products
  const [total, setTotal] = useState(0); // Total number of products
  const [maxPages, setMaxPages] = useState(1); // Maximum number of pages
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      if (!slug) return;
      try {
        const response = await fetch(`/api/category/${slug}?returnParent=false`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
        setProducts([]);  // Clear previous products
        setCurrentPage(1); // Reset pagination
        setHasMore(true);  // Reset hasMore flag
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    getCategories();
  }, [slug]);


  const collectCategoryIds = (category: any): string => {
    const categoryIds: any = [];
    const gatherIds = (cat: any) => {
      categoryIds.push(cat.id);
      if (cat.children) {
        cat.children.forEach((child: any) => gatherIds(child));
      }
    };
    gatherIds(category);
    return categoryIds.join(',');
  };

  const getProducts = async () => {
    if (!categories.id || isLoading || !hasMore) return;

    const categoryIds = categories.children ? collectCategoryIds(categories) : categories.id;
    setIsLoading(true);
    let query=''
if (Object.keys(filters).length > 0) {
  query = new URLSearchParams(filters).toString();
}
    try {
      const response = await fetch(`/api/products?page=${currentPage}&categoryId=${categoryIds}${query ? `&${query}` : ''}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      console.log(data,'data================>')

      const { total, page,maxPages } = data;
      
      // Set total products and max pages from API
      setTotal(total);
      setMaxPages(maxPages);

      if (page >= maxPages) {
        setHasMore(false); // No more pages to fetch
      }

      if (data.items.length > 0) {
        setProducts(prevProducts => [...prevProducts, ...data.items]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
    }
  };

 useEffect(() => {
  if (!categories.id || isLoading || !hasMore) return;  // Ensure categories are ready

  const fetchProducts = async () => {
    await getProducts();
  };

  fetchProducts();
}, [categories, currentPage,filters]);

useEffect(() => {
  // Reset products and pagination when filters change
  setProducts([]);  // Clear previous products
  setCurrentPage(1); // Reset pagination
  setHasMore(true);  // Reset hasMore flag
}, [filters]);
const handleScroll = debounce(() => {
  const threshold = window.innerHeight * 0.9; 
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold && !isLoading && hasMore) {
    // Only trigger pagination if near the bottom and allowed
    if (currentPage < maxPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }
}, 100); // Debounce with 100ms delay

useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [isLoading, hasMore,currentPage, maxPages]);

const handleFilterChange = (appliedFilters:any) => {
  setFilters(appliedFilters);
};
// let query=''
// if (Object.keys(filters).length > 0) {
//   query = new URLSearchParams(filters).toString();
// }

console.log(filters,'filters================>')

  return (
    <div className="bg-gray-100">
      <div className='container flex mx-auto p-4'>
        <div className="flex flex-col ps-20"style={{width:'75%'}}>
          <CategoryShortcut />
          <Suspense fallback={<Shimmer />}>
            <ProductList products={products} />
            {isLoading && <Shimmer />} {/* Show shimmer during loading */}
          </Suspense>
          {!hasMore && <p>No more products to load.</p>} {/* Message when all products are loaded */}
        </div>
        {
          !isLoading &&
        <FilterComponent onFilterChange={handleFilterChange} />
        }
      </div>
    </div>
  );
}
