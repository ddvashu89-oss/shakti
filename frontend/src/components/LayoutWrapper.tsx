'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './BackToTop';
import PageTransition from './PageTransition';

export default function LayoutWrapper({ children, isLoggedIn = false }: { children: React.ReactNode, isLoggedIn?: boolean }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <PageTransition>
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
      </PageTransition>
      {pathname !== '/profile' && <Footer />}
      <BackToTop />
    </>
  );
}
