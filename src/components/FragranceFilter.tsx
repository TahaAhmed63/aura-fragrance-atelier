
import React from 'react';
import { cn } from '@/lib/utils';

interface FragranceFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const FragranceFilter = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: FragranceFilterProps) => {
  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex space-x-2 min-w-max">
        <button
          onClick={() => onSelectCategory(null)}
          className={cn(
            "text-sm px-4 py-2 rounded-full transition-all duration-200",
            selectedCategory === null
              ? "bg-gold text-black"
              : "bg-luxury-gray text-gray-300 hover:bg-luxury-light"
          )}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "text-sm px-4 py-2 rounded-full transition-all duration-200",
              selectedCategory === category
                ? "bg-gold text-black"
                : "bg-luxury-gray text-gray-300 hover:bg-luxury-light"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FragranceFilter;
