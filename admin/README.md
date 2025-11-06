# Painel Admin & CRM - Secure Business Architect

Painel administrativo e CRM para gestão de leads, contatos, newsletter e conteúdo do site institucional Jennifer Barreto Advocacia.

## URLs

- **Desenvolvimento**: http://localhost:5173
- **Produção**: https://jbadmin.roilabs.com.br
- **API**: https://backjennifer.roilabs.com.br

## Stack Tecnológico

- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui + Radix UI
- TanStack Query
- React Router v6
- Zustand (state management)
- React Hook Form + Zod
- Axios
- Lucide React (icons)

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```env
VITE_API_URL=http://localhost:3000
VITE_API_PREFIX=/api
```

## Funcionalidades (Roadmap)

### Fase 1 - Setup ✅
- [x] Configuração inicial (Vite + React + TS)
- [x] Tailwind CSS + Design System
- [x] Estrutura de pastas
- [x] Path aliases
- [ ] API client
- [ ] React Router
- [ ] Layout base

Ver roadmap completo em `/roadmaps/roadmap_admin.md`

**Status**: Fase 1 em andamento 🚧
