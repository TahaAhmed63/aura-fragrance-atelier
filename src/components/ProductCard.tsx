
import React, { useRef, useEffect } from 'react';
import { Product } from '../types/product';
import gsap from 'gsap';
import { cn } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  index: number;
}

const ProductCard = ({ product, onClick, index }: ProductCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    // Use IntersectionObserver for scroll-based animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate when element comes into view
          gsap.fromTo(card, 
            { y: 50, opacity: 0 },
            { 
              y: 0,
              opacity: 1, 
              duration: 0.8, 
              delay: index * 0.1, 
              ease: "power3.out",
              onComplete: () => {
                observer.unobserve(card);
              }
            }
          );
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(card);
    
    return () => {
      if (card) {
        observer.unobserve(card);
      }
    };
  }, [index]);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "relative bg-perfume-darkPurple rounded overflow-hidden cursor-pointer opacity-0",
        "transform transition-all duration-300",
        "hover:translate-y-[-8px]"
      )}
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden bg-perfume-blue/30 flex items-center justify-center">
        <img
          src={product.imageSrc}
          alt={product.name}
          className="h-[85%] object-contain"
        />
      </div>
      
      <div className="p-4 text-left">
        <h3 className="text-xl font-semibold text-white mb-1">{product.name}</h3>
        <p className="text-sm text-yellow-400 mb-3">Inspired Perfume</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-400">{product.longevity}</span>
          <button className="px-4 py-1.5 bg-yellow-400 text-perfume-darkPurple text-xs font-semibold rounded flex items-center gap-1">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
