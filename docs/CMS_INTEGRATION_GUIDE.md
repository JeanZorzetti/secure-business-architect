# 📘 Guia de Integração com CMS

**Projeto:** JB Advocacia - Blog System Integration
**Data:** 12 de novembro de 2025
**Status:** Ready for CMS Integration

---

## 🎯 Objetivo

Este documento fornece um guia completo para integração do blog system atual com um CMS (Content Management System) como Strapi, Contentful, ou alternativa similar.

---

## 📊 Estado Atual

### **Implementação Atual (Mock Data)**

O blog está atualmente implementado com dados mock hardcoded no componente:
- **Arquivo:** `frontend/src/pages/Content.tsx`
- **11 posts** pré-cadastrados com estrutura completa
- **Search functionality** implementada
- **Filtros por categoria** funcionais
- **Paginação** preparada para implementação

### **Estrutura de Dados Atual**

```typescript
interface BlogPost {
  title: string;
  excerpt: string;
  date: string;           // Display format: "15 de Março, 2024"
  dateSort: string;       // Sort format: "2024-03-15"
  slug: string;           // URL-friendly identifier
  category: string;       // Contratos | Societário | M&A | etc.
  tags: string[];         // Array de tags
}
```

### **Categorias Implementadas**

1. Contratos
2. Societário
3. Agronegócio
4. M&A
5. Negociação
6. Trabalhista
7. Compliance

---

## 🚀 Opções de CMS Recomendadas

### **1. Strapi (Recomendado)**

**Vantagens:**
- Open-source e self-hosted
- API REST e GraphQL nativos
- Customização total dos content types
- Interface admin moderna
- Suporte a TypeScript
- Media library integrada

**Instalação:**
```bash
npx create-strapi-app@latest backend-cms --quickstart
```

**Custo:** Free (self-hosted)

---

### **2. Contentful**

**Vantagens:**
- Hosted solution (sem infraestrutura)
- CDN global integrado
- Preview mode para conteúdo
- Webhooks para deploy automático
- Excelente performance

**Custo:**
- Free tier: até 25.000 records
- Paid plans a partir de $300/mês

---

### **3. Sanity.io**

**Vantagens:**
- Real-time collaboration
- Portable Text (rich text)
- Customização extrema
- Excelente DX (developer experience)

**Custo:**
- Free tier generoso
- Paid plans a partir de $99/mês

---

## 📋 Schema Recomendado para o CMS

### **Content Type: BlogPost**

```typescript
{
  // Core Fields
  title: {
    type: 'string',
    required: true,
    maxLength: 200,
  },
  slug: {
    type: 'string',
    required: true,
    unique: true,
    // Auto-generate from title
  },
  excerpt: {
    type: 'text',
    required: true,
    maxLength: 300,
  },
  content: {
    type: 'richtext', // Markdown or Rich Text
    required: true,
  },

  // Metadata
  category: {
    type: 'relation',
    relation: 'manyToOne',
    target: 'category',
  },
  tags: {
    type: 'relation',
    relation: 'manyToMany',
    target: 'tag',
  },

  // Media
  featuredImage: {
    type: 'media',
    required: false,
    allowedTypes: ['images'],
  },

  // SEO
  metaTitle: {
    type: 'string',
    maxLength: 60,
  },
  metaDescription: {
    type: 'text',
    maxLength: 160,
  },
  keywords: {
    type: 'json', // Array of strings
  },

  // Publishing
  publishedAt: {
    type: 'datetime',
    required: true,
  },
  status: {
    type: 'enumeration',
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },

  // Author
  author: {
    type: 'relation',
    relation: 'manyToOne',
    target: 'author',
  },

  // Analytics
  readingTime: {
    type: 'integer', // Em minutos
    computed: true, // Auto-calculate from content
  },
  views: {
    type: 'integer',
    default: 0,
  },
}
```

### **Content Type: Category**

```typescript
{
  name: {
    type: 'string',
    required: true,
    unique: true,
  },
  slug: {
    type: 'string',
    required: true,
    unique: true,
  },
  description: {
    type: 'text',
  },
  color: {
    type: 'string', // Hex color for UI
    default: '#B8860B',
  },
}
```

### **Content Type: Tag**

```typescript
{
  name: {
    type: 'string',
    required: true,
    unique: true,
  },
  slug: {
    type: 'string',
    required: true,
    unique: true,
  },
}
```

### **Content Type: Author**

```typescript
{
  name: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'email',
    required: true,
    unique: true,
  },
  bio: {
    type: 'text',
  },
  avatar: {
    type: 'media',
    allowedTypes: ['images'],
  },
  socialLinks: {
    type: 'json',
  },
}
```

---

## 🔧 Implementação Frontend

### **1. Instalar Dependências**

```bash
cd frontend
npm install @tanstack/react-query axios
```

### **2. Criar API Service**

**Arquivo:** `frontend/src/services/blogApi.ts`

```typescript
import axios from 'axios';

const API_URL = import.meta.env.VITE_CMS_API_URL || 'http://localhost:1337/api';

export interface BlogPost {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    publishedAt: string;
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    tags: {
      data: Array<{
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
    featuredImage?: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
  };
}

export const blogApi = {
  // Get all posts
  getPosts: async (params?: {
    page?: number;
    pageSize?: number;
    category?: string;
    search?: string;
  }) => {
    const response = await axios.get<{ data: BlogPost[] }>(`${API_URL}/posts`, {
      params: {
        populate: ['category', 'tags', 'featuredImage'],
        pagination: {
          page: params?.page || 1,
          pageSize: params?.pageSize || 12,
        },
        filters: {
          ...(params?.category && {
            category: { slug: { $eq: params.category } },
          }),
          ...(params?.search && {
            $or: [
              { title: { $containsi: params.search } },
              { excerpt: { $containsi: params.search } },
              { content: { $containsi: params.search } },
            ],
          }),
        },
        sort: ['publishedAt:desc'],
      },
    });
    return response.data;
  },

  // Get single post by slug
  getPostBySlug: async (slug: string) => {
    const response = await axios.get<{ data: BlogPost[] }>(`${API_URL}/posts`, {
      params: {
        populate: ['category', 'tags', 'featuredImage', 'author'],
        filters: {
          slug: { $eq: slug },
        },
      },
    });
    return response.data.data[0];
  },

  // Get categories
  getCategories: async () => {
    const response = await axios.get(`${API_URL}/categories`, {
      params: {
        sort: ['name:asc'],
      },
    });
    return response.data;
  },

  // Increment view count
  incrementViews: async (postId: number) => {
    await axios.put(`${API_URL}/posts/${postId}`, {
      data: {
        views: { $inc: 1 },
      },
    });
  },
};
```

### **3. Atualizar Content.tsx**

**Substituir mock data por queries:**

```typescript
import { useQuery } from '@tanstack/react-query';
import { blogApi } from '@/services/blogApi';

const Content = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch posts from CMS
  const { data: postsData, isLoading, error } = useQuery({
    queryKey: ['posts', selectedCategory, searchQuery],
    queryFn: () => blogApi.getPosts({
      category: selectedCategory || undefined,
      search: searchQuery || undefined,
    }),
  });

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: blogApi.getCategories,
  });

  const posts = postsData?.data || [];
  const categories = categoriesData?.data || [];

  // Transform CMS data to component format
  const transformedPosts = posts.map((post) => ({
    title: post.attributes.title,
    excerpt: post.attributes.excerpt,
    date: new Date(post.attributes.publishedAt).toLocaleDateString('pt-BR'),
    slug: post.attributes.slug,
    category: post.attributes.category.data.attributes.name,
    tags: post.attributes.tags.data.map((tag) => tag.attributes.name),
  }));

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    // ... rest of component
  );
};
```

### **4. Atualizar BlogPost.tsx**

```typescript
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { blogApi } from '@/services/blogApi';

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => blogApi.getPostBySlug(slug!),
    enabled: !!slug,
  });

  // Increment view count on mount
  useEffect(() => {
    if (post?.id) {
      blogApi.incrementViews(post.id);
    }
  }, [post?.id]);

  if (isLoading) return <LoadingSpinner />;
  if (!post) return <NotFound />;

  return (
    // Render post content
  );
};
```

---

## 🌐 Environment Variables

**Arquivo:** `frontend/.env`

```bash
# CMS Configuration
VITE_CMS_API_URL=http://localhost:1337/api
VITE_CMS_MEDIA_URL=http://localhost:1337

# Production
# VITE_CMS_API_URL=https://cms.jbadvocacia.roilabs.com.br/api
# VITE_CMS_MEDIA_URL=https://cms.jbadvocacia.roilabs.com.br
```

---

## 📦 Deploy Strategy

### **Opção 1: Strapi Self-Hosted**

**Backend (Strapi):**
1. Deploy no Railway / Render / DigitalOcean
2. PostgreSQL database
3. S3 para media files
4. Domain: `cms.jbadvocacia.roilabs.com.br`

**Frontend:**
- Mantém deploy atual no Vercel
- Conecta à API do Strapi

### **Opção 2: Contentful (Hosted)**

**Frontend:**
- Conecta diretamente ao Contentful API
- Usa CDN do Contentful para imagens
- Deploy no Vercel com preview branches

---

## 🔐 Segurança

### **API Authentication**

```typescript
// Add to blogApi.ts
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_CMS_API_TOKEN}`,
  },
});
```

### **CORS Configuration** (Strapi)

```javascript
// config/middlewares.js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'https://jbadvocacia.roilabs.com.br'],
        },
      },
    },
  },
  'strapi::cors',
  // ...
];
```

---

## 📈 Features Adicionais Recomendadas

### **1. Preview Mode**

Permitir visualização de drafts antes de publicar:

```typescript
const { data: post } = useQuery({
  queryKey: ['post', slug, previewMode],
  queryFn: () => blogApi.getPostBySlug(slug!, {
    publicationState: previewMode ? 'preview' : 'live'
  }),
});
```

### **2. Related Posts**

```typescript
const { data: relatedPosts } = useQuery({
  queryKey: ['relatedPosts', post?.id],
  queryFn: () => blogApi.getRelatedPosts(post!.id),
  enabled: !!post?.id,
});
```

### **3. Comments System**

Integração com Disqus, Utterances, ou custom:

```tsx
<UtterancesComments
  repo="username/repo"
  issueTerm="pathname"
  theme="preferred-color-scheme"
/>
```

### **4. Newsletter Integration**

```typescript
// Mailchimp, SendGrid, ou Resend
const subscribeToNewsletter = async (email: string) => {
  await axios.post('/api/newsletter/subscribe', { email });
};
```

### **5. RSS Feed**

```typescript
// Generate RSS from CMS posts
const generateRSSFeed = (posts: BlogPost[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>JB Advocacia - Blog</title>
        ${posts.map(post => `
          <item>
            <title>${post.attributes.title}</title>
            <link>https://jbadvocacia.roilabs.com.br/conteudo/${post.attributes.slug}</link>
            <description>${post.attributes.excerpt}</description>
            <pubDate>${new Date(post.attributes.publishedAt).toUTCString()}</pubDate>
          </item>
        `).join('')}
      </channel>
    </rss>`;
};
```

---

## ✅ Checklist de Migração

### **Fase 1: Setup CMS (1-2 dias)**
- [ ] Escolher CMS (Strapi/Contentful/Sanity)
- [ ] Setup inicial e configuração
- [ ] Criar content types (BlogPost, Category, Tag, Author)
- [ ] Migrar dados mock para CMS
- [ ] Configurar media library

### **Fase 2: Backend API (1 dia)**
- [ ] Criar endpoints customizados (se necessário)
- [ ] Configurar autenticação
- [ ] Setup CORS
- [ ] Testar API no Postman

### **Fase 3: Frontend Integration (2-3 dias)**
- [ ] Instalar dependências (@tanstack/react-query, axios)
- [ ] Criar `blogApi.ts` service
- [ ] Atualizar `Content.tsx` com queries
- [ ] Atualizar `BlogPost.tsx` com queries
- [ ] Criar loading states e error handling
- [ ] Testar busca e filtros

### **Fase 4: Features Extras (1-2 dias)**
- [ ] Implementar related posts
- [ ] Adicionar view counter
- [ ] Integrar newsletter
- [ ] Setup RSS feed
- [ ] Comments system (opcional)

### **Fase 5: Deploy (1 dia)**
- [ ] Deploy CMS (se self-hosted)
- [ ] Configurar environment variables
- [ ] Deploy frontend com novas variáveis
- [ ] Testar em produção
- [ ] Documentar processo

---

## 📚 Recursos Úteis

### **Documentação**
- [Strapi Docs](https://docs.strapi.io/)
- [Contentful Docs](https://www.contentful.com/developers/docs/)
- [TanStack Query Docs](https://tanstack.com/query/latest)

### **Tutoriais**
- [Strapi + React Tutorial](https://strapi.io/blog/build-a-blog-with-react-strapi-and-apollo)
- [Contentful + Next.js](https://www.contentful.com/developers/docs/tutorials/general/get-started/)

---

## 💡 Estimativa de Tempo

**Total: 5-8 dias de desenvolvimento**

- Setup CMS: 1-2 dias
- Backend API: 1 dia
- Frontend Integration: 2-3 dias
- Features Extras: 1-2 dias
- Deploy e Testes: 1 dia

---

## 📞 Próximos Passos

1. **Decisão de CMS:** Escolher entre Strapi (self-hosted, maior controle) ou Contentful (hosted, menos manutenção)
2. **Setup Inicial:** Criar conta/instalar CMS escolhido
3. **Migração de Dados:** Transferir os 11 posts mock para o CMS
4. **Integração Frontend:** Implementar queries e transformações
5. **Testes:** Validar busca, filtros, e navegação
6. **Deploy:** Colocar em produção

---

**Documento mantido por:** Claude Code
**Última atualização:** 12/11/2025
**Status:** ✅ Ready for Implementation
