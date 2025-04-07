
import React from 'react';
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-luxury-black border-t border-luxury-gray mt-16">
      <div className="luxury-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-cormorant font-semibold text-gold">Luxury Fragrances</h3>
            <p className="text-sm text-gray-400 max-w-xs">
              Discover our collection of exquisite perfumes, crafted with the finest ingredients
              to create unforgettable sensory experiences.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-cormorant font-semibold text-gold">Navigation</h3>
            <ScrollArea className="h-[100px]">
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-400 hover:text-gold transition-colors">Home</Link></li>
                <li><Link to="/checkout" className="text-gray-400 hover:text-gold transition-colors">Checkout</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">Fragrance Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gold transition-colors">Contact</a></li>
              </ul>
            </ScrollArea>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-cormorant font-semibold text-gold">Newsletter</h3>
            <p className="text-sm text-gray-400">Subscribe to receive updates on new fragrances and exclusive offers.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-luxury-dark border border-luxury-gray text-gray-300 px-4 py-2 text-sm rounded focus:border-gold focus:outline-none"
              />
              <button 
                type="submit"
                className="btn-gold px-4 py-2 rounded text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <Separator className="my-8 bg-luxury-gray" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Luxury Fragrances. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-400">Terms of Service</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-400">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
