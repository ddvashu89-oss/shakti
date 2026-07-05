import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import CustomerEditForm from '@/components/admin/CustomerEditForm';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';

async function getCustomer(id: string) {
  try {
    const res = await fetch(`${API_URL}/customers/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function EditCustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = await getCustomer(id);

  if (!customer) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl shadow-sm border border-shakti-mitti/10">
        <h2 className="text-2xl font-bold text-shakti-dark mb-4">Customer Not Found</h2>
        <Link href="/admin/customers" className="text-shakti-rust font-bold hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Customers
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/customers" className="p-2 bg-white text-shakti-dark hover:bg-shakti-cream rounded-xl transition-colors border border-shakti-mitti/10">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Edit Customer Details</h1>
      </div>

      <CustomerEditForm customer={customer} />
    </div>
  );
}
