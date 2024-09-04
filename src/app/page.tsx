'use client'
import React from 'react'
import { useCategoryData } from '../../context/categoryData'
import { useRouter } from 'next/navigation'
import { useSelectedCategory } from '../../context/selectedCategory'
interface Category{
  name:string
  slug:string
  image:{url:string}
}

const Page = () => {
  const {setSelectedCategory}=useSelectedCategory()
  const{categoryData}=useCategoryData()
  const router=useRouter()
const handleCategory=(slug:string,name:string)=>{
  router.push(`category/${slug}`)
  setSelectedCategory(name)

}
  
  return (
    <div className='bg-gray-100'>
<div className=' w-[90%] lg:w-[85%] 2xl:w-[75%] mx-auto py-5 '>
      <h1 className='text-2xl font-bold p-4 ' style={{color:'#29a637'}}>Shop by Category</h1>
      <div className='categoty-content grid gap-3 items-center'>

      {categoryData.map((cat:Category,i)=>(
        <div key={i} onClick={()=>handleCategory(cat.slug,cat.name)} className='bg-white border cursor-pointer rounded-lg p-2 flex flex-col justify-items-center justify-center  h-full w-full'>
          <p className='font-semibold text-sm my-2 text-center'>{cat.name}</p>
          <div className='h-2/3 w-2/3 m-auto '>
            <img src={cat.image.url} alt={cat.name} />
          </div>
        </div>
      ))}
      </div>
    </div>
    </div>
    
  )
}

export default Page