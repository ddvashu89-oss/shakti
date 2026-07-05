'use client';
/* eslint-disable */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, LogOut, Wallet, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [orders, setOrders] = useState<{ id: number, createdAt: string, total: number | string, status: string, items: { id: number, product?: { image_url?: string, name?: string }, quantity: number, price: string | number }[] }[]>([]);
  const [wallet, setWallet] = useState<{balance: number, topUps: { id: number, amount: number, createdAt: string, status: string }[]}>({ balance: 0, topUps: [] });
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(true);
  
  const [topupAmount, setTopupAmount] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);

    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);

    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api'}/user/orders\`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api'}/wallet\`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => res.json())
    ])
      .then(([ordersData, walletData]) => {
        setUser(parsedUser);
        if (Array.isArray(ordersData)) {
          setOrders(ordersData);
        }
        if (walletData && !walletData.error) {
          setWallet(walletData);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [router]);

  const handleTopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topupAmount || !screenshotFile) return;
    if (parseFloat(topupAmount) > 10000) {
      alert('Maximum top-up amount is ₹10000');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('amount', topupAmount);
    formData.append('screenshot', screenshotFile);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api'}/wallet/topup\`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        alert('Top-up request submitted successfully!');
        setTopupAmount('');
        setScreenshotFile(null);
        // Refresh wallet data
        const walletRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api'}/wallet\`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const walletData = await walletRes.json();
        if (walletData && !walletData.error) setWallet(walletData);
      } else {
        alert(data.error || 'Failed to submit top-up request');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-shakti-dark font-bold text-xl">Loading your profile...</div>;
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-shakti-mitti/10 lg:sticky lg:top-24 mb-8 lg:mb-0">
            <div className="w-20 h-20 bg-shakti-sarson rounded-full text-shakti-rust flex items-center justify-center text-3xl font-black mb-6">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <h2 className="text-2xl font-black text-shakti-dark mb-1 truncate" title={user?.name}>{user?.name}</h2>
            <p className="text-shakti-mitti font-medium mb-8 truncate" title={user?.email}>{user?.email}</p>
            
            <div className="space-y-2">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl font-bold transition-colors whitespace-nowrap ${activeTab === 'orders' ? 'bg-shakti-cream text-shakti-dark' : 'text-shakti-mitti hover:bg-shakti-cream/50'}`}>
                <Package className={`w-5 h-5 shrink-0 ${activeTab === 'orders' ? 'text-shakti-rust' : ''}`} />
                <span>My Orders</span>
              </button>
              <button 
                onClick={() => setActiveTab('wallet')}
                className={`w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl font-bold transition-colors whitespace-nowrap ${activeTab === 'wallet' ? 'bg-shakti-cream text-shakti-dark' : 'text-shakti-mitti hover:bg-shakti-cream/50'}`}>
                <Wallet className={`w-5 h-5 shrink-0 ${activeTab === 'wallet' ? 'text-shakti-rust' : ''}`} />
                <span>Wallet</span>
              </button>
              <button onClick={handleLogout} className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 font-bold transition-colors whitespace-nowrap">
                <LogOut className="w-5 h-5 shrink-0" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'orders' && (
            <>
              <h1 className="text-3xl font-black text-shakti-dark mb-8">Order History</h1>
          
          {orders.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-12 text-center border border-shakti-mitti/10 shadow-sm">
              <Package className="w-16 h-16 text-shakti-mitti/30 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-shakti-dark mb-2">No orders yet</h3>
              <p className="text-shakti-mitti mb-8">Looks like you haven&apos;t bought anything from our store yet.</p>
              <Link href="/categories" className="bg-shakti-rust text-white px-8 py-3 rounded-full font-bold hover:bg-shakti-dark transition-colors inline-block">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-3xl p-6 border border-shakti-mitti/10 shadow-sm">
                  <div className="flex flex-wrap gap-4 items-center justify-between border-b border-shakti-mitti/10 pb-4 mb-4">
                    <div>
                      <p className="text-sm font-bold text-shakti-mitti">ORDER ID</p>
                      <p className="font-black text-shakti-dark">#ORD-{order.id.toString().padStart(3, '0')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-shakti-mitti">DATE</p>
                      <p className="font-black text-shakti-dark">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-shakti-mitti">TOTAL</p>
                      <p className="font-black text-shakti-dark">₹{order.total}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {order.items.map((item: { id: number, product?: { image_url?: string, name?: string }, quantity: number, price: string | number }) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-shakti-cream rounded-xl flex items-center justify-center shrink-0 overflow-hidden relative">
                           {item.product?.image_url ? (
                              <img src={item.product.image_url} alt={item.product?.name} className="w-full h-full object-cover" />
                           ) : (
                              <Package className="w-6 h-6 text-shakti-rust" />
                           )}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-shakti-dark">{item.product?.name || 'Product'}</p>
                          <p className="text-sm text-shakti-mitti">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-bold text-shakti-dark">
                          ₹{item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
            </>
          )}

          {activeTab === 'wallet' && (
            <>
              <h1 className="text-3xl font-black text-shakti-dark mb-8">My Wallet</h1>
              
              <div className="bg-shakti-dark text-white rounded-3xl p-8 mb-8 shadow-lg flex justify-between items-center">
                <div>
                  <p className="text-shakti-cream/70 font-bold mb-1">Available Balance</p>
                  <p className="text-5xl font-black">₹{wallet.balance}</p>
                </div>
                <Wallet className="w-16 h-16 text-shakti-sarson opacity-80" />
              </div>

              <div className="bg-white rounded-3xl p-8 border border-shakti-mitti/10 shadow-sm mb-8">
                <h3 className="text-xl font-bold text-shakti-dark mb-6">Add Funds</h3>
                
                <div className="mb-8 p-6 bg-shakti-cream/20 rounded-2xl border border-shakti-mitti/20 flex flex-col items-center text-center">
                  <p className="text-lg font-black text-shakti-dark mb-4">Step 1: Scan to Pay</p>
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-shakti-mitti/10 mb-4 inline-block">
                    <Image src="/qr_payment.png" alt="Payment QR Code" width={200} height={200} className="rounded-lg" />
                  </div>
                  <p className="text-shakti-mitti font-medium">Please scan the QR code above using any UPI app to transfer the desired amount.</p>
                </div>

                <div className="border-t border-shakti-mitti/10 pt-6">
                  <p className="text-lg font-black text-shakti-dark mb-6">Step 2: Submit Details</p>
                  <form onSubmit={handleTopupSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-shakti-dark mb-2">Amount (₹)</label>
                    <input 
                      type="number" 
                      min="1"
                      max="10000"
                      required
                      value={topupAmount}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || Number(val) <= 10000) {
                          setTopupAmount(val);
                        }
                      }}
                      className="w-full px-4 py-3 rounded-xl border-2 border-shakti-mitti/20 focus:border-shakti-sarson focus:ring-0 outline-none transition-colors"
                      placeholder="e.g. 500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-shakti-dark mb-2">Payment Screenshot</label>
                    <div className="border-2 border-dashed border-shakti-mitti/30 rounded-xl p-6 text-center hover:bg-shakti-cream/50 transition-colors">
                      <input 
                        type="file" 
                        accept="image/*" 
                        required
                        id="screenshot"
                        className="hidden"
                        onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                      />
                      <label htmlFor="screenshot" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload className="w-8 h-8 text-shakti-rust" />
                        <span className="font-bold text-shakti-dark">
                          {screenshotFile ? screenshotFile.name : 'Click to upload screenshot'}
                        </span>
                        <span className="text-sm text-shakti-mitti">UPI or Bank Transfer confirmation</span>
                      </label>
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={uploading}
                    className="w-full bg-shakti-rust text-white font-bold py-4 rounded-xl hover:bg-shakti-dark transition-colors disabled:opacity-50"
                  >
                    {uploading ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
                </div>
              </div>

              <h3 className="text-xl font-bold text-shakti-dark mb-4">Top-Up History</h3>
              {wallet.topUps.length === 0 ? (
                <p className="text-shakti-mitti">No top-up requests found.</p>
              ) : (
                <div className="space-y-4">
                  {wallet.topUps.map((req: { id: number, amount: number, createdAt: string, status: string }) => (
                    <div key={req.id} className="bg-white rounded-2xl p-4 border border-shakti-mitti/10 shadow-sm flex justify-between items-center">
                      <div>
                        <p className="font-bold text-shakti-dark">₹{req.amount}</p>
                        <p className="text-sm text-shakti-mitti">{new Date(req.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                        req.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
