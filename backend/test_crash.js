const jwt = require('jsonwebtoken');

async function test() {
  try {
    const formData = new FormData();
    formData.append('amount', '100');
    formData.append('screenshot', new Blob(['fake image data']), 'test.png');

    const token = jwt.sign({ customerId: 1, role: 'user' }, 'kiryana_super_secret_key');

    console.log("Sending POST with token: " + token);

    const res = await fetch('http://127.0.0.1:4000/api/wallet/topup', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    console.log(res.status);
    console.log(await res.text());
  } catch (err) {
    console.error(err);
  }
}

test();
