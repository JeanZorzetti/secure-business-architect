# 🔌 Integração Frontend ↔ Backend - Blog System

**Projeto:** JB Advocacia - Blog CMS Integration
**Data:** 12 de novembro de 2025
**Status:** ✅ Implementado e Pronto

---

## 🎯 Visão Geral

O backend já possui um sistema CMS completo para blog implementado com Prisma + PostgreSQL. Esta documentação descreve como o frontend se integra com esse sistema.

---

## 🏗️ Arquitetura Backend (Existente)

### **Stack Tecnológico**
- **Framework:** Express.js + TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Base URL:** `https://backjennifer.roilabs.com.br/api`

### **Models Prisma**

```prisma
model BlogPost {
  id             String     @id @default(uuid())
  title          String
  slug           String     @unique
  excerpt        String
  content        String     @db.Text
  coverImage     String?
  author         String
  category       String
  categoryId     String?
  tags           String[]
  status         PostStatus @default(DRAFT)
  publishedAt    DateTime?
  scheduledFor   DateTime?
  viewCount      Int        @default(0)
  isAutoDraft    Boolean    @default(false)
  autoDraftData  Json?
  lastAutoSaveAt DateTime?
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt

  blogCategory BlogCategory? @relation(fields: [categoryId], references: [id])
  comments     Comment[]
}

model BlogCategory {
  id          String   @id @default(uuid())
  name        String   @unique
  slug        String   @unique
  description String?  @db.Text
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  posts BlogPost[]
}

enum PostStatus {
  DRAFT
  PUBLISHED
}
```

---

## 📡 API Endpoints Disponíveis

### **Rotas Públicas** (Sem autenticação)

#### `GET /api/blog/posts`
Lista posts publicados com paginação e filtros.

**Query Params:**
- `status` - Filter by status (opcional)
- `category` - Filter by category slug (opcional)
- `tag` - Filter by tag (opcional)
- `search` - Search query (opcional)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response:**
```typescript
{
  posts: BlogPost[],
  total: number,
  page: number,
  limit: number,
  totalPages: number
}
```

**Exemplo:**
```bash
GET /api/blog/posts?category=contratos&page=1&limit=12
```

---

#### `GET /api/blog/posts/search`
Busca posts por texto.

**Query Params:**
- `q` - Search query (obrigatório)
- `category` - Filter by category (opcional)
- `tag` - Filter by tag (opcional)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response:** Igual ao endpoint de listagem

**Exemplo:**
```bash
GET /api/blog/posts/search?q=contrato&category=societario
```

---

#### `GET /api/blog/posts/:slug`
Retorna um post específico por slug.

**Response:**
```typescript
{
  id: string,
  title: string,
  slug: string,
  excerpt: string,
  content: string,
  coverImage: string | null,
  author: string,
  category: string,
  tags: string[],
  status: 'DRAFT' | 'PUBLISHED',
  publishedAt: string | null,
  viewCount: number,
  createdAt: string,
  updatedAt: string
}
```

**Exemplo:**
```bash
GET /api/blog/posts/gestao-contratos-lucratividade
```

---

#### `GET /api/blog/categories`
Lista todas as categorias ativas.

**Response:**
```typescript
[
  {
    id: string,
    name: string,
    slug: string,
    description: string | null,
    order: number,
    isActive: boolean
  }
]
```

**Exemplo:**
```bash
GET /api/blog/categories
```

---

### **Rotas Admin** (Requerem autenticação)

#### `POST /api/admin/blog/posts`
Criar novo post (requer token JWT).

#### `GET /api/admin/blog/posts`
Listar todos os posts (incluindo drafts).

#### `PUT /api/admin/blog/posts/:id`
Atualizar post.

#### `PATCH /api/admin/blog/posts/:id/publish`
Publicar post.

#### `DELETE /api/admin/blog/posts/:id`
Deletar post.

---

## 🎨 Implementação Frontend

### **Arquivos Criados**

1. **`frontend/src/services/api.ts`**
   - Instância configurada do axios
   - Interceptors para logging e error handling
   - Base URL: `https://backjennifer.roilabs.com.br/api`

2. **`frontend/src/services/blogService.ts`**
   - Service layer para todas as operações de blog
   - Métodos: `getPosts`, `searchPosts`, `getPostBySlug`, `getCategories`, `incrementViews`
   - Type-safe com interfaces TypeScript

3. **`frontend/src/pages/ContentAPI.tsx`**
   - Página de listagem de posts integrada com API
   - Usa React Query para cache e loading states
   - Search em tempo real
   - Filtros por categoria
   - Paginação funcional
   - Fallback para erro de conexão

4. **`frontend/src/pages/BlogPostAPI.tsx`**
   - Página de post individual integrada com API
   - Loading e error states
   - Tracking de views via analytics
   - Social sharing
   - SEO otimizado com meta tags dinâmicas

---

## 🔄 Como Alternar Entre Mock e API Real

### **Opção 1: Substituir Diretamente**

Edite `frontend/src/App.tsx`:

```typescript
// Versão com API real
const Content = lazy(() => import("./pages/ContentAPI"));
const BlogPost = lazy(() => import("./pages/BlogPostAPI"));

// Versão com dados mock (atual)
// const Content = lazy(() => import("./pages/Content"));
// const BlogPost = lazy(() => import("./pages/BlogPost"));
```

### **Opção 2: Environment Variable**

Crie lógica condicional baseada em env:

```typescript
// frontend/src/App.tsx
const useRealAPI = import.meta.env.VITE_USE_REAL_API === 'true';

const Content = lazy(() =>
  useRealAPI
    ? import("./pages/ContentAPI")
    : import("./pages/Content")
);

const BlogPost = lazy(() =>
  useRealAPI
    ? import("./pages/BlogPostAPI")
    : import("./pages/BlogPost")
);
```

Então no `.env`:
```bash
VITE_USE_REAL_API=true
VITE_API_URL=https://backjennifer.roilabs.com.br/api
```

---

## 🔧 Configuração

### **1. Instalar Dependências**

```bash
cd frontend
npm install axios
# TanStack Query já está instalado
```

### **2. Configurar Environment Variables**

Crie `frontend/.env`:

```bash
# API Configuration
VITE_API_URL=https://backjennifer.roilabs.com.br/api

# Development (descomente para backend local)
# VITE_API_URL=http://localhost:3333/api
```

### **3. Ativar API no App**

Edite `frontend/src/App.tsx` conforme descrito acima.

---

## 🧪 Testando a Integração

### **1. Verificar Backend**

```bash
# Testar se backend está online
curl https://backjennifer.roilabs.com.br/api/blog/posts

# Deve retornar JSON com posts
```

### **2. Testar no Frontend**

```bash
cd frontend
npm run dev
```

Acesse: `http://localhost:5173/conteudo`

**O que deve acontecer:**
- ✅ Posts carregam da API
- ✅ Search funciona
- ✅ Filtros por categoria funcionam
- ✅ Paginação funciona
- ✅ Clicar em post carrega conteúdo da API

### **3. Debugging**

Abra o DevTools > Network tab para ver as requisições:

```
GET /api/blog/posts?page=1&limit=12
GET /api/blog/categories
GET /api/blog/posts/gestao-contratos-lucratividade
```

---

## 📊 Comparação Mock vs API

| Feature | Mock (Content.tsx) | API (ContentAPI.tsx) |
|---------|-------------------|---------------------|
| **Dados** | Hardcoded (11 posts) | Dinâmico do PostgreSQL |
| **Search** | Client-side | Server-side |
| **Filtros** | Client-side | Server-side |
| **Paginação** | Client-side | Server-side |
| **Performance** | Instant | Network latency (~200ms) |
| **Cache** | Nenhum | React Query (5 min) |
| **Offline** | Funciona | Requer conexão |
| **Escalabilidade** | Limitado a 11 posts | Ilimitado |

---

## 🚀 Migration Path (Migrar de Mock para API)

### **Fase 1: Preparação** ✅ COMPLETO
- [x] Backend já existe e está funcionando
- [x] API service criado (`blogService.ts`)
- [x] Componentes API criados (`ContentAPI.tsx`, `BlogPostAPI.tsx`)
- [x] Types definidos

### **Fase 2: Dados** (Próximo passo)
- [ ] Popular database com os 11 posts mock
- [ ] Criar categorias no backend
- [ ] Verificar slugs e URLs

### **Fase 3: Ativação**
- [ ] Atualizar App.tsx para usar versões API
- [ ] Testar todas as funcionalidades
- [ ] Verificar SEO (meta tags, slugs)
- [ ] Validar performance

### **Fase 4: Limpeza**
- [ ] Remover Content.tsx e BlogPost.tsx antigos
- [ ] Renomear ContentAPI → Content
- [ ] Renomear BlogPostAPI → BlogPost
- [ ] Atualizar documentação

---

## 📝 Script de Seed (Popular Database)

Para adicionar os 11 posts mock no backend, crie um seed script:

```typescript
// backend/prisma/seedBlogPosts.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const posts = [
  {
    title: "Por que a gestão de contratos é crucial para a lucratividade da sua empresa?",
    slug: "gestao-contratos-lucratividade",
    excerpt: "Um contrato bem gerenciado pode ser a diferença entre o sucesso e o fracasso...",
    content: "# Por que a gestão de contratos é crucial...",
    author: "Jennifer Barreto",
    category: "Contratos",
    tags: ["gestão", "contratos", "lucratividade", "compliance"],
    status: "PUBLISHED",
    publishedAt: new Date("2024-03-15"),
  },
  // ... adicionar os outros 10 posts
];

async function main() {
  console.log('Seeding blog posts...');

  for (const post of posts) {
    await prisma.blogPost.create({ data: post });
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Executar:
```bash
cd backend
npx tsx prisma/seedBlogPosts.ts
```

---

## 🔐 Considerações de Segurança

### **CORS**
O backend deve ter CORS configurado para aceitar requests do frontend:

```typescript
// backend/src/app.ts
app.use(cors({
  origin: [
    'https://jbadvocacia.roilabs.com.br',
    'http://localhost:5173', // desenvolvimento
  ],
  credentials: true,
}));
```

### **Rate Limiting**
Backend já tem rate limiting para rotas públicas:

```typescript
// backend/src/middlewares/rateLimiter.ts
export const publicBlogLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
```

### **XSS Protection**
Sanitizar HTML do conteúdo antes de renderizar:

```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

```typescript
import DOMPurify from 'dompurify';

// No BlogPostAPI.tsx
<div
  dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(post.content)
  }}
/>
```

---

## 📈 Performance Tips

### **1. React Query Cache**
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});
```

### **2. Prefetch Categories**
```typescript
// Prefetch categories no Layout
useEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['blog-categories'],
    queryFn: blogService.getCategories,
  });
}, []);
```

### **3. Debounce Search**
```typescript
import { useDebouncedValue } from '@/hooks/useDebounce';

const debouncedSearch = useDebouncedValue(searchQuery, 500);

useQuery({
  queryKey: ['posts', debouncedSearch],
  // ...
});
```

---

## ✅ Checklist de Ativação

Antes de ativar a API em produção:

- [ ] Backend está online e respondendo
- [ ] Database está populada com posts
- [ ] Categorias criadas e slugs corretos
- [ ] CORS configurado para domínio do frontend
- [ ] Environment variables configuradas
- [ ] SSL/HTTPS funcionando
- [ ] Rate limiting ativo
- [ ] Testes de carga realizados
- [ ] Monitoramento configurado (Sentry, etc.)
- [ ] Backup database configurado

---

## 🐛 Troubleshooting

### **Erro: Network Error**
- Verificar se backend está online: `curl https://backjennifer.roilabs.com.br/api/blog/posts`
- Verificar CORS no backend
- Verificar HTTPS/SSL

### **Erro: 404 Not Found**
- Verificar se rotas estão registradas no `app.ts`
- Verificar slugs dos posts

### **Erro: Posts não aparecem**
- Verificar se status é `PUBLISHED`
- Verificar se `publishedAt` está definido
- Ver console do navegador para erros

### **Performance lenta**
- Implementar cache no backend
- Adicionar índices no Prisma
- Usar CDN para imagens
- Implementar pagination

---

## 📚 Recursos Úteis

- [Prisma Docs](https://www.prisma.io/docs)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Axios Docs](https://axios-http.com/docs/intro)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

---

## 🎉 Conclusão

A integração está **implementada e pronta para ativação**. Todos os componentes necessários foram criados:

✅ API service (`blogService.ts`)
✅ Páginas integradas (`ContentAPI.tsx`, `BlogPostAPI.tsx`)
✅ Types e interfaces
✅ Error handling e loading states
✅ Environment configuration

**Próximo passo:** Popular o database com posts e ativar no `App.tsx`.

---

**Mantido por:** Claude Code
**Última atualização:** 12/11/2025
**Status:** ✅ Ready for Activation
