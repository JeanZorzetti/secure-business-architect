const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
  strongDelimiter: '**',
});

const articlesDir = path.join(__dirname, '../artigos_jennifer');
const outputDir = path.join(__dirname, '../docs/ARTIGOS-CONVERTIDOS');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convertDocxToMarkdown(docxPath, outputPath) {
  try {
    console.log(`\n📄 Convertendo: ${path.basename(docxPath)}`);

    // Extract HTML from DOCX
    const result = await mammoth.convertToHtml(
      { path: docxPath },
      {
        styleMap: [
          "p[style-name='Heading 1'] => h1:fresh",
          "p[style-name='Heading 2'] => h2:fresh",
          "p[style-name='Heading 3'] => h3:fresh",
          "p[style-name='Title'] => h1:fresh",
          "p[style-name='Subtitle'] => h2:fresh",
        ]
      }
    );

    const html = result.value;
    const messages = result.messages;

    // Show warnings if any
    if (messages.length > 0) {
      console.log('  ⚠️  Avisos:');
      messages.forEach(m => console.log(`     - ${m.message}`));
    }

    // Convert HTML to Markdown
    let markdown = turndownService.turndown(html);

    // Clean up markdown
    markdown = markdown
      .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
      .replace(/^\s+/gm, '') // Remove leading whitespace
      .trim();

    // Write to file
    fs.writeFileSync(outputPath, markdown, 'utf8');

    console.log(`  ✅ Salvo em: ${path.basename(outputPath)}`);
    console.log(`  📊 Tamanho: ${markdown.length} caracteres`);

    // Count words
    const wordCount = markdown.split(/\s+/).length;
    console.log(`  📝 Palavras: ${wordCount}`);

    return { success: true, wordCount, size: markdown.length };
  } catch (error) {
    console.error(`  ❌ Erro: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function convertAll() {
  console.log('🚀 Iniciando conversão de DOCX para Markdown...\n');

  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.docx'));

  console.log(`📚 Encontrados ${files.length} arquivos DOCX\n`);

  const results = [];

  for (const file of files) {
    const docxPath = path.join(articlesDir, file);
    const baseName = path.basename(file, '.docx');
    const outputPath = path.join(outputDir, `${baseName}.md`);

    const result = await convertDocxToMarkdown(docxPath, outputPath);
    results.push({ file, ...result });
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO DA CONVERSÃO\n');

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Sucesso: ${successful.length}/${files.length}`);
  console.log(`❌ Falhas: ${failed.length}/${files.length}`);

  if (successful.length > 0) {
    console.log('\n📝 Arquivos convertidos:');
    successful.forEach(r => {
      console.log(`   - ${r.file}`);
      console.log(`     Palavras: ${r.wordCount} | Caracteres: ${r.size}`);
    });
  }

  if (failed.length > 0) {
    console.log('\n❌ Arquivos com erro:');
    failed.forEach(r => {
      console.log(`   - ${r.file}: ${r.error}`);
    });
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ Conversão concluída! Arquivos salvos em:\n   ${outputDir}\n`);
}

// Check if dependencies are installed
try {
  require.resolve('mammoth');
  require.resolve('turndown');
  convertAll();
} catch (e) {
  console.log('⚠️  Dependências não instaladas. Instalando...\n');
  console.log('Execute: npm install mammoth turndown --save-dev');
  console.log('E depois execute novamente: node scripts/convert-docx-to-md.js');
}
