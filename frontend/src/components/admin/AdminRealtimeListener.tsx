'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api';
// Extract the base URL for the socket connection (remove /api)
const SOCKET_URL = API_URL.replace('/api', '');

export default function AdminRealtimeListener() {
  const router = useRouter();

  useEffect(() => {
    // Initialize socket connection
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('Connected to realtime updates server');
    });

    socket.on('admin-update', () => {
      console.log('Received admin update, refreshing data...');
      // Invalidate the router cache and fetch fresh data from the server
      router.refresh();
    });

    return () => {
      socket.disconnect();
    };
  }, [router]);

  // This component doesn't render anything visible
  return null;
}
