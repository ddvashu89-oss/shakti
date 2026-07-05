const https = require('https');

const titles = [
  'Chili_powder',
  'Turmeric',
  'Coriander',
  'Garam_masala',
  'Cumin',
  'Black_pepper',
  'Mustard_seed',
  'Asafoetida'
];

async function getWikiImage(title) {
  return new Promise((resolve, reject) => {
    https.get(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${title}`, {
      headers: { 'User-Agent': 'NodeApp/1.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].original) {
            resolve(pages[pageId].original.source);
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
  for (const t of titles) {
    const url = await getWikiImage(t);
    console.log(`${t}: ${url}`);
  }
}
run();
