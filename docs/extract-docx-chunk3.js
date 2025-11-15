const fs = require('fs');
const path = require('path');

const xmlPath = path.join(__dirname, 'dossie_temp', 'word', 'document.xml');
const xml = fs.readFileSync(xmlPath, 'utf8');

const textMatches = xml.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
const fullText = textMatches.map(match => {
  const textMatch = match.match(/>([^<]*)</);
  return textMatch ? textMatch[1] : '';
}).join(' ');

console.log('=== CHUNK 3 (chars 30000-45000) ===\n');
console.log(fullText.substring(30000, 45000));
console.log('\n\n=== CHUNK 4 (chars 45000-60000) ===\n');
console.log(fullText.substring(45000, 60000));
