'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { sendMessageAction } from '@/app/actions/contact';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);

    try {
      const res = await sendMessageAction(formData);
      if (res.success) {
        setIsSuccess(true);
      } else {
        console.error(res.error);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
    
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="bg-[#f3efe6] rounded-[2rem] p-10 text-center border border-[#251c17]/5">
        <div className="w-20 h-20 bg-[#a04a29]/10 text-[#a04a29] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-serif font-black text-[#201410] mb-3">Sandesh Mil Gaya!</h3>
        <p className="text-[#201410]/70 mb-8 font-medium">
          Aapka bahut bahut dhanyawad. Humara ek sadasya aapse jald hi sampark karega.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="bg-[#201410] text-[#f3efe6] font-bold py-4 px-8 rounded-xl hover:bg-[#a04a29] transition-colors uppercase tracking-[0.2em] text-xs"
        >
          Ek Aur Sandesh Bhejein
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold tracking-widest uppercase text-[#201410] mb-2 block">Poora Naam (Name)</label>
          <input 
            type="text" 
            name="name"
            required
            placeholder="Rahul Sharma"
            className="w-full px-5 py-4 bg-[#f3efe6] border border-[#251c17]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a04a29] focus:border-[#a04a29] transition-all placeholder:text-[#201410]/30 font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold tracking-widest uppercase text-[#201410] mb-2 block">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            required
            placeholder="+91 90000 00000"
            className="w-full px-5 py-4 bg-[#f3efe6] border border-[#251c17]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a04a29] focus:border-[#a04a29] transition-all placeholder:text-[#201410]/30 font-medium"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-xs font-bold tracking-widest uppercase text-[#201410] mb-2 block">Email Address</label>
        <input 
          type="email" 
          name="email"
          required
          placeholder="rahul@example.com"
          className="w-full px-5 py-4 bg-[#f3efe6] border border-[#251c17]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a04a29] focus:border-[#a04a29] transition-all placeholder:text-[#201410]/30 font-medium"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold tracking-widest uppercase text-[#201410] mb-2 block">Sandesh (Message)</label>
        <textarea 
          name="message"
          rows={5}
          required
          placeholder="Hum aapki kya madad kar sakte hain?"
          className="w-full px-5 py-4 bg-[#f3efe6] border border-[#251c17]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a04a29] focus:border-[#a04a29] transition-all placeholder:text-[#201410]/30 resize-none font-medium"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-[#201410] text-[#f3efe6] font-bold py-5 rounded-xl hover:bg-[#a04a29] transition-colors shadow-xl flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em] mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>Bhej rahe hain...</>
        ) : (
          <><Send className="w-5 h-5" /> Bhejein</>
        )}
      </button>
    </form>
  );
}
