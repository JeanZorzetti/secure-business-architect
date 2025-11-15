const fs = require('fs');
const path = require('path');

// Read the document.xml file
const xmlPath = path.join(__dirname, 'dossie_temp', 'word', 'document.xml');
const xml = fs.readFileSync(xmlPath, 'utf8');

// Extract text from <w:t> tags
const textMatches = xml.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
const text = textMatches.map(match => {
  const textMatch = match.match(/>([^<]*)</);
  return textMatch ? textMatch[1] : '';
}).join(' ');

// Print first 15000 characters
console.log(text.substring(0, 15000));
