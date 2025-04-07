
import React, { useEffect, useRef } from 'react';
import { Product } from '../types/product';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const { addToCart } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = React.useState(1);
  const isMobile = useIsMobile();

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !contentRef.current?.contains(e.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  // Animation when modal opens
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    gsap.set(modalRef.current, { autoAlpha: 0 });
    gsap.set(contentRef.current, { y: 50 });
    
    const tl = gsap.timeline();
    tl.to(modalRef.current, { autoAlpha: 1, duration: 0.3 })
      .to(contentRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div 
      ref={modalRef} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div 
        ref={contentRef}
        className="glass-morphism w-full max-w-3xl rounded-lg overflow-hidden relative opacity-0 max-h-[90vh]"
        style={{ maxHeight: isMobile ? '95vh' : '85vh' }}
      >
        <button 
          onClick={onClose}
          className="absolute right-3 top-3 z-10 bg-luxury-black/70 p-1.5 rounded-full text-gray-300 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        
        <div className="flex flex-col md:flex-row max-h-[90vh] overflow-hidden">
          {/* Product image */}
          <div className="md:w-5/12 h-[200px] md:h-auto">
            <div className="h-full relative">
              <div className="absolute inset-0 bg-gradient-to-br from-luxury-black/40 via-transparent to-transparent z-10"></div>
              <img 
                src={product.imageSrc} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          
          {/* Product details */}
          <div className="md:w-7/12 p-4 md:p-6 flex flex-col overflow-y-auto" style={{ maxHeight: isMobile ? 'calc(95vh - 200px)' : '85vh' }}>
            <div>
              <div className="flex flex-wrap items-center mb-2 gap-1">
                {product.categories.map((category, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-luxury-gray text-gray-300 px-2 py-0.5 rounded mr-1 mb-1"
                  >
                    {category}
                  </span>
                ))}
              </div>
              
              <h2 className="text-2xl md:text-3xl font-semibold font-cormorant gold-gradient mb-1">
                {product.name}
              </h2>
              
              <p className="text-gray-300 text-xs md:text-sm mb-3">{product.tagline}</p>
              
              <p className="text-gray-400 text-xs md:text-sm mb-4">{product.description}</p>
              
              <div className="border-t border-luxury-gray my-3 pt-3">
                <h4 className="text-gold text-xs font-medium mb-2">FRAGRANCE NOTES</h4>
                
                <div className="grid grid-cols-3 gap-1 md:gap-2 mb-3">
                  <div>
                    <span className="text-xs text-gray-400">Top</span>
                    <ul className="text-xs md:text-sm text-gray-300">
                      {product.fragranceNotes.top.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <span className="text-xs text-gray-400">Middle</span>
                    <ul className="text-xs md:text-sm text-gray-300">
                      {product.fragranceNotes.middle.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <span className="text-xs text-gray-400">Base</span>
                    <ul className="text-xs md:text-sm text-gray-300">
                      {product.fragranceNotes.base.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4">
                  <div>
                    <span className="text-xs text-gray-400">Longevity</span>
                    <p className="text-xs md:text-sm text-gray-300">{product.longevity}</p>
                  </div>
                  
                  <div>
                    <span className="text-xs text-gray-400">Sillage</span>
                    <p className="text-xs md:text-sm text-gray-300">{product.sillage}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl md:text-2xl text-gold font-cormorant font-semibold">
                  ${product.price}
                </span>
                
                <div className="flex items-center">
                  <button 
                    onClick={decrementQuantity}
                    className="bg-luxury-gray h-7 w-7 md:h-8 md:w-8 flex items-center justify-center rounded-l"
                  >
                    -
                  </button>
                  <span className="bg-luxury-dark h-7 w-8 md:h-8 md:w-10 flex items-center justify-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={incrementQuantity}
                    className="bg-luxury-gray h-7 w-7 md:h-8 md:w-8 flex items-center justify-center rounded-r"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                className={cn(
                  "btn-gold rounded w-full py-2 md:py-3",
                  "transform transition hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
