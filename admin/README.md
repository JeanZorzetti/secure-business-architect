# Secure Business Architect - Painel Administrativo

Painel administrativo completo para gestão de leads, contatos, newsletter, blog e conteúdo institucional da JB Advocacia.

## Stack Tecnológico

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **UI Library**: shadcn/ui + Radix UI
- **State Management**:
  - TanStack Query (server state)
  - Zustand (auth state)
- **Forms**: React Hook Form + Zod
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner (toast)

## Requisitos

- Node.js >= 20.x
- npm ou yarn
- Backend API rodando (ver `/backend`)

## Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/JeanZorzetti/secure-business-architect.git
cd secure-business-architect/admin
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env`:
```env
# API Configuration
VITE_API_URL=http://localhost:3000/api

# App Info
VITE_APP_NAME=JB Advocacia Admin
VITE_APP_VERSION=1.0.0

# Environment
VITE_APP_ENV=development
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O painel estará rodando em `http://localhost:5173`

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento com hot-reload
- `npm run build` - Compila TypeScript e builda para produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## Estrutura do Projeto

```
admin/
├── public/                    # Assets estáticos
├── src/
│   ├── api/                   # API clients
│   │   ├── analytics.ts       # Analytics API
│   │   ├── auth.ts           # Autenticação
│   │   ├── blog.ts           # Blog/Posts
│   │   ├── contacts.ts       # Contatos
│   │   ├── newsletter.ts     # Newsletter
│   │   ├── services.ts       # Serviços
│   │   └── testimonials.ts   # Depoimentos
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── dashboard/        # Dashboard widgets
│   │   │   ├── StatCard.tsx
│   │   │   └── RecentContacts.tsx
│   │   └── PrivateRoute.tsx  # Route guard
│   ├── pages/
│   │   ├── auth/
│   │   │   └── Login.tsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx
│   │   ├── contacts/
│   │   │   ├── ContactsList.tsx
│   │   │   └── ContactDetail.tsx
│   │   ├── newsletter/
│   │   │   └── NewsletterList.tsx
│   │   ├── blog/
│   │   │   ├── BlogList.tsx
│   │   │   └── BlogEditor.tsx
│   │   ├── services/
│   │   │   └── ServicesList.tsx
│   │   ├── testimonials/
│   │   │   └── TestimonialsList.tsx
│   │   └── NotFound.tsx
│   ├── lib/
│   │   ├── api.ts            # Axios instance
│   │   └── utils.ts          # Utility functions
│   ├── stores/
│   │   └── authStore.ts      # Zustand auth store
│   ├── types/                # TypeScript types
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Funcionalidades Implementadas

### ✅ Dashboard Completo

- **Analytics Overview**: 8 KPIs principais
  - Total de visualizações (blog)
  - Total de contatos
  - Inscritos newsletter
  - Posts publicados
  - Métricas mensais (4 mini cards)
- **Seção de Contatos**
  - Total, pendentes, lidos, arquivados
  - Lista de contatos recentes (últimos 5)
  - Quick actions
- **Seção de Newsletter**
  - Total de inscritos, ativos, cancelados
  - Novos este mês
- **Seção de Blog**
  - Total de posts, publicados, rascunhos
  - Novos este mês
- Welcome message personalizado
- Loading states e error handling

### ✅ Autenticação

- Login com email e senha
- Validação com Zod
- JWT com refresh token automático
- Persistência de sessão (localStorage)
- Logout automático em 401
- Protected routes (PrivateRoute)
- Header com informações do usuário

### ✅ Gestão de Contatos

- **Listagem**:
  - Tabela completa com paginação
  - Filtros por status (pending, read, archived)
  - Busca por nome/email/empresa
  - Status badges coloridos
- **Detalhes**:
  - Visualizar todas as informações
  - Visualizar mensagem completa
  - Mudar status
  - Deletar com confirmação
- **Ações**:
  - Email (mailto:)
  - Telefone (tel:)
  - Timestamps com formatação relativa

### ✅ Newsletter Management

- **Listagem**:
  - Tabela de inscritos
  - Filtros por status (active, unsubscribed)
  - Busca por email
  - Paginação
- **Ações**:
  - Exportar lista completa (CSV)
  - Remover inscrito (com confirmação)
- **Estatísticas**:
  - Total, ativos, cancelados
  - Novos no mês (Dashboard)

### ✅ Blog CMS

- **Listagem de Posts**:
  - Tabela completa
  - Filtros: todos, publicados, drafts
  - Busca por título
  - Colunas: título, autor, categoria, status, data, views
  - Dropdown menu com ações
- **Editor de Posts**:
  - Criar/editar posts
  - Campos: título, excerpt, conteúdo (Markdown), cover image, autor
  - Seletor de categoria (criar nova inline)
  - Input de tags (separado por vírgula)
  - Validação de campos obrigatórios
- **Ações**:
  - Publicar/despublicar posts
  - Deletar posts (com confirmação)
  - Slug gerado automaticamente
- **Estatísticas**:
  - Total de posts, publicados, drafts
  - Novos no mês (Dashboard)

### ✅ Gestão de Serviços

- **Listagem**:
  - Cards em grid responsivo
  - Preview completo (título, descrição, benefícios)
  - Status badge (Ativo/Inativo)
- **CRUD**:
  - Criar/editar serviços (Dialog modal)
  - Campos: título, ícone (Lucide), descrição, benefícios
  - Lista de benefícios editável (add/remove)
  - Toggle ativo/inativo
  - Deletar (com confirmação)
- **Recursos**:
  - Slug gerado automaticamente
  - Validação de campos obrigatórios
  - Loading states e error handling

### ✅ Gestão de Depoimentos

- **Listagem**:
  - Grid de cards responsivo (1-2-3 colunas)
  - Preview completo de cada depoimento
  - Avatar com fallback para inicial do nome
  - Rating visual com estrelas
- **CRUD**:
  - Criar/editar depoimentos (Dialog modal)
  - Campos: nome, cargo, conteúdo, rating (1-5), avatar
  - Rating com preview visual de estrelas
  - Contador de caracteres
  - Validação de campos obrigatórios
- **Ações**:
  - Publicar/despublicar (toggle individual)
  - Editar
  - Deletar (com confirmação)
  - Status badge (Publicado/Não Publicado)
- **Recursos**:
  - Ordenação automática
  - Empty state com call-to-action
  - Line clamp para conteúdo longo

### ✅ UX/UI Avançado

- **Loading States**:
  - Skeletons animados (pulse) em todas as páginas
  - Loading para queries e mutations
- **Empty States**:
  - Mensagens apropriadas para listas vazias
  - Call-to-action quando aplicável
- **Confirmações**:
  - AlertDialog antes de deletar qualquer recurso
  - Mensagens claras e descritivas
- **Notificações**:
  - Toast (Sonner) para feedback de ações
  - Success, error e info messages
- **Responsividade**:
  - 100% responsivo (mobile, tablet, desktop)
  - Grid responsivo (1-2-3-4 colunas)
  - Breakpoints: sm, md, lg, xl
  - Menu mobile (sidebar colapsável)
  - Scroll horizontal em tabelas (mobile)

### ✅ Performance

- **TanStack Query**:
  - Cache inteligente de 5 minutos
  - Invalidação automática após mutations
  - refetchOnWindowFocus: false
  - Background refetching
- **Code Splitting**:
  - Vite faz automaticamente
  - Lazy loading de rotas (futuro)

## Páginas do Admin

### Públicas

- `/login` - Página de autenticação

### Protegidas (requerem autenticação)

- `/` - Dashboard principal
- `/contacts` - Lista de contatos
- `/contacts/:id` - Detalhes do contato
- `/newsletter` - Lista de inscritos
- `/blog` - Lista de posts
- `/blog/new` - Criar novo post
- `/blog/:id` - Editar post
- `/services` - Gestão de serviços
- `/testimonials` - Gestão de depoimentos

## Integração com Backend

O painel consome a API REST do backend. Ver documentação completa em `/backend/README.md`.

### Endpoints Principais

**Auth**:

- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Usuário logado

**Contacts**:

- `GET /api/contacts` - Listar contatos
- `GET /api/contacts/:id` - Buscar contato
- `PATCH /api/contacts/:id/status` - Atualizar status
- `DELETE /api/contacts/:id` - Deletar contato
- `GET /api/contacts/stats` - Estatísticas

**Newsletter**:

- `GET /api/newsletter` - Listar inscritos
- `DELETE /api/newsletter/:id` - Remover inscrito
- `GET /api/newsletter/stats` - Estatísticas
- `GET /api/newsletter/export` - Exportar CSV

**Blog**:

- `GET /api/blog/admin/posts` - Listar posts
- `GET /api/blog/admin/posts/:id` - Buscar post
- `POST /api/blog/admin/posts` - Criar post
- `PUT /api/blog/admin/posts/:id` - Atualizar post
- `DELETE /api/blog/admin/posts/:id` - Deletar post
- `PATCH /api/blog/admin/posts/:id/publish` - Publicar
- `PATCH /api/blog/admin/posts/:id/unpublish` - Despublicar
- `GET /api/blog/admin/stats` - Estatísticas
- `GET /api/blog/categories` - Listar categorias

**Services**:

- `GET /api/services/admin/all` - Listar serviços
- `GET /api/services/admin/:id` - Buscar serviço
- `POST /api/services/admin` - Criar serviço
- `PUT /api/services/admin/:id` - Atualizar serviço
- `DELETE /api/services/admin/:id` - Deletar serviço
- `PATCH /api/services/admin/:id/toggle` - Toggle ativo/inativo
- `PATCH /api/services/admin/reorder` - Reordenar

**Testimonials**:

- `GET /api/admin/testimonials` - Listar depoimentos
- `GET /api/admin/testimonials/:id` - Buscar depoimento
- `POST /api/admin/testimonials` - Criar depoimento
- `PUT /api/admin/testimonials/:id` - Atualizar depoimento
- `DELETE /api/admin/testimonials/:id` - Deletar depoimento
- `PATCH /api/admin/testimonials/:id/toggle-publish` - Publicar/despublicar
- `PATCH /api/admin/testimonials/reorder` - Reordenar

**Analytics**:

- `GET /api/admin/analytics/overview` - Visão geral
- `GET /api/admin/analytics/top-posts` - Posts mais visualizados
- `GET /api/admin/analytics/contacts-trend` - Tendência de contatos
- `GET /api/admin/analytics/blog-views-trend` - Tendência de views

## Deploy

### Easypanel (Recomendado)

1. Crie uma aplicação Static Site no Easypanel
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente:

```env
VITE_API_URL=https://backjennifer.roilabs.com.br/api
VITE_APP_NAME=JB Advocacia Admin
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=production
```

4. Configure build:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy automático via Git push

### Vercel

1. Importe o projeto no Vercel
2. Configure root directory: `admin`
3. Configure variáveis de ambiente
4. Build command: `npm run build`
5. Output directory: `dist`
6. Framework preset: Vite

### Netlify

1. Conecte repositório GitHub
2. Base directory: `admin`
3. Build command: `npm run build`
4. Publish directory: `admin/dist`
5. Configure variáveis de ambiente

### Docker

```bash
# Build
docker build -t admin-panel .

# Run
docker run -p 5173:5173 admin-panel
```

## Variáveis de Ambiente

### Desenvolvimento

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=JB Advocacia Admin
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
```

### Produção

```env
VITE_API_URL=https://backjennifer.roilabs.com.br/api
VITE_APP_NAME=JB Advocacia Admin
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=production
```

## Segurança

### Implementado:

- ✅ JWT Authentication com refresh automático
- ✅ Protected routes (PrivateRoute component)
- ✅ HttpOnly cookies (backend)
- ✅ Auto logout em 401 Unauthorized
- ✅ Validação de formulários (Zod)
- ✅ XSS protection (React escape automático)
- ✅ CSRF protection (backend)
- ✅ Sanitização de inputs

### Recomendações para Produção:

- Usar HTTPS obrigatório
- Configurar CSP (Content Security Policy)
- Rate limiting no backend
- Monitorar logs de acesso
- Implementar 2FA (futuro)
- Audit logs de ações admin

## Troubleshooting

### Erro de conexão com API

```
Error: Network Error
```

Verifique se o backend está rodando e se `VITE_API_URL` está correto.

### Erro 401 Unauthorized

```
{ "error": "Token inválido ou expirado" }
```

Faça logout e login novamente. O refresh token pode ter expirado (30 dias).

### Build falha

```
Error: Cannot find module
```

Execute `npm install` novamente e verifique se todas as dependências estão instaladas.

### Vite não encontra variáveis de ambiente

Variáveis de ambiente no Vite **DEVEM** começar com `VITE_`. Exemplo:

```env
# ✅ Correto
VITE_API_URL=http://localhost:3000/api

# ❌ Errado
API_URL=http://localhost:3000/api
```

## Roadmap

Ver roadmap completo em `/roadmaps/roadmap_admin.md`.

### Implementado (7 de 12 fases - 58%)

- ✅ Fase 1: Setup Admin Frontend
- ✅ Fase 2: Autenticação Admin
- ✅ Fase 3: Dashboard & Analytics
- ✅ Fase 5: Gestão de Contatos
- ✅ Fase 6: Newsletter Management
- ✅ Fase 7: Blog CMS
- ✅ Fase 8: Gestão de Serviços
- ✅ Fase 9: Gestão de Depoimentos
- ✅ Fase 11: Melhorias e Otimizações (parcial)

### Pausado

- ⏸️ Fase 4: CRM - Gestão de Leads (requer extensão do backend)
- ⏸️ Fase 10: Configurações e Usuários (requer novos endpoints)

### Pendente

- ⏳ Fase 12: Deploy e Documentação (parcial - falta deploy final)

## Próximas Funcionalidades (Futuro)

### CRM de Leads

- Pipeline visual (Kanban)
- Gestão de status de leads
- Timeline de interações
- Notas e comentários
- Follow-up e lembretes
- Conversão de contato para lead

### Rich Text Editor

- Substituir textarea por Tiptap/Lexical
- Editor WYSIWYG completo
- Upload de imagens inline
- Preview de posts

### Configurações

- Gestão de usuários admin
- Perfil do usuário
- Configurações do site
- SEO settings

### Analytics Avançado

- Gráficos de tendência (linha/área)
- Posts mais visualizados
- Funil de conversão
- Filtros por período
- Exportar relatórios (PDF/CSV)

### Drag & Drop

- Reordenar serviços
- Reordenar depoimentos
- Reordenar posts no blog

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
