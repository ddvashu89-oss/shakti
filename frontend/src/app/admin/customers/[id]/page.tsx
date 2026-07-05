import { ArrowLeft, Mail, Calendar, ShoppingBag, MapPin } from 'lucide-react';
import Link from 'next/link';

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

export default async function ViewCustomerPage({ params }: { params: Promise<{ id: string }> }) {
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
      <div className="flex items-center gap-4">
        <Link href="/admin/customers" className="p-2 bg-white text-shakti-dark hover:bg-shakti-cream rounded-xl transition-colors border border-shakti-mitti/10">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Customer Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-shakti-mitti/10">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-shakti-sarson text-shakti-dark flex items-center justify-center text-3xl font-black border-4 border-white shadow-md mb-4">
              {customer.name?.charAt(0) || 'U'}
            </div>
            <h2 className="text-2xl font-black text-shakti-dark">{customer.name || 'Unknown'}</h2>
            <p className="text-shakti-mitti font-medium">Customer ID: #{customer.id}</p>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-shakti-dark font-medium pb-4 border-b border-shakti-mitti/10">
              <div className="p-2 bg-shakti-cream rounded-lg text-shakti-rust"><Mail className="w-5 h-5" /></div>
              {customer.email}
            </div>
            <div className="flex items-center gap-3 text-shakti-dark font-medium pb-4 border-b border-shakti-mitti/10">
              <div className="p-2 bg-shakti-cream rounded-lg text-shakti-rust"><Calendar className="w-5 h-5" /></div>
              Joined {new Date(customer.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Orders and Addresses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-shakti-mitti/10">
            <h3 className="text-xl font-bold text-shakti-dark mb-6 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-shakti-rust" /> Order History
            </h3>
            
            {customer.orders && customer.orders.length > 0 ? (
              <div className="space-y-4">
                {customer.orders.map((order: { id: number, createdAt: string, total: string | number, status: string }) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-shakti-cream/30 rounded-2xl border border-shakti-mitti/10">
                    <div>
                      <h4 className="font-bold text-shakti-dark">Order #{order.id}</h4>
                      <p className="text-sm text-shakti-mitti">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-shakti-dark">₹{order.total}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold inline-block mt-1 ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-shakti-mitti">This customer hasn&apos;t placed any orders yet.</p>
            )}
          </div>
          
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-shakti-mitti/10">
            <h3 className="text-xl font-bold text-shakti-dark mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-shakti-rust" /> Saved Addresses
            </h3>
            {customer.addresses && customer.addresses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customer.addresses.map((addr: { id: number, line1: string, line2?: string, city: string, state: string, zip: string }) => (
                  <div key={addr.id} className="p-4 bg-shakti-cream/30 rounded-2xl border border-shakti-mitti/10">
                    <p className="font-medium text-shakti-dark">{addr.line1}</p>
                    {addr.line2 && <p className="font-medium text-shakti-dark">{addr.line2}</p>}
                    <p className="text-shakti-mitti text-sm">{addr.city}, {addr.state} {addr.zip}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-shakti-mitti">No saved addresses found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
