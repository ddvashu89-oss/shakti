import Link from 'next/link';
import { Star, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

const API_URL = 'http://127.0.0.1:4000/api';

async function getCategoryProducts(name: string) {
  try {
    console.log(`Fetching category: ${name}`);
    const res = await fetch(`${API_URL}/categories/${encodeURIComponent(name)}`, { cache: 'no-store' });
    console.log(`Fetch status: ${res.status}`);
    if (!res.ok) return null;
    const data = await res.json();
    console.log(`Fetch success:`, Object.keys(data));
    return data;
  } catch (e) {
    console.error('Fetch error in getCategoryProducts:', e);
    return null;
  }
}

type Product = { id: number, name: string, price: string | number, oldPrice?: string | number, rating?: number, imageUrl?: string };

function ProductCard({ prod }: { prod: Product }) {
  return (
    <Link href={`/products/${prod.id}`} className="bg-white rounded-[1.5rem] p-4 shadow-sm hover:shadow-2xl transition-all border border-shakti-mitti/10 flex flex-col h-full group relative block">
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
      
      <h3 className="font-bold text-shakti-dark text-lg mb-3 truncate">{prod.name}</h3>

      <div className="flex items-center gap-2 mb-6 mt-auto">
        <span className="font-black text-2xl text-shakti-dark">₹{prod.price}</span>
        {prod.oldPrice && <span className="text-sm text-shakti-mitti line-through">₹{prod.oldPrice}</span>}
      </div>
      <div className="w-full text-center bg-shakti-dark text-white font-bold py-3.5 rounded-xl hover:bg-shakti-rust transition-colors uppercase tracking-widest text-sm">
        View Details
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
    <div className="min-h-screen bg-shakti-cream flex flex-col font-sans">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/categories" className="text-shakti-mitti hover:text-shakti-rust transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-4xl font-serif text-shakti-dark capitalize">{categoryName}</h1>
        </div>

        {products.length === 0 ? (
          <p className="text-shakti-mitti text-lg">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((prod: Product) => (
              <ProductCard key={prod.id} prod={prod} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
