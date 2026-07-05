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
      <div className="bg-shakti-cream/50 rounded-xl p-8 text-center border border-shakti-mitti/20">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-shakti-dark mb-2">Message Sent Successfully!</h3>
        <p className="text-shakti-mitti mb-6">
          Thank you for reaching out. A member of our team will get back to you shortly.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="bg-shakti-dark text-white font-bold py-3 px-6 rounded-xl hover:bg-shakti-rust transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-shakti-dark">Full Name</label>
          <input 
            type="text" 
            name="name"
            required
            placeholder="John Doe"
            className="w-full px-5 py-4 bg-shakti-cream/50 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust transition-all placeholder:text-shakti-mitti/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-shakti-dark">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            required
            placeholder="+91 90000 00000"
            className="w-full px-5 py-4 bg-shakti-cream/50 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust transition-all placeholder:text-shakti-mitti/50"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-bold text-shakti-dark">Email Address</label>
        <input 
          type="email" 
          name="email"
          required
          placeholder="john@example.com"
          className="w-full px-5 py-4 bg-shakti-cream/50 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust transition-all placeholder:text-shakti-mitti/50"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-shakti-dark">Message</label>
        <textarea 
          name="message"
          rows={5}
          required
          placeholder="How can we help you today?"
          className="w-full px-5 py-4 bg-shakti-cream/50 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust transition-all placeholder:text-shakti-mitti/50 resize-none"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-shakti-dark text-white font-bold py-5 rounded-xl hover:bg-shakti-rust transition-colors shadow-lg flex items-center justify-center gap-2 text-lg uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>Sending...</>
        ) : (
          <><Send className="w-5 h-5" /> Send Message</>
        )}
      </button>
    </form>
  );
}
