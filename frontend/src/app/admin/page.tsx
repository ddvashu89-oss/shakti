import { TrendingUp, Users, ShoppingBag, PackageOpen } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';

async function getStats() {
  try {
    const res = await fetch(`${API_URL}/stats`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function getOrders() {
  try {
    const res = await fetch(`${API_URL}/orders`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/products`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function AdminDashboard() {
  const statsData = await getStats() || { revenue: 0, activeOrders: 0, totalCustomers: 0, totalProducts: 0 };
  const allOrders = await getOrders() || [];
  const allProducts = await getProducts() || [];
  
  const recentOrders = allOrders.slice(0, 5);
  const topProducts = allProducts.slice(0, 4);

  const stats = [
    { title: 'Total Revenue', value: `₹${statsData.revenue.toLocaleString()}`, trend: '+20.1%', icon: <TrendingUp className="w-6 h-6 text-shakti-rust" /> },
    { title: 'Active Orders', value: statsData.activeOrders.toString(), trend: '+12.5%', icon: <ShoppingBag className="w-6 h-6 text-blue-600" /> },
    { title: 'Total Customers', value: statsData.totalCustomers.toString(), trend: '+5.4%', icon: <Users className="w-6 h-6 text-purple-600" /> },
    { title: 'Products in Stock', value: statsData.totalProducts ? statsData.totalProducts.toString() : '0', trend: 'Updated', icon: <PackageOpen className="w-6 h-6 text-orange-600" /> },
  ];

  return (
    <div className="space-y-6">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-neutral-900 p-6 rounded-[2rem] shadow-sm border border-neutral-800 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-bold text-neutral-400 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-black text-white">{stat.value}</h3>
              </div>
              <div className="p-3 bg-neutral-800 rounded-xl border border-neutral-700 shadow-sm">
                {stat.icon}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                {stat.trend}
              </span>
              <span className="text-sm text-neutral-400 font-medium">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-neutral-900 rounded-[2rem] shadow-sm border border-neutral-800 overflow-hidden">
          <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Recent Orders</h2>
            <button className="text-sm font-bold text-shakti-rust hover:text-white transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-800 text-neutral-400 text-sm border-b border-neutral-800">
                  <th className="px-6 py-4 font-bold">Order ID</th>
                  <th className="px-6 py-4 font-bold">Customer</th>
                  <th className="px-6 py-4 font-bold">Total</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Time</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentOrders.map((order: { id: number, user?: { name?: string }, total: string | number, status: string, createdAt: string }, i: number) => (
                  <tr key={i} className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">#ORD-{order.id.toString().padStart(3, '0')}</td>
                    <td className="px-6 py-4 text-white font-medium">{order.user?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 font-bold text-white">₹{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700 border border-green-200' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-400 font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-neutral-900 rounded-[2rem] shadow-sm border border-neutral-800 p-6">
          <h2 className="text-lg font-bold text-white mb-6">Top Selling Products</h2>
          <div className="space-y-6">
            {topProducts.length === 0 ? (
              <p className="text-neutral-400 text-sm">No products found.</p>
            ) : topProducts.map((prod: { id: number, imageUrl?: string, name: string, stockQuantity?: number, price: number | string }) => (
              <div key={prod.id} className="flex items-center justify-between p-2 hover:bg-neutral-800 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-800 rounded-lg overflow-hidden shrink-0 border border-neutral-700">
                    <img src={prod.imageUrl || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&q=80"} alt={prod.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{prod.name}</h4>
                    <p className="text-xs text-neutral-400 font-medium">In stock: {prod.stockQuantity || 100}</p>
                  </div>
                </div>
                <div className="text-sm font-black text-white">₹{prod.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
