
import React from 'react';
import { cn } from '@/lib/utils';

interface AddToCartSectionProps {
  price: number;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onAddToCart: () => void;
}

const AddToCartSection = ({ 
  price, 
  quantity, 
  onIncrement, 
  onDecrement, 
  onAddToCart 
}: AddToCartSectionProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl md:text-2xl text-gold font-cormorant font-semibold">
          ${price}
        </span>
        
        <div className="flex items-center">
          <button 
            onClick={onDecrement}
            className="bg-luxury-gray h-7 w-7 md:h-8 md:w-8 flex items-center justify-center rounded-l"
          >
            -
          </button>
          <span className="bg-luxury-dark h-7 w-8 md:h-8 md:w-10 flex items-center justify-center">
            {quantity}
          </span>
          <button 
            onClick={onIncrement}
            className="bg-luxury-gray h-7 w-7 md:h-8 md:w-8 flex items-center justify-center rounded-r"
          >
            +
          </button>
        </div>
      </div>
      
      <button
        onClick={onAddToCart}
        className={cn(
          "btn-gold rounded w-full py-2 md:py-3",
          "transform transition hover:scale-[1.02] active:scale-[0.98]"
        )}
      >
        Add to Cart
      </button>
    </>
  );
};

export default AddToCartSection;
