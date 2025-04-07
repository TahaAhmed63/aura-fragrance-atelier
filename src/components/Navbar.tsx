
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

const Navbar = () => {
  const { totalItems, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate the navbar when it's mounted
    gsap.from('.nav-item', {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      delay: 2.5 // Start after preloader
    });

    gsap.from('.nav-logo', {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power2.out',
      delay: 2.3 // Start after preloader
    });
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled ? "py-2 bg-luxury-black/90 backdrop-blur" : "py-6 bg-transparent"
      )}
    >
      <div className="luxury-container flex justify-between items-center">
        <Link to="/" className="nav-logo">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/04_07_2025_X-Design (1).png" 
              alt="Bliss & Bless Logo" 
              className="h-10 w-10 mr-2"
            />
            <h1 className="text-gold text-xl font-semibold font-cormorant tracking-widest">BLISS & BLESS</h1>
          </div>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-300 hover:text-gold transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`nav-item text-sm tracking-wider hover:text-gold transition-colors ${location.pathname === '/' ? 'text-gold' : 'text-gray-300'}`}
          >
            HOME
          </Link>
          <Link 
            to="/shop" 
            className={`nav-item text-sm tracking-wider hover:text-gold transition-colors ${location.pathname === '/shop' ? 'text-gold' : 'text-gray-300'}`}
          >
            SHOP
          </Link>
          <Link 
            to="/checkout" 
            className={`nav-item text-sm tracking-wider hover:text-gold transition-colors ${location.pathname === '/checkout' ? 'text-gold' : 'text-gray-300'}`}
          >
            CHECKOUT
          </Link>
          <button 
            className="nav-item relative hover:text-gold transition-colors"
            onClick={toggleCart}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-black text-xs h-5 w-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile menu (dropdown) */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-luxury-black glass-morphism mt-2 py-4 px-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-sm tracking-wider hover:text-gold transition-colors ${location.pathname === '/' ? 'text-gold' : 'text-gray-300'}`}
                onClick={() => setMenuOpen(false)}
              >
                HOME
              </Link>
              <Link 
                to="/shop" 
                className={`text-sm tracking-wider hover:text-gold transition-colors ${location.pathname === '/shop' ? 'text-gold' : 'text-gray-300'}`}
                onClick={() => setMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link 
                to="/checkout" 
                className={`text-sm tracking-wider hover:text-gold transition-colors ${location.pathname === '/checkout' ? 'text-gold' : 'text-gray-300'}`}
                onClick={() => setMenuOpen(false)}
              >
                CHECKOUT
              </Link>
              <button 
                className="flex items-center space-x-2 text-gray-300 hover:text-gold transition-colors"
                onClick={() => {
                  toggleCart();
                  setMenuOpen(false);
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="text-sm tracking-wider">CART ({totalItems})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
