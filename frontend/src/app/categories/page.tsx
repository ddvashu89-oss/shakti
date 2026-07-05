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

// Helper to provide icons and descriptions for DB categories
const getCategoryMetadata = (name: string) => {
  const map: Record<string, { icon: string, description: string }> = {
    'Dairy': { icon: '🥛', description: 'Milk, Butter, Cheese, Paneer & more' },
    'Snacks': { icon: '🍪', description: 'Chips, Namkeen, Biscuits & more' },
    'Drinks': { icon: '🥤', description: 'Cold drinks, Juices, Tea & Coffee' },
    'Household': { icon: '🧴', description: 'Detergents, Cleaners, Repellents' },
    'Cleaning': { icon: '🧼', description: 'Soaps, Shampoos, Oral Care' },
    'Rice & Atta': { icon: '🍚', description: 'Rice, Atta, Dals, Pulses' },
    'Masale': { icon: '🧂', description: 'Mirch, Haldi, Jeera, Hing & more' },
    'Vegetables': { icon: '🍅', description: 'Fresh seasonal vegetables' },
    'Fruits': { icon: '🍎', description: 'Fresh seasonal fruits' },
  };
  return map[name] || { icon: '🛍️', description: 'Explore our wide range of products' };
};

export default async function Categories() {
  const dbCategories = await getCategories() || [];

  return (
    <div className="min-h-screen bg-shakti-cream flex flex-col font-sans">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/" className="text-shakti-mitti hover:text-shakti-rust transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-4xl font-serif text-shakti-dark">All Categories</h1>
        </div>

        {dbCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-shakti-mitti text-lg mb-4">No categories found or could not connect to the server.</p>
            <p className="text-sm text-shakti-mitti/70">If you are running this locally, make sure your backend API is running on port 4000.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dbCategories.map((cat: { id: number, name: string, products?: unknown[] }) => {
              const meta = getCategoryMetadata(cat.name);
              return (
                <Link href={`/categories/${cat.name.toLowerCase()}`} key={cat.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer border border-shakti-mitti/10 group block">
                  <div className="w-16 h-16 bg-shakti-cream rounded-2xl flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {meta.icon}
                  </div>
                  <h2 className="text-xl font-bold text-shakti-dark mb-1">{cat.name}</h2>
                  <p className="text-sm text-shakti-mitti mb-4">{meta.description}</p>
                  <div className="text-xs font-bold text-shakti-rust bg-shakti-cream inline-block px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {cat.products?.length || 0} items
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
