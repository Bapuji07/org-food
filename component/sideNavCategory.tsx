'use client'
import React, { useEffect } from "react"
import { useCategories } from "../hooks/useGetCategories"
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from "next/navigation";

interface Category {
    name: string;
    slug: string;
    children?: Category[];
}

interface UseCategoriesReturn {
    allCategoriesss: Category[];
    fetchCategories: () => void;
}

export default function SideNavCategory({ onCategoryChange }: any) {
    const { allCategoriesss, fetchCategories }: UseCategoriesReturn = useCategories();
    const router = useRouter()

    useEffect(() => {
        fetchCategories()
    }, [])

    console.log(allCategoriesss, 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
    const handleCategoryClick = (slug: string) => {
        router.push(`/category/${slug}`)
        if (onCategoryChange) {
            onCategoryChange(false);
        }
    }


    return (
        <div>
            {
                allCategoriesss.map((cat, i) => (
                    <div key={i} className=" bg-white">
                        <div className="w-full py-3 px-1 font-bold flex mb-2 justify-between bg-gray-200" onClick={() => handleCategoryClick(cat.slug)}>{cat.name} <FontAwesomeIcon className="text-green-600" icon={faAngleRight} /> </div>
                    </div>
                ))

            }
        </div>
    )
}