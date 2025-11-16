const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgresql://jennifer:PAzo18**@31.97.23.166:5435/jennifer?schema=public';

async function updateExcerpts() {
  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log('✓ Conectado ao banco de dados PostgreSQL');

    // Ler o arquivo SQL
    const sqlFile = path.join(__dirname, 'update-excerpts.sql');
    const sql = fs.readFileSync(sqlFile, 'utf-8');

    // Separar comandos (cada UPDATE é um comando)
    const commands = sql
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

    let updateCount = 0;

    for (const command of commands) {
      if (command.toUpperCase().startsWith('UPDATE')) {
        const result = await client.query(command);
        updateCount += result.rowCount;
        console.log(`✓ Atualizado ${result.rowCount} registro(s)`);
      } else if (command.toUpperCase().startsWith('SELECT')) {
        const result = await client.query(command);
        console.log('\n📊 Verificação das atualizações:\n');
        result.rows.forEach(row => {
          console.log(`${row.slug}:`);
          console.log(`  Caracteres: ${row.chars}`);
          console.log(`  Excerpt: ${row.excerpt}`);
          console.log('');
        });
      }
    }

    console.log(`\n✅ Total de posts atualizados: ${updateCount}`);

  } catch (error) {
    console.error('❌ Erro ao atualizar excerpts:', error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log('✓ Conexão encerrada');
  }
}

updateExcerpts();
