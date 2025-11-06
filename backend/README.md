# Secure Business Architect - Backend API

Backend API para o website institucional do escritório de advocacia Secure Business Architect, especializado em direito empresarial estratégico.

## Stack Tecnológico

- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js
- **Linguagem**: TypeScript
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL 15
- **Cache**: Redis 7
- **Autenticação**: JWT
- **Validação**: Zod + Express Validator
- **Logging**: Pino
- **Testes**: Jest + Supertest
- **Deploy**: Docker + Easypanel

## Funcionalidades

- ✅ Autenticação JWT para administradores
- ✅ Gestão de contatos (formulário de contato)
- ✅ Sistema de newsletter com confirmação
- ✅ CMS para blog posts
- ✅ Gestão de serviços oferecidos
- ✅ Sistema de depoimentos
- ✅ Analytics básico
- ✅ Rate limiting
- ✅ Logs estruturados
- ✅ Cache com Redis

## Pré-requisitos

- Node.js >= 20.0.0
- npm >= 10.0.0
- PostgreSQL >= 15
- Redis >= 7
- Docker e Docker Compose (opcional)

## Instalação

### 1. Clone o repositório

```bash
git clone <repository-url>
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/secure_business_architect
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
# ... outras variáveis
```

### 4. Execute as migrations

```bash
npm run migrate:dev
```

### 5. Popule o banco de dados (opcional)

```bash
npm run seed
```

Isso criará:
- 1 usuário admin (email: `admin@securebusinessarchitect.com`, senha: `Admin@123456`)
- 5 serviços exemplo
- 3 depoimentos exemplo
- 2 posts de blog exemplo

## Desenvolvimento

### Rodar localmente

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

### Com Docker Compose

```bash
docker-compose up -d
```

Isso iniciará:
- PostgreSQL na porta 5432
- Redis na porta 6379
- API na porta 3000

## Scripts Disponíveis

```bash
npm run dev          # Inicia servidor em modo desenvolvimento
npm run build        # Compila TypeScript para JavaScript
npm start            # Inicia servidor em produção
npm test             # Executa testes
npm run test:watch   # Executa testes em modo watch
npm run lint         # Verifica código com ESLint
npm run lint:fix     # Corrige problemas de linting
npm run format       # Formata código com Prettier
npm run migrate:dev  # Executa migrations em dev
npm run migrate:deploy # Executa migrations em produção
npm run prisma:studio  # Abre Prisma Studio (GUI do banco)
npm run seed         # Popula banco com dados iniciais
```

## Estrutura do Projeto

```
backend/
├── prisma/
│   ├── schema.prisma      # Schema do banco de dados
│   └── seed.ts            # Seed inicial
├── src/
│   ├── config/            # Configurações (env, db, redis, logger)
│   ├── controllers/       # Controllers (handlers de rotas)
│   ├── services/          # Lógica de negócio
│   ├── repositories/      # Acesso a dados
│   ├── models/            # Modelos/Entidades
│   ├── middlewares/       # Middlewares (auth, validation, etc)
│   ├── routes/            # Definição de rotas
│   ├── utils/             # Utilitários
│   ├── validators/        # Schemas de validação
│   ├── types/             # TypeScript types/interfaces
│   ├── jobs/              # Background jobs
│   └── app.ts             # Configuração Express
├── tests/                 # Testes
├── uploads/               # Uploads temporários
├── Dockerfile             # Multi-stage Dockerfile
├── docker-compose.yml     # Docker Compose para dev
└── package.json
```

## Endpoints da API

### Públicos (sem autenticação)

```
GET    /health                         # Health check
GET    /                               # Info da API

POST   /api/contacts                   # Criar contato
GET    /api/services                   # Listar serviços
GET    /api/services/:slug             # Ver serviço
GET    /api/blog/posts                 # Listar posts
GET    /api/blog/posts/:slug           # Ver post
GET    /api/testimonials               # Listar depoimentos
POST   /api/newsletter/subscribe       # Inscrever newsletter
GET    /api/newsletter/unsubscribe/:token # Cancelar inscrição
```

### Admin (requer JWT)

```
POST   /api/auth/login                 # Login
POST   /api/auth/refresh               # Refresh token
POST   /api/auth/logout                # Logout

GET    /api/admin/contacts             # Listar contatos
PATCH  /api/admin/contacts/:id/status  # Atualizar status
DELETE /api/admin/contacts/:id         # Deletar contato

CRUD   /api/admin/blog/posts           # Gestão de posts
POST   /api/admin/upload/image         # Upload de imagem
CRUD   /api/admin/services             # Gestão de serviços
CRUD   /api/admin/testimonials         # Gestão de depoimentos

GET    /api/admin/analytics/overview   # Dashboard analytics
```

## Testes

```bash
# Executar todos os testes
npm test

# Executar com coverage
npm test -- --coverage

# Executar em modo watch
npm run test:watch
```

## Deploy

### Easypanel (Recomendado)

1. Configure PostgreSQL e Redis no Easypanel
2. Adicione serviço Node.js com build via Dockerfile
3. Configure variáveis de ambiente
4. Conecte repositório Git
5. Deploy automático no push

Veja [roadmap_backend.md](../roadmaps/roadmap_backend.md) para detalhes completos.

### Manual com Docker

```bash
# Build da imagem
docker build -t sba-backend .

# Rodar container
docker run -p 3000:3000 --env-file .env sba-backend
```

## Variáveis de Ambiente

Veja [.env.example](.env.example) para lista completa de variáveis.

Principais variáveis obrigatórias:
- `DATABASE_URL` - URL de conexão PostgreSQL
- `JWT_SECRET` - Secret para tokens JWT (min 32 chars)
- `JWT_REFRESH_SECRET` - Secret para refresh tokens
- `SMTP_*` - Configurações de email
- `ADMIN_EMAIL` - Email do administrador
- `FRONTEND_URL` - URL do frontend
- `BACKEND_URL` - URL do backend

## Segurança

- Autenticação JWT com refresh tokens
- Rate limiting em todos os endpoints
- Helmet para headers de segurança
- Validação de inputs com Zod
- Sanitização contra XSS/SQL Injection
- CORS configurado
- Senhas hasheadas com bcrypt
- HTTPS obrigatório em produção

## Logging

Logs estruturados com Pino:
- Desenvolvimento: logs coloridos e formatados
- Produção: JSON estruturado para agregadores

Níveis: `trace`, `debug`, `info`, `warn`, `error`, `fatal`

## Cache

Redis é usado para:
- Blacklist de tokens JWT
- Cache de queries frequentes
- Sessões de rate limiting

## Migrations

```bash
# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Aplicar migrations em produção
npm run migrate:deploy

# Reset completo do banco (CUIDADO!)
npm run migrate:reset
```

## Prisma Studio

Interface gráfica para visualizar e editar dados:

```bash
npm run prisma:studio
```

Acesse: http://localhost:5555

## Troubleshooting

### Erro de conexão com banco

Verifique se PostgreSQL está rodando e `DATABASE_URL` está correto.

### Erro de conexão com Redis

Redis é opcional. Se não estiver disponível, a API funcionará sem cache.

### Erro em migrations

```bash
# Reset e recrie
npm run migrate:reset
npm run migrate:dev
npm run seed
```

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## Licença

MIT

## Suporte

Para questões e suporte, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para Secure Business Architect**
