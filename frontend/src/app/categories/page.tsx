import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';

async function getCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// Helper to provide heritage styling mapping
const getCategoryMetadata = (name: string) => {
  const map: Record<string, { color: string, letter: string }> = {
    'Dairy': { color: 'bg-[#a8825c]', letter: 'दू' },
    'Snacks': { color: 'bg-[#8a3b21]', letter: 'ना' },
    'Drinks': { color: 'bg-[#60623a]', letter: 'पी' },
    'Household': { color: 'bg-[#251c17]', letter: 'घ' },
    'Cleaning': { color: 'bg-[#693021]', letter: 'स' },
    'Rice & Atta': { color: 'bg-[#a37c35]', letter: 'आ' },
    'Masale': { color: 'bg-[#60623a]', letter: 'म' },
    'Vegetables': { color: 'bg-[#a04a29]', letter: 'स' },
    'Fruits': { color: 'bg-[#d5a046]', letter: 'फ' },
  };
  return map[name] || { color: 'bg-[#251c17]', letter: 'श' };
};

export default async function Categories() {
  const dbCategories = await getCategories() || [];

  return (
    <div className="min-h-screen bg-[#f3efe6] flex flex-col font-sans">
      <main className="flex-1 max-w-[95%] mx-auto py-12 w-full">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="text-[#201410]/50 hover:text-[#a04a29] transition-colors border border-[#201410]/10 p-2 rounded-full bg-white/50">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="text-[#a04a29] text-xs font-bold tracking-[0.2em] uppercase">
              Shakti Heritage
            </div>
          </div>
          <h1 className="text-5xl font-serif text-[#201410] leading-tight">
            Humari rasoi,<br/>
            aapke <i className="text-[#a04a29]">ghar.</i>
          </h1>
        </div>

        {dbCategories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#251c17]/5 shadow-sm">
            <p className="text-[#201410]/60 text-lg mb-4 font-serif">Aapki rasoi tak abhi koi saaman nahi pahuncha.</p>
            <p className="text-sm text-[#201410]/40 font-bold tracking-widest uppercase">Make sure the backend API is running</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {dbCategories.map((cat: { id: number, name: string, products?: unknown[] }) => {
              const meta = getCategoryMetadata(cat.name);
              return (
                <Link href={`/categories/${encodeURIComponent(cat.name.toLowerCase())}`} key={cat.id} className={`${meta.color} rounded-2xl p-8 h-56 flex flex-col items-center justify-end relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-md`}>
                  <span className="absolute top-4 right-6 text-[8rem] font-serif text-white/10 leading-none group-hover:scale-110 transition-transform duration-700">
                    {meta.letter}
                  </span>
                  
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                    <span className="text-white text-[10px] font-bold tracking-widest uppercase">
                      {cat.products?.length || 0} Items
                    </span>
                  </div>

                  <h2 className="text-white font-serif text-3xl font-bold relative z-10 text-center leading-none">{cat.name}</h2>
                  <div className="w-8 h-px bg-white/30 mt-4 relative z-10 group-hover:w-16 transition-all duration-500"></div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
