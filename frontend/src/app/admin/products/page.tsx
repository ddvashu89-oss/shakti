'use client';
/* eslint-disable */

import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import ProductModal from '@/components/admin/ProductModal';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`${API_URL}/products`),
        fetch(`${API_URL}/categories`)
      ]);
      if (prodRes.ok) setProducts(await prodRes.json());
      if (catRes.ok) setCategories(await catRes.json());
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveProduct = async (formData: any) => {
    try {
      const isEdit = !!editingProduct;
      const url = isEdit ? `${API_URL}/products/${editingProduct.id}` : `${API_URL}/products`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingProduct(null);
        fetchData(); // Refresh data
      } else {
        alert('Failed to save product');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) {
    return <div className="text-white">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Products Management</h1>
        <button onClick={openAddModal} className="bg-shakti-rust text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-shakti-dark transition-colors font-bold shadow-sm">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-shakti-mitti/10 overflow-hidden">
        <div className="p-6 border-b border-shakti-mitti/10 flex items-center justify-between bg-shakti-cream/30">
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust bg-white text-shakti-dark"
            />
            <Search className="w-4 h-4 text-shakti-mitti absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-shakti-cream text-shakti-mitti text-sm border-b border-shakti-mitti/10">
                <th className="px-6 py-4 font-bold">Product</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold">Price</th>
                <th className="px-6 py-4 font-bold">Stock</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredProducts.map((product: any) => {
                const stock = product.inventory?.stock ?? 0;
                let statusColor = 'bg-red-100 text-red-700 border-red-200';
                let statusText = 'Out of Stock';
                
                if (stock > 10) {
                  statusColor = 'bg-green-100 text-green-700 border-green-200';
                  statusText = 'In Stock';
                } else if (stock > 0) {
                  statusColor = 'bg-orange-100 text-orange-700 border-orange-200';
                  statusText = 'Low Stock';
                }

                return (
                  <tr key={product.id} className="border-b border-shakti-mitti/10 hover:bg-shakti-cream/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-shakti-dark">{product.name}</td>
                    <td className="px-6 py-4 text-shakti-mitti font-medium">{product.category?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 text-shakti-dark font-medium">₹{product.price}</td>
                    <td className="px-6 py-4 text-shakti-dark font-medium">{stock}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColor}`}>
                        {statusText}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <button onClick={() => openEditModal(product)} className="text-shakti-dark hover:text-shakti-rust transition-colors p-2 hover:bg-shakti-cream rounded-lg"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-shakti-mitti">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveProduct} 
        product={editingProduct} 
        categories={categories}
      />
    </div>
  );
}
