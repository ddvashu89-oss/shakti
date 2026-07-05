'use client';

import { useState } from 'react';
import { ChefHat, Link as LinkIcon, Loader2, ShoppingCart, ArrowLeft, MessageSquare, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function ReelsToRecipe() {
  const [mode, setMode] = useState<'reel' | 'manual'>('reel');
  const [url, setUrl] = useState('');
  const [manualInput, setManualInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showVideo, setShowVideo] = useState(false);
  const [peopleCount, setPeopleCount] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'reel' && !url) return;
    if (mode === 'manual' && !manualInput) return;
    
    // Extract number from input for smart serving size (e.g. "for 3 people")
    if (mode === 'manual') {
      const match = manualInput.match(/(\d+)/);
      const count = match ? parseInt(match[1]) : 2;
      setPeopleCount(Math.max(1, count)); // At least 1 person
    } else {
      setPeopleCount(2); // Default for reels
    }
    
    setStatus('loading');
    setShowVideo(false);
    
    setTimeout(() => {
      setStatus('success');
    }, 1500); // Simulate AI processing
  };

  const multiplier = peopleCount / 2;

  const baseIngredients = [
    { name: 'Aashirvaad Atta', qty: 500, unit: 'g', price: 25 },
    { name: 'Paneer (Fresh)', qty: 100, unit: 'g', price: 45 },
    { name: 'Amul Butter', qty: 50, unit: 'g', price: 30 },
    { name: 'Garam Masala', qty: 25, unit: 'g', price: 15 },
  ];

  const currentIngredients = baseIngredients.map(item => {
    let finalQty = item.qty * multiplier;
    let finalUnit = item.unit;
    
    // Convert 1000g to 1kg if needed
    if (finalUnit === 'g' && finalQty >= 1000) {
      finalQty = finalQty / 1000;
      finalUnit = 'kg';
    }
    
    return {
      name: item.name,
      qty: `${finalQty}${finalUnit}`,
      price: `₹${Math.round(item.price * multiplier)}`
    };
  });

  const totalEstimate = baseIngredients.reduce((sum, item) => sum + Math.round(item.price * multiplier), 0);

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
              <h1 className="text-3xl font-serif text-shakti-dark">AI Recipe Wizard</h1>
              <p className="text-shakti-mitti mt-1">Found a video or have a craving? Let our AI Chef handle the groceries.</p>
            </div>
          </div>

          <div className="flex gap-6 mb-8 border-b border-shakti-mitti/10">
            <button 
              onClick={() => { setMode('reel'); setStatus('idle'); }}
              className={`font-bold pb-4 border-b-2 transition-colors flex items-center gap-2 ${mode === 'reel' ? 'border-shakti-rust text-shakti-rust' : 'border-transparent text-shakti-mitti hover:text-shakti-dark'}`}
            >
              <LinkIcon className="w-4 h-4" /> From Video Link
            </button>
            <button 
              onClick={() => { setMode('manual'); setStatus('idle'); }}
              className={`font-bold pb-4 border-b-2 transition-colors flex items-center gap-2 ${mode === 'manual' ? 'border-shakti-rust text-shakti-rust' : 'border-transparent text-shakti-mitti hover:text-shakti-dark'}`}
            >
              <MessageSquare className="w-4 h-4" /> Ask AI Chef
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mb-12">
            {mode === 'reel' ? (
              <>
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
              </>
            ) : (
              <>
                <label className="block text-sm font-bold text-shakti-dark mb-2">What do you want to cook today?</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <ChefHat className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-shakti-mitti" />
                    <input 
                      type="text" 
                      value={manualInput}
                      onChange={(e) => setManualInput(e.target.value)}
                      placeholder="E.g., Kadhai Paneer for 3 people..."
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-shakti-mitti/20 focus:outline-none focus:border-shakti-rust focus:ring-1 focus:ring-shakti-rust bg-shakti-cream/30"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-shakti-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-shakti-rust transition-colors disabled:opacity-70 flex items-center justify-center min-w-[160px]"
                  >
                    {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get Full Recipe'}
                  </button>
                </div>
              </>
            )}
          </form>

          {status === 'loading' && (
            <div className="text-center py-12">
              <Loader2 className="w-10 h-10 animate-spin text-shakti-rust mx-auto mb-4" />
              <p className="text-shakti-dark font-medium animate-pulse">
                {mode === 'reel' ? 'Our AI is watching the video and listing ingredients...' : 'Our AI Chef is calculating portions and generating the recipe...'}
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="border-t border-shakti-mitti/10 pt-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-serif text-shakti-dark capitalize mb-1">
                      {mode === 'manual' && manualInput ? manualInput : 'Kadai Paneer Magic'}
                    </h2>
                    <p className="text-sm font-bold text-shakti-rust">Serving Size: {peopleCount} {peopleCount === 1 ? 'Person' : 'People'}</p>
                  </div>
                  <div className="flex gap-2">
                    {mode === 'manual' && !showVideo && (
                      <button 
                        onClick={() => setShowVideo(true)}
                        className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-red-100 transition-colors"
                      >
                        <PlayCircle className="w-4 h-4" /> Watch Video Tutorial
                      </button>
                    )}
                    <span className="text-sm bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">
                      {mode === 'reel' ? '100% Match' : 'AI Generated'}
                    </span>
                  </div>
                </div>
                
                {mode === 'manual' && showVideo && (
                  <div className="mb-8 bg-white rounded-2xl overflow-hidden border border-shakti-mitti/10 shadow-sm animate-in fade-in zoom-in-95 duration-300">
                    <div className="bg-shakti-dark p-3 px-4 flex justify-between items-center">
                      <h3 className="font-bold text-white flex items-center gap-2"><PlayCircle className="w-4 h-4 text-red-500" /> Video Tutorial</h3>
                      <button onClick={() => setShowVideo(false)} className="text-white/60 hover:text-white text-sm">Close Video</button>
                    </div>
                    <div className="aspect-video w-full bg-gray-100">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/gBnHovVnNwo" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                {mode === 'manual' && (
                  <div className="bg-orange-50/50 rounded-2xl p-6 mb-8 border border-orange-100">
                    <h3 className="font-bold text-orange-900 mb-4 flex items-center gap-2">
                      <ChefHat className="w-5 h-5" /> Step-by-Step Instructions
                    </h3>
                    <ol className="list-decimal list-inside space-y-4 text-orange-950/80">
                      <li><strong className="text-orange-900">Prep the Base:</strong> Heat oil in a pan and add cumin seeds. Sauté chopped onions until golden brown.</li>
                      <li><strong className="text-orange-900">Aromatics:</strong> Add ginger-garlic paste and cook for a minute until fragrant.</li>
                      <li><strong className="text-orange-900">Spices:</strong> Stir in tomato puree, turmeric, red chili powder, and coriander powder.</li>
                      <li><strong className="text-orange-900">Cook Masala:</strong> Cook on medium heat until oil separates from the masala.</li>
                      <li><strong className="text-orange-900">Add Main Ingredients:</strong> Toss in diced bell peppers and fresh paneer cubes. Mix gently.</li>
                      <li><strong className="text-orange-900">Simmer & Serve:</strong> Simmer for 5-7 minutes. Garnish with fresh coriander leaves and serve hot!</li>
                    </ol>
                  </div>
                )}

                <div className="bg-shakti-cream/30 rounded-2xl p-6 mb-8">
                  <h3 className="font-bold text-shakti-dark mb-4">Required Groceries</h3>
                  <div className="space-y-4">
                    {currentIngredients.map((item, idx) => (
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

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-shakti-dark text-white rounded-2xl">
                  <div>
                    <p className="text-shakti-cream/80 text-sm mb-1">Total Estimate</p>
                    <p className="text-2xl font-bold">₹{totalEstimate}</p>
                  </div>
                  <button onClick={() => window.location.href = '/cart'} className="bg-shakti-sarson text-shakti-dark px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#d9b331] transition-colors w-full sm:w-auto">
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
