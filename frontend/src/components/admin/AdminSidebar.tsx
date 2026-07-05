'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Package, Users, ShoppingBag, Settings, LogOut, Mail, TrendingUp, Wallet, X } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Wallet Requests', href: '/admin/wallet', icon: Wallet },
  { name: 'Messages', href: '/admin/messages', icon: Mail },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar({ isOpen, setIsOpen }: { isOpen?: boolean, setIsOpen?: (v: boolean) => void }) {
  const pathname = usePathname();

  const sidebarContent = (
    <aside className="w-64 bg-neutral-900 text-neutral-400 flex flex-col border-r border-neutral-800 shadow-sm h-full">
      <div className="p-6 flex items-center justify-between">
        <Link href="/admin" className="text-2xl font-bold text-white tracking-tight" onClick={() => setIsOpen?.(false)}>
          <span className="font-serif text-3xl">शक्ति</span><span className="text-shakti-rust ml-1">Admin</span>
        </Link>
        {setIsOpen && (
          <button onClick={() => setIsOpen(false)} className="md:hidden text-neutral-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={() => setIsOpen?.(false)}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive ? 'text-white font-bold' : 'hover:bg-neutral-800 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-neutral-800 rounded-xl border border-neutral-700"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-shakti-rust' : ''}`} />
              <span className="font-medium relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <button 
          onClick={() => logoutAction()}
          className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-950/50 hover:text-red-500 rounded-xl transition-colors text-left font-medium text-white"
        >
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full z-10">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen?.(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 md:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
