'use client';
/* eslint-disable */

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ProductModal({ isOpen, onClose, onSave, product, categories }: any) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    oldPrice: '',
    categoryId: '',
    imageUrl: '',
    stock: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        oldPrice: product.oldPrice || '',
        categoryId: product.categoryId || '',
        imageUrl: product.imageUrl || '',
        stock: product.inventory?.stock || ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        oldPrice: '',
        categoryId: categories?.[0]?.id || '',
        imageUrl: '',
        stock: ''
      });
    }
  }, [product, categories, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-shakti-dark">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-shakti-mitti hover:text-shakti-rust transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-shakti-dark mb-2">Product Name *</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust text-shakti-dark bg-white" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-shakti-dark mb-2">Category *</label>
              <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full px-4 py-2 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust text-shakti-dark bg-white">
                <option value="" disabled>Select Category</option>
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-shakti-dark mb-2">Price (₹) *</label>
              <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust text-shakti-dark bg-white" />
            </div>

            <div>
              <label className="block text-sm font-bold text-shakti-dark mb-2">Old Price (₹)</label>
              <input type="number" step="0.01" value={formData.oldPrice} onChange={e => setFormData({...formData, oldPrice: e.target.value})} className="w-full px-4 py-2 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust text-shakti-dark bg-white" />
            </div>

            <div>
              <label className="block text-sm font-bold text-shakti-dark mb-2">Stock Quantity *</label>
              <input required type="number" min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full px-4 py-2 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust text-shakti-dark bg-white" placeholder="e.g., 50" />
            </div>

            <div>
              <label className="block text-sm font-bold text-shakti-dark mb-2">Image URL</label>
              <input type="text" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-2 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust text-shakti-dark bg-white" placeholder="https://..." />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-shakti-dark mb-2">Description</label>
            <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust text-shakti-dark bg-white"></textarea>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-shakti-mitti/10">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-xl font-bold text-shakti-dark hover:bg-shakti-cream transition-colors border border-shakti-mitti/20 bg-white">Cancel</button>
            <button type="submit" className="px-6 py-2 rounded-xl font-bold text-white bg-shakti-rust hover:bg-shakti-dark transition-colors shadow-sm">
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
