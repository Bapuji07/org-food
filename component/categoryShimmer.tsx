import React from 'react';

export default function ShimmerCategoryShortcut() {
  
  return (
    <div className="flex flex-wrap gap-1">
      {
Array(8).fill(null).map((_, i) => (
  <div
    key={i}
    className="h-10 w-24  bg-white animate-pulse rounded-full shadow-md"
  ></div>
))
      }
    </div>
  );
}
