const fs = require('fs');
const path = require('path');

// Read the document.xml file
const xmlPath = path.join(__dirname, 'dossie_temp', 'word', 'document.xml');
const xml = fs.readFileSync(xmlPath, 'utf8');

// Extract text from <w:t> tags
const textMatches = xml.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
const fullText = textMatches.map(match => {
  const textMatch = match.match(/>([^<]*)</);
  return textMatch ? textMatch[1] : '';
}).join(' ');

// Split into chunks
const chunkSize = 15000;
const totalChunks = Math.ceil(fullText.length / chunkSize);

console.log(`Total characters: ${fullText.length}`);
console.log(`Total chunks: ${totalChunks}`);
console.log('\n=== CHUNK 2 (chars 15000-30000) ===\n');
console.log(fullText.substring(15000, 30000));
