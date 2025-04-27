
import React from 'react';

interface ProductImageProps {
  imageSrc: string;
  name: string;
  categories: string[];
}

const ProductImage = ({ imageSrc, name, categories }: ProductImageProps) => {
  return (
    <div className="md:w-5/12 h-[200px] md:h-auto">
      <div className="h-full relative">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-black/40 via-transparent to-transparent z-10"></div>
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-left">
            {categories.map((category, index) => (
              <span 
                key={index}
                className="inline-block bg-luxury-gold/80 text-black text-xs px-2 py-1 rounded mr-1 mb-1"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
