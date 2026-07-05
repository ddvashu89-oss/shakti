'use client';

import { useState } from 'react';
import { HeartPulse, ArrowLeft, ArrowRight, CheckCircle2, Apple, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function HealthPlanner() {
  const [step, setStep] = useState(1);
  const [condition, setCondition] = useState<string | null>(null);

  const conditions = [
    { id: 'diabetic', name: 'Diabetic Friendly', desc: 'Low GI, Sugar-free alternatives' },
    { id: 'pcos', name: 'PCOS / Hormonal', desc: 'Seed cycling, Anti-inflammatory' },
    { id: 'htn', name: 'Hypertension (HTN)', desc: 'Low sodium, Heart-healthy fats' },
    { id: 'routine', name: 'General Wellness', desc: 'Balanced nutrition for everyday' }
  ];

  return (
    <div className="min-h-screen bg-shakti-cream flex flex-col font-sans">
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-shakti-mitti hover:text-shakti-dark mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-sm border border-shakti-mitti/10">
          <div className="flex items-center gap-5 mb-10">
            <div className="bg-teal-50 text-teal-700 p-4 rounded-2xl">
              <HeartPulse className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-serif text-shakti-dark">Health-aware Planner</h1>
              <p className="text-shakti-mitti mt-1">Science-backed grocery planning for your specific health needs.</p>
            </div>
          </div>

          {step === 1 && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-shakti-dark mb-6">Select your primary focus:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {conditions.map(c => (
                  <div 
                    key={c.id}
                    onClick={() => setCondition(c.id)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${condition === c.id ? 'border-teal-500 bg-teal-50' : 'border-shakti-mitti/10 hover:border-teal-200'}`}
                  >
                    <h3 className="font-bold text-lg text-shakti-dark mb-1">{c.name}</h3>
                    <p className="text-sm text-shakti-mitti">{c.desc}</p>
                  </div>
                ))}
              </div>
              <button 
                disabled={!condition}
                onClick={() => setStep(2)}
                className="bg-shakti-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-shakti-rust transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                Generate Plan <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-300">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-shakti-dark">Your Curated Plan</h2>
                <button onClick={() => setStep(1)} className="text-sm text-teal-700 font-semibold hover:underline">Change Focus</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-shakti-cream/40 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Apple className="w-6 h-6 text-teal-600" />
                    <h3 className="font-bold text-xl text-shakti-dark">Grocery List</h3>
                  </div>
                  <ul className="space-y-4">
                    {['Ragi Flour (1kg)', 'Cold-pressed Mustard Oil', 'Quinoa (500g)', 'Mixed Seeds (Pumpkin, Chia)', 'Green Moong Dal (1kg)'].map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between border-b border-shakti-mitti/10 pb-3 last:border-0 last:pb-0">
                        <span className="font-medium text-shakti-dark">{item}</span>
                        <CheckCircle2 className="w-5 h-5 text-teal-500" />
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => window.location.href = '/cart'} className="w-full mt-6 bg-teal-700 text-white py-3 rounded-xl font-bold hover:bg-teal-800 transition-colors">
                    Add List to Cart
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-6 h-6 text-slate-600" />
                    <h3 className="font-bold text-xl text-shakti-dark">7-Day Meal Preview</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                      <span className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1 block">Breakfast</span>
                      <p className="text-shakti-dark font-medium">Ragi Dosa with Peanut Chutney</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                      <span className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1 block">Lunch</span>
                      <p className="text-shakti-dark font-medium">Quinoa Pulao & Cucumber Raita</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                      <span className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1 block">Dinner</span>
                      <p className="text-shakti-dark font-medium">Moong Dal Soup with Sautéed Veggies</p>
                    </div>
                  </div>
                  <p className="text-xs text-center text-slate-500 mt-4 italic">Full 7-day chart will be emailed to you after checkout.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
