'use client';

import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

export default function AdminTopbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    switch (pathname) {
      case '/admin/products': return 'Products Management';
      case '/admin/orders': return 'Orders Management';
      case '/admin/customers': return 'Customers Directory';
      case '/admin/settings': return 'Settings';
      default: return 'Overview';
    }
  };

  return (
    <header className="bg-neutral-900 border-b border-neutral-800 h-16 flex items-center px-4 md:px-8 justify-between shrink-0 shadow-sm z-0">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden text-neutral-400 hover:text-white p-2">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white">{getPageTitle()}</h1>
      </div>
      <div className="flex items-center gap-4">
         <div className="w-9 h-9 bg-shakti-sarson text-neutral-900 rounded-full flex items-center justify-center font-bold border-2 border-neutral-900 shadow-sm">
            A
         </div>
      </div>
    </header>
  );
}
