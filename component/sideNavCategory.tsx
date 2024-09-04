'use client';
import React from "react";
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

    const handleCategoryClick = (slug: string) => {
        router.push(`/category/${slug}`);
        if (onCategoryChange) {
            onCategoryChange(false);
        }
    };

    return (
        <div>
            {categoryData.map((cat: Category, i: number) => (
                <div key={i} className="bg-white">
                    <div 
                        className="w-full py-3 px-2 font-bold flex mb-2 justify-between bg-gray-100 cursor-pointer" 
                        onClick={() => handleCategoryClick(cat.slug)}
                    >
                        {cat.name}
                        <FontAwesomeIcon style={{color:'#29a637'}} icon={faAngleRight} />
                    </div>
                </div>
            ))}
        </div>
    );
}
