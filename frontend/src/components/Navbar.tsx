'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, User, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const saved = localStorage.getItem('shakti_cart');
      if (saved) {
        try {
          const items = JSON.parse(saved);
          const count = items.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);
          setCartCount(count);
        } catch {}
      }
    };
    
    updateCount();
    window.addEventListener('storage', updateCount);
    window.addEventListener('cartUpdated', updateCount);
    
    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('cartUpdated', updateCount);
    };
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const categories = [
    { name: 'GHAR', href: '/' },
    { name: 'ATTA & ANAAJ', href: '/categories/atta' },
    { name: 'SARSON TEL', href: '/categories/oil' },
    { name: 'DAL & PULSES', href: '/categories/dal' },
    { name: 'MASALA', href: '/categories/masala' },
    { name: 'ACHAAR', href: '/categories/achaar' },
    { name: 'HUMARI KAHANI', href: '/story' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f3efe6] border-b border-[#251c17]/10">
      {/* Top Tier */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 lg:gap-12">
        
        {/* Logo */}
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden text-shakti-dark hover:text-shakti-rust"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Link href="/" className="flex flex-col group">
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-serif text-[#201410] tracking-tight group-hover:text-shakti-rust transition-colors">शक्ति</span>
              <span className="text-xl font-serif text-blue-700 tracking-widest font-bold">SHAKTI</span>
            </div>
            <span className="text-[10px] text-[#8a3b21] font-bold tracking-widest uppercase">Est. 1900 • Hisar</span>
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden lg:flex flex-1 max-w-2xl relative group">
          <input 
            type="text" 
            placeholder="Atta, sarson tel, dal, masala dhoondein..." 
            className="w-full bg-white border border-[#251c17]/10 rounded-full py-2.5 px-6 pl-12 focus:outline-none focus:border-shakti-rust focus:ring-1 focus:ring-shakti-rust transition-all text-shakti-dark placeholder:text-shakti-dark/50 font-medium"
          />
          <Search className="w-5 h-5 text-shakti-dark/50 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-shakti-rust transition-colors" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button 
            className="lg:hidden text-shakti-dark hover:text-shakti-rust"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            <Search className="w-5 h-5" />
          </button>
          
          <Link href={isLoggedIn ? "/profile" : "/login"} className="hidden sm:flex text-[#201410] hover:text-shakti-rust font-bold text-sm tracking-wide transition-colors">
            Login
          </Link>

          <Link href="/cart" className="flex items-center gap-2 group">
            <ShoppingCart className="w-6 h-6 text-[#201410] group-hover:text-shakti-rust transition-colors" />
            <span className="bg-[#a04a29] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom Tier - Categories */}
      <nav className="hidden lg:block border-t border-[#251c17]/5 bg-[#f3efe6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ul className="flex items-center gap-8 text-xs font-bold text-[#693021] tracking-widest uppercase">
            {categories.map((cat, index) => (
              <li key={index}>
                <Link 
                  href={cat.href} 
                  className={`hover:text-shakti-rust transition-colors ${index === 0 ? 'text-[#a04a29]' : ''}`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Search Dropdown */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden px-4 pb-4 bg-[#f3efe6] overflow-hidden border-t border-[#251c17]/5 pt-4"
          >
            <div className="relative">
              <input 
                type="text" 
                placeholder="Atta, sarson tel, dal..." 
                className="w-full bg-white border border-[#251c17]/10 rounded-full py-2.5 px-4 pl-10 focus:outline-none text-shakti-dark"
                autoFocus
              />
              <Search className="w-4 h-4 text-shakti-dark/50 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#f3efe6] border-t border-[#251c17]/5 overflow-hidden"
          >
            <ul className="px-4 py-2 flex flex-col gap-2">
              {categories.map((cat, index) => (
                <li key={index}>
                  <Link 
                    href={cat.href} 
                    className="block py-3 text-sm font-bold text-[#693021] tracking-wider uppercase border-b border-[#251c17]/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="sm:hidden">
                <Link 
                  href={isLoggedIn ? "/profile" : "/login"} 
                  className="block py-3 text-sm font-bold text-[#a04a29] tracking-wider uppercase"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login / Profile
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
