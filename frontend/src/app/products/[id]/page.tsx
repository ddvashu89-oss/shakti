import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartClient from './AddToCartClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';

async function getProduct(id: string) {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function ProductDetails(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f3efe6] flex flex-col font-sans">
      <main className="flex-1 max-w-[95%] mx-auto py-12 w-full">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-[#201410]/50 hover:text-[#a04a29] transition-colors text-xs font-bold tracking-[0.2em] uppercase">
            Shakti Heritage
          </Link>
          <span className="text-[#201410]/30">&gt;</span>
          <Link href={`/categories/${product.category?.name?.toLowerCase() || 'all'}`} className="text-[#201410]/50 hover:text-[#a04a29] transition-colors text-xs font-bold tracking-[0.2em] uppercase">
            {product.category?.name || 'Category'}
          </Link>
          <span className="text-[#201410]/30">&gt;</span>
          <span className="text-[#a04a29] text-xs font-bold tracking-[0.2em] uppercase truncate">{product.name}</span>
        </div>

        <div className="bg-white rounded-[3rem] shadow-xl border border-[#251c17]/5 p-8 md:p-16 lg:p-24 overflow-hidden relative">
          {/* Faint Hindi Watermark */}
          <div className="absolute -left-20 -bottom-20 text-[30rem] font-serif text-[#201410]/5 select-none pointer-events-none leading-none z-0">
            {product.name[0] || 'श'}
          </div>

          <div className="flex flex-col lg:flex-row gap-16 relative z-10">
            
            {/* Product Image */}
            <div className="lg:w-1/2 flex items-center justify-center">
              <div className="aspect-[4/5] bg-[#f3efe6] rounded-[2rem] w-full max-w-lg relative overflow-hidden shadow-inner">
                {product.oldPrice && (
                  <div className="absolute top-6 left-6 bg-[#a04a29] text-white text-xs font-bold tracking-widest px-4 py-2 rounded-full uppercase z-10 shadow-md">
                    Sale
                  </div>
                )}
                <img 
                  src={product.imageUrl || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80'} 
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-6 border border-[#a04a29]/30 rounded-full px-4 py-1.5 bg-[#a04a29]/5 w-max">
                 <span className="w-2 h-2 rounded-full bg-[#a04a29]"></span>
                 <span className="text-[#a04a29] text-[10px] font-bold tracking-[0.2em] uppercase">100% Shudh Guarantee</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-serif text-[#201410] leading-tight mb-6">{product.name}</h1>
              
              <p className="text-[#201410]/70 text-xl mb-10 leading-relaxed font-medium">
                {product.description || `125 saal ki legacy. Seedhe humari chakki se pisa hua ${product.name}, bina kisi milawat ke.`}
              </p>

              <div className="flex items-end gap-4 mb-12">
                <span className="text-5xl font-sans font-black text-[#201410] tracking-tight">₹{product.price}</span>
                {product.oldPrice && <span className="text-2xl text-[#201410]/40 line-through mb-1 font-medium">₹{product.oldPrice}</span>}
              </div>

              {/* Add to Cart Client Component */}
              <div className="max-w-md">
                 <AddToCartClient product={product} />
              </div>

              {/* Guarantees */}
              <div className="mt-16 border-t border-[#251c17]/10 pt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div>
                   <h4 className="font-serif text-2xl text-[#201410] mb-2">Fresh-ya-Free</h4>
                   <p className="text-sm text-[#201410]/60 font-medium">Purana maal nahi milega. Date check karke lijiye.</p>
                 </div>
                 <div>
                   <h4 className="font-serif text-2xl text-[#201410] mb-2">Naram Roti Waapsi</h4>
                   <p className="text-sm text-[#201410]/60 font-medium">Ghar walon ko pasand na aaye toh poora paisa wapas.</p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
