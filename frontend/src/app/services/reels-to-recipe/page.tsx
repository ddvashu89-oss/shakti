'use client';

import { useState } from 'react';
import { ChefHat, Link as LinkIcon, Loader2, ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ReelsToRecipe() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 2000); // Simulate AI processing
  };

  const mockIngredients = [
    { name: 'Aashirvaad Atta', qty: '1 kg', price: '₹45' },
    { name: 'Paneer (Fresh)', qty: '200g', price: '₹85' },
    { name: 'Amul Butter', qty: '100g', price: '₹55' },
    { name: 'Garam Masala', qty: '50g', price: '₹35' },
  ];

  return (
    <div className="min-h-screen bg-shakti-cream flex flex-col font-sans">
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-shakti-mitti hover:text-shakti-dark mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-sm border border-shakti-mitti/10">
          <div className="flex items-center gap-5 mb-8">
            <div className="bg-orange-50 text-orange-600 p-4 rounded-2xl">
              <ChefHat className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-serif text-shakti-dark">Reels → Recipe</h1>
              <p className="text-shakti-mitti mt-1">Found a tasty recipe on Instagram? We&apos;ll get you the groceries.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mb-12">
            <label className="block text-sm font-bold text-shakti-dark mb-2">Paste Video Link</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-shakti-mitti" />
                <input 
                  type="url" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://instagram.com/reel/..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-shakti-mitti/20 focus:outline-none focus:border-shakti-rust focus:ring-1 focus:ring-shakti-rust bg-shakti-cream/30"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="bg-shakti-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-shakti-rust transition-colors disabled:opacity-70 flex items-center justify-center min-w-[160px]"
              >
                {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get Ingredients'}
              </button>
            </div>
          </form>

          {status === 'loading' && (
            <div className="text-center py-12">
              <Loader2 className="w-10 h-10 animate-spin text-shakti-rust mx-auto mb-4" />
              <p className="text-shakti-dark font-medium animate-pulse">Our AI is watching the video and listing ingredients...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="border-t border-shakti-mitti/10 pt-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif text-shakti-dark">Kadai Paneer Magic</h2>
                  <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">100% Match</span>
                </div>
                
                <div className="bg-shakti-cream/30 rounded-2xl p-6 mb-8">
                  <h3 className="font-bold text-shakti-dark mb-4">Required Groceries</h3>
                  <div className="space-y-4">
                    {mockIngredients.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-shakti-mitti/5">
                        <div>
                          <p className="font-bold text-shakti-dark">{item.name}</p>
                          <p className="text-sm text-shakti-mitti">{item.qty}</p>
                        </div>
                        <p className="font-bold text-shakti-rust">{item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-shakti-dark text-white rounded-2xl">
                  <div>
                    <p className="text-shakti-cream/80 text-sm mb-1">Total Estimate</p>
                    <p className="text-2xl font-bold">₹220</p>
                  </div>
                  <button onClick={() => window.location.href = '/cart'} className="bg-shakti-sarson text-shakti-dark px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#d9b331] transition-colors">
                    <ShoppingCart className="w-5 h-5" /> Add All to Cart
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
