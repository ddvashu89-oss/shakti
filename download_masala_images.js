const { image_search } = require('duckduckgo-images-api');
const fs = require('fs');
const https = require('https');
const path = require('path');

const masalas = [
  { query: 'MDH Lal Mirch Powder 100g front packet', filename: 'mirch_powder.jpg' },
  { query: 'Everest Haldi Powder 100g front packet', filename: 'haldi_powder.jpg' },
  { query: 'Catch Dhaniya Powder 100g front packet', filename: 'dhaniya_powder.jpg' },
  { query: 'MDH Garam Masala 100g front packet', filename: 'garam_masala.jpg' },
  { query: 'Tata Sampann Jeera Sabut front packet', filename: 'jeera_sabut.jpg' },
  { query: 'Catch Black Pepper whole 50g packet', filename: 'kali_mirch.jpg' },
  { query: 'Catch Hing Special bottle', filename: 'hing_special.jpg' },
  { query: 'Whole Cloves Laung 50g packet', filename: 'laung.jpg' },
  { query: 'Green Cardamom Chhoti Elaichi packet', filename: 'chhoti_elaichi.jpg' },
  { query: 'Cinnamon sticks Dal Chini packet', filename: 'dal_chini.jpg' }
];

const download = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      // Handle redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
         return download(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
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
    try {
      console.log(`Searching for: ${masala.query}`);
      const results = await image_search({ query: masala.query, moderate: true });
      if (results && results.length > 0) {
        let downloaded = false;
        for (let i = 0; i < Math.min(5, results.length); i++) {
          try {
            console.log(`  Trying to download: ${results[i].image}`);
            await download(results[i].image, path.join(outputDir, masala.filename));
            console.log(`  Successfully downloaded to ${masala.filename}`);
            downloaded = true;
            break; // Stop after first successful download
          } catch (e) {
            console.log(`  Failed to download from ${results[i].image}: ${e.message}, trying next...`);
          }
        }
        if (!downloaded) {
          console.log(`  Could not download any image for ${masala.query}`);
        }
      } else {
        console.log(`  No results found for ${masala.query}`);
      }
    } catch (error) {
      console.error(`Error searching for ${masala.query}:`, error);
    }
  }
}

run();
