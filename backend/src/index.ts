import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use((req, res, next) => {
  console.log(`[DEBUG] Incoming: ${req.method} ${req.url}`);
  next();
});
app.use(cors());
app.use(express.json());
import path from 'path';
app.use('/public', express.static(path.join(__dirname, '../public')));

import apiRoutes from './routes/api';
import authRoutes from './routes/auth';

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Smart Kiryana backend running');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
