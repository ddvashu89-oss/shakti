import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust in production
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Store io instance in app so routes can access it
app.set('io', io);

io.on('connection', (socket) => {
  console.log(`🔌 [Socket] Client connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`🔌 [Socket] Client disconnected: ${socket.id}`);
  });
});

app.use((req, res, next) => {
  console.log(`[DEBUG] Incoming: ${req.method} ${req.url}`);
  next();
});
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../public')));

import apiRoutes from './routes/api';
import authRoutes from './routes/auth';

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Smart Kiryana backend running');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
