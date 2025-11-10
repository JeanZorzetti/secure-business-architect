# Secure Business Architect - Backend API

Backend REST API para o site institucional e sistema CRM da JB Advocacia.

## Stack Tecnológico

- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Linguagem**: TypeScript
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT
- **Validação**: Zod
- **Logger**: Pino
- **Rate Limiting**: express-rate-limit

## Requisitos

- Node.js >= 20.x
- PostgreSQL >= 14.x
- npm ou yarn

## Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/JeanZorzetti/secure-business-architect.git
cd secure-business-architect/backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações.

4. Execute as migrations do banco de dados:
```bash
npx prisma migrate dev
```

5. (Opcional) Seed do banco de dados:
```bash
npx prisma db seed
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento com hot-reload
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Inicia servidor em produção
- `npm run prisma:generate` - Gera o Prisma Client
- `npm run prisma:migrate` - Executa migrations
- `npm run prisma:studio` - Abre o Prisma Studio
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código com Prettier

## Variáveis de Ambiente

Veja o arquivo [.env.example](.env.example) para a lista completa de variáveis.

### Principais Variáveis:

```env
# Ambiente
NODE_ENV=development

# Servidor
PORT=3000
BACKEND_URL=http://localhost:3000
API_PREFIX=/api

# Banco de Dados
DATABASE_URL=postgresql://user:password@localhost:5432/database

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=30d

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Estrutura do Projeto

```
backend/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── migrations/            # Migrations do Prisma
├── src/
│   ├── config/                # Configurações (env, logger, database)
│   ├── controllers/           # Controllers da API
│   ├── middlewares/           # Middlewares (auth, rate limit, error handling)
│   ├── routes/                # Definição de rotas
│   ├── services/              # Lógica de negócio
│   ├── types/                 # Tipos TypeScript
│   ├── validators/            # Schemas de validação (Zod)
│   ├── app.ts                 # Configuração do Express
│   └── server.ts              # Entry point
├── .env.example               # Exemplo de variáveis de ambiente
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

### Autenticação
- `POST /api/auth/login` - Login de admin
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Dados do usuário logado

### Contatos
- `POST /api/contacts` - Criar contato (público)
- `GET /api/contacts` - Listar contatos (admin)
- `GET /api/contacts/stats` - Estatísticas (admin)
- `GET /api/contacts/:id` - Buscar contato (admin)
- `PATCH /api/contacts/:id/status` - Atualizar status (admin)
- `DELETE /api/contacts/:id` - Deletar contato (admin)

### Newsletter
- `POST /api/newsletter/subscribe` - Inscrever (público)
- `GET /api/newsletter/unsubscribe/:token` - Cancelar inscrição (público)
- `GET /api/newsletter` - Listar inscritos (admin)
- `GET /api/newsletter/stats` - Estatísticas (admin)
- `GET /api/newsletter/export` - Exportar CSV (admin)
- `DELETE /api/newsletter/:id` - Remover inscrito (admin)

### Blog
**Público:**
- `GET /api/blog/posts` - Listar posts publicados
- `GET /api/blog/posts/:slug` - Ver post por slug
- `GET /api/blog/categories` - Listar categorias
- `GET /api/blog/search` - Buscar posts

**Admin:**
- `POST /api/blog/admin/posts` - Criar post
- `GET /api/blog/admin/posts` - Listar todos os posts
- `GET /api/blog/admin/posts/:id` - Buscar post
- `PUT /api/blog/admin/posts/:id` - Atualizar post
- `DELETE /api/blog/admin/posts/:id` - Deletar post
- `PATCH /api/blog/admin/posts/:id/publish` - Publicar post
- `PATCH /api/blog/admin/posts/:id/unpublish` - Despublicar post
- `GET /api/blog/admin/stats` - Estatísticas

### Serviços
**Público:**
- `GET /api/services` - Listar serviços ativos

**Admin:**
- `POST /api/services/admin` - Criar serviço
- `GET /api/services/admin/all` - Listar todos
- `GET /api/services/admin/:id` - Buscar serviço
- `PUT /api/services/admin/:id` - Atualizar serviço
- `DELETE /api/services/admin/:id` - Deletar serviço
- `PATCH /api/services/admin/:id/toggle` - Toggle ativo/inativo
- `PATCH /api/services/admin/reorder` - Reordenar serviços

### Depoimentos
**Público:**
- `GET /api/testimonials` - Listar depoimentos publicados

**Admin:**
- `POST /api/admin/testimonials` - Criar depoimento
- `GET /api/admin/testimonials` - Listar todos
- `GET /api/admin/testimonials/:id` - Buscar depoimento
- `PUT /api/admin/testimonials/:id` - Atualizar depoimento
- `DELETE /api/admin/testimonials/:id` - Deletar depoimento
- `PATCH /api/admin/testimonials/:id/toggle-publish` - Publicar/despublicar
- `PATCH /api/admin/testimonials/reorder` - Reordenar

### Analytics
**Público:**
- `POST /api/analytics/track` - Registrar evento

**Admin:**
- `GET /api/admin/analytics/overview` - Visão geral
- `GET /api/admin/analytics/top-posts` - Posts mais visualizados
- `GET /api/admin/analytics/contacts-trend` - Tendência de contatos
- `GET /api/admin/analytics/blog-views-trend` - Tendência de visualizações
- `GET /api/admin/analytics/events` - Buscar eventos

## Segurança

### Implementado:
- ✅ JWT Authentication com refresh tokens
- ✅ Bcrypt para hash de senhas
- ✅ Rate limiting em todas as rotas
- ✅ Helmet para headers de segurança
- ✅ CORS configurável
- ✅ Validação de entrada com Zod
- ✅ Sanitização de SQL (Prisma)
- ✅ Logs estruturados (Pino)

### Recomendações para Produção:
- Usar HTTPS obrigatório
- Configurar CORS para domínios específicos
- Implementar rate limiting mais restritivo
- Monitorar logs com ferramentas externas
- Backups automáticos do banco de dados
- Implementar WAF (Web Application Firewall)

## Deploy

### Easypanel (Recomendado)

1. Crie uma aplicação Node.js no Easypanel
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente
4. Crie um serviço PostgreSQL
5. Execute as migrations:
```bash
npx prisma migrate deploy
```
6. Deploy automático via Git push

### Docker

```bash
docker build -t backend-api .
docker run -p 3000:3000 --env-file .env backend-api
```

### Render / Railway / Fly.io

Todas as plataformas suportam deploy direto do GitHub. Configure:
1. Repositório
2. Variáveis de ambiente
3. Build command: `npm run build`
4. Start command: `npm start`

## Banco de Dados

### Migrations

Criar nova migration:
```bash
npx prisma migrate dev --name nome_da_migration
```

Aplicar migrations em produção:
```bash
npx prisma migrate deploy
```

### Seed

Execute o seed para criar dados iniciais:
```bash
npx prisma db seed
```

### Backup

Backup manual:
```bash
pg_dump -U username -d database_name > backup.sql
```

Restore:
```bash
psql -U username -d database_name < backup.sql
```

## Monitoramento

### Health Check

```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-01-10T12:00:00.000Z",
  "uptime": 12345,
  "environment": "production"
}
```

### Logs

Os logs são gerados via Pino em formato JSON estruturado.

Em desenvolvimento:
```bash
npm run dev
```

Em produção, redirecione logs para arquivo ou serviço:
```bash
npm start | tee -a logs/app.log
```

## Troubleshooting

### Erro de conexão com banco de dados
```
Error: Can't reach database server
```
Verifique se o PostgreSQL está rodando e se a `DATABASE_URL` está correta.

### Erro de migrations
```
Error: Migration failed
```
Execute `npx prisma migrate reset` em desenvolvimento ou verifique os logs.

### Erro 401 Unauthorized
```
{ "error": "Token inválido ou expirado" }
```
O token JWT expirou. Faça login novamente ou use o refresh token.

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto é privado e propriedade da JB Advocacia.

## Suporte

Para suporte, entre em contato com o time de desenvolvimento.

---

**Desenvolvido com ❤️ para JB Advocacia**
