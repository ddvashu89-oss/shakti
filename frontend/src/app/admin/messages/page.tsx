import { Mail, Phone, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';

async function fetchMessages() {
  try {
    const res = await fetch(`${API_URL}/messages`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return [];
  }
}

export default async function AdminMessagesPage() {
  const messages = await fetchMessages();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Messages</h1>
          <p className="text-shakti-mitti mt-1">View and manage customer inquiries.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-shakti-mitti/10 overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-shakti-mitti">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No messages found.</p>
          </div>
        ) : (
          <div className="divide-y divide-shakti-mitti/10">
            {messages.map((msg: { id: number, status: string, name: string, email: string, phone: string, createdAt: string, message: string }) => (
              <div key={msg.id} className={`p-6 ${msg.status === 'Unread' ? 'bg-shakti-cream/20' : ''}`}>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <h3 className="font-bold text-shakti-dark text-lg">{msg.name}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-shakti-mitti mt-1">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${msg.email}`} className="hover:text-shakti-rust transition-colors">{msg.email}</a>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${msg.phone}`} className="hover:text-shakti-rust transition-colors">{msg.phone}</a>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(msg.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {msg.status === 'Unread' && (
                    <span className="bg-shakti-rust/10 text-shakti-rust px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      New
                    </span>
                  )}
                </div>
                
                <div className="bg-shakti-cream p-4 rounded-xl text-shakti-dark">
                  <p className="whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
