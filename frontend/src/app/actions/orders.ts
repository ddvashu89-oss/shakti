'use server';

import { cookies } from 'next/headers';

const API_URL = 'http://127.0.0.1:4000/api';

export async function placeOrderAction(items: { productId: number, quantity: number }[], paymentMethod: string = 'online') {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return { success: false, error: 'Unauthorized. Please login first.' };
  }

  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ items, addressId: null, paymentMethod }) // Using null for address for now since address logic isn't fully built
    });
    
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || 'Failed to place order' };
    
    return { success: true, order: data.order };
  } catch {
    return { success: false, error: 'Network error communicating with backend' };
  }
}
