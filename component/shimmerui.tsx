import React from 'react';

export default function Shimmer() {
  return (
    <div className="animate-pulse p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Simulating multiple shimmer cards */}
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="border border-gray-200 bg-white rounded-lg flex flex-col justify-between p-5"
            style={{ height: '350px', width: '200px' }}
          >
            {/* Image shimmer */}
            <div className="h-36 bg-gray-300 rounded-lg mb-4"></div>

            {/* Text shimmer */}
            <div className="flex flex-col gap-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>

            {/* Button shimmer */}
            <div className="h-8 mt-auto bg-gray-300 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
