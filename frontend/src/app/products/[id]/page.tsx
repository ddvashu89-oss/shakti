import { Star, Heart, Share2, Truck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartClient from './AddToCartClient';

const API_URL = 'http://127.0.0.1:4000/api';

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
    <div className="min-h-screen bg-shakti-cream py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-shakti-mitti mb-8 font-medium">
          <Link href="/" className="hover:text-shakti-rust transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/categories/${product.category?.name?.toLowerCase() || 'all'}`} className="hover:text-shakti-rust transition-colors">{product.category?.name || 'Category'}</Link>
          <span>/</span>
          <span className="text-shakti-dark font-bold truncate max-w-[200px] inline-block">{product.name}</span>
        </nav>

        <div className="bg-white rounded-[2rem] shadow-sm border border-shakti-mitti/10 p-6 md:p-12">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Product Images */}
            <div className="lg:w-1/2">
              <div className="aspect-square bg-white rounded-3xl overflow-hidden mb-6 border border-shakti-mitti/10 relative flex items-center justify-center p-8">
                {product.oldPrice && (
                  <div className="absolute top-6 left-6 bg-red-500 text-white text-sm font-bold px-4 py-1.5 rounded-full z-10 shadow-sm">
                    {Math.round(((Number(product.oldPrice) - Number(product.price)) / Number(product.oldPrice)) * 100)}% OFF
                  </div>
                )}
                <img src={product.imageUrl || '/products/amul_butter.png'} alt={product.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer bg-white flex items-center justify-center p-2 ${i === 1 ? 'border-shakti-rust shadow-sm' : 'border-shakti-mitti/20 hover:border-shakti-sarson transition-colors'}`}>
                    <img src={product.imageUrl || '/products/amul_butter.png'} alt="Thumbnail" className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl sm:text-5xl font-serif text-shakti-dark leading-tight">{product.name}</h1>
                <div className="flex gap-2 text-shakti-mitti shrink-0">
                  <button className="p-3 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"><Heart className="w-6 h-6" /></button>
                  <button className="p-3 hover:bg-shakti-cream rounded-full transition-colors"><Share2 className="w-6 h-6" /></button>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center text-shakti-sarson">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current text-shakti-mitti/30" />
                </div>
                <span className="text-shakti-dark font-bold text-sm bg-shakti-cream px-3 py-1 rounded-full">{product.rating || 4.5} (215 Reviews)</span>
              </div>

              <div className="flex items-end gap-4 mb-8">
                <span className="text-5xl font-black text-shakti-dark tracking-tight">₹{product.price}</span>
                {product.oldPrice && <span className="text-2xl text-shakti-mitti line-through mb-1 font-medium">₹{product.oldPrice}</span>}
                {product.oldPrice && <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md mb-2 ml-2">Save ₹{Number(product.oldPrice) - Number(product.price)}</span>}
              </div>

              <p className="text-shakti-mitti text-lg mb-10 leading-relaxed max-w-lg">
                {product.description || `Classic ${product.name} with a rich taste. Essential for your kitchen and everyday cooking.`}
              </p>

              {/* Quantity & Add to Cart */}
              <AddToCartClient product={product} />


              {/* Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-shakti-mitti/10 pt-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-shakti-dark text-base mb-1">Superfast Delivery</h4>
                    <p className="text-sm text-shakti-mitti">Get your order within 10 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-700 rounded-2xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-shakti-dark text-base mb-1">Quality Guaranteed</h4>
                    <p className="text-sm text-shakti-mitti">Hand-picked fresh items only</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
