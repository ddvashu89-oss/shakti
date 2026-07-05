import Link from 'next/link';
import { Star, ShieldCheck, ThumbsUp, Sparkles, TrendingUp, ChefHat, ShoppingBag, Camera, HeartPulse, Flame, ChevronRight } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import { AnimatedSection, AnimatedCard } from '@/components/AnimatedSection';

// Use an absolute URL for server-side fetching
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';

export const dynamic = 'force-dynamic';

async function getCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/products`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function Home() {
  const allCategories = await getCategories();
  const allProducts = await getProducts();
  
  // Map icons manually for now or use default
  const getIcon = (name: string) => {
    const icons: Record<string, string> = {
      'Rice & Atta': '🌾',
      'Dairy': '🥛',
      'Masale': '🌶️',
      'Snacks': '🍪',
      'Vegetables': '🥦'
    };
    return icons[name] || '🛒';
  };

  // Limit to top 4 popular products
  const popularProducts = allProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-shakti-cream flex flex-col font-sans">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Heritage Hero Section */}
        <AnimatedSection delay={0.1}>
        <section className="bg-gradient-to-br from-shakti-dark via-shakti-card to-shakti-mitti rounded-[2.5rem] p-8 sm:p-16 text-shakti-cream flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-2xl relative z-10">
            <div className="inline-block px-5 py-2 rounded-full border border-shakti-sarson/30 bg-shakti-sarson/10 text-shakti-sarson text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-sm">Since 1900 • Hisar</div>
            <h1 className="text-5xl sm:text-7xl font-serif mb-6 leading-tight tracking-tight text-white drop-shadow-sm">Shuddhata hi asli<br/><span className="text-shakti-sarson">Shakti</span> hai.</h1>
            <p className="text-shakti-cream/90 text-xl mb-12 font-medium max-w-lg leading-relaxed">Aaj subah pisa atta. Aaj shaam aapki rasoi mein. Pure, fresh, and grounded in 125 years of family trust.</p>
            <Link href="/categories" className="inline-block bg-gradient-to-r from-shakti-sarson to-shakti-gold text-shakti-dark font-bold py-4 px-10 rounded-full hover:shadow-[0_10px_40px_rgba(240,201,63,0.3)] transition-all duration-300 hover:-translate-y-1 text-lg">
              Explore Our Staples
            </Link>
          </div>
          <div className="mt-12 md:mt-0 relative z-10 hidden md:block">
             <HeroCarousel />
          </div>
        </section>
        </AnimatedSection>

        {/* Guarantee Band */}
        <AnimatedSection delay={0.2}>
        <section className="mt-12 bg-white/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-sm border border-shakti-mitti/5 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-shakti-mitti/10">
          <div className="flex items-center gap-5 pt-4 md:pt-0 md:px-4 group">
             <div className="bg-shakti-cream p-4 rounded-2xl text-shakti-rust group-hover:bg-shakti-rust group-hover:text-white transition-colors duration-300"><Sparkles className="w-6 h-6" /></div>
             <div><h4 className="font-bold text-shakti-dark">Freshness Guaranteed</h4><p className="text-sm text-shakti-mitti">Atta older than 7 days is on us.</p></div>
          </div>
          <div className="flex items-center gap-5 pt-4 md:pt-0 md:px-4 group">
             <div className="bg-shakti-cream p-4 rounded-2xl text-shakti-rust group-hover:bg-shakti-rust group-hover:text-white transition-colors duration-300"><ShieldCheck className="w-6 h-6" /></div>
             <div><h4 className="font-bold text-shakti-dark">Shuddhata Challenge</h4><p className="text-sm text-shakti-mitti">Find any impurity, get a reward.</p></div>
          </div>
          <div className="flex items-center gap-5 pt-4 md:pt-0 md:px-4 group">
             <div className="bg-shakti-cream p-4 rounded-2xl text-shakti-rust group-hover:bg-shakti-rust group-hover:text-white transition-colors duration-300"><ThumbsUp className="w-6 h-6" /></div>
             <div><h4 className="font-bold text-shakti-dark">Naram Roti Waapsi</h4><p className="text-sm text-shakti-mitti">100% return if not satisfied.</p></div>
          </div>
        </section>
        </AnimatedSection>

        {/* Categories */}
        <AnimatedSection delay={0.1}>
        <section className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif text-shakti-dark">Our Staples</h2>
            <Link href="/categories" className="text-shakti-rust font-semibold hover:underline">View All</Link>
          </div>
          {allCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-shakti-mitti text-lg mb-2">No categories found or could not connect to the server.</p>
              <p className="text-sm text-shakti-mitti/70">Ensure the backend API is running and the database is seeded.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {allCategories.map((cat: { id: number, name: string }, index: number) => (
                <AnimatedCard key={cat.id} delay={index * 0.05}>
                  <Link href={`/categories/${cat.name.toLowerCase()}`} className="flex flex-col items-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer border border-shakti-mitti/5 group w-full h-full">
                    <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">{getIcon(cat.name)}</span>
                    <span className="text-sm font-bold text-shakti-dark text-center uppercase tracking-wide">{cat.name}</span>
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          )}
        </section>
        </AnimatedSection>

        {/* Aaj Taaza Nikla (Popular) */}
        <AnimatedSection delay={0.2}>
        <section className="mt-20 mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif text-shakti-dark flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-shakti-rust"/> Aaj Taaza Nikla
            </h2>
          </div>
          {popularProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-shakti-mitti text-lg mb-2">No popular products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularProducts.map((prod: { id: number, imageUrl?: string, name: string, rating?: number, description?: string, price: number | string, oldPrice?: number | string }, index: number) => (
                <AnimatedCard key={prod.id} delay={index * 0.1}>
                  <Link href={`/products/${prod.id}`} className="bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border border-shakti-mitti/5 group relative block flex flex-col h-full">
                    <div className="aspect-square bg-shakti-cream rounded-2xl mb-4 overflow-hidden relative">
                      <img 
                        src={prod.imageUrl || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'} 
                        alt={prod.name} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <div className="flex items-center gap-1 text-shakti-sarson mb-2 text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-shakti-dark font-bold">{prod.rating || 4.5}</span>
                    </div>
                    <h3 className="font-bold text-shakti-dark text-lg mb-1 truncate">{prod.name}</h3>
                    <div className="inline-block bg-shakti-cream text-shakti-rust text-xs font-semibold px-2 py-1 rounded-md mb-4 self-start">
                      {prod.description || 'Fresh Stock'}
                    </div>
                    <div className="flex items-center gap-2 mb-6 mt-auto">
                      <span className="font-black text-2xl text-shakti-dark">₹{prod.price}</span>
                      {prod.oldPrice && <span className="text-sm text-shakti-mitti line-through">₹{prod.oldPrice}</span>}
                    </div>
                    <div className="w-full text-center bg-shakti-dark text-white font-bold py-3.5 rounded-xl group-hover:bg-shakti-rust transition-colors duration-300 uppercase tracking-[0.2em] text-xs">
                      View Details
                    </div>
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          )}
        </section>
        </AnimatedSection>

        {/* Smart Services */}
        <AnimatedSection delay={0.1}>
        <section className="mt-20 mb-20 max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-10">
            <h2 className="text-3xl font-serif text-shakti-dark text-center">Smart Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <AnimatedCard delay={0.1}>
            <Link href="/services/reels-to-recipe" className="bg-white rounded-3xl p-6 flex items-center justify-between border border-shakti-mitti/5 shadow-sm hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group h-full">
              <div className="flex items-center gap-5">
                <div className="bg-orange-50 text-orange-600 p-3 rounded-2xl">
                  <ChefHat className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-shakti-dark mb-1">Reels → Recipe</h3>
                  <p className="text-sm text-shakti-mitti">Paste an Instagram/YouTube link. Recipe + groceries — ready.</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-shakti-mitti group-hover:text-shakti-dark group-hover:translate-x-1 transition-all" />
            </Link>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
            <Link href="/services/daily-essentials" className="bg-white rounded-3xl p-6 flex items-center justify-between border border-shakti-mitti/5 shadow-sm hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group h-full">
              <div className="flex items-center gap-5">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-shakti-dark mb-1">Daily Essentials</h3>
                  <p className="text-sm text-shakti-mitti">Active • ₹79/day • no delivery fee</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-shakti-mitti group-hover:text-shakti-dark group-hover:translate-x-1 transition-all" />
            </Link>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
            <Link href="/services/ghar-aur-mandir" className="bg-white rounded-3xl p-6 flex items-center justify-between border border-shakti-mitti/5 shadow-sm hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group h-full">
              <div className="flex items-center gap-5">
                <div className="bg-emerald-50 text-emerald-700 p-3 rounded-2xl">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-shakti-dark mb-1">Ghar aur Mandir</h3>
                  <p className="text-sm text-shakti-mitti">Pooja kits + custom wizard — for daily aarti to Griha Pravesh.</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-shakti-mitti group-hover:text-shakti-dark group-hover:translate-x-1 transition-all" />
            </Link>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
            <Link href="/services/cook-and-earn" className="bg-white rounded-3xl p-6 flex items-center justify-between border border-shakti-mitti/5 shadow-sm hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group h-full">
              <div className="flex items-center gap-5">
                <div className="bg-green-50 text-green-700 p-3 rounded-2xl">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-shakti-dark mb-1">Cook & Earn</h3>
                  <p className="text-sm text-shakti-mitti">Made a dish? Upload a pic. AI verifies. Coins come home.</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-shakti-mitti group-hover:text-shakti-dark group-hover:translate-x-1 transition-all" />
            </Link>
            </AnimatedCard>

            <AnimatedCard delay={0.5}>
            <Link href="/services/health-planner" className="bg-white rounded-3xl p-6 flex items-center justify-between border border-shakti-mitti/5 shadow-sm hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group h-full">
              <div className="flex items-center gap-5">
                <div className="bg-teal-50 text-teal-700 p-3 rounded-2xl">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-shakti-dark mb-1">Health-aware planner</h3>
                  <p className="text-sm text-shakti-mitti">Diabetic, PCOS, HTN or a routine — we plan monthly grocery + 7-day meals, science-backed.</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-shakti-mitti group-hover:text-shakti-dark group-hover:translate-x-1 transition-all" />
            </Link>
            </AnimatedCard>

            <AnimatedCard delay={0.6}>
            <Link href="/services/priest-on-call" className="bg-white rounded-3xl p-6 flex items-center justify-between border border-shakti-mitti/5 shadow-sm hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group h-full">
              <div className="flex items-center gap-5">
                <div className="bg-stone-100 text-stone-600 p-3 rounded-2xl">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-shakti-dark mb-1">Priest-on-Call</h3>
                  <p className="text-sm text-shakti-mitti">Certified pandit-ji at your doorstep for aarti to Griha Pravesh.</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-shakti-mitti group-hover:text-shakti-dark group-hover:translate-x-1 transition-all" />
            </Link>
            </AnimatedCard>

          </div>
        </section>
        </AnimatedSection>

        {/* Our Story */}
        <AnimatedSection delay={0.2}>
        <section className="mt-24 mb-16 bg-white rounded-[3rem] p-10 sm:p-20 border border-shakti-mitti/5 shadow-xl flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-serif text-shakti-dark mb-6">Our Story</h2>
            <p className="text-lg text-shakti-mitti leading-relaxed mb-6">
              It started in 1900 in the bustling lanes of Hisar, Haryana. Our great-grandfather set up a small chakki to provide pure, unadulterated wheat flour to the neighborhood. 
            </p>
            <p className="text-lg text-shakti-mitti leading-relaxed mb-8">
              Five generations later, our methods have scaled, but our promise remains exactly the same. We don&apos;t believe in 10-minute delivery if it compromises quality. We believe in fresh ingredients, processed with care, and delivered to your family&apos;s kitchen exactly when you need them.
            </p>
            <button className="text-shakti-rust font-bold uppercase tracking-widest border-b-2 border-shakti-rust pb-1 hover:text-shakti-dark hover:border-shakti-dark transition-colors">Read Full Story</button>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
               <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Old Kiryana Store" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-shakti-sarson p-6 rounded-2xl shadow-xl max-w-[200px] rotate-[-5deg]">
              <p className="font-serif text-shakti-dark font-bold text-lg leading-tight">125 Years of Family Trust.</p>
            </div>
          </div>
        </section>
        </AnimatedSection>


      </main>
    </div>
  );
}
