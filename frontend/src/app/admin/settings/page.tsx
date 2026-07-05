export default function AdminSettings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      <div className="bg-white rounded-[2rem] shadow-sm border border-shakti-mitti/10 overflow-hidden">
        <div className="p-6 border-b border-shakti-mitti/10">
          <h2 className="text-lg font-bold text-shakti-dark mb-4">Store Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-shakti-dark mb-2">Store Name</label>
              <input type="text" defaultValue="Shakti" className="w-full px-4 py-2 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust bg-white text-shakti-dark" />
            </div>
            <div>
              <label className="block text-sm font-bold text-shakti-dark mb-2">Contact Email</label>
              <input type="email" defaultValue="support@smartkiryana.com" className="w-full px-4 py-2 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust bg-white text-shakti-dark" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-shakti-dark mb-2">Store Description</label>
              <textarea rows={3} defaultValue="Your smart, fast, and reliable grocery delivery service." className="w-full px-4 py-2 border border-shakti-mitti/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-shakti-rust bg-white text-shakti-dark" />
            </div>
          </div>
          <div className="mt-6">
             <button className="bg-shakti-rust text-white px-8 py-2.5 rounded-xl font-bold hover:bg-shakti-dark transition-colors shadow-sm">Save Changes</button>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-bold text-shakti-dark mb-4">Delivery Settings</h2>
          <div className="space-y-4">
             <label className="flex items-center gap-3">
               <input type="checkbox" defaultChecked className="w-5 h-5 text-shakti-rust rounded border-shakti-mitti/20 focus:ring-shakti-rust bg-white" />
               <span className="text-shakti-dark font-medium">Enable Cash on Delivery (COD)</span>
             </label>
             <label className="flex items-center gap-3">
               <input type="checkbox" defaultChecked className="w-5 h-5 text-shakti-rust rounded border-shakti-mitti/20 focus:ring-shakti-rust bg-white" />
               <span className="text-shakti-dark font-medium">Enable Free Delivery for orders above ₹500</span>
             </label>
          </div>
        </div>
      </div>
    </div>
  );
}
