const https = require('https');

https.get('https://backjennifer.roilabs.com.br/api/posts?limit=100', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Response:', JSON.stringify(json, null, 2).substring(0, 500));
      
      if (json.posts) {
        const urls = json.posts
          .filter(p => p.status === 'PUBLISHED')
          .map(p => `https://jbadvocacia.roilabs.com.br/conteudo/${p.slug}`)
          .sort();
        
        console.log('\n\nTotal de posts na API:', urls.length);
        console.log('\nURLs dos posts:\n');
        urls.forEach(url => console.log(url));
      }
    } catch (e) {
      console.error('Erro:', e.message);
      console.log('Data:', data);
    }
  });
});
