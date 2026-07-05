'use client';

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

type DashboardData = {
  metrics?: { totalRevenue: number, totalOrders: number, avgOrderValue: number, totalCustomers: number };
  salesTrend?: { date: string, revenue: number }[];
  orderStatusData?: { name: string, value: number }[];
  categoryData?: { name: string, value: number }[];
  topProducts?: { name: string, revenue: number, sales: number }[];
};

export default function AnalyticsDashboard({ data }: { data: DashboardData | null }) {
  if (!data) {
    return <div className="flex h-96 items-center justify-center text-red-500 font-bold text-xl">Failed to load analytics data.</div>;
  }

  const { metrics, salesTrend, orderStatusData, categoryData, topProducts } = data;
  const COLORS = ['#2D0B1C', '#C25E35', '#E3A83F', '#4A5D23', '#A67B5B'];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-neutral-400 mt-1">Detailed overview of your store&apos;s performance.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-shakti-mitti/10 flex items-center gap-4">
          <div className="w-14 h-14 bg-shakti-sarson/20 text-shakti-rust rounded-2xl flex items-center justify-center shrink-0">
            <DollarSign className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-shakti-mitti uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-2xl font-black text-shakti-dark">₹{(metrics?.totalRevenue || 0).toLocaleString()}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-shakti-mitti/10 flex items-center gap-4">
          <div className="w-14 h-14 bg-shakti-sarson/20 text-shakti-rust rounded-2xl flex items-center justify-center shrink-0">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-shakti-mitti uppercase tracking-wider">Total Orders</p>
            <h3 className="text-2xl font-black text-shakti-dark">{metrics?.totalOrders || 0}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-shakti-mitti/10 flex items-center gap-4">
          <div className="w-14 h-14 bg-shakti-sarson/20 text-shakti-rust rounded-2xl flex items-center justify-center shrink-0">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-shakti-mitti uppercase tracking-wider">Avg Order Value</p>
            <h3 className="text-2xl font-black text-shakti-dark">₹{Math.round(metrics?.avgOrderValue || 0).toLocaleString()}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-shakti-mitti/10 flex items-center gap-4">
          <div className="w-14 h-14 bg-shakti-sarson/20 text-shakti-rust rounded-2xl flex items-center justify-center shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-shakti-mitti uppercase tracking-wider">Total Customers</p>
            <h3 className="text-2xl font-black text-shakti-dark">{metrics?.totalCustomers || 0}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sales Trend Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-shakti-mitti/10 lg:col-span-2">
          <h3 className="text-xl font-bold text-shakti-dark mb-6">Revenue Trend (Last 7 Days)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesTrend || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{fill: '#8A8679'}} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{fill: '#8A8679'}} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}`} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [`₹${value}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="revenue" stroke="#C25E35" strokeWidth={4} dot={{r: 6, fill: '#C25E35', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-shakti-mitti/10">
          <h3 className="text-xl font-bold text-shakti-dark mb-6">Orders by Status</h3>
          <div className="h-80 flex items-center justify-center">
            {(orderStatusData?.length || 0) > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(orderStatusData || []).map((entry: { name: string, value: number }, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-shakti-mitti">No orders yet.</p>
            )}
          </div>
        </div>

        {/* Revenue by Category Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-shakti-mitti/10 lg:col-span-2">
          <h3 className="text-xl font-bold text-shakti-dark mb-6">Revenue by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData || []} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" tick={{fill: '#8A8679'}} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}`} />
                <YAxis type="category" dataKey="name" tick={{fill: '#8A8679'}} axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [`₹${value}`, 'Revenue']}
                />
                <Bar dataKey="value" fill="#E3A83F" radius={[0, 8, 8, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-shakti-mitti/10">
          <h3 className="text-xl font-bold text-shakti-dark mb-6">Top Selling Products</h3>
          <div className="space-y-6">
            {(topProducts || []).map((product: { name: string, revenue: number, sales: number }, idx: number) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-shakti-cream flex items-center justify-center font-bold text-shakti-dark shrink-0">
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-shakti-dark text-sm truncate max-w-[150px]">{product.name}</h4>
                    <p className="text-xs text-shakti-mitti">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-shakti-dark">₹{product.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
            {(topProducts?.length === 0 || !topProducts) && <p className="text-shakti-mitti">No sales data.</p>}
          </div>
        </div>

      </div>
    </div>
  );
}
