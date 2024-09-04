'use client';
import React, { useEffect } from "react";
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from "next/navigation";
import { useCategoryData } from "../context/categoryData";

interface Category {
    name: string;
    slug: string;
    children?: Category[];
}

interface SideNavCategoryProps {
    onCategoryChange?: (value: boolean) => void;
}

export default function SideNavCategory({ onCategoryChange }: SideNavCategoryProps) {
    const { categoryData } = useCategoryData();
    const router = useRouter();

    // Handle the case where window size is greater than 1024
    useEffect(() => {
        const checkWindowSize = () => {
            if (window.innerWidth > 1024 && onCategoryChange) {
                onCategoryChange(false);
            }
        };

        // Check on mount
        checkWindowSize();

        // Add event listener to track window resize
        window.addEventListener('resize', checkWindowSize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkWindowSize);
        };
    }, [onCategoryChange]);

    const handleCategoryClick = (slug: string) => {
        router.push(`/category/${slug}`);
        if (onCategoryChange) {
            onCategoryChange(false);
        }
    };

    return (
        <div className="z-50 relative top-0 left-0">
            {categoryData.map((cat: Category, i: number) => (
                <div key={i} className="bg-white">
                    <div 
                        className="w-full py-3 px-2 font-bold flex mb-2 justify-between bg-gray-100 cursor-pointer" 
                        onClick={() => handleCategoryClick(cat.slug)}
                    >
                        {cat.name}
                        <FontAwesomeIcon style={{ color: '#29a637' }} icon={faAngleRight} />
                    </div>
                </div>
            ))}
        </div>
    );
}
