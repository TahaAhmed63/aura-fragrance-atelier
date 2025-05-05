
import React, { useRef, useEffect } from 'react';
import { Product } from '../types/product';
import gsap from 'gsap';
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
      className="relative bg-purple-800/90 rounded-xl overflow-hidden cursor-pointer opacity-0 shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden bg-purple-700/20 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-purple-900/10 backdrop-blur-sm"></div>
        <img
          src={product.imageSrc}
          alt={product.name}
          className="h-[85%] object-contain transform transition-all duration-300 hover:scale-105 z-10"
        />
      </div>
      
      <div className="p-6 text-left">
        <h3 className="text-xl font-semibold text-white mb-1">{product.name}</h3>
        <p className="text-sm text-purple-300 mb-3">Inspired Perfume</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-purple-300">{product.longevity}</span>
          <button className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white text-sm font-semibold rounded-md flex items-center gap-2 transition-colors">
            <ShoppingCart size={16} />
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
