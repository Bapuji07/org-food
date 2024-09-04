'use client';
import { createContext, ReactNode, useState,useContext } from 'react';

// Define the shape of the context state
interface CategoryDataContextType {
    categoryData: [];
    setCategoryData: (data: [])=>void
}

// Create the context with default values
export const CategoryDataContext = createContext<CategoryDataContextType | undefined>(undefined);

// Provider component to wrap around parts of the app that need access to the context
export const CategoryDataProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [categoryData, setCategoryData] = useState<[]>([]); 

  return (
    <CategoryDataContext.Provider value={{ categoryData, setCategoryData }}>
      {children}
    </CategoryDataContext.Provider>
  );
};

export const useCategoryData = () => {
    const context = useContext(CategoryDataContext);
    if (!context) {
      throw new Error("useCategoryData must be used within a CategoryDataProvider");
    }
    return context;
  };

export default CategoryDataContext;
