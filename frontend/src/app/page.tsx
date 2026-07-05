import Link from 'next/link';

// Use an absolute URL for server-side fetching
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';

export const dynamic = 'force-dynamic';

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
  const allProducts = await getProducts();
  const popularProducts = allProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f3efe6] flex flex-col font-sans">
      <main className="flex-1 w-full">
        
        {/* Top Dark Stats Bar */}
        <div className="bg-[#251c17] text-white/90 py-10 px-8 mx-auto max-w-[95%] rounded-3xl my-6 flex flex-wrap gap-8 justify-between items-center shadow-lg">
          <div className="flex-1 min-w-[200px] border-r border-white/10 last:border-0">
            <h3 className="text-4xl font-serif text-[#d5a046] mb-1 font-bold">1900</h3>
            <p className="text-sm font-medium">Se aaj tak — ek hi dukaan, ek hi bharosa</p>
          </div>
          <div className="flex-1 min-w-[200px] border-r border-white/10 last:border-0 hidden md:block">
            <h3 className="text-4xl font-serif text-[#d5a046] mb-1 font-bold">5</h3>
            <p className="text-sm font-medium">Pidhiyaan, ek hi rasoi ka waada</p>
          </div>
          <div className="flex-1 min-w-[200px] border-r border-white/10 last:border-0 hidden lg:block">
            <h3 className="text-4xl font-serif text-[#d5a046] mb-1 font-bold">0</h3>
            <p className="text-sm font-medium">Bicholiye — apni chakki, apni ghani</p>
          </div>
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-4xl font-serif text-[#d5a046] mb-1 font-bold">100%</h3>
            <p className="text-sm font-medium">Shudh — ya paisa wapas</p>
          </div>
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-[95%] relative bg-gradient-to-br from-[#a04a29] to-[#693021] rounded-[2rem] overflow-hidden min-h-[500px] flex items-center p-8 md:p-16 mb-20 shadow-xl">
          {/* Faint Hindi Watermark */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[30rem] font-serif text-black/5 select-none pointer-events-none leading-none">
            शक्ति
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-4 text-white/60 text-xs font-bold tracking-widest uppercase mb-10">
              <span className="w-12 h-px bg-white/30"></span>
              EST. 1900 • HISAR, HARYANA • 5 PIDHIYAAN
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-[1.1] tracking-tight drop-shadow-sm">
              Aaj subah <i className="text-[#d5a046]">pisa</i> atta.<br/>
              Aaj shaam aapki <i className="text-[#d5a046]">rasoi</i> mein.
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl font-light">
              Warehouse se nahi — <strong className="text-[#d5a046] font-semibold">humari apni chakki aur ghani</strong> se. 125 saal se ek hi kaam, poori imaandaari se.
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/categories" className="bg-[#d5a046] text-[#201410] font-bold text-lg px-8 py-4 rounded-full hover:bg-white transition-colors duration-300 shadow-lg">
                Aaj ka taaza dekhein
              </Link>
              <Link href="/story" className="text-white border border-white/40 px-8 py-4 rounded-full hover:bg-white/10 transition-colors duration-300 font-medium">
                Humari kahani &rarr;
              </Link>
            </div>

            <div className="mt-16 inline-flex items-center gap-3 border border-white/20 rounded-full px-4 py-2 bg-black/10 backdrop-blur-sm">
               <span className="w-2.5 h-2.5 rounded-full bg-[#d5a046]"></span>
               <span className="text-white/70 text-xs font-bold tracking-widest uppercase">Har pack pe "Pisa Gaya" ki date — check karke lo</span>
            </div>
          </div>
        </section>

        {/* Categories Grid (Humari rasoi, aapke ghar) */}
        <section className="max-w-[95%] mx-auto mb-20">
          <div className="flex items-end justify-between mb-10 px-2">
            <h2 className="text-4xl font-serif text-[#201410] font-bold">Humari rasoi, aapke ghar</h2>
            <Link href="/categories" className="text-sm font-bold text-[#8a3b21] uppercase tracking-widest hover:underline hidden sm:block">
              Sab Dekhein &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {[
              { title: 'Atta', sub: 'Chakki-Fresh', color: 'bg-[#a37c35]', letter: 'आ' },
              { title: 'Sarson Tel', sub: 'Kachi Ghani', color: 'bg-[#a04a29]', letter: 'ते' },
              { title: 'Dal', sub: 'Single-Origin', color: 'bg-[#8a3b21]', letter: 'दा' },
              { title: 'Masala', sub: 'Recipe Blends', color: 'bg-[#60623a]', letter: 'म' },
              { title: 'Achaar', sub: 'Small-Batch', color: 'bg-[#693021]', letter: 'अ' },
              { title: 'Makhana', sub: 'Roasted', color: 'bg-[#a8825c]', letter: 'म' },
            ].map((cat, i) => (
              <Link href="/categories" key={i} className={`${cat.color} rounded-2xl p-6 h-48 flex flex-col items-center justify-end relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-md`}>
                <span className="absolute top-2 right-4 text-[7rem] font-serif text-white/10 leading-none group-hover:scale-110 transition-transform duration-500">
                  {cat.letter}
                </span>
                <h3 className="text-white font-serif text-2xl font-bold relative z-10">{cat.title}</h3>
                <p className="text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase mt-1 relative z-10">{cat.sub}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="max-w-[95%] mx-auto mb-20 bg-[#e8e2d4] rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-sm border border-[#251c17]/5">
          <div className="flex-1 p-10 md:p-16 lg:p-24 flex flex-col justify-center">
            <div className="text-[#a04a29] text-xs font-bold tracking-[0.2em] uppercase mb-8">
              Humari Kahani • 1900 Se
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#201410] mb-8 leading-tight">
              Ek dukaan. <i className="text-[#a04a29]">Paanch pidhiyaan.</i> Ek hi waada.
            </h2>
            <p className="text-[#201410]/80 text-lg md:text-xl leading-relaxed mb-6 font-medium">
              Jo humne 125 saal pehle kiya, wahi aaj karte hain — sahi anaaj chunna, apni chakki pe peesna, aur bina milawat ke aapke ghar bhejna. Naye brands ko bharosa kamaana padta hai. Hum us bharose ke saath paida hue.
            </p>
            <p className="text-[#201410]/80 text-lg md:text-xl leading-relaxed mb-10 font-medium">
              Ab wahi Shakti seedhe aapki dehleez tak — bina bicholiye, bina samjhaute.
            </p>
            <Link href="/story" className="text-[#201410] font-bold tracking-widest uppercase text-sm border-b-2 border-[#d5a046] pb-1 w-max hover:text-[#a04a29] transition-colors">
              Poori Kahani Padhein &rarr;
            </Link>
          </div>
          <div className="flex-1 bg-[#201410] relative flex items-center justify-center p-12 min-h-[400px]">
            <div className="text-center">
               <h2 className="text-[6rem] md:text-[8rem] font-serif text-[#d5a046]/40 leading-none mb-4">शक्ति</h2>
               <p className="text-[#d5a046] text-xl font-serif italic">since 1900</p>
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center">
               <p className="text-white/30 text-xs tracking-[0.3em] font-mono uppercase">
                 [ Yahan Dadaji / Dukaan / Chakki Ki Asli Purani Photo ]
               </p>
            </div>
          </div>
        </section>

        {/* Guarantees Box */}
        <section className="max-w-[95%] mx-auto mb-20 bg-[#251c17] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row gap-12 justify-between items-start text-center md:text-left shadow-xl">
           <div className="flex-1 border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-12 last:border-0">
             <h3 className="text-3xl font-serif text-[#d5a046] mb-4">Fresh-ya-Free</h3>
             <p className="text-white/80 leading-relaxed font-medium">
               Atta 7 din se purana pisa hua? Bilkul free. Date pack pe likhi hai — khud check karo.
             </p>
           </div>
           <div className="flex-1 border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-12 last:border-0">
             <h3 className="text-3xl font-serif text-[#d5a046] mb-4">Shudhता Challenge</h3>
             <p className="text-white/80 leading-relaxed font-medium">
               Humare tel/atte mein milawat dhoond ke dikhao. Humein apni shudhता pe utna bharosa hai.
             </p>
           </div>
           <div className="flex-1">
             <h3 className="text-3xl font-serif text-[#d5a046] mb-4">Naram Roti Waapsi</h3>
             <p className="text-white/80 leading-relaxed font-medium">
               Ghar walon ko pasand na aaye? Bina sawaal poora paisa wapas.
             </p>
           </div>
        </section>

      </main>
    </div>
  );
}
