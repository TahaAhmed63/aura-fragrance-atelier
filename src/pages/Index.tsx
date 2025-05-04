
import React, { useState, useEffect } from 'react';
import { products, getUniqueCategories } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import FragranceFilter from '../components/FragranceFilter';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import Preloader from '../components/Preloader';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import BestSellingSection from '../components/BestSellingSection';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { totalItems } = useCart();
  const categories = getUniqueCategories();

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.categories.includes(selectedCategory))
    : products;

  useEffect(() => {
    // Animate the main heading
    gsap.from('.main-title span', {
      opacity: 0, 
      y: 20, 
      stagger: 0.05, 
      delay: 2.5, 
      duration: 0.8, 
      ease: "power2.out"
    });
    
    // Animate the subtitle
    gsap.from('.main-subtitle', {
      opacity: 0, 
      y: 20, 
      delay: 3, 
      duration: 0.8, 
      ease: "power2.out"
    });
    
    // Animate the banner
    gsap.from('.perfume-banner', {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      delay: 3.2,
      ease: "power2.out"
    });
  }, []);

  return (
    <>
      <Preloader />
      
      <div className="min-h-screen bg-luxury-black text-white">
        {/* Header hero */}
        <header className="relative min-h-[60vh] flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-luxury-black/50"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-transparent to-luxury-black"></div>
          </div>
          
          <div className="luxury-container relative z-10 text-center mt-20">
            <h1 className="main-title text-4xl md:text-5xl lg:text-6xl font-cormorant font-bold mb-6">
              {Array.from("Luxury Fragrances").map((char, index) => (
                <span key={index} className="inline-block">{char === " " ? "\u00A0" : char}</span>
              ))}
            </h1>
            <p className="main-subtitle text-gray-300 text-lg max-w-xl mx-auto">
              Discover our collection of exquisite perfumes, crafted with the finest ingredients to create unforgettable sensory experiences.
            </p>
          </div>
        </header>
        
        {/* Perfume Banner */}
        <div className="perfume-banner relative py-16 bg-gradient-to-b from-luxury-black to-[#3c1c0e] overflow-hidden">
          <div className="luxury-container flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold mb-4 gold-gradient">
                Mokhalat
              </h2>
              <p className="text-gold-light text-xl mb-6 font-cormorant italic">
                Discover the essence of luxury
              </p>
              <p className="text-gray-300 mb-8 max-w-md">
                Indulge in the rich, exotic fragrance of Mokhalat, a masterpiece of perfumery that combines rare oud, precious spices, and delicate florals for an unforgettable sensory experience.
              </p>
              <button 
                onClick={() => {
                  const mokhalatProduct = products.find(p => p.name.includes('Mokhalat') || p.categories.includes('Oriental'));
                  if (mokhalatProduct) setSelectedProduct(mokhalatProduct);
                }}
                className="bg-gold hover:bg-gold-light text-luxury-black font-medium px-6 py-3 rounded-sm transition-colors"
              >
                Explore Mokhalat
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end relative">
              <div className="relative w-[300px] h-[400px] overflow-hidden">
                <img 
                  src="/lovable-uploads/05f2fd51-26fe-45ec-94cf-7fc4a49faefd.png" 
                  alt="Mokhalat Luxury Fragrance" 
                  className="w-full h-full object-contain"
                />
                <div className="absolute -bottom-10 -left-10 -right-10 h-20 bg-gradient-to-t from-[#3c1c0e] to-transparent"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
        
        {/* Best Selling Products Section */}
        <BestSellingSection onProductSelect={setSelectedProduct} />
        
        {/* Main content */}
        <main className="luxury-container py-12">
          {/* Filters */}
          <FragranceFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
                index={index}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400">No products found in this category.</p>
            </div>
          )}
        </main>
      </div>
      
      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  );
};

export default Index;
