'use client'
import { useState } from 'react';

// Define Category type (adjust according to your API response structure)
// type Category = {
//   id: number;
//   name: string;
// };

export const useCategories = () => {
  const [allCategoriesss, setAllCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      console.log(data, 'Categories fetched');
      setAllCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return { allCategoriesss, fetchCategories };
};
