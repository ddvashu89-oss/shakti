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
    return <div className="min-h-screen bg-[#f3efe6] py-12 font-sans"></div>;
  }

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-[#f3efe6] flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-[#251c17]/5 max-w-lg w-full text-center">
          <div className="w-24 h-24 bg-[#a04a29]/10 text-[#a04a29] rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-serif text-[#201410] mb-4">Aapka Order Confirmed!</h1>
          <p className="text-[#201410]/70 mb-10 font-medium">Bharosa rakhne ke liye shukriya. Aapka shudh saaman jaldi hi aapke ghar pahunch jayega.</p>
          <div className="flex flex-col gap-4">
            <Link href="/" className="w-full bg-[#201410] text-white font-bold py-4 rounded-xl hover:bg-[#a04a29] transition-colors text-lg uppercase tracking-widest text-sm">
              Aur Kharidein
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3efe6] py-12 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4 mb-8">
          <div className="text-[#a04a29] text-xs font-bold tracking-[0.2em] uppercase">
            Secure Checkout
          </div>
        </div>
        <h1 className="text-5xl font-serif text-[#201410] mb-12">Checkout</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 font-bold border border-red-100">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* Delivery Address */}
            <div className="bg-white p-6 sm:p-10 rounded-[2rem] shadow-sm border border-[#251c17]/5">
              <h2 className="text-2xl font-serif text-[#201410] mb-6 flex items-center gap-2"><MapPin className="w-6 h-6 text-[#a04a29]" /> Pata (Address)</h2>
              <div className="p-6 border-2 border-[#d5a046] rounded-2xl bg-[#d5a046]/5 relative cursor-pointer">
                <div className="absolute top-6 right-6 w-5 h-5 rounded-full border-4 border-[#d5a046] bg-white"></div>
                <h3 className="font-bold text-[#201410] mb-2 text-lg">Ghar</h3>
                <p className="text-[#201410]/70 leading-relaxed font-medium">123 Kiryana Street, Sector 15<br/>Hisar, Haryana 125001<br/><span className="text-[#201410] font-bold">Phone:</span> +91 98765 43210</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 sm:p-10 rounded-[2rem] shadow-sm border border-[#251c17]/5">
              <h2 className="text-2xl font-serif text-[#201410] mb-6">Bhugtaan (Payment)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div 
                  onClick={() => setPaymentMethod('online')}
                  className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-[#d5a046] bg-[#d5a046]/5' : 'border-[#251c17]/10 hover:border-[#d5a046]/50'}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === 'online' ? 'bg-[#d5a046] text-[#201410]' : 'bg-[#f3efe6] text-[#201410]/50'}`}>
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'online' ? 'border-[#d5a046] border-[6px]' : 'border-[#201410]/30'}`}></div>
                  </div>
                  <h3 className="font-bold text-[#201410] text-lg">Online Pay</h3>
                  <p className="text-[#201410]/60 text-sm mt-1 font-medium">UPI, Cards, Netbanking</p>
                </div>

                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#d5a046] bg-[#d5a046]/5' : 'border-[#251c17]/10 hover:border-[#d5a046]/50'}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-[#d5a046] text-[#201410]' : 'bg-[#f3efe6] text-[#201410]/50'}`}>
                      <Banknote className="w-6 h-6" />
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'cod' ? 'border-[#d5a046] border-[6px]' : 'border-[#201410]/30'}`}></div>
                  </div>
                  <h3 className="font-bold text-[#201410] text-lg">Cash on Delivery</h3>
                  <p className="text-[#201410]/60 text-sm mt-1 font-medium">Saaman aane par pay karein</p>
                </div>

                <div 
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'wallet' ? 'border-[#d5a046] bg-[#d5a046]/5' : 'border-[#251c17]/10 hover:border-[#d5a046]/50'}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === 'wallet' ? 'bg-[#d5a046] text-[#201410]' : 'bg-[#f3efe6] text-[#201410]/50'}`}>
                      <Wallet className="w-6 h-6" />
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'wallet' ? 'border-[#d5a046] border-[6px]' : 'border-[#201410]/30'}`}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-[#201410] text-lg">My Wallet</h3>
                    <span className="font-bold text-[#a04a29] text-lg">₹{walletBalance}</span>
                  </div>
                  <p className="text-[#201410]/60 text-sm mt-1 font-medium">Store funds use karein</p>
                  {paymentMethod === 'wallet' && walletBalance < total && (
                    <p className="text-[#a04a29] text-xs mt-2 font-bold uppercase tracking-widest">Insufficient balance</p>
                  )}
                </div>

              </div>
            </div>

          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-[#251c17]/5 sticky top-24">
              <h2 className="text-2xl font-serif text-[#201410] mb-6">Bill Details</h2>
              
              <div className="space-y-4 mb-6 text-[#201410]">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start border-b border-[#251c17]/5 pb-4 last:border-0 last:pb-0">
                    <span className="text-[#201410]/80 font-medium pr-4">{item.quantity}x {item.name}</span>
                    <span className="font-bold shrink-0">₹{Number(item.price) * item.quantity}</span>
                  </div>
                ))}
                {cartItems.length === 0 && (
                  <div className="text-[#201410]/50 text-sm font-medium">Aapka jhola khali hai.</div>
                )}
              </div>

              <div className="border-t border-[#251c17]/10 pt-6 space-y-4 mb-8 bg-[#f3efe6] -mx-8 px-8 pb-8 -mb-8 rounded-b-[2rem]">
                 <div className="flex justify-between text-[#201410]/70 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#201410]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#201410]/70 font-medium">
                  <span>Delivery</span>
                  <span className="font-bold text-[#201410]">₹{delivery}</span>
                </div>
                <div className="flex justify-between items-end pt-4 mt-2">
                  <span className="font-bold text-[#201410] text-lg">Total</span>
                  <span className="font-serif font-black text-4xl text-[#a04a29]">₹{total}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full bg-[#251c17] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#a04a29] transition-colors shadow-lg text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed mt-12"
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
