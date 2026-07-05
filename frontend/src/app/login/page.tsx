'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { loginAction, sendOtpAction, verifyOtpAction } from '../actions/auth';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [savedData, setSavedData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    if (!isLogin && !isOtpMode) {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      
      const res = await sendOtpAction(formData);
      if (res.success) {
        setSavedData({ email, password });
        setIsOtpMode(true);
      } else {
        setError(res.error || 'Failed to send OTP');
      }
      return;
    }

    if (isOtpMode) {
      formData.set('email', savedData.email);
      const result = await verifyOtpAction(formData);
      
      if (result.success) {
        if (result.token) {
          localStorage.setItem('token', result.token);
        }
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }
        router.refresh();
        router.push(redirectPath || '/');
      } else {
        setError(result.error || 'Invalid OTP');
      }
      return;
    }

    // Standard Login
    const result = await loginAction(formData);
    
    if (result.success) {
      if (result.token) {
        localStorage.setItem('token', result.token);
      }
      if (result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
      }
      router.refresh();
      if (result.role === 'admin') {
        router.push('/admin');
      } else {
        router.push(redirectPath || '/');
      }
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-[#251c17]/5 max-w-md w-full relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#201410] via-[#a04a29] to-[#d5a046]"></div>

      <div className="text-center mb-10 mt-4">
        <Link href="/" className="text-5xl font-extrabold text-[#201410] tracking-tight block mb-4 font-serif">शक्ति</Link>
        <h1 className="text-2xl font-serif text-[#201410] mb-2">
          {isOtpMode ? 'OTP Verify Karein' : (isLogin ? 'Wapas Swagat Hai' : 'Naya Khata Banayein')}
        </h1>
        <p className="text-[#201410]/60 text-sm font-medium">
          {isOtpMode 
            ? `Humne ${savedData.email} par code bheja hai`
            : (isLogin ? '125 saal purana bharosa, aapke phone par.' : 'Shakti parivar se judein aur shudh saaman payein.')
          }
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-[#a04a29] text-sm font-bold p-4 rounded-xl mb-6 border border-red-100 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {isOtpMode ? (
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-[#201410] mb-2">Enter OTP</label>
            <div className="relative">
              <input 
                type="text" 
                name="otp"
                required
                className="w-full bg-[#f3efe6] border border-[#251c17]/10 rounded-2xl py-4 px-4 pl-12 focus:ring-2 focus:ring-[#a04a29] focus:border-[#a04a29] outline-none transition-all tracking-[0.5em] text-center text-xl font-bold"
                placeholder="1234"
                maxLength={4}
              />
              <Lock className="w-5 h-5 text-[#201410]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-xs text-[#a04a29] mt-3 text-center font-bold">Tip: Use 1234 for testing.</p>
          </div>
        ) : (
          <>
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-[#201410] mb-2">Poora Naam (Name)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="name"
                    className="w-full bg-[#f3efe6] border border-[#251c17]/10 rounded-xl py-4 px-4 pl-12 focus:ring-2 focus:ring-[#a04a29] focus:border-[#a04a29] outline-none transition-all font-medium"
                    placeholder="Rahul Sharma"
                  />
                  <UserIcon className="w-5 h-5 text-[#201410]/40 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-[#201410] mb-2">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full bg-[#f3efe6] border border-[#251c17]/10 rounded-xl py-4 px-4 pl-12 focus:ring-2 focus:ring-[#a04a29] focus:border-[#a04a29] outline-none transition-all font-medium"
                  placeholder="you@example.com"
                />
                <Mail className="w-5 h-5 text-[#201410]/40 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-[#201410] mb-2">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  name="password"
                  required
                  className="w-full bg-[#f3efe6] border border-[#251c17]/10 rounded-xl py-4 px-4 pl-12 focus:ring-2 focus:ring-[#a04a29] focus:border-[#a04a29] outline-none transition-all font-medium"
                  placeholder="••••••••"
                />
                <Lock className="w-5 h-5 text-[#201410]/40 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end mt-2">
                <a href="#" className="text-xs font-bold text-[#a04a29] hover:underline uppercase tracking-wider">Forgot password?</a>
              </div>
            )}
          </>
        )}

        <button 
          type="submit"
          className="w-full bg-[#201410] text-white font-bold py-4 rounded-xl hover:bg-[#a04a29] transition-colors shadow-lg flex items-center justify-center gap-2 mt-8 text-sm uppercase tracking-widest"
        >
          {isOtpMode ? 'Verify & Sign Up' : (isLogin ? 'Login' : 'Send OTP')} <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      {!isOtpMode && (
        <div className="mt-8 text-center border-t border-[#251c17]/10 pt-6">
          <p className="text-[#201410]/60 text-sm font-medium">
            {isLogin ? "Khata nahi hai?" : "Pehle se khata hai?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-bold text-[#a04a29] hover:text-[#201410] transition-colors uppercase tracking-widest text-xs"
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      )}
      
      {isOtpMode && (
        <div className="mt-8 text-center border-t border-[#251c17]/10 pt-6">
          <button 
            onClick={() => setIsOtpMode(false)}
            className="text-xs font-bold text-[#a04a29] hover:text-[#201410] transition-colors uppercase tracking-widest"
          >
            ← Back to Sign Up
          </button>
        </div>
      )}
      </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f3efe6] flex items-center justify-center p-4 font-sans">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
