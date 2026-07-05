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
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api'}/user/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api'}/wallet`, {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api'}/wallet/topup`, {
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
        const walletRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api'}/wallet`, {
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
    return <div className="min-h-[60vh] flex items-center justify-center text-[#201410] font-bold text-xl uppercase tracking-widest bg-[#f3efe6]">Loading your profile...</div>;
  }

  return (
    <div className="bg-[#f3efe6] min-h-screen">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#251c17]/5 lg:sticky lg:top-24 mb-8 lg:mb-0">
              <div className="w-20 h-20 bg-[#a04a29]/10 rounded-full text-[#a04a29] flex items-center justify-center text-3xl font-serif mb-6">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <h2 className="text-2xl font-serif font-black text-[#201410] mb-1 truncate" title={user?.name}>{user?.name}</h2>
              <p className="text-[#201410]/60 font-medium mb-8 truncate" title={user?.email}>{user?.email}</p>
              
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl font-bold transition-colors whitespace-nowrap uppercase tracking-widest text-xs ${activeTab === 'orders' ? 'bg-[#201410] text-[#f3efe6]' : 'text-[#201410]/70 hover:bg-[#201410]/5'}`}>
                  <Package className={`w-5 h-5 shrink-0 ${activeTab === 'orders' ? 'text-[#f3efe6]' : ''}`} />
                  <span>Kharidari (Orders)</span>
                </button>
                <button 
                  onClick={() => setActiveTab('wallet')}
                  className={`w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl font-bold transition-colors whitespace-nowrap uppercase tracking-widest text-xs ${activeTab === 'wallet' ? 'bg-[#201410] text-[#f3efe6]' : 'text-[#201410]/70 hover:bg-[#201410]/5'}`}>
                  <Wallet className={`w-5 h-5 shrink-0 ${activeTab === 'wallet' ? 'text-[#f3efe6]' : ''}`} />
                  <span>Batua (Wallet)</span>
                </button>
                <button onClick={handleLogout} className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl hover:bg-[#a04a29]/10 text-[#a04a29] font-bold transition-colors whitespace-nowrap uppercase tracking-widest text-xs">
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
                <h1 className="text-4xl font-serif text-[#201410] mb-8">Pichli Kharidari</h1>
            
            {orders.length === 0 ? (
              <div className="bg-white rounded-[3rem] p-16 text-center border border-[#251c17]/5 shadow-sm">
                <Package className="w-20 h-20 text-[#201410]/10 mx-auto mb-6" />
                <h3 className="text-3xl font-serif text-[#201410] mb-4">Abhi tak kuch nahi kharida</h3>
                <p className="text-[#201410]/60 mb-10 font-medium text-lg">Pehli baar aye hain? Shudh saaman se shuruwat karein.</p>
                <Link href="/categories" className="bg-[#a04a29] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#201410] transition-colors inline-block uppercase tracking-widest text-sm">
                  Saaman Dekhein
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-[2rem] p-8 border border-[#251c17]/5 shadow-sm">
                    <div className="flex flex-wrap gap-6 items-center justify-between border-b border-[#251c17]/10 pb-6 mb-6">
                      <div>
                        <p className="text-xs font-bold text-[#201410]/50 tracking-widest uppercase mb-1">Parchi No.</p>
                        <p className="font-black text-[#201410] text-lg">#ORD-{order.id.toString().padStart(3, '0')}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#201410]/50 tracking-widest uppercase mb-1">Tareekh</p>
                        <p className="font-black text-[#201410] text-lg">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#201410]/50 tracking-widest uppercase mb-1">Kul Rakam</p>
                        <p className="font-black text-[#201410] text-lg">₹{order.total}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase ${
                          order.status === 'Delivered' ? 'bg-[#d5a046]/20 text-[#201410]' :
                          order.status === 'Processing' ? 'bg-[#201410]/10 text-[#201410]' :
                          order.status === 'Shipped' ? 'bg-[#a04a29]/10 text-[#a04a29]' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {order.items.map((item: { id: number, product?: { image_url?: string, name?: string }, quantity: number, price: string | number }) => (
                        <div key={item.id} className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-[#f3efe6] rounded-xl flex items-center justify-center shrink-0 overflow-hidden relative border border-[#251c17]/5">
                             {item.product?.image_url ? (
                                <img src={item.product.image_url} alt={item.product?.name} className="w-full h-full object-cover" />
                             ) : (
                                <Package className="w-6 h-6 text-[#a04a29]" />
                             )}
                          </div>
                          <div className="flex-1">
                            <p className="font-serif font-bold text-xl text-[#201410] mb-1">{item.product?.name || 'Product'}</p>
                            <p className="text-sm font-bold text-[#201410]/50 tracking-widest uppercase">Matra: {item.quantity}</p>
                          </div>
                          <div className="font-black text-xl text-[#201410]">
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
                <h1 className="text-4xl font-serif text-[#201410] mb-8">Batua (Wallet)</h1>
                
                <div className="bg-[#201410] text-[#f3efe6] rounded-[3rem] p-10 mb-8 shadow-lg flex justify-between items-center relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 opacity-10 text-[#d5a046]">
                     <Wallet className="w-64 h-64" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[#f3efe6]/70 font-bold mb-2 uppercase tracking-widest text-sm">Bacha Hua Paisa</p>
                    <p className="text-7xl font-sans font-black">₹{wallet.balance}</p>
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] p-10 border border-[#251c17]/5 shadow-sm mb-8">
                  <h3 className="text-2xl font-serif text-[#201410] mb-8">Paisa Daalein (Add Funds)</h3>
                  
                  <div className="mb-10 p-8 bg-[#f3efe6] rounded-3xl border border-[#251c17]/5 flex flex-col items-center text-center">
                    <p className="text-lg font-bold text-[#201410] mb-6 uppercase tracking-widest">Kadam 1: Scan Karein</p>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#251c17]/10 mb-6 inline-block">
                      <Image src="/qr_payment.png" alt="Payment QR Code" width={200} height={200} className="rounded-xl" />
                    </div>
                    <p className="text-[#201410]/70 font-medium">Upar diye gaye QR ko kisi bhi UPI app se scan karein aur paisa bhejein.</p>
                  </div>

                  <div className="border-t border-[#251c17]/10 pt-10">
                    <p className="text-lg font-bold text-[#201410] mb-6 uppercase tracking-widest">Kadam 2: Jaankari Dein</p>
                    <form onSubmit={handleTopupSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-[#201410] mb-2">Rakam (Amount ₹)</label>
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
                        className="w-full px-4 py-4 rounded-xl border-2 border-[#251c17]/10 focus:border-[#a04a29] focus:ring-0 outline-none transition-colors font-bold text-lg"
                        placeholder="e.g. 500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-[#201410] mb-2">Payment Screenshot</label>
                      <div className="border-2 border-dashed border-[#251c17]/20 rounded-2xl p-8 text-center hover:bg-[#f3efe6] transition-colors cursor-pointer">
                        <input 
                          type="file" 
                          accept="image/*" 
                          required
                          id="screenshot"
                          className="hidden"
                          onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                        />
                        <label htmlFor="screenshot" className="cursor-pointer flex flex-col items-center gap-3">
                          <Upload className="w-10 h-10 text-[#a04a29]" />
                          <span className="font-bold text-[#201410] text-lg">
                            {screenshotFile ? screenshotFile.name : 'Screenshot dalein'}
                          </span>
                          <span className="text-sm font-bold text-[#201410]/50 uppercase tracking-widest">UPI parchi upload karein</span>
                        </label>
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      disabled={uploading}
                      className="w-full bg-[#a04a29] text-white font-bold py-5 rounded-xl hover:bg-[#201410] transition-colors disabled:opacity-50 uppercase tracking-widest"
                    >
                      {uploading ? 'Bhej rahe hain...' : 'Jama Karein'}
                    </button>
                  </form>
                  </div>
                </div>

                <h3 className="text-2xl font-serif text-[#201410] mb-6">Pichle Jama</h3>
                {wallet.topUps.length === 0 ? (
                  <p className="text-[#201410]/60 font-medium">Abhi tak koi paisa nahi dala.</p>
                ) : (
                  <div className="space-y-4">
                    {wallet.topUps.map((req: { id: number, amount: number, createdAt: string, status: string }) => (
                      <div key={req.id} className="bg-white rounded-2xl p-6 border border-[#251c17]/5 shadow-sm flex justify-between items-center">
                        <div>
                          <p className="font-black text-2xl text-[#201410] mb-1">₹{req.amount}</p>
                          <p className="text-xs font-bold tracking-widest uppercase text-[#201410]/50">{new Date(req.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${
                          req.status === 'Approved' ? 'bg-[#d5a046]/20 text-[#201410]' :
                          req.status === 'Pending' ? 'bg-[#f3efe6] text-[#201410]' :
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
    </div>
  );
}
