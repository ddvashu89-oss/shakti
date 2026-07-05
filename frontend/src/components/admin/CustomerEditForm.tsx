'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';
import Link from 'next/link';

type CustomerData = {
  id: number;
  name: string;
  email: string;
};

export default function CustomerEditForm({ customer }: { customer: CustomerData }) {
  const [name, setName] = useState(customer.name || '');
  const [email, setEmail] = useState(customer.email || '');
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const res = await fetch(`http://127.0.0.1:4000/api/customers/${customer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        alert(data.error || 'Failed to update customer');
      } else {
        router.push('/admin/customers');
        router.refresh();
      }
    } catch {
      alert('Error updating customer');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] p-8 shadow-sm border border-shakti-mitti/10 max-w-2xl">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-shakti-dark mb-2">Full Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-shakti-mitti/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-shakti-rust bg-shakti-cream/30"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-shakti-dark mb-2">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-shakti-mitti/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-shakti-rust bg-shakti-cream/30"
            required
          />
        </div>

        <div className="pt-4 flex items-center justify-end gap-4">
          <Link href="/admin/customers" className="px-6 py-3 rounded-xl font-bold text-shakti-dark hover:bg-shakti-cream transition-colors">
            Cancel
          </Link>
          <button 
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-shakti-dark text-white px-8 py-3 rounded-xl font-bold hover:bg-shakti-rust transition-colors disabled:opacity-70"
          >
            <Save className="w-5 h-5" /> {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
  );
}
