'use server';

const API_URL = 'http://127.0.0.1:4000/api';

export async function sendMessageAction(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  try {
    const res = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, message })
    });
    
    if (!res.ok) {
      return { success: false, error: 'Failed to send message' };
    }
    
    return { success: true };
  } catch {
    return { success: false, error: 'Network error communicating with backend' };
  }
}
