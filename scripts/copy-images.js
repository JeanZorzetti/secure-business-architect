const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../backend/uploads/images');
const destDir = path.join(__dirname, '../frontend-next/public/uploads/images');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Read all files from source directory
const files = fs.readdirSync(sourceDir);

// Copy each image file
files.forEach(file => {
  if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);

    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ Copied: ${file}`);
  }
});

console.log(`\n✅ All images copied successfully!`);
console.log(`📂 Destination: ${destDir}`);
