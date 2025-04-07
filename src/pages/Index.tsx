
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
