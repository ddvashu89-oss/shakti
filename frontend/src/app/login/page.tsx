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
    <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-shakti-mitti/10 max-w-md w-full">
      
      <div className="text-center mb-8">
        <Link href="/" className="text-4xl font-extrabold text-shakti-dark tracking-tight block mb-2 font-serif">शक्ति</Link>
        <h1 className="text-2xl font-bold text-shakti-dark">
          {isOtpMode ? 'Verify Email' : (isLogin ? 'Welcome Back!' : 'Create an Account')}
        </h1>
        <p className="text-shakti-mitti text-sm mt-2">
          {isOtpMode 
            ? `We sent a code to ${savedData.email}`
            : (isLogin ? 'Login to view your orders and fast checkout.' : 'Sign up to start shopping for fresh groceries.')
          }
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm font-bold p-4 rounded-xl mb-6 border border-red-100 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {isOtpMode ? (
          <div>
            <label className="block text-sm font-bold text-shakti-dark mb-1">Enter OTP</label>
            <div className="relative">
              <input 
                type="text" 
                name="otp"
                required
                className="w-full bg-shakti-cream/50 border border-shakti-mitti/20 rounded-xl py-4 px-4 pl-12 focus:ring-2 focus:ring-shakti-rust focus:border-shakti-rust outline-none transition-all tracking-widest text-lg font-bold"
                placeholder="1 2 3 4"
                maxLength={4}
              />
              <Lock className="w-5 h-5 text-shakti-mitti absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-xs text-shakti-mitti mt-2">Tip: Use 1234 for testing.</p>
          </div>
        ) : (
          <>
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-shakti-dark mb-1">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="name"
                    className="w-full bg-shakti-cream/50 border border-shakti-mitti/20 rounded-xl py-4 px-4 pl-12 focus:ring-2 focus:ring-shakti-rust focus:border-shakti-rust outline-none transition-all"
                    placeholder="Rahul Sharma"
                  />
                  <UserIcon className="w-5 h-5 text-shakti-mitti absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-shakti-dark mb-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full bg-shakti-cream/50 border border-shakti-mitti/20 rounded-xl py-4 px-4 pl-12 focus:ring-2 focus:ring-shakti-rust focus:border-shakti-rust outline-none transition-all"
                  placeholder="you@example.com"
                />
                <Mail className="w-5 h-5 text-shakti-mitti absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-shakti-dark mb-1">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  name="password"
                  required
                  className="w-full bg-shakti-cream/50 border border-shakti-mitti/20 rounded-xl py-4 px-4 pl-12 focus:ring-2 focus:ring-shakti-rust focus:border-shakti-rust outline-none transition-all"
                  placeholder="••••••••"
                />
                <Lock className="w-5 h-5 text-shakti-mitti absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-sm font-bold text-shakti-rust hover:underline">Forgot password?</a>
              </div>
            )}
          </>
        )}

        <button 
          type="submit"
          className="w-full bg-shakti-dark text-white font-bold py-4 rounded-xl hover:bg-shakti-rust transition-colors shadow-lg shadow-shakti-rust/20 flex items-center justify-center gap-2 mt-6 text-lg"
        >
          {isOtpMode ? 'Verify & Sign Up' : (isLogin ? 'Login' : 'Send OTP')} <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      {!isOtpMode && (
        <div className="mt-8 text-center border-t border-shakti-mitti/10 pt-6">
          <p className="text-shakti-mitti text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-bold text-shakti-dark hover:text-shakti-rust transition-colors"
            >
              {isLogin ? 'Sign up now' : 'Login instead'}
            </button>
          </p>
        </div>
      )}
      
      {isOtpMode && (
        <div className="mt-8 text-center border-t border-shakti-mitti/10 pt-6">
          <button 
            onClick={() => setIsOtpMode(false)}
            className="text-sm font-bold text-shakti-dark hover:text-shakti-rust transition-colors"
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
    <div className="min-h-screen bg-shakti-cream flex items-center justify-center p-4 font-sans">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
