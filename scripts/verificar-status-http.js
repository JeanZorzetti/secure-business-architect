/**
 * Verificador de Status HTTP - Jennifer Barreto Advocacia
 *
 * Script para verificar se todas as páginas do site retornam 200 OK
 * Útil para diagnosticar problemas de indexação no Google Search Console
 *
 * Uso:
 *   node scripts/verificar-status-http.js
 */

const https = require('https');
const http = require('http');

const SITE_URL = 'https://jbadvocacia.roilabs.com.br';

// URLs para verificar
const URLS = [
  // Homepage
  '/',

  // Páginas estáticas
  '/sobre',
  '/servicos',
  '/contato',
  '/calculadora',
  '/conteudo',

  // Blog posts (adicione os slugs específicos)
  '/conteudo/contratos-empresariais-clausulas-essenciais',
  '/conteudo/importancia-due-diligence-ma',
  '/conteudo/gestao-contratos-lucratividade',
  '/conteudo/sociedade-50-50-riscos',
  '/conteudo/contrato-parceria-agronegocio',
  '/conteudo/contrato-social-acordo-socios',
  '/conteudo/due-diligence-checklist',
  '/conteudo/clausulas-essenciais-contratos',
  '/conteudo/negociacao-estrategica-contratos',
  '/conteudo/passivos-trabalhistas-prevencao',
  '/conteudo/pops-ambiente-corporativo',

  // Sitemap e robots
  '/sitemap.xml',
  '/robots.txt',
];

/**
 * Faz requisição HTTP e retorna status code
 */
function checkUrl(url) {
  return new Promise((resolve, reject) => {
    const fullUrl = `${SITE_URL}${url}`;
    const protocol = fullUrl.startsWith('https') ? https : http;

    const startTime = Date.now();

    const req = protocol.get(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; IndexingBot/1.0; +https://jbadvocacia.roilabs.com.br)',
      }
    }, (res) => {
      const duration = Date.now() - startTime;

      resolve({
        url,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        duration,
        headers: {
          contentType: res.headers['content-type'],
          contentLength: res.headers['content-length'],
          lastModified: res.headers['last-modified'],
          xRobotsTag: res.headers['x-robots-tag'],
        },
      });
    });

    req.on('error', (error) => {
      reject({
        url,
        error: error.message,
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject({
        url,
        error: 'Timeout (10s)',
      });
    });
  });
}

/**
 * Formata resultado para display
 */
function formatResult(result) {
  if (result.error) {
    return `❌ ${result.url.padEnd(50)} ERROR: ${result.error}`;
  }

  const statusEmoji = result.statusCode === 200 ? '✅' :
                     result.statusCode >= 300 && result.statusCode < 400 ? '🔄' : '❌';

  const urlPart = result.url.padEnd(50);
  const statusPart = `${result.statusCode} ${result.statusMessage}`.padEnd(20);
  const durationPart = `(${result.duration}ms)`.padEnd(10);

  let warnings = [];

  // Verificar X-Robots-Tag
  if (result.headers.xRobotsTag) {
    if (result.headers.xRobotsTag.includes('noindex')) {
      warnings.push('⚠️  NOINDEX no header!');
    }
  }

  const warningPart = warnings.length > 0 ? warnings.join(' ') : '';

  return `${statusEmoji} ${urlPart} ${statusPart} ${durationPart} ${warningPart}`;
}

/**
 * Gera relatório de problemas
 */
function generateReport(results) {
  const errors = results.filter(r => r.error);
  const non200 = results.filter(r => !r.error && r.statusCode !== 200);
  const redirects = results.filter(r => !r.error && r.statusCode >= 300 && r.statusCode < 400);
  const serverErrors = results.filter(r => !r.error && r.statusCode >= 500);
  const notFound = results.filter(r => !r.error && r.statusCode === 404);
  const success = results.filter(r => !r.error && r.statusCode === 200);
  const noindex = results.filter(r => !r.error && r.headers.xRobotsTag?.includes('noindex'));

  console.log('\n' + '='.repeat(100));
  console.log('📊 RELATÓRIO FINAL');
  console.log('='.repeat(100));
  console.log(`Total de URLs verificadas: ${results.length}`);
  console.log(`✅ Sucesso (200 OK):        ${success.length}`);
  console.log(`🔄 Redirects (3xx):         ${redirects.length}`);
  console.log(`❌ Not Found (404):         ${notFound.length}`);
  console.log(`❌ Server Errors (5xx):     ${serverErrors.length}`);
  console.log(`❌ Erros de conexão:        ${errors.length}`);
  console.log(`⚠️  X-Robots-Tag noindex:   ${noindex.length}`);
  console.log('='.repeat(100));

  if (non200.length > 0) {
    console.log('\n⚠️  PROBLEMAS ENCONTRADOS:\n');

    if (redirects.length > 0) {
      console.log('🔄 Redirects:');
      redirects.forEach(r => {
        console.log(`   ${r.url} → ${r.statusCode} ${r.statusMessage}`);
      });
      console.log('');
    }

    if (notFound.length > 0) {
      console.log('❌ Not Found:');
      notFound.forEach(r => {
        console.log(`   ${r.url} → ${r.statusCode} ${r.statusMessage}`);
      });
      console.log('');
    }

    if (serverErrors.length > 0) {
      console.log('❌ Server Errors:');
      serverErrors.forEach(r => {
        console.log(`   ${r.url} → ${r.statusCode} ${r.statusMessage}`);
      });
      console.log('');
    }

    if (errors.length > 0) {
      console.log('❌ Erros de Conexão:');
      errors.forEach(r => {
        console.log(`   ${r.url} → ${r.error}`);
      });
      console.log('');
    }
  }

  if (noindex.length > 0) {
    console.log('⚠️  PÁGINAS COM NOINDEX NO HEADER:');
    noindex.forEach(r => {
      console.log(`   ${r.url} → X-Robots-Tag: ${r.headers.xRobotsTag}`);
    });
    console.log('');
  }

  if (non200.length === 0 && errors.length === 0 && noindex.length === 0) {
    console.log('\n✅ TUDO OK! Todas as páginas retornam 200 e não têm bloqueios.\n');
  } else {
    console.log('\n⚠️  AÇÃO NECESSÁRIA: Corrija os problemas acima antes de prosseguir.\n');
  }
}

/**
 * Main
 */
async function main() {
  console.log('🔍 Verificando status HTTP de todas as páginas...\n');
  console.log(`Site: ${SITE_URL}`);
  console.log(`Total de URLs: ${URLS.length}\n`);
  console.log('='.repeat(100));

  const results = [];

  for (const url of URLS) {
    try {
      const result = await checkUrl(url);
      console.log(formatResult(result));
      results.push(result);
    } catch (error) {
      console.log(formatResult(error));
      results.push(error);
    }

    // Pequeno delay para não sobrecarregar o servidor
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  generateReport(results);
}

// Executar
main().catch(console.error);
