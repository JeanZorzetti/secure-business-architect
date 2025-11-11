# Guia de Aplicação de Migração - Blog Advanced Features

## Problema Identificado

O erro 500 no endpoint `/api/admin/blog/posts` está ocorrendo porque a migração `20251111160747_add_blog_autosave_and_scheduling` não foi aplicada no banco de dados de produção.

Esta migração adiciona:
- Novos campos à tabela `blog_posts`: `scheduledFor`, `isAutoDraft`, `autoDraftData`, `lastAutoSaveAt`, `categoryId`
- Nova tabela `blog_categories`
- Índices para otimização de queries

## Opção 1: Script Automatizado (Recomendado)

```bash
chmod +x deploy-migration.sh
./deploy-migration.sh
```

## Opção 2: Passo a Passo Manual

### 1. Conectar ao servidor

```bash
ssh root@31.97.23.166
```

### 2. Navegar para o diretório do projeto

```bash
cd /root/secure-business-architect
```

### 3. Fazer pull das últimas alterações

```bash
git pull
```

### 4. Reconstruir o container backend

```bash
docker-compose up -d --build backend
```

### 5. Aplicar as migrações do Prisma

```bash
docker exec secure-business-architect-backend npx prisma migrate deploy
```

### 6. Verificar se a migração foi aplicada

```bash
docker exec secure-business-architect-backend npx prisma migrate status
```

**Saída esperada:**
```
Database schema is up to date!
```

### 7. Reiniciar o container para garantir

```bash
docker restart secure-business-architect-backend
```

### 8. Verificar logs

```bash
docker logs secure-business-architect-backend --tail 50
```

**Logs esperados:**
```
✅ Database connected successfully
⏰ Scheduler started for post publishing
🚀 Server running on port 5000
```

## Opção 3: Aplicar SQL Manualmente (Emergência)

Se as opções acima não funcionarem, você pode aplicar o SQL diretamente no banco:

### 1. Conectar ao banco de dados

```bash
docker exec -it secure-business-architect-postgres psql -U jennifer -d jennifer
```

### 2. Executar o SQL da migração

```sql
-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN     "autoDraftData" JSONB,
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "isAutoDraft" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastAutoSaveAt" TIMESTAMP(3),
ADD COLUMN     "scheduledFor" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "blog_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blog_categories_name_key" ON "blog_categories"("name");
CREATE UNIQUE INDEX "blog_categories_slug_key" ON "blog_categories"("slug");
CREATE INDEX "blog_categories_slug_idx" ON "blog_categories"("slug");
CREATE INDEX "blog_categories_isActive_idx" ON "blog_categories"("isActive");
CREATE INDEX "blog_categories_order_idx" ON "blog_categories"("order");
CREATE INDEX "blog_posts_scheduledFor_idx" ON "blog_posts"("scheduledFor");
CREATE INDEX "blog_posts_categoryId_idx" ON "blog_posts"("categoryId");
CREATE INDEX "blog_posts_isAutoDraft_idx" ON "blog_posts"("isAutoDraft");

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_categoryId_fkey"
FOREIGN KEY ("categoryId") REFERENCES "blog_categories"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
```

### 3. Registrar a migração no Prisma

```bash
docker exec secure-business-architect-backend psql $DATABASE_URL -c \
  "INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count)
   VALUES ('$(uuidgen)', '$(cat backend/prisma/migrations/20251111160747_add_blog_autosave_and_scheduling/migration.sql | md5sum | cut -d' ' -f1)', NOW(), '20251111160747_add_blog_autosave_and_scheduling', NULL, NULL, NOW(), 1);"
```

## Verificação Final

Após aplicar a migração, teste o endpoint:

```bash
curl https://backjennifer.roilabs.com.br/api/blog/posts
```

**Resposta esperada:** Status 200 com lista de posts (mesmo que vazia)

## Novos Endpoints Disponíveis

Após a migração, estes novos endpoints estarão funcionais:

### Auto-save
- `POST /api/admin/blog/posts/:id/autosave` - Salvar rascunho automaticamente
- `POST /api/admin/blog/posts/autosave` - Criar/atualizar rascunho automático
- `DELETE /api/admin/blog/posts/autosave/cleanup` - Limpar rascunhos antigos

### Preview
- `POST /api/admin/blog/posts/preview` - Gerar preview temporário

### Agendamento
- `GET /api/admin/blog/posts/scheduled` - Listar posts agendados
- `POST /api/admin/blog/posts/:id/schedule` - Agendar publicação
- `DELETE /api/admin/blog/posts/:id/schedule` - Cancelar agendamento

## Scheduler (Cron Job)

O scheduler é iniciado automaticamente quando o servidor sobe e:
- Roda a cada minuto
- Verifica posts com `scheduledFor <= now` e `status = DRAFT`
- Publica automaticamente alterando para `status = PUBLISHED`
- Loga cada publicação automática

Verificar se está rodando:
```bash
docker logs secure-business-architect-backend | grep "Scheduler"
```

**Saída esperada:**
```
⏰ Scheduler started for post publishing
```
