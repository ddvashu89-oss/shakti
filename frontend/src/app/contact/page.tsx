import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-shakti-cream flex flex-col font-sans text-shakti-dark">
      
      {/* Hero Section */}
      <section className="bg-shakti-mitti text-shakti-cream py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl sm:text-6xl font-serif mb-4 leading-tight">Get in <span className="text-shakti-sarson">Touch</span></h1>
          <p className="text-shakti-cream/80 text-xl font-medium max-w-2xl mx-auto">We&apos;d love to hear from you. Whether it&apos;s a question about our pure staples or just to say hello, our family is here to help.</p>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Contact Details */}
          <div className="lg:w-1/3 space-y-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-shakti-dark mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white text-shakti-rust rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-shakti-mitti/10">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-shakti-dark text-lg mb-1">Our Chakki</h4>
                    <p className="text-shakti-mitti">123 Heritage Lane, Old Market<br/>Hisar, Haryana 125001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white text-shakti-rust rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-shakti-mitti/10">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-shakti-dark text-lg mb-1">Phone</h4>
                    <p className="text-shakti-mitti">+91 98765 43210<br/>+91 98765 43211</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white text-shakti-rust rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-shakti-mitti/10">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-shakti-dark text-lg mb-1">Email</h4>
                    <p className="text-shakti-mitti">namaste@kiryanashakti.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white text-shakti-rust rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-shakti-mitti/10">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-shakti-dark text-lg mb-1">Operating Hours</h4>
                    <p className="text-shakti-mitti">Mon - Sat: 8:00 AM - 8:00 PM<br/>Sunday: Closed for milling</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-xl border border-shakti-mitti/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-shakti-sarson/10 rounded-bl-[100px] z-0 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-shakti-dark mb-6">Send us a Message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
