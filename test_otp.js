const API_URL = 'http://localhost:4000/api/auth';

async function testOtp() {
  const email = 'test_user_' + Date.now() + '@example.com';
  
  console.log('Sending OTP to', email);
  const sendRes = await fetch(`${API_URL}/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  console.log('Send OTP response:', await sendRes.json());

  console.log('Verifying OTP for', email);
  const verifyRes = await fetch(`${API_URL}/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp: '1234' })
  });
  console.log('Verify OTP response:', await verifyRes.json());
}

testOtp();
