
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
    // Animate the background
    gsap.from('.bg-pattern', {
      opacity: 0,
      duration: 1.5,
      delay: 2.5,
      ease: "power2.out"
    });
    
    // Animate the main container
    gsap.from('.main-container', {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 2.8,
      ease: "power2.out"
    });
  }, []);

  return (
    <>
      <Preloader />
      
      <div className="min-h-screen bg-perfume-purple text-white">
        {/* Background pattern */}
        <div className="bg-pattern fixed inset-0 z-0 opacity-50 pointer-events-none">
          <div className="absolute inset-0 opacity-30">
            <img
              src="/lovable-uploads/5e3bbcbf-33e1-4fd6-9eea-e14c811d865f.png" 
              alt="Background Pattern"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="main-container relative z-10">
          {/* Best Selling Products Section - Using the new design */}
          <BestSellingSection onProductSelect={setSelectedProduct} />
          
          {/* Main content */}
          <main className="luxury-container py-12">
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
          
          {/* Footer with dark purple background */}
          <footer className="bg-perfume-darkPurple py-16">
            <div className="luxury-container">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-2xl font-cormorant font-bold text-white mb-4">Luxury Fragrances</h3>
                  <p className="text-sm text-gray-300">
                    Discover our collection of exquisite perfumes, crafted with the finest ingredients 
                    to create unforgettable sensory experiences.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-sm text-gray-300 hover:text-white">Home</a></li>
                    <li><a href="#" className="text-sm text-gray-300 hover:text-white">Shop</a></li>
                    <li><a href="#" className="text-sm text-gray-300 hover:text-white">Checkout</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Subscribe to our newsletter for latest updates
                  </p>
                  <button className="px-6 py-2 bg-perfume-highlight text-perfume-darkPurple font-medium">
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </div>
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
