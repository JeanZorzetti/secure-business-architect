# Seed de Posts do Blog

Este documento explica como popular o banco de dados com os 9 artigos do blog que estão atualmente hardcoded no frontend.

## Pré-requisitos

- Banco de dados configurado e acessível
- Variáveis de ambiente configuradas (.env)
- Dependências instaladas (`npm install`)

## Como Executar

### 1. Via npm script (Recomendado)

```bash
cd backend
npm run seed:blog
```

### 2. Via Node.js direto

```bash
cd backend
node prisma/seed-blog-posts.js
```

## O Que o Seed Faz

O script `seed-blog-posts.js` irá:

1. Verificar se cada post já existe no banco (por slug)
2. Se existir, pular o post
3. Se não existir, criar o post com status PUBLISHED
4. Inserir os 9 artigos:
   - Por que a gestão de contratos é crucial para a lucratividade da sua empresa?
   - Sociedade 50/50: Por que essa pode não ser a melhor escolha para você
   - Contrato de Parceria: Uma solução para a mão-de-obra no agronegócio
   - Contrato Social vs. Acordo de Sócios: Entenda a diferença crucial
   - Due Diligence: O que avaliar antes de comprar uma empresa
   - 3 Cláusulas que todo contrato empresarial precisa ter
   - Como negociar contratos sem deixar dinheiro na mesa
   - Passivos trabalhistas ocultos: Como identificar e prevenir
   - O óbvio precisa ser dito: A importância dos POPs no ambiente corporativo

## Após Executar

Após a execução bem-sucedida:

1. ✅ Os posts estarão disponíveis no banco de dados
2. ✅ Aparecerão automaticamente no sitemap
3. ✅ IndexNow será notificado automaticamente quando novos posts forem publicados
4. ✅ Podem ser gerenciados pelo painel admin

## Remover Posts Estáticos do Código

Após executar o seed, você pode:

1. Remover a lista `staticBlogPosts` do arquivo `backend/src/services/seoService.ts` (linhas 76-94)
2. Manter apenas a busca dinâmica do banco de dados
3. O frontend pode continuar usando os posts estáticos ou ser atualizado para buscar do backend

## Troubleshooting

### Erro: Cannot find module '@prisma/client'
```bash
npm run prisma:generate
```

### Erro: Database connection failed
Verifique suas variáveis de ambiente no arquivo `.env`:
- `DATABASE_URL` deve estar corretamente configurada

### Posts duplicados
O script verifica automaticamente se o post já existe (por slug) e pula duplicatas.

## Notas Importantes

- Os posts serão criados com status `PUBLISHED`
- As datas de publicação são preservadas dos posts originais
- O autor é configurado como "Jennifer Barreto"
- Tags são incluídas para cada post
- O conteúdo completo em Markdown está incluído
