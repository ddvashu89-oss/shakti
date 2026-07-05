'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AddToCartClient({ product }: { product: { id: number, name: string, price: string | number, imageUrl?: string } }) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(q => q + 1);
  };

  const handleAddToCart = () => {
    try {
      const saved = localStorage.getItem('shakti_cart');
      const cart = saved ? JSON.parse(saved) : [];
      const existingItem = cart.find((item: { id: number }) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          quantity: quantity,
          image: product.imageUrl || '/products/amul_butter.png'
        });
      }
      localStorage.setItem('shakti_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex items-center gap-6 mb-12">
      <div className="flex items-center gap-4 bg-shakti-cream border border-shakti-mitti/20 rounded-2xl px-5 py-4">
        <button 
          onClick={handleDecrease}
          className="p-1 hover:bg-white rounded-lg transition-colors text-shakti-dark shadow-sm"
        >
          <Minus className="w-5 h-5" />
        </button>
        <span className="font-bold text-xl w-10 text-center text-shakti-dark">{quantity}</span>
        <button 
          onClick={handleIncrease}
          className="p-1 hover:bg-white rounded-lg transition-colors text-shakti-dark shadow-sm"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <Link 
        href="/checkout"
        onClick={handleAddToCart}
        className="flex-1 bg-shakti-dark text-white font-bold py-5 rounded-2xl hover:bg-shakti-rust transition-colors shadow-xl shadow-shakti-rust/20 text-lg flex items-center justify-center uppercase tracking-wider"
      >
        Add to Cart
      </Link>
    </div>
  );
}
