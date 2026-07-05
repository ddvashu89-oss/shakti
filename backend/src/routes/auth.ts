import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

export const JWT_SECRET = process.env.JWT_SECRET || 'kiryana_super_secret_key';

// In-memory store for OTPs (mocking a real OTP service)
const otpStore = new Map<string, string>();

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  // Generate a 4 digit OTP (For demo purposes, we will use 1234)
  const otp = '1234';
  otpStore.set(email, otp);

  // In a real app, send via SMS or Email. Here we just log it.
  console.log(`\n============================`);
  console.log(`🔑 OTP for ${email}: ${otp}`);
  console.log(`============================\n`);

  res.json({ success: true, message: 'OTP sent successfully' });
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

  const storedOtp = otpStore.get(email);
  if (!storedOtp || storedOtp !== otp) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  // Clear OTP
  otpStore.delete(email);

  try {
    // Find or create user
    let customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          email,
          password: '', // Password not needed for OTP flow
          name: email.split('@')[0]
        }
      });
    }

    // Generate JWT
    const token = jwt.sign({ customerId: customer.id, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ success: true, token, customer, role: 'user' });
  } catch (error: any) {
    console.error('Database Error in /verify-otp:', error);
    res.status(500).json({ error: 'Database connection failed. Please ensure the database server is running.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@kiryana.com' && password === 'admin123') {
    const token = jwt.sign({ userId: 0, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, token, role: 'admin' });
  }

  try {
    // Standard password login fallback if needed
    const customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer || customer.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ customerId: customer.id, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, customer, role: 'user' });
  } catch (error: any) {
    console.error('Database Error in /login:', error);
    res.status(500).json({ error: 'Database connection failed. Please ensure the database server is running.' });
  }
});

export default router;
