'use client';

import { useState } from 'react';
import { Sparkles, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function GharAurMandir() {
  const [step, setStep] = useState(1);
  const [selectedPooja, setSelectedPooja] = useState<string | null>(null);

  const poojaTypes = [
    'Daily Aarti', 'Griha Pravesh', 'Satyanarayan Katha', 'Diwali Pooja', 'Navratri Sthapana'
  ];

  return (
    <div className="min-h-screen bg-shakti-cream flex flex-col font-sans">
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-shakti-mitti hover:text-shakti-dark mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-sm border border-shakti-mitti/10">
          <div className="flex items-center gap-5 mb-10">
            <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-serif text-shakti-dark">Ghar aur Mandir</h1>
              <p className="text-shakti-mitti mt-1">Custom pooja kits for every auspicious occasion.</p>
            </div>
          </div>

          {step === 1 && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-shakti-dark mb-6">What occasion are you preparing for?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {poojaTypes.map(type => (
                  <button 
                    key={type}
                    onClick={() => setSelectedPooja(type)}
                    className={`p-4 rounded-xl border text-left font-semibold transition-all ${selectedPooja === type ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-shakti-mitti/20 hover:border-emerald-300 text-shakti-dark'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <button 
                disabled={!selectedPooja}
                onClick={() => setStep(2)}
                className="bg-shakti-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-shakti-rust transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                Next Step <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-shakti-dark">Your Customized {selectedPooja} Kit</h2>
                <button onClick={() => setStep(1)} className="text-sm text-shakti-rust font-semibold">Change Occasion</button>
              </div>

              <div className="bg-shakti-cream/40 rounded-2xl p-6 mb-8">
                <ul className="space-y-4">
                  {['Premium Roli & Mauli', 'Pure Camphor (Kapoor)', 'Ganga Jal - 100ml', 'Sandalwood Paste', 'Agarbatti (Handrolled)'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-shakti-dark font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between border-t border-shakti-mitti/10 pt-8">
                <div>
                  <p className="text-shakti-mitti text-sm mb-1">Kit Price</p>
                  <p className="text-3xl font-black text-shakti-dark">₹551</p>
                </div>
                <button onClick={() => window.location.href = '/cart'} className="bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-200">
                  Add Kit to Cart
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
