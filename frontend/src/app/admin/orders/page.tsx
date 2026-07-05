import { Search } from 'lucide-react';
import OrderActions from '@/components/admin/OrderActions';

const API_URL = 'http://127.0.0.1:4000/api';

async function getOrders() {
  try {
    const res = await fetch(`${API_URL}/orders`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function AdminOrders() {
  const orders = await getOrders() || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Orders Management</h1>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-shakti-mitti/10">
        <div className="p-6 border-b border-shakti-mitti/10 flex items-center justify-between bg-shakti-cream/30">
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full pl-10 pr-4 py-2 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust bg-white"
            />
            <Search className="w-4 h-4 text-shakti-mitti absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <div className="flex gap-2">
            <select className="border border-shakti-mitti/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-shakti-rust bg-white font-medium text-shakti-dark">
              <option>All Status</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-shakti-cream text-shakti-mitti text-sm border-b border-shakti-mitti/10">
                <th className="px-6 py-4 font-bold">Order ID</th>
                <th className="px-6 py-4 font-bold">Date & Time</th>
                <th className="px-6 py-4 font-bold">Customer</th>
                <th className="px-6 py-4 font-bold">Total</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Payment</th>
                <th className="px-6 py-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.map((order: { id: number, createdAt: string, user?: { name?: string }, total: string | number, status: string }) => (
                <tr key={order.id} className="border-b border-shakti-mitti/10 hover:bg-shakti-cream/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-shakti-dark">#ORD-{order.id.toString().padStart(3, '0')}</td>
                  <td className="px-6 py-4 text-shakti-mitti font-medium">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4 text-shakti-dark font-medium">{order.user?.name || 'Unknown'}</td>
                  <td className="px-6 py-4 font-bold text-shakti-dark">₹{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700 border border-green-200' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                      'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200`}>
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <OrderActions orderId={order.id} currentStatus={order.status} />
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
