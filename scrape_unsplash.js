const https = require('https');

const queries = [
  'turmeric powder',
  'red chili powder',
  'coriander powder',
  'cumin seeds',
  'garam masala',
  'black pepper whole',
  'mustard seeds',
  'indian spices'
];

async function getUnsplash(query) {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/s/photos/${encodeURIComponent(query).replace(/%20/g, '-')}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        // Find all matches
        const matches = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?[\w=&-]+/g);
        if (matches) {
          // Filter out user profiles or avatars if any
          const valid = matches.filter(url => !url.includes('profile') && !url.includes('premium'));
          resolve(valid[0] || matches[0]);
        } else {
          resolve(null);
        }
      });
    });
  });
}

async function run() {
  for (const q of queries) {
    const url = await getUnsplash(q);
    console.log(`${q}: ${url}`);
  }
}
run();
