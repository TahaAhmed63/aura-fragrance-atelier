
import React, { useEffect, useRef } from 'react';
import { Product } from '../types/product';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { cn } from '@/lib/utils';

// Function to get best selling products based on flags in product data
const getBestSellingProducts = () => {
  // Find products with bestselling flags
  const mensProduct = products.find(p => p.isMensBestSelling === true);
  const womensProduct = products.find(p => p.isWomensBestSelling === true);
  
  // Fallback products from categories if no flags are set
  const fallbackMens = mensProduct || products.find(p => p.variants && p.variants.length > 0);
  const fallbackWomens = womensProduct || products.find(p => p.categories.includes('Floral'));
  
  return [
    {
      id: 'mens',
      title: "Men's Best Selling Perfume",
      description: "Sophisticated and powerful fragrances crafted for the modern gentleman.",
      image: fallbackMens?.imageSrc || "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=1974&auto=format&fit=crop",
      product: fallbackMens || products[0],
      hasVariants: !!(fallbackMens?.variants && fallbackMens.variants.length > 0)
    },
    {
      id: 'womens',
      title: "Women's Best Selling Perfume",
      description: "Elegant and captivating scents designed for unforgettable impressions.",
      image: fallbackWomens?.imageSrc || "https://images.unsplash.com/photo-1617184003107-0df15fea4903?q=80&w=2070&auto=format&fit=crop",
      product: fallbackWomens || products[1],
      hasVariants: !!(fallbackWomens?.variants && fallbackWomens.variants.length > 0)
    }
  ];
};

interface BestSellingSectionProps {
  onProductSelect: (product: Product | null) => void;
}

const BestSellingSection: React.FC<BestSellingSectionProps> = ({ onProductSelect }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bestSellingItems = getBestSellingProducts();
  
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    
    if (!section || !title) return;
    
    // Create observer for the section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate title
          gsap.fromTo(title, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
          );
          
          // Animate cards
          gsap.fromTo('.best-selling-card',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power2.out", delay: 0.3 }
          );
          
          // Unobserve after animation
          observer.unobserve(section);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(section);
    
    return () => {
      observer.unobserve(section);
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-16 bg-perfume-purple">
      <div className="luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bestSellingItems.map((item) => (
            <div 
              key={item.id} 
              className="best-selling-card relative rounded overflow-hidden h-[400px] opacity-0 group cursor-pointer"
              onClick={() => item.product && onProductSelect(item.product)}
            >
              {/* Dark overlay and background */}
              <div className="absolute inset-0 bg-perfume-blue rounded overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-perfume-purple/80 to-perfume-blue/80"></div>
              </div>
              
              {/* Hand holding perfume image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="h-[85%] object-contain z-10"
                />
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <h3 className="text-3xl font-cormorant font-semibold text-white mb-2">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
        
        {/* Category filter buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <button className="px-6 py-2 bg-perfume-highlight text-perfume-darkPurple font-medium rounded-full">
            ALL
          </button>
          <button className="px-6 py-2 bg-perfume-darkPurple text-white font-medium rounded-full border border-perfume-purple/30">
            MEN
          </button>
          <button className="px-6 py-2 bg-perfume-darkPurple text-white font-medium rounded-full border border-perfume-purple/30">
            WOMEN
          </button>
          <button className="px-6 py-2 bg-perfume-darkPurple text-white font-medium rounded-full border border-perfume-purple/30">
            UNISEX
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellingSection;
