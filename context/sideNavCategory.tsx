'use client';
import { createContext, ReactNode, useState } from 'react';

// Define the shape of the context state
interface SideNavCategoryContextType {
    showSideNavCategory: boolean;
    setShowSideNavCategory: (data: boolean) => void;
}

// Create the context with default values
export const SideNavCategoryContext = createContext<SideNavCategoryContextType | undefined>(undefined);

// Provider component to wrap around parts of the app that need access to the context
export const SideNavCategoryProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [showSideNavCategory, setShowSideNavCategory] = useState<boolean>(false); // Initializing with `false`

  return (
    <SideNavCategoryContext.Provider value={{ showSideNavCategory, setShowSideNavCategory }}>
      {children}
    </SideNavCategoryContext.Provider>
  );
};

export default SideNavCategoryContext;
