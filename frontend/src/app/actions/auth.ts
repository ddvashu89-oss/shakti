'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';

export async function sendOtpAction(formData: FormData) {
  const email = formData.get('email') as string;
  
  if (!email) {
    return { success: false, error: 'Email is required' };
  }

  try {
    const res = await fetch(`${API_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || 'Failed to send OTP' };
    return { success: true };
  } catch {
    return { success: false, error: 'Network error communicating with backend' };
  }
}

export async function verifyOtpAction(formData: FormData) {
  const email = formData.get('email') as string;
  const otp = formData.get('otp') as string;

  try {
    const res = await fetch(`${API_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || 'Invalid OTP' };

    const isProd = process.env.NODE_ENV === 'production';
    (await cookies()).set('token', data.token, { secure: isProd, httpOnly: true, path: '/' });
    (await cookies()).set('isLoggedIn', 'true', { secure: isProd, httpOnly: true, path: '/' });
    
    return { success: true, role: 'user', token: data.token, user: data.customer };
  } catch {
    return { success: false, error: 'Network error communicating with backend' };
  }
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || 'Login failed' };

    const isProd = process.env.NODE_ENV === 'production';
    (await cookies()).set('token', data.token, { secure: isProd, httpOnly: true, path: '/' });
    
    if (data.role === 'admin') {
      (await cookies()).set('isAdmin', 'true', { secure: isProd, httpOnly: true, path: '/' });
    } else {
      (await cookies()).set('isLoggedIn', 'true', { secure: isProd, httpOnly: true, path: '/' });
    }
    
    return { success: true, role: data.role, token: data.token, user: data.customer };
  } catch {
    return { success: false, error: 'Network error communicating with backend' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  cookieStore.delete('isAdmin');
  cookieStore.delete('isLoggedIn');
  redirect('/login');
}
