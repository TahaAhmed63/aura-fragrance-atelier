
import React, { useEffect, useRef } from 'react';
import { Product } from '../types/product';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import gsap from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';
import ProductImage from './product/ProductImage';
import FragranceNotes from './product/FragranceNotes';
import ProductExperience from './product/ProductExperience';
import AddToCartSection from './product/AddToCartSection';

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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !contentRef.current?.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

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
          <ProductImage 
            imageSrc={product.imageSrc}
            name={product.name}
            categories={product.categories}
          />
          
          <div className="md:w-7/12 p-4 md:p-6 flex flex-col overflow-y-auto" 
               style={{ maxHeight: isMobile ? 'calc(95vh - 200px)' : '85vh' }}>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold font-cormorant gold-gradient mb-1">
                {product.name}
              </h2>
              
              <p className="text-gray-300 text-xs md:text-sm mb-3">{product.tagline}</p>
              <p className="text-gray-400 text-xs md:text-sm mb-4">{product.description}</p>
              
              <FragranceNotes {...product.fragranceNotes} />

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

              <ProductExperience 
                experience={product.experience}
                whyChoose={product.whyChoose}
                emotionalJourney={product.emotionalJourney}
              />

              <AddToCartSection 
                price={product.price}
                quantity={quantity}
                onIncrement={incrementQuantity}
                onDecrement={decrementQuantity}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
