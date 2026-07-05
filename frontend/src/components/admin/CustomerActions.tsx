'use client';

import { Edit2, Eye, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CustomerActions({ customerId }: { customerId: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleView = () => {
    router.push(`/admin/customers/${customerId}`);
  };

  const handleEdit = () => {
    router.push(`/admin/customers/${customerId}/edit`);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api'}/customers/${customerId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (!res.ok) {
        alert(data.error || 'Failed to delete customer');
      } else {
        router.refresh();
      }
    } catch {
      alert('An error occurred while deleting the customer.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={handleView}
        className="p-2 text-shakti-rust hover:bg-shakti-cream rounded-xl transition-colors group" 
        title="View Profile"
      >
        <Eye className="w-4 h-4 group-hover:text-shakti-dark" />
      </button>
      <button 
        onClick={handleEdit}
        className="p-2 text-shakti-rust hover:bg-shakti-cream rounded-xl transition-colors group" 
        title="Edit Customer"
      >
        <Edit2 className="w-4 h-4 group-hover:text-shakti-dark" />
      </button>
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors group disabled:opacity-50" 
        title="Delete Customer"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
