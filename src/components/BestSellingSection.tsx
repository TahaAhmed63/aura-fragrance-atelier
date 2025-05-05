
import React, { useEffect, useRef } from 'react';
import { Product } from '../types/product';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { products } from '../data/products';

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
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-purple-950 to-purple-900">
      <div className="luxury-container">
        <h2 ref={titleRef} className="text-4xl font-bold text-white text-center mb-12 purple-gradient-text">
          Best Selling Collections
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bestSellingItems.map((item) => (
            <div 
              key={item.id} 
              className="best-selling-card relative rounded-xl overflow-hidden h-[450px] opacity-0 group cursor-pointer shadow-xl"
              onClick={() => item.product && onProductSelect(item.product)}
            >
              {/* Dark overlay and background */}
              <div className="absolute inset-0 bg-purple-800 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-950/90 to-purple-800/90"></div>
              </div>
              
              {/* Image */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="h-[85%] object-contain z-10 transform transition-all duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                <h3 className="text-3xl font-cormorant font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-purple-200 mb-6 max-w-md">{item.description}</p>
                <button className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-medium rounded-md inline-flex items-center gap-2 transition-colors">
                  SHOP NOW
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Category filter buttons */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-purple-500 hover:bg-purple-400 text-white font-medium rounded-full shadow-lg transition-colors">
            ALL
          </button>
          <button className="px-8 py-3 bg-purple-900/80 hover:bg-purple-800 text-purple-200 font-medium rounded-full border border-purple-700/50 shadow-lg transition-colors">
            MEN
          </button>
          <button className="px-8 py-3 bg-purple-900/80 hover:bg-purple-800 text-purple-200 font-medium rounded-full border border-purple-700/50 shadow-lg transition-colors">
            WOMEN
          </button>
          <button className="px-8 py-3 bg-purple-900/80 hover:bg-purple-800 text-purple-200 font-medium rounded-full border border-purple-700/50 shadow-lg transition-colors">
            UNISEX
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellingSection;
