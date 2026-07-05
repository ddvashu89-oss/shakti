'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, User, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`sticky top-0 z-50 transition-all duration-500 bg-shakti-cream ${isScrolled ? 'shadow-md py-2 border-b border-shakti-mitti/20' : 'py-4 border-b border-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-shakti-dark hover:scale-110 transition-transform"><Menu className="w-6 h-6" /></button>
            <Link href="/" className="text-3xl font-extrabold text-shakti-rust tracking-tight font-serif hover:scale-105 transition-transform origin-left">शक्ति</Link>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-shakti-dark">
            <Link href="/" className="hover:text-shakti-rust transition-colors uppercase tracking-[0.15em] relative group">Home<span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-shakti-rust transition-all duration-300 group-hover:w-full"></span></Link>
            <Link href="/categories" className="hover:text-shakti-rust transition-colors uppercase tracking-[0.15em] relative group">Products<span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-shakti-rust transition-all duration-300 group-hover:w-full"></span></Link>
            <Link href="/contact" className="hover:text-shakti-rust transition-colors uppercase tracking-[0.15em] relative group">Contact<span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-shakti-rust transition-all duration-300 group-hover:w-full"></span></Link>
          </nav>
        </div>
        
        <div className="hidden xl:flex flex-1 max-w-lg mx-8 relative group">
          <input 
            type="text" 
            placeholder="Search our fresh, pure staples..." 
            className="w-full bg-white/60 backdrop-blur-md border border-white/50 rounded-full py-2.5 px-6 pl-12 focus:bg-white focus:ring-2 focus:ring-shakti-sarson transition-all duration-300 outline-none text-shakti-dark placeholder:text-shakti-mitti/70 shadow-inner"
          />
          <Search className="w-5 h-5 text-shakti-mitti absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-shakti-rust transition-colors" />
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            className="xl:hidden text-shakti-dark hover:text-shakti-rust hover:scale-110 transition-all bg-white/50 p-2 rounded-full border border-white/40"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            {isMobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>
          
          {isLoggedIn ? (
            <Link href="/profile" className="text-shakti-dark hover:text-shakti-rust hover:scale-110 transition-all flex items-center gap-1 text-sm font-semibold uppercase tracking-widest bg-white/50 p-2 rounded-full border border-white/40" title="Profile">
              <User className="w-5 h-5" />
            </Link>
          ) : (
            <Link href="/login" className="interactive-btn text-shakti-dark hover:text-white hover:bg-shakti-rust bg-white/50 border border-white/50 px-4 py-2 rounded-full transition-all flex items-center gap-2 text-sm font-semibold uppercase tracking-widest"><User className="w-4 h-4" /> <span className="hidden sm:inline">Sign In</span></Link>
          )}
          <Link href="/cart" className="text-shakti-dark hover:text-shakti-rust hover:scale-110 transition-all relative bg-white/50 p-2 rounded-full border border-white/40">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-shakti-rust text-white shadow-md text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      
      {/* Mobile Search */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="xl:hidden px-4 pt-2 pb-4 overflow-hidden"
          >
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search staples..." 
                className="w-full bg-white/80 backdrop-blur-md border border-white/50 rounded-full py-2 px-4 pl-10 focus:bg-white focus:ring-2 focus:ring-shakti-sarson transition-all outline-none text-shakti-dark placeholder:text-shakti-mitti shadow-inner"
                autoFocus
              />
              <Search className="w-4 h-4 text-shakti-mitti absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-shakti-rust transition-colors" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
