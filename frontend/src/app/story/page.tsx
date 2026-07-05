import Link from 'next/link';
import { Leaf, History, Users, HeartHandshake } from 'lucide-react';

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-shakti-cream flex flex-col font-sans text-shakti-dark">
      
      {/* Hero Section */}
      <section className="bg-shakti-mitti text-shakti-cream py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-shakti-sarson/30 bg-shakti-sarson/10 text-shakti-sarson text-sm font-semibold tracking-widest uppercase mb-6">Our Story</div>
          <h1 className="text-5xl sm:text-7xl font-serif mb-6 leading-tight">125 Years of<br/><span className="text-shakti-sarson">Shudhता</span></h1>
          <p className="text-shakti-cream/80 text-xl font-medium max-w-2xl mx-auto">From a small chakki in Hisar to your kitchen, our journey is built on the unwavering foundation of purity and family trust.</p>
        </div>
      </section>

      {/* Story Sections */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-24">
        
        {/* The Beginning */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="aspect-square rounded-[2rem] overflow-hidden shadow-xl border-8 border-white bg-shakti-cream relative">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Old Chakki" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <div className="w-16 h-16 bg-shakti-sarson/20 text-shakti-rust rounded-2xl flex items-center justify-center mb-6">
              <History className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-serif font-bold text-shakti-dark">The Beginning (1900)</h2>
            <p className="text-lg text-shakti-mitti leading-relaxed">
              It started with a simple belief: what we eat shapes who we are. Our great-grandfather set up the first stone chakki in the heart of Hisar, Haryana. He personally sourced the finest golden wheat from local farmers, ensuring that every grain was cleaned by hand before being cold-ground to preserve its nutritional essence.
            </p>
          </div>
        </div>

        {/* The Promise */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="md:w-1/2">
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border-8 border-white bg-shakti-cream relative">
              <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80" alt="Spices and Grains" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <div className="w-16 h-16 bg-shakti-sarson/20 text-shakti-rust rounded-2xl flex items-center justify-center mb-6">
              <Leaf className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-serif font-bold text-shakti-dark">The Promise of Purity</h2>
            <p className="text-lg text-shakti-mitti leading-relaxed">
              We never compromised on quality. Even as demand grew, we refused to adopt industrial methods that burn away nutrients. The &quot;Shuddhata hi asli Shakti hai&quot; (Purity is the real strength) motto became our guiding light. We guarantee that our atta is delivered within hours of milling—Aaj subah pisa, aaj shaam aapki rasoi mein (Milled this morning, in your kitchen by evening).
            </p>
          </div>
        </div>

        {/* The Family Today */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-shakti-cream">
                <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=400&auto=format&fit=crop" alt="Family" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-shakti-cream mt-8">
                <img src="https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?auto=format&fit=crop&w=400&q=80" alt="Spices" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <div className="w-16 h-16 bg-shakti-sarson/20 text-shakti-rust rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-serif font-bold text-shakti-dark">A Family Tradition</h2>
            <p className="text-lg text-shakti-mitti leading-relaxed">
              Today, four generations later, we are still a family-run business. The faces have changed, but the hands that test the grain and the commitment to your family&apos;s health remain exactly the same. When you buy from Kiryana, you&apos;re not just a customer; you&apos;re joining our extended family table.
            </p>
          </div>
        </div>

      </main>
      
      {/* Footer CTA */}
      <section className="bg-white py-16 border-t border-shakti-mitti/10">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <HeartHandshake className="w-16 h-16 text-shakti-rust mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-shakti-dark">Taste the Difference of History</h2>
          <p className="text-lg text-shakti-mitti">Experience the fresh, unadulterated goodness that has kept families coming back for over a century.</p>
          <Link href="/categories" className="inline-block bg-shakti-dark text-white font-bold py-4 px-10 rounded-full hover:bg-shakti-rust transition-colors shadow-xl text-lg uppercase tracking-wide">
            Shop Our Staples
          </Link>
        </div>
      </section>

    </div>
  );
}
