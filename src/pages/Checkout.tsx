
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    gsap.from('.checkout-item', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.2
    });
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get form data
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);
      
      const customerInfo = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        address: formData.get('address'),
        addressLine2: formData.get('addressLine2'),
        city: formData.get('city'),
        state: formData.get('state'),
        zipCode: formData.get('zipCode'),
      };
      
      const orderDetails = {
        customer: customerInfo,
        items: cart,
        paymentMethod,
        subtotal: totalPrice,
        shipping: 15,
        tax: totalPrice * 0.07,
        total: totalPrice + 15 + (totalPrice * 0.07),
        date: new Date().toISOString(),
      };
      
      // Call the order API
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });
      
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
      
      // Clear cart
      clearCart();
      
      // Show success message
      toast.success("Order placed successfully!");
      
      // Redirect to the homepage after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 bg-luxury-black">
        <div className="luxury-container py-16 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h1 className="text-3xl font-cormorant font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-8">Add some products to your cart and come back.</p>
          <Link 
            to="/"
            className={cn(
              "btn-gold rounded-md px-6 py-3 inline-flex items-center",
              "transform transition hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 bg-luxury-black">
      <div className="luxury-container py-8">
        <h1 className="text-3xl font-cormorant font-bold mb-2">Checkout</h1>
        <p className="text-gray-400 mb-8">Complete your purchase</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="luxury-card rounded-lg p-6">
              <h2 className="text-xl font-cormorant mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div 
                    key={item.id}
                    className="checkout-item flex border-b border-luxury-gray pb-4"
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
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-gray-200">$15.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-gray-200">${(totalPrice * 0.07).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-luxury-gray pt-2 mt-2">
                  <span className="text-lg">Total</span>
                  <span className="text-gold font-semibold">
                    ${(totalPrice + 15 + (totalPrice * 0.07)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <div className="luxury-card rounded-lg p-6">
              <h2 className="text-xl font-cormorant mb-6">Shipping Details</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">First Name</label>
                    <input 
                      type="text"
                      name="firstName"
                      className="w-full bg-luxury-gray border border-luxury-light rounded p-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Last Name</label>
                    <input 
                      type="text"
                      name="lastName"
                      className="w-full bg-luxury-gray border border-luxury-light rounded p-2 text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <input 
                    type="email"
                    name="email"
                    className="w-full bg-luxury-gray border border-luxury-light rounded p-2 text-white"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-400 text-sm mb-2">Address</label>
                  <input 
                    type="text"
                    name="address"
                    className="w-full bg-luxury-gray border border-luxury-light rounded p-2 text-white mb-2"
                    required
                  />
                  <input 
                    type="text"
                    name="addressLine2"
                    className="w-full bg-luxury-gray border border-luxury-light rounded p-2 text-white"
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">City</label>
                    <input 
                      type="text"
                      name="city" 
                      className="w-full bg-luxury-gray border border-luxury-light rounded p-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">State</label>
                    <input 
                      type="text"
                      name="state"
                      className="w-full bg-luxury-gray border border-luxury-light rounded p-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">ZIP Code</label>
                    <input 
                      type="text"
                      name="zipCode" 
                      className="w-full bg-luxury-gray border border-luxury-light rounded p-2 text-white"
                      required
                    />
                  </div>
                </div>
                
                <h2 className="text-xl font-cormorant mb-6 mt-8">Payment Method</h2>
                
                <div className="mb-8">
                  <RadioGroup 
                    defaultValue="card"
                    value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value as 'card' | 'cod')}
                    className="flex flex-col space-y-4"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="card" id="card" />
                      <label htmlFor="card" className="text-sm font-medium">
                        Credit/Debit Card
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="cod" id="cod" />
                      <label htmlFor="cod" className="text-sm font-medium">
                        Cash on Delivery
                      </label>
                    </div>
                  </RadioGroup>
                </div>
                
                {paymentMethod === 'card' && (
                  <>
                    <div className="mb-6">
                      <label className="block text-gray-400 text-sm mb-2">Card Number</label>
                      <input 
                        type="text" 
                        className="w-full bg-luxury-gray border border-luxury-light rounded p-2 text-white"
                        placeholder="1234 5678 9012 3456"
                        required={paymentMethod === 'card'}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="md:col-span-2">
                        <label className="block text-gray-400 text-sm mb-2">Expiration Date</label>
                        <input 
                          type="text" 
                          className="w-full bg-luxury-gray border border-luxury-light rounded p-2 text-white"
                          placeholder="MM / YY"
                          required={paymentMethod === 'card'}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">CVC</label>
                        <input 
                          type="text" 
                          className="w-full bg-luxury-gray border border-luxury-light rounded p-2 text-white"
                          placeholder="123"
                          required={paymentMethod === 'card'}
                        />
                      </div>
                    </div>
                  </>
                )}
                
                {paymentMethod === 'cod' && (
                  <div className="mb-6">
                    <div className="bg-luxury-gray/50 p-4 rounded border border-luxury-light text-sm">
                      <p className="text-gray-300">You'll pay when your order is delivered.</p>
                      <p className="text-gray-400 mt-2">Cash, cards, and mobile payments are accepted upon delivery.</p>
                    </div>
                  </div>
                )}
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "btn-gold rounded w-full py-3 mt-6",
                    "transform transition hover:scale-[1.02] active:scale-[0.98]",
                    isSubmitting && "opacity-75 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? "Processing..." : "Complete Order"}
                </button>
                
                <div className="flex justify-center mt-4">
                  <Link to="/" className="text-sm text-gray-400 hover:text-gray-200">
                    <ArrowLeft className="inline-block h-4 w-4 mr-1" />
                    Continue Shopping
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
