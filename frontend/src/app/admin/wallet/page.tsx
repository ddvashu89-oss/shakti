'use client';
/* eslint-disable */
import { useState, useEffect } from 'react';
import { Wallet, Check, X, ExternalLink } from 'lucide-react';

export default function AdminWalletRequests() {
  const [requests, setRequests] = useState<{ id: number, user: { name: string, email: string }, amount: number, createdAt: string, screenshotUrl: string, status: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await fetch('http://127.0.0.1:4000/api/admin/wallet-requests');
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id: number, action: 'approve' | 'reject') => {
    if (!confirm(`Are you sure you want to ${action} this request?`)) return;
    try {
      const res = await fetch(`http://127.0.0.1:4000/api/admin/wallet-requests/${id}/${action}`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        fetchRequests();
      } else {
        alert(data.error || 'Failed to process request');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };

  if (loading) {
    return <div className="p-8 text-xl font-bold">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
            <Wallet className="w-8 h-8 text-shakti-rust" />
            Wallet Top-up Requests
          </h1>
          <p className="text-shakti-mitti font-medium">Manage user wallet top-up requests</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-shakti-mitti/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-shakti-cream/50 text-shakti-mitti text-sm border-b border-shakti-mitti/10">
                <th className="p-4 font-bold">ID</th>
                <th className="p-4 font-bold">User</th>
                <th className="p-4 font-bold">Amount</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Screenshot</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-shakti-mitti/5 hover:bg-shakti-cream/20 transition-colors">
                  <td className="p-4 text-shakti-dark font-medium">#{req.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-shakti-dark">{req.user?.name}</div>
                    <div className="text-sm text-shakti-mitti">{req.user?.email}</div>
                  </td>
                  <td className="p-4 font-black text-shakti-dark">₹{req.amount}</td>
                  <td className="p-4 text-sm text-shakti-mitti">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <a href={`http://127.0.0.1:4000${req.screenshotUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-shakti-rust hover:underline text-sm font-bold">
                      View <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      req.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {req.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleAction(req.id, 'approve')}
                          className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                          title="Approve"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleAction(req.id, 'reject')}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          title="Reject"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-shakti-mitti">
                    No wallet requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
