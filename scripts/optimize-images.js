const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../frontend-next/public/uploads/images');

async function optimizeImages() {
  const files = fs.readdirSync(imagesDir);

  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const filePath = path.join(imagesDir, file);
      const originalSize = fs.statSync(filePath).size;

      console.log(`\n📦 Otimizando: ${file}`);
      console.log(`   Tamanho original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

      try {
        // Read the original file
        const imageBuffer = fs.readFileSync(filePath);

        // Optimize the image
        let optimized;
        if (file.endsWith('.png')) {
          optimized = await sharp(imageBuffer)
            .png({
              quality: 80,
              compressionLevel: 9,
              adaptiveFiltering: true,
            })
            .toBuffer();
        } else {
          optimized = await sharp(imageBuffer)
            .jpeg({
              quality: 85,
              progressive: true,
              mozjpeg: true,
            })
            .toBuffer();
        }

        // Write the optimized file
        fs.writeFileSync(filePath, optimized);

        const newSize = fs.statSync(filePath).size;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

        console.log(`   ✅ Tamanho otimizado: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   💰 Economia: ${savings}%`);
      } catch (error) {
        console.error(`   ❌ Erro ao otimizar ${file}:`, error.message);
      }
    }
  }

  console.log('\n✅ Otimização concluída!');
}

// Check if sharp is installed
try {
  require.resolve('sharp');
  optimizeImages();
} catch (e) {
  console.log('⚠️  Sharp não está instalado. Instalando...');
  console.log('Execute: npm install sharp --save-dev');
  console.log('E depois execute novamente este script.');
}
