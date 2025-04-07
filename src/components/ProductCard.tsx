
import React, { useRef, useEffect } from 'react';
import { Product } from '../types/product';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

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
    
    // Use IntersectionObserver for scroll-based animations instead of fixed delay
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
                // Once animation is complete, unobserve the element
                observer.unobserve(card);
              }
            }
          );
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible
    
    observer.observe(card);
    
    // Set up hover animation
    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = (x / rect.width - 0.5) * 2;
      const yPercent = (y / rect.height - 0.5) * 2;
      
      gsap.to(card, {
        rotationY: xPercent * 5,
        rotationX: -yPercent * 5,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out"
      });
      
      // Gold shine effect
      gsap.to(card.querySelector('.shine'), {
        opacity: 0.15,
        x: x,
        y: y,
        duration: 0.5
      });
    };
    
    const handleMouseLeave = () => {
      if (!card) return;
      
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out"
      });
      
      gsap.to(card.querySelector('.shine'), {
        opacity: 0,
        duration: 0.5
      });
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
        observer.unobserve(card);
      }
    };
  }, [index]);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "luxury-card rounded-lg overflow-hidden cursor-pointer opacity-0",
        "relative transform transition-all duration-300",
        "hover:translate-y-[-8px] hover:shadow-lg hover:shadow-gold/10"
      )}
      onClick={onClick}
    >
      <div className="shine absolute inset-0 w-[100px] h-[100px] rounded-full bg-gold opacity-0 blur-xl pointer-events-none"></div>
      
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.imageSrc}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-left">
            <span className="inline-block bg-gold/80 text-black text-xs px-2 py-1 rounded">
              {product.categories[0]}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4 text-left">
        <h3 className="text-xl font-semibold text-gray-100 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-3">{product.tagline}</p>
        <div className="flex justify-between items-center">
          <span className="text-gold font-semibold">${product.price}</span>
          <span className="text-xs uppercase tracking-wide text-gray-500">
            {product.longevity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
