'use client';

import Link from 'next/link';
import { CreditCard, Banknote, ArrowRight, ShieldCheck, MapPin, Wallet } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { placeOrderAction } from '../actions/orders';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [cartItems, setCartItems] = useState<{ id: number, name: string, price: string | number, quantity: number }[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('shakti_cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved)); // eslint-disable-line react-hooks/set-state-in-effect
      } catch {
        setCartItems([]);
      }
    }
    
    // Fetch wallet balance
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api'}/wallet`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.balance !== undefined) {
          setWalletBalance(Number(data.balance));
        }
      })
      .catch(console.error);
    }
    
    setMounted(true);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
  const delivery = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const total = subtotal + delivery;

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    
    setIsSubmitting(true);
    setError(null);
    
    // Format items for backend
    const items = cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));

    if (paymentMethod === 'wallet' && walletBalance < total) {
      setError('Insufficient wallet balance. Please top up or choose another payment method.');
      setIsSubmitting(false);
      return;
    }

    const result = await placeOrderAction(items, paymentMethod);
    
    setIsSubmitting(false);

    if (result.success) {
      localStorage.removeItem('shakti_cart');
      window.dispatchEvent(new Event('cartUpdated'));
      setIsOrderPlaced(true);
    } else {
      if (result.error?.includes('Unauthorized')) {
        router.push('/login?redirect=/checkout');
      } else {
        setError(result.error || 'Failed to place order.');
      }
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-shakti-cream py-12 font-sans"></div>;
  }

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-shakti-cream flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-shakti-mitti/10 max-w-lg w-full text-center">
          <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-serif text-shakti-dark mb-4">Order Placed Successfully!</h1>
          <p className="text-shakti-mitti mb-10">Thank you for your purchase. Your order is confirmed and will be delivered shortly.</p>
          <div className="flex flex-col gap-4">
            <Link href="/" className="w-full bg-shakti-dark text-white font-bold py-4 rounded-xl hover:bg-shakti-rust transition-colors text-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-shakti-cream py-12 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif text-shakti-dark mb-8">Checkout</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-bold border border-red-100">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Delivery Address */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-shakti-mitti/10">
              <h2 className="text-xl font-bold text-shakti-dark mb-6 flex items-center gap-2"><MapPin className="w-6 h-6 text-shakti-rust" /> Delivery Address</h2>
              <div className="p-6 border-2 border-shakti-sarson rounded-2xl bg-shakti-sarson/5 relative cursor-pointer">
                <div className="absolute top-6 right-6 w-5 h-5 rounded-full border-4 border-shakti-sarson bg-white"></div>
                <h3 className="font-bold text-shakti-dark mb-2 text-lg">Home</h3>
                <p className="text-shakti-mitti leading-relaxed">123 Kiryana Street, Sector 15<br/>New Delhi, 110001<br/><span className="text-shakti-dark font-medium">Phone:</span> +91 98765 43210</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-shakti-mitti/10">
              <h2 className="text-xl font-bold text-shakti-dark mb-6">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div 
                  onClick={() => setPaymentMethod('online')}
                  className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-shakti-sarson bg-shakti-sarson/5' : 'border-shakti-mitti/10 hover:border-shakti-sarson/50'}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === 'online' ? 'bg-shakti-sarson text-shakti-dark' : 'bg-shakti-cream text-shakti-mitti'}`}>
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'online' ? 'border-shakti-sarson border-[6px]' : 'border-shakti-mitti/30'}`}></div>
                  </div>
                  <h3 className="font-bold text-shakti-dark text-lg">Online Pay</h3>
                  <p className="text-shakti-mitti text-sm mt-1">UPI, Cards, Netbanking</p>
                </div>

                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-shakti-sarson bg-shakti-sarson/5' : 'border-shakti-mitti/10 hover:border-shakti-sarson/50'}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-shakti-sarson text-shakti-dark' : 'bg-shakti-cream text-shakti-mitti'}`}>
                      <Banknote className="w-6 h-6" />
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'cod' ? 'border-shakti-sarson border-[6px]' : 'border-shakti-mitti/30'}`}></div>
                  </div>
                  <h3 className="font-bold text-shakti-dark text-lg">Cash on Delivery</h3>
                  <p className="text-shakti-mitti text-sm mt-1">Pay when you receive</p>
                </div>

                <div 
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'wallet' ? 'border-shakti-sarson bg-shakti-sarson/5' : 'border-shakti-mitti/10 hover:border-shakti-sarson/50'}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === 'wallet' ? 'bg-shakti-sarson text-shakti-dark' : 'bg-shakti-cream text-shakti-mitti'}`}>
                      <Wallet className="w-6 h-6" />
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'wallet' ? 'border-shakti-sarson border-[6px]' : 'border-shakti-mitti/30'}`}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-shakti-dark text-lg">My Wallet</h3>
                    <span className="font-bold text-shakti-rust text-lg">₹{walletBalance}</span>
                  </div>
                  <p className="text-shakti-mitti text-sm mt-1">Pay using store funds</p>
                  {paymentMethod === 'wallet' && walletBalance < total && (
                    <p className="text-red-500 text-sm mt-2 font-bold">Insufficient balance</p>
                  )}
                </div>

              </div>
            </div>

          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-shakti-mitti/10 sticky top-24">
              <h2 className="text-xl font-bold text-shakti-dark mb-6">Summary</h2>
              
              <div className="space-y-4 mb-6 text-shakti-dark">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-shakti-mitti">{item.quantity}x {item.name}</span>
                    <span className="font-bold">₹{Number(item.price) * item.quantity}</span>
                  </div>
                ))}
                {cartItems.length === 0 && (
                  <div className="text-shakti-mitti text-sm">Your cart is empty.</div>
                )}
              </div>

              <div className="border-t border-shakti-mitti/10 pt-6 space-y-4 mb-8">
                 <div className="flex justify-between text-shakti-mitti">
                  <span>Subtotal</span>
                  <span className="font-bold text-shakti-dark">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-shakti-mitti">
                  <span>Delivery</span>
                  <span className="font-bold text-shakti-dark">₹{delivery}</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-shakti-mitti/10 mt-4">
                  <span className="font-bold text-shakti-dark text-lg">Total</span>
                  <span className="font-black text-3xl text-shakti-dark">₹{total}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full bg-shakti-dark text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-shakti-rust transition-colors shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'} {!isSubmitting && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
