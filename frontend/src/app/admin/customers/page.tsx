import { Search, Mail, Phone } from 'lucide-react';
import CustomerActions from '@/components/admin/CustomerActions';

const API_URL = 'http://127.0.0.1:4000/api';

async function getCustomers() {
  try {
    const res = await fetch(`${API_URL}/customers`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function AdminCustomers() {
  const customers = await getCustomers() || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Customers Directory</h1>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-shakti-mitti/10 overflow-hidden">
        <div className="p-6 border-b border-shakti-mitti/10 flex items-center justify-between bg-shakti-cream/30">
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full pl-10 pr-4 py-2 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust bg-white"
            />
            <Search className="w-4 h-4 text-shakti-mitti absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-shakti-cream text-shakti-mitti text-sm border-b border-shakti-mitti/10">
                <th className="px-6 py-4 font-bold">Customer Name</th>
                <th className="px-6 py-4 font-bold">Contact Info</th>
                <th className="px-6 py-4 font-bold">Total Orders</th>
                <th className="px-6 py-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {customers.map((customer: { id: number, name: string, email: string, phone?: string, isActive?: boolean, orders?: unknown[] | number }) => (
                <tr key={customer.id} className="border-b border-shakti-mitti/10 hover:bg-shakti-cream/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-shakti-dark">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-shakti-sarson text-shakti-dark flex items-center justify-center font-bold border-2 border-white shadow-sm">
                        {customer.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          {customer.name || 'Unknown'}
                          {customer.isActive === false && (
                            <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Disabled</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-shakti-mitti font-medium">
                    <div className="flex items-center gap-2 mb-1"><Mail className="w-3.5 h-3.5 text-shakti-rust"/> {customer.email}</div>
                    <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-shakti-rust"/> {customer.phone || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 text-shakti-dark font-medium">
                    {typeof customer.orders === 'number' ? customer.orders : (customer.orders?.length || 0)}
                  </td>
                  <td className="px-6 py-4">
                    <CustomerActions customerId={customer.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
