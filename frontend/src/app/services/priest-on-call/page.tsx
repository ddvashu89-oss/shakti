'use client';

import { useState } from 'react';
import { Flame, ArrowLeft, Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function PriestOnCall() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-shakti-cream flex flex-col font-sans">
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-shakti-mitti hover:text-shakti-dark mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-sm border border-shakti-mitti/10">
          <div className="flex items-center gap-5 mb-10">
            <div className="bg-stone-100 text-stone-600 p-4 rounded-2xl">
              <Flame className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-serif text-shakti-dark">Priest-on-Call</h1>
              <p className="text-shakti-mitti mt-1">Certified pandit-ji at your doorstep for any occasion.</p>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-shakti-dark mb-2">Pooja Type</label>
                <select className="w-full p-4 rounded-xl border border-shakti-mitti/20 focus:outline-none focus:border-shakti-rust bg-white" required>
                  <option value="">Select Pooja Type</option>
                  <option value="griha">Griha Pravesh</option>
                  <option value="satyanarayan">Satyanarayan Katha</option>
                  <option value="havan">Havan / Yagya</option>
                  <option value="namkaran">Namkaran Sanskar</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-shakti-dark mb-2">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-shakti-mitti" />
                    <input type="date" className="w-full pl-12 pr-4 py-4 rounded-xl border border-shakti-mitti/20 focus:outline-none focus:border-shakti-rust bg-white" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-shakti-dark mb-2">Preferred Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-shakti-mitti" />
                    <input type="time" className="w-full pl-12 pr-4 py-4 rounded-xl border border-shakti-mitti/20 focus:outline-none focus:border-shakti-rust bg-white" required />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-shakti-dark mb-2">Location / Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-shakti-mitti" />
                  <textarea rows={3} placeholder="Full address" className="w-full pl-12 pr-4 py-4 rounded-xl border border-shakti-mitti/20 focus:outline-none focus:border-shakti-rust bg-white resize-none" required></textarea>
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-shakti-dark text-white py-4 rounded-xl font-bold hover:bg-shakti-rust transition-colors text-lg">
                  Confirm Booking Request
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-12 animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-serif text-shakti-dark mb-4">Request Received!</h2>
              <p className="text-lg text-shakti-mitti mb-8">Pandit-ji&apos;s confirmation and details will be sent to your WhatsApp shortly.</p>
              <Link href="/" className="inline-block bg-shakti-cream text-shakti-dark px-8 py-4 rounded-xl font-bold hover:bg-shakti-mitti/20 transition-colors">
                Return to Homepage
              </Link>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
