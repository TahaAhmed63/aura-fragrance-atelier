
import React from 'react';
import { ProductVariant } from '../types/product';
import { cn } from '@/lib/utils';

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  baseProduct: {
    name: string;
    price: number;
    imageSrc: string;
    description: string;
  };
  onSelectVariant: (variant: ProductVariant | null) => void;
}

const ProductVariantSelector = ({
  variants,
  selectedVariant,
  baseProduct,
  onSelectVariant
}: ProductVariantSelectorProps) => {
  // Handle selecting base product (no variant)
  const handleSelectBaseProduct = () => {
    onSelectVariant(null);
  };

  return (
    <div className="border-t border-luxury-gray my-3 pt-3">
      <h4 className="text-gold text-xs font-medium mb-2">PRODUCT VARIANTS</h4>
      
      <div className="flex flex-col gap-2 mb-3">
        {/* Base product option */}
        <div 
          className={cn(
            "border border-luxury-gray rounded-md p-2 cursor-pointer transition-all",
            !selectedVariant ? "border-gold bg-luxury-dark" : "hover:bg-luxury-dark/50"
          )}
          onClick={handleSelectBaseProduct}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-200">Standard Edition</p>
              <p className="text-xs text-gray-400">${baseProduct.price}</p>
            </div>
            <div className={cn(
              "w-4 h-4 rounded-full border",
              !selectedVariant ? "border-gold bg-gold/30" : "border-gray-500"
            )} />
          </div>
        </div>
        
        {/* Variant options */}
        {variants.map((variant) => (
          <div 
            key={variant.id}
            className={cn(
              "border border-luxury-gray rounded-md p-2 cursor-pointer transition-all",
              selectedVariant?.id === variant.id ? "border-gold bg-luxury-dark" : "hover:bg-luxury-dark/50"
            )}
            onClick={() => onSelectVariant(variant)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-200">{variant.name}</p>
                <p className="text-xs text-gray-400">${variant.price || baseProduct.price}</p>
                {variant.description && (
                  <p className="text-xs text-gray-500 mt-1 italic">{variant.description}</p>
                )}
              </div>
              <div className={cn(
                "w-4 h-4 rounded-full border",
                selectedVariant?.id === variant.id ? "border-gold bg-gold/30" : "border-gray-500" 
              )} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductVariantSelector;
