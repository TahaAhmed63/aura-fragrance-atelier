
import React, { useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

const Cart = () => {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    totalItems, 
    totalPrice 
  } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCartOpen) {
      // Animate cart opening
      gsap.set(overlayRef.current, { autoAlpha: 0 });
      gsap.set(cartRef.current, { x: '100%' });
      
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 })
        .to(cartRef.current, { x: '0%', duration: 0.4, ease: "power2.out" });
      
      document.body.style.overflow = 'hidden';
    } else {
      // Animate cart closing
      if (cartRef.current && overlayRef.current) {
        const tl = gsap.timeline();
        tl.to(cartRef.current, { x: '100%', duration: 0.4, ease: "power2.in" })
          .to(overlayRef.current, { autoAlpha: 0, duration: 0.3 });
      }
      
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/70 z-40"
        onClick={closeCart}
      ></div>
      
      <div 
        ref={cartRef}
        className="fixed top-0 right-0 h-full w-full sm:w-96 bg-luxury-black glass-morphism z-50 p-6 overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-cormorant font-semibold text-gold">Your Cart</h2>
          <button 
            onClick={closeCart}
            className="p-1 hover:text-gold transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {cart.length > 0 ? (
          <>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex border-b border-luxury-gray pb-4"
                >
                  <div className="w-20 h-20 rounded overflow-hidden">
                    <img 
                      src={item.imageSrc} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-gold"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    
                    <p className="text-gray-400 text-xs">{item.categories[0]}</p>
                    
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-xs w-5 h-5 flex items-center justify-center bg-luxury-gray rounded-sm"
                        >
                          -
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-xs w-5 h-5 flex items-center justify-center bg-luxury-gray rounded-sm"
                        >
                          +
                        </button>
                      </div>
                      
                      <span className="text-gold text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-luxury-gray pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-gray-200">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-gray-400">Shipping</span>
                <span className="text-gray-200">Calculated at checkout</span>
              </div>
              
              <Link
                to="/checkout"
                onClick={closeCart}
                className={cn(
                  "btn-gold rounded w-full py-3 flex justify-center items-center",
                  "transform transition hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Checkout Now
              </Link>
              
              <button
                onClick={closeCart}
                className="mt-3 text-sm text-gray-400 hover:text-gray-200 w-full text-center"
              >
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <ShoppingBag className="h-16 w-16 text-gray-500 mb-4" />
            <p className="text-gray-300 mb-6">Your cart is empty</p>
            <button
              onClick={closeCart}
              className="btn-dark rounded px-6 py-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
