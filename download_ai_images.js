const https = require('https');
const fs = require('fs');
const path = require('path');

const masalas = [
  { url: 'https://image.pollinations.ai/prompt/A%20bowl%20of%20bright%20red%20indian%20chilli%20powder%20spice%20photography?width=500&height=500&nologo=true', file: 'lal_mirch.jpg' },
  { url: 'https://image.pollinations.ai/prompt/A%20bowl%20of%20yellow%20turmeric%20haldi%20powder%20spice%20photography?width=500&height=500&nologo=true', file: 'haldi.jpg' },
  { url: 'https://image.pollinations.ai/prompt/A%20bowl%20of%20light%20brown%20coriander%20dhaniya%20powder%20spice%20photography?width=500&height=500&nologo=true', file: 'dhaniya.jpg' },
  { url: 'https://image.pollinations.ai/prompt/A%20bowl%20of%20dark%20brown%20garam%20masala%20powder%20spice%20photography?width=500&height=500&nologo=true', file: 'garam_masala.jpg' },
  { url: 'https://image.pollinations.ai/prompt/A%20bowl%20of%20indian%20cumin%20jeera%20seeds%20spice%20photography?width=500&height=500&nologo=true', file: 'jeera.jpg' },
  { url: 'https://image.pollinations.ai/prompt/A%20bowl%20of%20black%20pepper%20corns%20spice%20photography?width=500&height=500&nologo=true', file: 'kali_mirch.jpg' },
  { url: 'https://image.pollinations.ai/prompt/A%20bowl%20of%20black%20mustard%20rai%20seeds%20spice%20photography?width=500&height=500&nologo=true', file: 'rai.jpg' },
  { url: 'https://image.pollinations.ai/prompt/A%20small%20bottle%20of%20yellow%20asafoetida%20hing%20powder%20spice%20photography?width=500&height=500&nologo=true', file: 'hing.jpg' }
];

const download = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
         return download(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

async function run() {
  const outputDir = path.join(__dirname, 'frontend', 'public', 'products', 'masale');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const masala of masalas) {
    console.log(`Downloading ${masala.file}...`);
    let attempts = 0;
    const maxAttempts = 5;
    let success = false;
    while (attempts < maxAttempts && !success) {
      try {
        await download(masala.url, path.join(outputDir, masala.file));
        console.log(`Success: ${masala.file}`);
        success = true;
      } catch (e) {
        attempts++;
        console.error(`Failed ${masala.file} (Attempt ${attempts}/${maxAttempts}):`, e.message);
        if (attempts < maxAttempts) {
          console.log(`Retrying in 2 seconds...`);
          await new Promise(r => setTimeout(r, 2000));
        }
      }
    }
    // wait 2 seconds to avoid rate limits
    await new Promise(r => setTimeout(r, 2000));
  }
}

run();
