import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f3efe6] flex flex-col font-sans text-[#201410]">
      
      {/* Hero Section */}
      <section className="bg-[#201410] text-[#f3efe6] py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#d5a046]/30 bg-[#d5a046]/10 text-[#d5a046] text-xs font-bold tracking-[0.2em] uppercase mb-8">Sampark Karein</div>
          <h1 className="text-4xl sm:text-6xl font-serif mb-4 leading-tight font-black">Humse <span className="text-[#a04a29]">Judein</span></h1>
          <p className="text-[#f3efe6]/80 text-xl font-medium max-w-2xl mx-auto font-serif italic">Humein aapse baat karke khushi hogi. Chahe shudh anaj ke baare mein sawal ho, ya sirf haal-chaal puchna ho, humara parivar yahan hai.</p>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Contact Details */}
          <div className="lg:w-1/3 space-y-10">
            <div>
              <h2 className="text-3xl font-serif font-black text-[#201410] mb-10">Sampark Ki Jaankari</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-white text-[#a04a29] rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-[#251c17]/10">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-[#201410] text-xl mb-1 font-serif">Humari Chakki</h4>
                    <p className="text-[#201410]/70 font-medium">123 Heritage Lane, Purana Bazaar<br/>Hisar, Haryana 125001</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-white text-[#a04a29] rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-[#251c17]/10">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-[#201410] text-xl mb-1 font-serif">Phone</h4>
                    <p className="text-[#201410]/70 font-medium">+91 98765 43210<br/>+91 98765 43211</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-white text-[#a04a29] rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-[#251c17]/10">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-[#201410] text-xl mb-1 font-serif">Email</h4>
                    <p className="text-[#201410]/70 font-medium">namaste@shakti.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-white text-[#a04a29] rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-[#251c17]/10">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-[#201410] text-xl mb-1 font-serif">Samay (Time)</h4>
                    <p className="text-[#201410]/70 font-medium">Somvaar - Shanivaar: 8:00 AM - 8:00 PM<br/>Ravivaar: Chakki band rehti hai</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-[3rem] p-10 sm:p-14 shadow-2xl border-4 border-[#251c17]/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#d5a046]/10 rounded-bl-[120px] z-0 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-serif font-black text-[#201410] mb-8">Sandesh Bhejein (Message Us)</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
