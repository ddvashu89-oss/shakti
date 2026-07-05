'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, CheckCircle2, MoreVertical, Loader2 } from 'lucide-react';

export default function OrderActions({ orderId, currentStatus }: { orderId: number, currentStatus: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateStatus = async (status: string) => {
    if (status === currentStatus) return;
    
    setIsLoading(true);
    setIsOpen(false);
    try {
      const res = await fetch(`http://127.0.0.1:4000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to update status');
      }
    } catch {
      alert('Error updating status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <button className="text-shakti-rust hover:text-shakti-dark flex items-center gap-1 font-bold transition-colors">
        <Eye className="w-4 h-4" /> View
      </button>
      
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
          className="p-1 text-shakti-mitti hover:bg-shakti-cream rounded-full transition-colors disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <MoreVertical className="w-5 h-5" />}
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-shakti-mitti/10 py-1 z-20">
              {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(status)}
                  className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-shakti-cream/50 transition-colors flex items-center justify-between ${currentStatus === status ? 'text-shakti-rust' : 'text-shakti-dark'}`}
                >
                  {status}
                  {currentStatus === status && <CheckCircle2 className="w-4 h-4 text-shakti-rust" />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
