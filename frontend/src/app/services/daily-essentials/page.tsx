'use client';

import { useState } from 'react';
import { ShoppingBag, ArrowLeft, Plus, CheckCircle2, CalendarDays } from 'lucide-react';
import Link from 'next/link';

export default function DailyEssentials() {
  const [activePlan, setActivePlan] = useState(true);

  const essentials = [
    { name: 'Amul Taaza Milk', size: '1 Ltr', price: '₹64', schedule: 'Daily', status: 'Active' },
    { name: 'Harvest Gold Bread', size: '400g', price: '₹40', schedule: 'Alternate Days', status: 'Active' },
    { name: 'Mother Dairy Paneer', size: '200g', price: '₹85', schedule: 'Weekends', status: 'Inactive' },
  ];

  return (
    <div className="min-h-screen bg-shakti-cream flex flex-col font-sans">
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-shakti-mitti hover:text-shakti-dark mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white rounded-[2rem] p-8 sm:p-10 shadow-sm border border-shakti-mitti/10">
            <div className="flex items-center gap-5 mb-8">
              <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-serif text-shakti-dark">Daily Essentials</h1>
                <p className="text-shakti-mitti mt-1">Fresh milk and bread, right at your door every morning.</p>
              </div>
            </div>

            <div className="bg-shakti-cream/40 rounded-2xl p-6 mb-8 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-shakti-dark">Subscription Status</h3>
                <p className="text-sm text-shakti-mitti">Deliveries happen before 7:00 AM</p>
              </div>
              <button 
                onClick={() => setActivePlan(!activePlan)}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${activePlan ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${activePlan ? 'translate-x-8' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="space-y-4">
              {essentials.map((item, idx) => (
                <div key={idx} className={`p-4 border rounded-2xl flex items-center justify-between ${item.status === 'Active' ? 'border-green-200 bg-green-50/30' : 'border-shakti-mitti/20 bg-white'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-shakti-dark">{item.name}</h4>
                      <p className="text-sm text-shakti-mitti">{item.size} • {item.price}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-shakti-dark bg-shakti-cream px-2 py-1 rounded-md">{item.schedule}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-4 border-2 border-dashed border-shakti-mitti/30 rounded-2xl text-shakti-dark font-bold hover:bg-shakti-cream/50 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" /> Add New Item
            </button>
          </div>

          <div className="w-full md:w-80 space-y-6">
            <div className="bg-shakti-dark text-white rounded-[2rem] p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6 opacity-80">
                <CalendarDays className="w-6 h-6" />
                <span className="font-semibold tracking-wider uppercase text-sm">Monthly Estimate</span>
              </div>
              <h2 className="text-5xl font-black mb-2">₹1,420</h2>
              <p className="text-sm text-shakti-cream/60 mb-8">No delivery fees ever.</p>
              <button className="w-full bg-shakti-sarson text-shakti-dark py-3.5 rounded-xl font-bold hover:bg-[#d9b331] transition-colors">
                Manage Wallet
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
