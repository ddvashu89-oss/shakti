'use client';

import { useState } from 'react';
import { Camera, Upload, Coins, Sparkles, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CookAndEarn() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'verifying' | 'success'>('idle');

  const handleUpload = () => {
    setStatus('uploading');
    setTimeout(() => {
      setStatus('verifying');
      setTimeout(() => {
        setStatus('success');
      }, 2500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-shakti-cream flex flex-col font-sans">
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-shakti-mitti hover:text-shakti-dark mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-sm border border-shakti-mitti/10 text-center">
          <div className="inline-flex items-center justify-center bg-green-50 text-green-700 p-5 rounded-3xl mb-6">
            <Camera className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-serif text-shakti-dark mb-4">Cook & Earn</h1>
          <p className="text-shakti-mitti max-w-md mx-auto mb-10">Made a dish using our groceries? Snap a picture. Our AI verifies it and you earn Kiryana Coins!</p>

          {status === 'idle' && (
            <button 
              onClick={handleUpload}
              className="w-full sm:w-auto mx-auto border-2 border-dashed border-green-300 bg-green-50/50 hover:bg-green-50 text-green-800 rounded-2xl p-12 transition-colors flex flex-col items-center justify-center gap-4 cursor-pointer"
            >
              <Upload className="w-8 h-8 opacity-70" />
              <span className="font-bold">Click to Upload Dish Photo</span>
              <span className="text-xs opacity-60">JPEG, PNG up to 5MB</span>
            </button>
          )}

          {(status === 'uploading' || status === 'verifying') && (
            <div className="py-16 flex flex-col items-center">
              <div className="relative">
                <Loader2 className="w-16 h-16 animate-spin text-green-600" />
                <Sparkles className="w-6 h-6 text-yellow-500 absolute top-0 right-0 animate-ping" />
              </div>
              <h3 className="text-xl font-bold text-shakti-dark mt-6 mb-2">
                {status === 'uploading' ? 'Uploading Image...' : 'AI is verifying your dish...'}
              </h3>
              <p className="text-shakti-mitti text-sm">Please wait a moment.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="py-8 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Coins className="w-12 h-12 text-yellow-600" />
              </div>
              <h2 className="text-3xl font-black text-shakti-dark mb-2">Verification Successful!</h2>
              <p className="text-lg text-shakti-mitti mb-8">You cooked <span className="font-bold text-shakti-dark">Rajma Chawal</span>.</p>
              
              <div className="inline-block bg-shakti-dark text-white px-8 py-4 rounded-2xl">
                <p className="text-sm text-shakti-cream/80 uppercase tracking-widest font-semibold mb-1">Earned</p>
                <p className="text-4xl font-black text-shakti-sarson">+50 Coins</p>
              </div>

              <div className="mt-10">
                <button onClick={() => setStatus('idle')} className="text-shakti-rust font-bold hover:underline">Upload Another Photo</button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
