const { Client } = require('pg');

const connectionString = 'postgresql://jennifer:PAzo18**@31.97.23.166:5435/jennifer?schema=public';

async function checkSchema() {
  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log('✓ Conectado ao banco de dados\n');

    // Listar todas as tabelas
    const result = await client.query(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);

    console.log('📋 Tabelas disponíveis:\n');
    result.rows.forEach(row => {
      console.log(`  - ${row.tablename}`);
    });

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

checkSchema();
