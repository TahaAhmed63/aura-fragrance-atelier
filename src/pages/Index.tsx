
import React, { useState, useEffect } from 'react';
import { products, getUniqueCategories } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import Preloader from '../components/Preloader';
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
      
      <div className="min-h-screen bg-purple-950 text-white">
        {/* Background pattern */}
        <div className="bg-pattern fixed inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 opacity-30">
            <img
              src="/lovable-uploads/5e3bbcbf-33e1-4fd6-9eea-e14c811d865f.png" 
              alt="Background Pattern"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="main-container relative z-10">
          {/* Best Selling Products Section */}
          <BestSellingSection onProductSelect={setSelectedProduct} />
          
          {/* Main content */}
          <main className="luxury-container py-20">
            <h2 className="text-3xl font-bold purple-gradient-text text-center mb-12">
              Our Exclusive Collection
            </h2>
            
            {/* Category filter buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`px-8 py-3 font-medium rounded-full shadow-md transition-colors ${!selectedCategory ? 'bg-purple-500 text-white' : 'bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-700/50'}`}
              >
                ALL
              </button>
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-8 py-3 font-medium rounded-full shadow-md transition-colors ${selectedCategory === category ? 'bg-purple-500 text-white' : 'bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-700/50'}`}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </div>
            
            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
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
                <p className="text-purple-300">No products found in this category.</p>
              </div>
            )}
          </main>
          
          {/* Footer with dark purple background */}
          <footer className="bg-purple-950 pt-20 pb-10">
            <div className="luxury-container">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                  <h3 className="text-2xl font-cormorant font-bold purple-gradient-text mb-6">Luxury Fragrances</h3>
                  <p className="text-purple-200">
                    Discover our collection of exquisite perfumes, crafted with the finest ingredients 
                    to create unforgettable sensory experiences.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">Navigation</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-purple-300 hover:text-white transition-colors">Home</a></li>
                    <li><a href="#" className="text-purple-300 hover:text-white transition-colors">Shop</a></li>
                    <li><a href="#" className="text-purple-300 hover:text-white transition-colors">Checkout</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">Newsletter</h3>
                  <p className="text-purple-300 mb-4">
                    Subscribe to our newsletter for latest updates
                  </p>
                  <div className="flex">
                    <input 
                      type="email" 
                      placeholder="Your email" 
                      className="px-4 py-2 bg-purple-900/50 border border-purple-700/30 text-white rounded-l-md focus:outline-none"
                    />
                    <button className="px-6 py-2 bg-purple-500 hover:bg-purple-400 text-white font-medium rounded-r-md transition-colors">
                      SUBSCRIBE
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-purple-800/30 text-center text-purple-400 text-sm">
                © 2025 Luxury Fragrances. All rights reserved.
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
