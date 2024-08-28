'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

// Define the shape of the context state
interface SelectedCategoryContextType {
  selectedCategory: string;
  setSelectedCategory: (data: string) => void;
}

// Create the context with default values
const SelectedCategoryContext = createContext<SelectedCategoryContextType | undefined>(undefined);

// Provider component to wrap around parts of the app that need access to the context
export const SelectedCategoryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <SelectedCategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </SelectedCategoryContext.Provider>
  );
};

// Custom hook for easier access to the context
export const useSelectedCategory = () => {
  const context = useContext(SelectedCategoryContext);
  if (!context) {
    throw new Error("useselectedCategory must be used within a SelectedCategoryProvider");
  }
  return context;
};

export default SelectedCategoryContext;
