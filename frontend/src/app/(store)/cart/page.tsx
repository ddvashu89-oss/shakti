'use client';

import { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type CartItem = {
  id: number;
  name: string;
  price: number | string;
  quantity: number;
  image: string;
};

const defaultCartItems: CartItem[] = [];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('shakti_cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved)); // eslint-disable-line react-hooks/set-state-in-effect
      } catch {
        setCartItems(defaultCartItems);
      }
    } else {
      setCartItems(defaultCartItems);
    }
    setMounted(true);
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem('shakti_cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleDelete = (id: number) => {
    updateCart(cartItems.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    updateCart(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  if (!mounted) {
    return <div className="min-h-screen bg-shakti-cream py-12 font-sans"></div>;
  }

  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-shakti-cream py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif text-shakti-dark mb-8">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-shakti-mitti/10 text-center">
                <h3 className="text-xl font-bold text-shakti-dark mb-2">Your cart is empty</h3>
                <p className="text-shakti-mitti mb-6">Looks like you haven&apos;t added any fresh staples yet.</p>
                <Link href="/categories" className="inline-block bg-shakti-dark text-white px-6 py-3 rounded-lg font-bold hover:bg-shakti-rust transition-colors">
                  Start Shopping
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-shakti-mitti/10 flex items-center gap-6">
                  <div className="w-24 h-24 bg-white rounded-xl overflow-hidden shrink-0 border border-shakti-mitti/5 flex items-center justify-center p-2">
                     <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-shakti-dark">{item.name}</h3>
                    <p className="text-shakti-rust font-bold mt-1">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-shakti-cream border border-shakti-mitti/20 rounded-lg px-2 py-1">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-white rounded-md transition-colors text-shakti-dark"
                      ><Minus className="w-4 h-4" /></button>
                      <span className="font-bold w-4 text-center text-shakti-dark">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="p-1 hover:bg-white rounded-md transition-colors text-shakti-dark"
                      ><Plus className="w-4 h-4" /></button>
                    </div>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-shakti-mitti/10 sticky top-24">
              <h2 className="text-xl font-bold text-shakti-dark mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-shakti-mitti mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-shakti-dark">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-shakti-dark">{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
                </div>
                <div className="border-t border-shakti-mitti/10 pt-4 flex justify-between items-end">
                  <span className="font-bold text-shakti-dark text-lg">Total</span>
                  <span className="font-black text-3xl text-shakti-dark">₹{total}</span>
                </div>
              </div>

              <Link href={cartItems.length > 0 ? "/checkout" : "#"} className={`w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg ${cartItems.length > 0 ? 'bg-shakti-dark hover:bg-shakti-rust' : 'bg-gray-400 cursor-not-allowed'}`}>
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>
              
              <p className="text-xs text-center text-shakti-mitti mt-4">Taxes and additional charges may apply at checkout.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
