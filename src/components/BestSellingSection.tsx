
import React, { useEffect, useRef } from 'react';
import { Product } from '../types/product';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

// Sample best selling products data
const bestSellingCategories = [
  {
    id: 'mens',
    title: "Men's Best Selling Perfume",
    description: "Sophisticated and powerful fragrances crafted for the modern gentleman.",
    image: "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 'womens',
    title: "Women's Best Selling Perfume",
    description: "Elegant and captivating scents designed for unforgettable impressions.",
    image: "https://images.unsplash.com/photo-1617184003107-0df15fea4903?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 'arabic',
    title: "Arabic Ether",
    description: "Exotic and luxurious fragrances with rich oud and spices from the East.",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=2070&auto=format&fit=crop"
  }
];

interface BestSellingSectionProps {
  onProductSelect: (product: Product | null) => void;
}

const BestSellingSection: React.FC<BestSellingSectionProps> = ({ onProductSelect }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
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
          {bestSellingCategories.map((category, index) => (
            <div 
              key={category.id} 
              className="best-selling-card relative rounded-lg overflow-hidden h-[400px] opacity-0 group cursor-pointer"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black to-transparent opacity-90"></div>
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-cormorant font-semibold text-white mb-2">{category.title}</h3>
                <p className="text-sm text-gray-300 mb-6">{category.description}</p>
                <Link 
                  to="/shop" 
                  className="inline-flex items-center text-gold hover:text-gold-light transition-colors"
                >
                  <span className="mr-2">Explore Collection</span>
                  <ArrowRight size={16} />
                </Link>
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
