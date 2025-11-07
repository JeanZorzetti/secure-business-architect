# Roadmap Backend - Secure Business Architect

## Visão Geral

Este documento define o roadmap completo para o desenvolvimento do backend do sistema **Secure Business Architect**, um website institucional para escritório de advocacia empresarial com funcionalidades de gestão de conteúdo, contatos e newsletter.

---

## Stack Tecnológico Proposta

### Core
- **Node.js** (v20 LTS) com **TypeScript**
- **Framework**: Express.js ou Fastify (performance)
- **ORM**: Prisma ou TypeORM
- **Banco de Dados**: PostgreSQL (principal) + Redis (cache)

### Segurança & Autenticação
- **JWT** para autenticação admin
- **bcrypt** para hash de senhas
- **helmet** para headers de segurança
- **express-rate-limit** para proteção contra abuso
- **cors** configurado adequadamente
- **express-validator** ou **Zod** para validação

### Infraestrutura & DevOps
- **Docker** para containerização (deploy via Dockerfile)
- **Easypanel** para gestão de deploy na VPS
- **Winston** ou **Pino** para logging
- **Jest** para testes unitários
- **Supertest** para testes de integração

### Integrações
- **Nodemailer** ou **SendGrid** para envio de emails
- **Multer** para upload de arquivos
- **AWS S3** ou **Cloudinary** para armazenamento de imagens
- **Bull** ou **BullMQ** para filas de processamento

---

## Arquitetura Proposta

### Padrão: Clean Architecture / Layered Architecture

```
backend/
├── src/
│   ├── config/              # Configurações (DB, env, etc)
│   ├── controllers/         # Camada de controle (handlers)
│   ├── services/            # Lógica de negócio
│   ├── repositories/        # Acesso a dados
│   ├── models/              # Modelos/Entidades
│   ├── middlewares/         # Middlewares (auth, validation, etc)
│   ├── routes/              # Definição de rotas
│   ├── utils/               # Utilitários
│   ├── validators/          # Schemas de validação
│   ├── types/               # TypeScript types/interfaces
│   ├── jobs/                # Background jobs
│   └── app.ts               # Configuração Express
├── prisma/                  # Schema Prisma e migrations
├── tests/                   # Testes
├── uploads/                 # Uploads temporários
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── package.json
└── tsconfig.json
```

---

## Fase 1: Setup e Infraestrutura Base (Semana 1-2) ✅ COMPLETA

### 1.1 Configuração Inicial ✅
- [x] Inicializar projeto Node.js com TypeScript
- [x] Configurar ESLint + Prettier
- [x] Configurar estrutura de pastas
- [x] Setup de variáveis de ambiente (.env)
- [x] Configurar scripts npm (dev, build, start, test)

### 1.2 Docker & Database ✅
- [x] Criar Dockerfile otimizado para produção (multi-stage build)
- [x] Criar docker-compose.yml para desenvolvimento local (Node.js + PostgreSQL + Redis)
- [x] Configurar Prisma ORM
- [x] Criar schema inicial do banco de dados
- [x] Setup de migrations
- [x] Seed inicial para desenvolvimento
- [x] Configurar variáveis de ambiente para Easypanel (.env.production)

### 1.3 Express Setup ✅
- [x] Configurar Express com TypeScript
- [x] Implementar middlewares básicos (cors, helmet, compression)
- [x] Configurar logging (Winston/Pino)
- [x] Implementar error handling global
- [x] Configurar rate limiting
- [x] Health check endpoint (`/health`, `/api/health`)

### 1.4 Testes ✅
- [x] Configurar Jest + Supertest
- [x] Criar estrutura de testes
- [x] Testes básicos de saúde da API

**Entregável**: ✅ API base rodando em Docker com health check - **COMPLETO**

---

## Fase 2: Autenticação e Autorização (Semana 3) ✅ COMPLETA

### 2.1 Sistema de Usuários Admin ✅
- [x] Model User (Prisma schema) - criado na migration inicial
- [x] Migration para tabela users - aplicada com sucesso
- [x] Service para gestão de usuários (AuthService)
- [x] Endpoint GET `/api/auth/me` para buscar usuário autenticado

### 2.2 Autenticação JWT ✅
- [x] Endpoint de login (POST `/api/auth/login`) - funcionando
- [x] Endpoint de logout (POST `/api/auth/logout`) - implementado
- [x] Endpoint de refresh token (POST `/api/auth/refresh`) - implementado
- [x] Endpoint GET `/api/auth/me` - retorna dados do usuário autenticado
- [x] Middleware de autenticação JWT (authenticateToken)
- [x] Middleware de autorização por roles (requireAdmin, requireSuperAdmin)

### 2.3 Segurança ✅
- [x] Hash de senhas com bcrypt (10 rounds)
- [x] Proteção contra brute force (rate limit global + específico de login)
- [x] Validação de usuário ativo antes do login
- [x] Tokens JWT com expiração configurável (7d access, 30d refresh)
- [x] CORS configurado corretamente para produção

### 2.4 Testes
- [ ] Testes unitários de auth service
- [ ] Testes de integração de endpoints auth
- [ ] Testes de segurança básicos

**Entregável**: ✅ Sistema de autenticação completo e seguro - **COMPLETO E EM PRODUÇÃO**

---

## Fase 3: Gestão de Contatos (Semana 4) ✅ COMPLETA

### 3.1 Model & Database ✅
- [x] Model Contact (Prisma schema) - criado na migration inicial
```prisma
model Contact {
  id          String   @id @default(uuid())
  name        String
  email       String
  phone       String?
  company     String?
  message     String
  status      ContactStatus @default(PENDING) // PENDING, READ, ARCHIVED
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```
- [x] Migration para tabela contacts - aplicada com sucesso
- [x] Indexes adequados (email, status, createdAt) - configurados no schema

### 3.2 API Endpoints (Público) ✅
- [x] POST `/api/contacts` - Criar contato (público) - funcionando
  - Validação de dados com Zod (createContactSchema)
  - Sanitização de inputs via Zod validation
  - Rate limiting agressivo (3 por hora por IP) - implementado
  - CAPTCHA (opcional: Google reCAPTCHA) - não implementado (futuro)

### 3.3 API Endpoints (Admin) ✅
- [x] GET `/api/contacts` - Listar contatos (paginado, filtros) - funcionando
- [x] GET `/api/contacts/:id` - Ver detalhes - funcionando (auto-marca PENDING como READ)
- [x] GET `/api/contacts/stats` - Estatísticas (total, pending, read, archived)
- [x] PATCH `/api/contacts/:id/status` - Atualizar status - funcionando
- [x] DELETE `/api/contacts/:id` - Deletar contato - funcionando

### 3.4 Notificações por Email
- [ ] Configurar Nodemailer/SendGrid
- [ ] Template de email para admin (novo contato)
- [ ] Template de confirmação para cliente
- [ ] Fila de processamento de emails (Bull)

### 3.5 Testes
- [ ] Testes de validação de formulário
- [ ] Testes de rate limiting
- [ ] Testes de endpoints admin
- [ ] Testes de envio de email (mock)

**Entregável**: ✅ Sistema de gestão de contatos funcionando em produção (sem emails ainda) - **COMPLETO**

**Implementação**:
- ContactService com CRUD completo ([backend/src/services/contactService.ts](../backend/src/services/contactService.ts))
- ContactController com todos os endpoints ([backend/src/controllers/contactController.ts](../backend/src/controllers/contactController.ts))
- Validadores Zod para todos os endpoints ([backend/src/validators/contactValidators.ts](../backend/src/validators/contactValidators.ts))
- Rotas integradas com autenticação e rate limiting ([backend/src/routes/contactRoutes.ts](../backend/src/routes/contactRoutes.ts))
- Types definidos ([backend/src/types/contact.types.ts](../backend/src/types/contact.types.ts))

---

## Fase 4: Newsletter (Semana 5) ✅ COMPLETA

### 4.1 Model & Database ✅
- [x] Model Newsletter (Prisma schema) - já existia no schema inicial
```prisma
model Newsletter {
  id               String   @id @default(uuid())
  email            String   @unique
  status           SubscriptionStatus @default(ACTIVE)
  subscribedAt     DateTime @default(now())
  unsubscribedAt   DateTime?
  unsubscribeToken String   @unique @default(uuid())
  confirmToken     String?  @unique
  confirmedAt      DateTime?
}
```
- [x] Migration para tabela newsletter - aplicada com sucesso
- [x] Indexes (email, status) - configurados no schema

### 4.2 API Endpoints (Público) ✅
- [x] POST `/api/newsletter/subscribe` - Inscrever - funcionando
  - Validação de email com Zod
  - Prevenção de duplicatas (retorna existente se já ativo)
  - Reativação automática se estava cancelado
  - Rate limiting (5 inscrições por hora)
  - Email de confirmação (double opt-in) - não implementado (futuro)
- [x] GET `/api/newsletter/unsubscribe/:token` - Cancelar inscrição - funcionando
- [ ] POST `/api/newsletter/confirm/:token` - Confirmar inscrição (futuro)

### 4.3 API Endpoints (Admin) ✅
- [x] GET `/api/newsletter` - Listar inscritos (paginado, filtros) - funcionando
- [x] GET `/api/newsletter/:id` - Buscar inscrito por ID - funcionando
- [x] GET `/api/newsletter/stats` - Estatísticas (total, active, unsubscribed, thisMonth)
- [x] DELETE `/api/newsletter/:id` - Remover inscrito - funcionando
- [x] GET `/api/newsletter/export` - Exportar CSV - funcionando
- [ ] POST `/api/newsletter/send` - Enviar campanha (futuro)

### 4.4 Emails
- [ ] Template de confirmação de inscrição (futuro)
- [ ] Template de confirmação de cancelamento (futuro)
- [ ] Link de unsubscribe em todos os emails (futuro)

### 4.5 Testes
- [ ] Testes de inscrição/cancelamento
- [ ] Testes de validação
- [ ] Testes de tokens
- [ ] Testes de exportação

**Entregável**: ✅ Sistema de newsletter funcionando (sem envio de emails ainda) - **COMPLETO**

**Implementação**:
- NewsletterService com CRUD completo ([backend/src/services/newsletterService.ts](../backend/src/services/newsletterService.ts))
- NewsletterController com todos os endpoints ([backend/src/controllers/newsletterController.ts](../backend/src/controllers/newsletterController.ts))
- Validadores Zod para todos os endpoints ([backend/src/validators/newsletterValidators.ts](../backend/src/validators/newsletterValidators.ts))
- Rotas integradas com autenticação e rate limiting ([backend/src/routes/newsletterRoutes.ts](../backend/src/routes/newsletterRoutes.ts))
- Types definidos ([backend/src/types/newsletter.types.ts](../backend/src/types/newsletter.types.ts))
- Exportação de CSV funcionando
- Estatísticas com inscritos do mês

---

## Fase 5: Gestão de Conteúdo - Blog (Semana 6-7) ✅ COMPLETA

### 5.1 Models & Database ✅
- [x] Model BlogPost (Prisma schema) - já existia no schema inicial
```prisma
model BlogPost {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  excerpt     String
  content     String   @db.Text
  coverImage  String?
  author      String
  category    String
  tags        String[] // Array de tags
  status      PostStatus @default(DRAFT) // DRAFT, PUBLISHED
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  viewCount   Int      @default(0)
}
```
- [ ] Model BlogCategory (opcional) - não implementado (futuro)
- [x] Migrations - schema já estava sincronizado
- [x] Indexes (slug, status, publishedAt, category) - configurados no schema

### 5.2 API Endpoints (Público) ✅
- [x] GET `/api/blog/posts` - Listar posts publicados (paginado, filtros)
- [x] GET `/api/blog/posts/:slug` - Ver post por slug (com incremento de visualizações)
- [x] GET `/api/blog/categories` - Listar categorias únicas
- [x] GET `/api/blog/posts/search?q=termo` - Buscar posts por título, conteúdo, tags

### 5.3 API Endpoints (Admin) ✅
- [x] POST `/api/admin/blog/posts` - Criar post
- [x] GET `/api/admin/blog/posts` - Listar todos (incluindo drafts)
- [x] GET `/api/admin/blog/posts/:id` - Ver post por ID
- [x] PUT `/api/admin/blog/posts/:id` - Atualizar post
- [x] DELETE `/api/admin/blog/posts/:id` - Deletar post
- [x] PATCH `/api/admin/blog/posts/:id/publish` - Publicar post
- [x] PATCH `/api/admin/blog/posts/:id/unpublish` - Despublicar post
- [x] GET `/api/admin/blog/stats` - Estatísticas (total, published, drafts, thisMonth)

### 5.4 Upload de Imagens
- [ ] Endpoint POST `/api/admin/upload/image` - não implementado (futuro)
- [ ] Configurar Multer - não implementado
- [ ] Validação de tipo/tamanho de arquivo - não implementado
- [ ] Integração com S3/Cloudinary - não implementado
- [ ] Geração de thumbnails - não implementado
- [ ] Otimização de imagens - não implementado

### 5.5 Features Avançadas ✅
- [x] Auto-geração de slug a partir do título (com tratamento de acentos e duplicatas)
- [ ] Sistema de rascunhos automáticos - não implementado (futuro)
- [ ] Preview de posts antes de publicar - não implementado (futuro)
- [ ] Agendamento de publicação (job scheduler) - não implementado (futuro)
- [x] Contador de visualizações - implementado com incremento automático
- [x] Sistema de tags - implementado com array de strings

### 5.6 Testes
- [ ] Testes CRUD completos
- [ ] Testes de validação
- [ ] Testes de upload
- [ ] Testes de busca
- [ ] Testes de permissões

**Entregável**: ✅ CMS completo para blog funcionando - **COMPLETO**

**Implementação**:
- BlogService com CRUD completo e geração de slug ([backend/src/services/blogService.ts](../backend/src/services/blogService.ts))
- BlogController com todos os endpoints públicos e admin ([backend/src/controllers/blogController.ts](../backend/src/controllers/blogController.ts))
- Validadores Zod para todos os endpoints ([backend/src/validators/blogValidators.ts](../backend/src/validators/blogValidators.ts))
- Rotas públicas e admin com rate limiting ([backend/src/routes/blogRoutes.ts](../backend/src/routes/blogRoutes.ts))
- Types definidos ([backend/src/types/blog.types.ts](../backend/src/types/blog.types.ts))
- Geração automática de slug único com normalização de caracteres
- Busca full-text por título, conteúdo e tags
- Contador de visualizações automático em posts públicos
- Estatísticas completas do blog
- Filtros por status, categoria, tag e busca

---

## Fase 6: Gestão de Serviços (Semana 8) ✅ COMPLETA

### 6.1 Models & Database ✅
- [x] Model Service (Prisma schema) - já existia no schema inicial
```prisma
model Service {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  icon        String   // Nome do ícone Lucide
  description String   @db.Text
  benefits    String[] // Array de benefícios
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```
- [x] Migration - schema já estava sincronizado
- [x] Indexes (slug, order, isActive) - configurados no schema

### 6.2 API Endpoints (Público) ✅
- [x] GET `/api/services` - Listar serviços ativos (ordenados por order)
- [x] GET `/api/services/:slug` - Ver serviço por slug (apenas ativos)

### 6.3 API Endpoints (Admin) ✅
- [x] POST `/api/services/admin` - Criar serviço com geração automática de slug
- [x] GET `/api/services/admin/all` - Listar todos os serviços
- [x] GET `/api/services/admin/:id` - Ver serviço por ID
- [x] PUT `/api/services/admin/:id` - Atualizar serviço
- [x] DELETE `/api/services/admin/:id` - Deletar serviço
- [x] PATCH `/api/services/admin/reorder` - Reordenar múltiplos serviços
- [x] PATCH `/api/services/admin/:id/toggle` - Toggle ativo/inativo

### 6.4 Testes
- [ ] Testes CRUD
- [ ] Testes de ordenação
- [ ] Testes de permissões

**Entregável**: ✅ Sistema de gestão de serviços funcionando - **COMPLETO**

**Implementação**:
- ServiceService com CRUD completo e geração de slug ([backend/src/services/serviceService.ts](../backend/src/services/serviceService.ts))
- ServiceController com todos os endpoints públicos e admin ([backend/src/controllers/serviceController.ts](../backend/src/controllers/serviceController.ts))
- Validadores Zod para todos os endpoints ([backend/src/validators/serviceValidators.ts](../backend/src/validators/serviceValidators.ts))
- Rotas públicas e admin ([backend/src/routes/serviceRoutes.ts](../backend/src/routes/serviceRoutes.ts))
- Types definidos ([backend/src/types/service.types.ts](../backend/src/types/service.types.ts))
- Geração automática de slug único com normalização de caracteres
- Sistema de ordenação automática (auto-incremento se não especificado)
- Reordenação em batch de múltiplos serviços
- Toggle ativo/inativo
- Filtro automático de serviços ativos em rotas públicas

---

## Fase 7: Depoimentos (Testimonials) (Semana 9) ✅

### 7.1 Models & Database ✅
- [x] Model Testimonial (Prisma schema) - já existe no schema
```prisma
model Testimonial {
  id          String   @id @default(uuid())
  clientName  String
  clientRole  String?  // Cargo/empresa
  content     String   @db.Text
  rating      Int      @default(5) // 1-5
  avatar      String?  // URL da foto
  isPublished Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```
- [x] Migration - tabela já existe
- [x] Indexes (isPublished, order) - já configurados no schema

### 7.2 API Endpoints (Público) ✅
- [x] GET `/api/testimonials` - Listar depoimentos publicados - funcionando

### 7.3 API Endpoints (Admin) ✅
- [x] POST `/api/admin/testimonials` - Criar - funcionando
- [x] GET `/api/admin/testimonials` - Listar todos - funcionando
- [x] GET `/api/admin/testimonials/:id` - Buscar por ID - funcionando
- [x] PUT `/api/admin/testimonials/:id` - Atualizar - funcionando
- [x] DELETE `/api/admin/testimonials/:id` - Deletar - funcionando
- [x] PATCH `/api/admin/testimonials/:id/toggle-publish` - Publicar/Despublicar - funcionando
- [x] PATCH `/api/admin/testimonials/reorder` - Reordenar depoimentos - funcionando

### 7.4 Testes
- [ ] Testes CRUD básicos
- [ ] Testes de publicação

**Entregável**: ✅ Sistema de depoimentos - **COMPLETO**

**Implementação**:
- TestimonialService com CRUD completo ([backend/src/services/testimonialService.ts](../backend/src/services/testimonialService.ts))
- TestimonialController com todos os endpoints ([backend/src/controllers/testimonialController.ts](../backend/src/controllers/testimonialController.ts))
- Validadores Zod para todos os endpoints ([backend/src/validators/testimonialValidators.ts](../backend/src/validators/testimonialValidators.ts))
- Rotas integradas com autenticação e rate limiting ([backend/src/routes/testimonialRoutes.ts](../backend/src/routes/testimonialRoutes.ts))
- Sistema de ordenação automática
- Toggle de publicação com single endpoint

---

## Fase 8: Analytics e Métricas (Semana 10)

### 8.1 Rastreamento Básico
- [ ] Model Analytics (views, events)
- [ ] Middleware de tracking de requisições
- [ ] Endpoint GET `/api/admin/analytics/overview`
- [ ] Métricas: visualizações de posts, contatos recebidos, inscrições newsletter

### 8.2 Dashboard Admin
- [ ] Estatísticas gerais
- [ ] Posts mais visualizados
- [ ] Gráficos de tendências (últimos 30 dias)

### 8.3 Logs e Monitoramento
- [ ] Configurar logs estruturados
- [ ] Log rotation
- [ ] Error tracking (Sentry opcional)

**Entregável**: Sistema básico de analytics

---

## Fase 9: Otimizações e Cache (Semana 11)

### 9.1 Cache com Redis
- [ ] Cache de posts publicados
- [ ] Cache de listagens (5-15 minutos)
- [ ] Cache de serviços
- [ ] Estratégia de invalidação de cache

### 9.2 Otimizações de Query
- [ ] Revisar queries N+1
- [ ] Adicionar indexes faltantes
- [ ] Implementar paginação cursor-based onde necessário
- [ ] Lazy loading de relações

### 9.3 Performance
- [ ] Compressão de responses (gzip)
- [ ] ETags para recursos estáticos
- [ ] Response time monitoring

**Entregável**: API otimizada e performática

---

## Fase 10: Documentação e Deploy (Semana 12)

### 10.1 Documentação da API
- [ ] Setup Swagger/OpenAPI
- [ ] Documentar todos os endpoints
- [ ] Exemplos de requests/responses
- [ ] Documentação de autenticação
- [ ] Postman Collection

### 10.2 README e Docs
- [ ] README.md completo
- [ ] Guia de instalação local
- [ ] Guia de deploy
- [ ] Variáveis de ambiente documentadas
- [ ] Arquitetura e padrões

### 10.3 Deploy via Easypanel

- [ ] Configurar aplicação no Easypanel
  - [ ] Conectar repositório Git (GitHub/GitLab)
  - [ ] Configurar build a partir do Dockerfile
  - [ ] Definir variáveis de ambiente (DATABASE_URL, JWT_SECRET, etc)
  - [ ] Configurar porta da aplicação (default: 3000)
- [ ] Configurar PostgreSQL no Easypanel
  - [ ] Criar serviço de banco de dados PostgreSQL
  - [ ] Conectar com a aplicação backend
  - [ ] Configurar backups automáticos
- [ ] Configurar Redis no Easypanel
  - [ ] Criar serviço Redis para cache
  - [ ] Conectar com a aplicação backend
- [ ] Configurar domínio e SSL
  - [ ] Adicionar domínio customizado
  - [ ] Easypanel provê SSL automático (Let's Encrypt)
  - [ ] Configurar CORS para domínio de produção
- [ ] Deploy inicial
  - [ ] Push para branch main/master
  - [ ] Easypanel faz build automático via Dockerfile
  - [ ] Verificar logs de deploy
  - [ ] Executar migrations em produção
- [ ] Configurar CI/CD (opcional)
  - [ ] Auto-deploy no push para main (webhook do Git)
  - [ ] Health checks automáticos
- [ ] Monitoramento
  - [ ] Configurar logs persistentes no Easypanel
  - [ ] Configurar alertas de downtime
  - [ ] Monitorar uso de recursos (CPU, memória, disco)

### 10.4 Segurança Final
- [ ] Audit de segurança
- [ ] Penetration testing básico
- [ ] Scan de vulnerabilidades (npm audit)
- [ ] Configuração de CORS production
- [ ] Rate limiting ajustado

**Entregável**: API em produção documentada

---

## Fase 11: Funcionalidades Avançadas (Futuro)

### 11.1 Sistema de Comentários (Opcional)
- [ ] Model Comment para blog posts
- [ ] Moderação de comentários
- [ ] Aprovação admin

### 11.2 Campanhas de Email Marketing
- [ ] Integração com Mailchimp/SendGrid
- [ ] Templates de email
- [ ] Agendamento de envios
- [ ] Tracking de abertura/cliques

### 11.3 Multi-idioma (i18n)
- [ ] Suporte a português e inglês
- [ ] Conteúdo traduzido no banco

### 11.4 SEO Avançado
- [ ] Sitemap.xml dinâmico
- [ ] Robots.txt
- [ ] Meta tags dinâmicas por página
- [ ] Schema.org markup

### 11.5 Webhooks
- [ ] Sistema de webhooks para integrações externas
- [ ] Eventos: novo contato, nova inscrição, novo post

---

## Estrutura de Dados Resumida

### Tabelas Principais

1. **users** - Administradores do sistema
2. **contacts** - Formulários de contato recebidos
3. **newsletter** - Inscritos na newsletter
4. **blog_posts** - Posts do blog
5. **services** - Serviços oferecidos
6. **testimonials** - Depoimentos de clientes
7. **analytics** - Métricas e tracking (opcional)

---

## Endpoints API - Visão Geral

### Públicos (sem autenticação)
```
GET    /health
GET    /api/health

POST   /api/contacts
GET    /api/services
GET    /api/services/:slug
GET    /api/blog/posts
GET    /api/blog/posts/:slug
GET    /api/testimonials
POST   /api/newsletter/subscribe
GET    /api/newsletter/unsubscribe/:token
```

### Admin (requer JWT)
```
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout

GET    /api/admin/contacts
GET    /api/admin/contacts/:id
PATCH  /api/admin/contacts/:id/status
DELETE /api/admin/contacts/:id

GET    /api/admin/newsletter
DELETE /api/admin/newsletter/:id
GET    /api/admin/newsletter/export

CRUD   /api/admin/blog/posts
POST   /api/admin/upload/image

CRUD   /api/admin/services

CRUD   /api/admin/testimonials

GET    /api/admin/analytics/overview
```

---

## Estimativa de Tempo

| Fase | Descrição | Tempo Estimado |
|------|-----------|----------------|
| 1 | Setup e Infraestrutura | 1-2 semanas |
| 2 | Autenticação | 1 semana |
| 3 | Gestão de Contatos | 1 semana |
| 4 | Newsletter | 1 semana |
| 5 | Blog/CMS | 1-2 semanas |
| 6 | Serviços | 1 semana |
| 7 | Depoimentos | 1 semana |
| 8 | Analytics | 1 semana |
| 9 | Otimizações | 1 semana |
| 10 | Deploy | 1 semana |
| **TOTAL** | **MVP Completo** | **10-12 semanas** |

---

## Priorização (MVP vs. Futuro)

### MVP Essencial (8 semanas)
1. Setup + Infraestrutura
2. Autenticação Admin
3. Gestão de Contatos (com email)
4. Newsletter
5. Blog (CRUD básico)
6. Deploy

### Versão 1.0 Completa (12 semanas)
MVP + Serviços + Depoimentos + Analytics + Otimizações

### Futuro (Pós-lançamento)
- Comentários
- Email marketing
- Multi-idioma
- Webhooks

---

## Considerações Finais

### Boas Práticas a Seguir
- ✅ Sempre usar TypeScript com tipagem forte
- ✅ Validação de todos os inputs
- ✅ Sanitização contra XSS/SQL Injection
- ✅ Rate limiting em todos os endpoints públicos
- ✅ Logs estruturados para debugging
- ✅ Testes automatizados (cobertura > 70%)
- ✅ Documentação inline (JSDoc)
- ✅ Commits semânticos
- ✅ Code review antes de merge

### Segurança
- 🔒 HTTPS obrigatório em produção
- 🔒 Secrets em variáveis de ambiente
- 🔒 Validação e sanitização de inputs
- 🔒 Rate limiting agressivo
- 🔒 CORS configurado corretamente
- 🔒 Headers de segurança (helmet)
- 🔒 Audit regular de dependências

### Escalabilidade
- 📈 Cache estratégico com Redis
- 📈 Database indexes otimizados
- 📈 Background jobs para tarefas pesadas
- 📈 CDN para assets estáticos
- 📈 Load balancing (produção)
- 📈 Monitoramento e alertas

---

## Configuração Específica para Easypanel

### Dockerfile Multi-Stage (Produção)

O Dockerfile deve ser otimizado para produção com multi-stage build:

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm ci --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["npm", "start"]
```

### Variáveis de Ambiente no Easypanel

Configure estas variáveis no painel do Easypanel:

```env
# Application
NODE_ENV=production
PORT=3000

# Database (Easypanel PostgreSQL service)
DATABASE_URL=postgresql://user:password@postgres-service:5432/dbname

# Redis (Easypanel Redis service)
REDIS_URL=redis://redis-service:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# CORS
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Email (SendGrid/Nodemailer)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@yourdomain.com

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=/app/uploads

# Optional: External Storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
S3_BUCKET=your-bucket-name
```

### Estrutura de Serviços no Easypanel

No Easypanel, você terá 3 serviços conectados:

1. **Backend API** (Node.js via Dockerfile)
   - Build: Dockerfile
   - Port: 3000
   - Domain: api.yourdomain.com

2. **PostgreSQL**
   - Serviço gerenciado Easypanel
   - Versão: 15 ou superior
   - Persistent volume para dados

3. **Redis**
   - Serviço gerenciado Easypanel
   - Versão: 7 ou superior
   - Para cache e sessões

### Script de Migrations em Produção

Adicione ao `package.json`:

```json
{
  "scripts": {
    "start": "node dist/app.js",
    "build": "tsc",
    "dev": "ts-node-dev --respawn --transpile-only src/app.ts",
    "migrate:deploy": "prisma migrate deploy",
    "migrate:dev": "prisma migrate dev",
    "postinstall": "prisma generate"
  }
}
```

No Easypanel, configure um **one-off command** para rodar migrations:

```bash
npm run migrate:deploy
```

### Checklist de Deploy no Easypanel

- [ ] VPS com Easypanel instalado e rodando
- [ ] Repositório Git (GitHub/GitLab) configurado
- [ ] Dockerfile na raiz do projeto backend
- [ ] `.dockerignore` configurado (node_modules, .env, etc)
- [ ] Criar aplicação no Easypanel
- [ ] Adicionar serviço PostgreSQL
- [ ] Adicionar serviço Redis
- [ ] Adicionar serviço Node.js (build via Dockerfile)
- [ ] Configurar todas as variáveis de ambiente
- [ ] Conectar serviços via network interna do Easypanel
- [ ] Configurar domínio customizado
- [ ] SSL automático ativado (Let's Encrypt)
- [ ] Rodar migrations na primeira vez
- [ ] Verificar health check (`/health`)
- [ ] Testar endpoints da API
- [ ] Configurar auto-deploy no push (webhook Git)
- [ ] Configurar logs e monitoring
- [ ] Setup de backups do PostgreSQL

### Vantagens do Easypanel

- Interface web intuitiva para gerenciar containers
- SSL automático com Let's Encrypt
- Deploy via Git push (CI/CD integrado)
- Logs centralizados
- Monitoring de recursos
- Backup automático de databases
- Network interna entre serviços
- Mais simples que configurar Docker manualmente na VPS
- Zero-downtime deployments

---

## Próximos Passos

1. **Revisar e aprovar este roadmap**
2. **Configurar repositório Git**
3. **Garantir Easypanel instalado na VPS**
4. **Definir ambiente de desenvolvimento local**
5. **Iniciar Fase 1: Setup**
6. **Configurar projeto management (Trello/Jira/GitHub Projects)**

---

**Documento criado em**: 2025-11-06
**Versão**: 1.1
**Última atualização**: 2025-11-06
**Deploy**: VPS via Easypanel + Dockerfile
