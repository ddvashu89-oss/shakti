const https = require('https');

const queries = [
  'mdh lal mirch powder',
  'everest haldi powder',
  'catch dhaniya powder',
  'mdh garam masala',
  'jeera sabut',
  'kali mirch whole',
  'catch hing',
  'cloves whole laung',
  'green cardamom',
  'dalchini cinnamon'
];

async function searchJiomart(query) {
  return new Promise((resolve, reject) => {
    https.get(`https://www.jiomart.com/api/v2/catalog/search/suggestion?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          // JioMart suggestion structure: json.data.products[0].image_url
          if (json && json.data && json.data.products && json.data.products.length > 0) {
            resolve(json.data.products[0].image_url);
          } else {
            resolve(null);
          }
        } catch(e) {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const q of queries) {
    const url = await searchJiomart(q);
    console.log(`${q}: ${url}`);
  }
}
run();
