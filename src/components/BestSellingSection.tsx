
import React, { useEffect, useRef } from 'react';
import { Product } from '../types/product';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

// Function to get best selling products based on flags in product data
const getBestSellingProducts = () => {
  // Find products with bestselling flags
  const mensProduct = products.find(p => p.isMensBestSelling === true);
  const womensProduct = products.find(p => p.isWomensBestSelling === true);
  const arabicProduct = products.find(p => p.isArabicBestSelling === true);

  // Fallback products from categories if no flags are set
  const fallbackMens = mensProduct || products.find(p => p.variants && p.variants.length > 0);
  const fallbackWomens = womensProduct || products.find(p => p.categories.includes('Floral'));
  const fallbackArabic = arabicProduct || products.find(p => p.categories.includes('Oriental') && p.id !== mensProduct?.id);

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
    },
    {
      id: 'arabic',
      title: "Arabic Ether",
      description: "Exotic and luxurious fragrances with rich oud and spices from the East.",
      image: fallbackArabic?.imageSrc || "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=2070&auto=format&fit=crop",
      product: fallbackArabic || products[2],
      hasVariants: !!(fallbackArabic?.variants && fallbackArabic.variants.length > 0)
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
    <section ref={sectionRef} className="py-16 bg-luxury-dark">
      <div className="luxury-container">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-cormorant font-bold mb-12 text-center opacity-0">
          <span className="inline-block relative">
            Best Selling Products
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"></span>
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {bestSellingItems.map((item) => (
            <div 
              key={item.id} 
              className="best-selling-card relative rounded-lg overflow-hidden h-[400px] opacity-0 group cursor-pointer"
              onClick={() => item.product && onProductSelect(item.product)}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black to-transparent opacity-90"></div>
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-cormorant font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300 mb-4">{item.description}</p>
                
                {/* Price tag and variants badge */}
                {item.product && (
                  <div className="mb-4 flex items-center gap-2">
                    <span className="inline-block bg-gold/90 text-black text-sm px-3 py-1 rounded">
                      ${item.product.price}
                    </span>
                    
                    {item.hasVariants && (
                      <span className="inline-block bg-luxury-gray/60 text-gold text-xs px-2 py-1 rounded border border-gold/30">
                        Multiple Variants
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <button 
                    className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded border border-gold/50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      item.product && onProductSelect(item.product);
                    }}
                  >
                    View Details
                  </button>
                  
                  <Link 
                    to="/shop" 
                    className="inline-flex items-center text-gold hover:text-gold-light transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="mr-2">Explore</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              
              {/* Gold border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold transition-colors rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingSection;
