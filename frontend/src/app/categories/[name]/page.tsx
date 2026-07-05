import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';

async function getCategoryProducts(name: string) {
  try {
    const res = await fetch(`${API_URL}/categories/${encodeURIComponent(name)}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

type Product = { id: number, name: string, price: string | number, oldPrice?: string | number, rating?: number, imageUrl?: string, description?: string };

function ProductCard({ prod }: { prod: Product }) {
  return (
    <Link href={`/products/${prod.id}`} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#251c17]/5 flex flex-col h-full group block relative overflow-hidden">
      {/* Discount Tag (if old price exists) */}
      {prod.oldPrice && (
        <div className="absolute top-4 left-4 bg-[#a04a29] text-white text-[10px] font-bold tracking-widest px-2 py-1 rounded-full uppercase z-10">
          Sale
        </div>
      )}
      
      <div className="aspect-[4/3] bg-[#f3efe6] rounded-xl mb-4 overflow-hidden relative">
        <img 
          src={prod.imageUrl || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80'} 
          alt={prod.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
      </div>
      
      <div className="flex flex-col flex-1">
        <h3 className="font-serif text-[#201410] text-xl mb-2 font-bold leading-tight">{prod.name}</h3>
        <p className="text-[#201410]/60 text-sm mb-4 line-clamp-2">
          {prod.description || '125 saal purani chakki se taja pisa hua.'}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-sans font-bold text-2xl text-[#201410]">₹{prod.price}</span>
              {prod.oldPrice && <span className="text-sm text-[#201410]/40 line-through font-medium">₹{prod.oldPrice}</span>}
            </div>
            <div className="text-[10px] font-bold text-[#a04a29] uppercase tracking-widest mt-1">
              Fresh-ya-Free Guarantee
            </div>
          </div>
          
          <div className="w-10 h-10 bg-[#251c17] rounded-full flex items-center justify-center text-white group-hover:bg-[#a04a29] transition-colors duration-300 shadow-md">
             <span className="text-xl leading-none -mt-1">+</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function CategoryProducts(props: { params: Promise<{ name: string }> }) {
  const params = await props.params;
  const categoryName = decodeURIComponent(params.name);
  const categoryData = await getCategoryProducts(categoryName);
  
  if (!categoryData) {
    notFound();
  }

  const products = categoryData.products || [];

  return (
    <div className="min-h-screen bg-[#f3efe6] flex flex-col font-sans">
      <main className="flex-1 max-w-[95%] mx-auto py-12 w-full">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/categories" className="text-[#201410]/50 hover:text-[#a04a29] transition-colors border border-[#201410]/10 p-2 rounded-full bg-white/50">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="text-[#a04a29] text-xs font-bold tracking-[0.2em] uppercase">
              Category
            </div>
          </div>
          <h1 className="text-5xl font-serif text-[#201410] leading-tight capitalize">
            {categoryName.toLowerCase()}
          </h1>
          <p className="text-[#201410]/60 mt-4 max-w-2xl text-lg font-medium">
            Seedhe humari chakki aur ghani se aapke ghar tak. 100% shudh, bina milawat.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#251c17]/5 shadow-sm">
            <p className="text-[#201410]/60 text-lg mb-2 font-serif">Is category mein abhi koi saaman nahi hai.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((prod: Product) => (
              <ProductCard key={prod.id} prod={prod} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
