# Roadmap Painel Admin & CRM - Secure Business Architect

## Visão Geral

Este documento define o roadmap completo para o desenvolvimento do **Painel Administrativo** e **CRM simples** para o escritório de advocacia Jennifer Barreto. O sistema permitirá gerenciar leads, contatos, newsletter, blog e todo o conteúdo do site institucional.

**URLs do Projeto**:
- **Frontend (Site)**: https://jbadvocacia.roilabs.com.br
- **Backend (API)**: https://backjennifer.roilabs.com.br
- **Admin (Painel)**: https://jbadmin.roilabs.com.br

---

## Objetivos do Sistema

### Painel Administrativo
- Dashboard com métricas e KPIs
- Gestão completa de conteúdo (CMS)
- Gerenciamento de usuários admin
- Configurações do sistema

### CRM Simples
- Captura de leads do formulário de contato
- Gestão de status dos leads (Novo, Em Contato, Qualificado, Convertido, Perdido)
- Histórico de interações
- Notas e comentários
- Notificações de novos leads
- Follow-up e lembretes

---

## Stack Tecnológico Proposta

### Frontend Admin
- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **UI Library**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query + Zustand
- **Forms**: React Hook Form + Zod
- **Tables**: TanStack Table
- **Charts**: Recharts ou Chart.js
- **Routing**: React Router v6
- **Auth**: JWT (HttpOnly cookies)
- **Rich Text Editor**: Tiptap ou Lexical
- **Date Picker**: date-fns + react-day-picker
- **Icons**: Lucide React

### Backend (já implementado)
- Express + TypeScript + Prisma
- PostgreSQL + Redis
- JWT Authentication
- Rate Limiting

---

## Arquitetura Proposta

### Estrutura do Admin Frontend

```
admin/
├── public/
├── src/
│   ├── assets/             # Imagens, ícones
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   ├── layout/        # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── dashboard/     # Dashboard widgets
│   │   ├── leads/         # CRM components
│   │   ├── blog/          # Blog editor
│   │   └── common/        # Shared components
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   └── ForgotPassword.tsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx
│   │   ├── leads/
│   │   │   ├── LeadsList.tsx
│   │   │   ├── LeadDetail.tsx
│   │   │   └── LeadKanban.tsx
│   │   ├── contacts/
│   │   │   └── ContactsList.tsx
│   │   ├── newsletter/
│   │   │   ├── SubscribersList.tsx
│   │   │   └── Campaign.tsx
│   │   ├── blog/
│   │   │   ├── PostsList.tsx
│   │   │   ├── PostEditor.tsx
│   │   │   └── Categories.tsx
│   │   ├── services/
│   │   │   └── ServicesList.tsx
│   │   ├── testimonials/
│   │   │   └── TestimonialsList.tsx
│   │   └── settings/
│   │       ├── Profile.tsx
│   │       └── Users.tsx
│   ├── api/               # API client
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilities
│   ├── types/             # TypeScript types
│   ├── stores/            # Zustand stores
│   └── App.tsx
├── .env.example
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

---

## Fase 1: Setup do Admin Frontend (Semana 1)

### 1.1 Configuração Inicial ✅
- [x] Criar projeto Vite + React + TypeScript
- [x] Configurar Tailwind CSS (v3.4.0)
- [x] Instalar dependências core (TanStack Query, Router, Zustand, Axios, etc)
- [x] Configurar ESLint + TypeScript strict
- [x] Setup de variáveis de ambiente (.env)
- [x] Configurar path aliases (@/*)
- [x] Criar utility functions (cn, formatDate, formatRelativeTime)
- [x] Configurar React Router
- [x] Configurar TanStack Query
- [ ] Instalar e configurar shadcn/ui (próximo)

### 1.2 Estrutura Base ✅

- [x] Criar estrutura de pastas (components, pages, api, hooks, lib, stores)
- [x] Configurar axios client com interceptors
- [x] Implementar gerenciamento de tokens JWT (Zustand store)
- [x] Criar layout base (Sidebar + Header + MainLayout)
- [x] Configurar rotas protegidas (PrivateRoute component)
- [x] Criar página 404
- [x] Criar página de Login
- [x] Criar página Dashboard inicial

### 1.3 Design System ✅

- [x] Configurar Tailwind CSS com design tokens (CSS variables)
- [x] Setup dark mode support
- [x] Instalar e configurar shadcn/ui com estilo New York
- [x] Adicionar componentes essenciais (Button, Card, Input, Label, Textarea, Select, Dialog, Badge, Avatar, Table, Dropdown Menu)
- [x] Configurar toast notifications (Sonner)
- [x] Atualizar página de Login com componentes shadcn/ui
- [ ] Criar componentes customizados específicos do admin (quando necessário)

**Entregável**: Admin frontend estruturado e pronto para desenvolvimento - **FASE 1 COMPLETA** ✅

---

## Fase 2: Autenticação Admin (Semana 2) ✅ COMPLETA

### 2.1 Backend - Endpoints de Auth ✅
- [x] POST `/api/auth/login` - Login de admin - funcionando
- [x] POST `/api/auth/logout` - Logout - funcionando
- [x] POST `/api/auth/refresh` - Refresh token - funcionando
- [x] GET `/api/auth/me` - Dados do usuário logado - funcionando
- [ ] POST `/api/auth/forgot-password` - Solicitar reset de senha (futuro)
- [ ] POST `/api/auth/reset-password/:token` - Resetar senha (futuro)

### 2.2 Frontend - Páginas de Auth ✅
- [x] Página de Login - completa
  - Form com email/senha
  - Validação com Zod
  - "Lembrar-me"
  - Link "Esqueci minha senha" (visual only)
- [ ] Página "Esqueci minha senha" (futuro)
- [ ] Página de Reset de senha (futuro)
- [x] Guard de rotas (PrivateRoute) - implementado
- [x] Auto-refresh de token - implementado nos interceptors
- [x] Logout automático em caso de 401 - implementado

### 2.3 Context/Store de Autenticação ✅
- [x] Zustand store para auth state - implementado
- [x] Funções de login/logout - funcionando
- [x] Persistência de sessão - usando localStorage
- [x] Loading states - implementado

**Entregável**: ✅ Sistema de autenticação funcionando (sem recuperação de senha ainda) - **COMPLETO**

---

## Fase 3: Dashboard & Analytics (Semana 3) ✅ PARCIALMENTE COMPLETA

### 3.1 Backend - Endpoints de Analytics ✅ Parcial
- [x] GET `/api/contacts/stats` - Estatísticas de contatos (total, pending, read, archived)
- [ ] GET `/api/admin/analytics/overview` - Métricas gerais (ampliado - futuro)
  - Inscritos newsletter
  - Posts publicados
  - Visualizações de blog
- [ ] GET `/api/admin/analytics/leads-trend` - Tendência de leads (futuro)
- [ ] GET `/api/admin/analytics/top-posts` - Posts mais visualizados (futuro)
- [ ] GET `/api/admin/analytics/conversion-funnel` - Funil de conversão (futuro)

### 3.2 Frontend - Dashboard ✅ MVP Completo
- [x] Layout do Dashboard - implementado
- [x] Cards de métricas (KPIs) - StatCard component criado
  - Total de contatos
  - Contatos pendentes
  - Contatos lidos
  - Contatos arquivados
- [x] Lista de contatos recentes - RecentContacts component
  - Mostra últimos 5 contatos
  - Status badges coloridos
  - Informações de contato
  - Timestamp relativo
- [x] Welcome message personalizado com nome do usuário
- [x] Quick actions buttons
- [x] Loading skeletons
- [x] Error handling
- [ ] Gráfico de leads ao longo do tempo (linha) - futuro
- [ ] Gráfico de leads por status (pizza/donut) - futuro
- [ ] Lista de posts mais visualizados - futuro

### 3.3 Widgets Interativos
- [ ] Filtros por período (hoje, 7 dias, 30 dias, custom) - futuro
- [ ] Comparação com período anterior - futuro
- [ ] Exportar relatórios (PDF/CSV) - futuro
- [ ] Atualização em tempo real (opcional) - futuro

**Entregável**: ✅ Dashboard MVP funcional com estatísticas de contatos em tempo real - **COMPLETO**

**Implementação**:
- API de contatos integrada ([admin/src/api/contacts.ts](../admin/src/api/contacts.ts))
- Componente StatCard reutilizável ([admin/src/components/dashboard/StatCard.tsx](../admin/src/components/dashboard/StatCard.tsx))
- Componente RecentContacts com TanStack Query ([admin/src/components/dashboard/RecentContacts.tsx](../admin/src/components/dashboard/RecentContacts.tsx))
- Dashboard atualizado com dados reais ([admin/src/pages/dashboard/Dashboard.tsx](../admin/src/pages/dashboard/Dashboard.tsx))
- Tipos TypeScript para contatos ([admin/src/types/contact.ts](../admin/src/types/contact.ts))
- Função formatRelativeTime adicionada aos utils ([admin/src/lib/utils.ts](../admin/src/lib/utils.ts))

---

## Fase 4: CRM - Gestão de Leads (Semana 4-5)

### 4.1 Backend - Extensão do Model Contact
```prisma
model Contact {
  id          String        @id @default(uuid())
  name        String
  email       String
  phone       String?
  company     String?
  message     String        @db.Text

  // CRM fields
  status      LeadStatus    @default(NEW)
  priority    Priority      @default(MEDIUM)
  source      String?       @default("website")
  assignedTo  String?       // userId
  tags        String[]

  // Timestamps
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  lastContact DateTime?
  nextFollowUp DateTime?

  // Relations
  interactions Interaction[]
  notes       Note[]
  user        User?         @relation(fields: [assignedTo], references: [id])

  @@index([email])
  @@index([status])
  @@index([priority])
  @@index([assignedTo])
  @@index([createdAt])
  @@map("contacts")
}

enum LeadStatus {
  NEW           // Novo lead recebido
  CONTACTED     // Já fizemos contato
  QUALIFIED     // Lead qualificado
  PROPOSAL      // Proposta enviada
  NEGOTIATION   // Em negociação
  CONVERTED     // Convertido em cliente
  LOST          // Perdido
  ARCHIVED      // Arquivado
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

model Interaction {
  id          String   @id @default(uuid())
  contactId   String
  userId      String
  type        InteractionType
  notes       String   @db.Text
  createdAt   DateTime @default(now())

  contact     Contact  @relation(fields: [contactId], references: [id], onDelete: Cascade)
  user        User     @relation(fields: [userId], references: [id])

  @@index([contactId])
  @@map("interactions")
}

enum InteractionType {
  EMAIL
  PHONE
  MEETING
  WHATSAPP
  OTHER
}

model Note {
  id          String   @id @default(uuid())
  contactId   String
  userId      String
  content     String   @db.Text
  isPinned    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  contact     Contact  @relation(fields: [contactId], references: [id], onDelete: Cascade)
  user        User     @relation(fields: [userId], references: [id])

  @@index([contactId])
  @@map("notes")
}
```

### 4.2 Backend - Endpoints de Leads
- [ ] GET `/api/admin/leads` - Listar leads (com filtros)
  - Filtros: status, priority, dateRange, assignedTo, search
  - Paginação
  - Ordenação
- [ ] GET `/api/admin/leads/:id` - Detalhes do lead
- [ ] PATCH `/api/admin/leads/:id` - Atualizar lead
  - Status, priority, assignedTo, tags, nextFollowUp
- [ ] DELETE `/api/admin/leads/:id` - Deletar lead
- [ ] POST `/api/admin/leads/:id/interactions` - Adicionar interação
- [ ] POST `/api/admin/leads/:id/notes` - Adicionar nota
- [ ] GET `/api/admin/leads/:id/timeline` - Timeline completa
- [ ] PATCH `/api/admin/leads/:id/convert` - Marcar como convertido
- [ ] GET `/api/admin/leads/export` - Exportar leads (CSV)

### 4.3 Frontend - Lista de Leads
- [ ] Página de listagem de leads (tabela)
- [ ] Filtros avançados
  - Por status (multi-select)
  - Por prioridade
  - Por data (range picker)
  - Por responsável
  - Busca por nome/email/empresa
- [ ] Colunas da tabela:
  - Nome
  - Email
  - Empresa
  - Status (badge colorido)
  - Prioridade (badge)
  - Data de contato
  - Próximo follow-up
  - Responsável
  - Ações (ver, editar, deletar)
- [ ] Ordenação por colunas
- [ ] Paginação
- [ ] Seleção múltipla para ações em massa
- [ ] Ações em massa (mudar status, atribuir, deletar)

### 4.4 Frontend - Kanban de Leads
- [ ] View alternativa em Kanban
- [ ] Colunas por status (NEW, CONTACTED, QUALIFIED, etc)
- [ ] Drag & drop entre colunas
- [ ] Cards de leads com info resumida
- [ ] Contador de leads por coluna
- [ ] Filtros rápidos

### 4.5 Frontend - Detalhes do Lead
- [ ] Página de detalhes completa
- [ ] Sidebar com informações principais
  - Nome, email, telefone, empresa
  - Status (editável)
  - Prioridade (editável)
  - Tags (editável)
  - Responsável (editável)
  - Próximo follow-up (editável)
- [ ] Seção de Timeline
  - Histórico de mudanças de status
  - Interações registradas
  - Notas adicionadas
  - Ordenado cronologicamente
- [ ] Seção de Notas
  - Editor de texto para adicionar notas
  - Notas fixadas (pinned)
  - Editar/deletar notas
- [ ] Seção de Interações
  - Formulário para registrar interação
  - Tipo (email, telefone, reunião, whatsapp)
  - Descrição da interação
  - Data/hora
  - Histórico de interações
- [ ] Seção de Mensagem Original
  - Mensagem enviada pelo lead no formulário
- [ ] Botões de ação
  - Enviar email (abre cliente de email)
  - Ligar (link tel:)
  - WhatsApp (link wa.me)
  - Agendar follow-up
  - Converter em cliente
  - Marcar como perdido

### 4.6 Notificações e Lembretes
- [ ] Notificação de novo lead (toast)
- [ ] Badge no menu com contagem de leads novos
- [ ] Lembretes de follow-up (próximos ao vencimento)
- [ ] Email de notificação para admin (opcional)

**Entregável**: CRM completo para gestão de leads

---

## Fase 5: Gestão de Contatos (Semana 6) ✅ COMPLETA

### 5.1 Frontend - Lista de Contatos ✅
- [x] Página de todos os contatos - implementada
- [x] Filtros por status (pending, read, archived) - funcionando
- [x] Busca por nome/email/empresa - funcionando
- [x] Tabela de contatos com paginação - implementada
- [x] Visualizar mensagem - página de detalhes completa
- [x] Mudar status (pendente, lido, arquivado) - funcionando
- [x] Deletar contato com confirmação - funcionando
- [ ] Exportar contatos - futuro

### 5.2 Conversão de Contato para Lead
- [ ] Botão "Converter em Lead" em contato - futuro (depende do CRM)
- [ ] Form para adicionar informações de CRM - futuro
- [ ] Criar lead e manter referência ao contato original - futuro

**Entregável**: ✅ Gestão completa de contatos funcionando - **COMPLETO**

**Implementação**:
- Página de listagem com filtros e busca ([admin/src/pages/contacts/ContactsList.tsx](../admin/src/pages/contacts/ContactsList.tsx))
- Página de detalhes com todas as informações ([admin/src/pages/contacts/ContactDetail.tsx](../admin/src/pages/contacts/ContactDetail.tsx))
- Integração completa com API de contatos
- Mutations para atualizar status e deletar contatos
- Invalidação automática de cache após mutations
- Toast notifications para feedback ao usuário
- Loading states e error handling
- Confirmação antes de deletar
- Navegação entre páginas configurada

---

## Fase 6: Newsletter Management (Semana 7)

### 6.1 Backend - Endpoints de Newsletter
- [x] GET `/api/newsletter` - Listar inscritos (implementado na Phase 4 do backend)
- [x] GET `/api/newsletter/stats` - Estatísticas
- [x] DELETE `/api/newsletter/:id` - Remover inscrito
- [x] GET `/api/newsletter/export` - Exportar lista (CSV)
- [ ] POST `/api/admin/newsletter/campaign` - Criar campanha (futuro)

### 6.2 Frontend - Newsletter
- [x] Página de inscritos
- [x] Tabela com email, data de inscrição, status
- [x] Filtros (ativos, cancelados)
- [x] Busca por email
- [x] Estatísticas no Dashboard (total, ativos, cancelados, novos no mês)
- [x] Exportar lista completa (CSV com download automático)
- [x] Remover inscrito manualmente com confirmação

**Entregável**: ✅ Gestão de newsletter funcionando - **COMPLETO**

**Implementação**:
- Tipos e API client ([admin/src/types/newsletter.ts](../admin/src/types/newsletter.ts), [admin/src/api/newsletter.ts](../admin/src/api/newsletter.ts))
- Página de listagem completa ([admin/src/pages/newsletter/NewsletterList.tsx](../admin/src/pages/newsletter/NewsletterList.tsx))
- Estatísticas no Dashboard ([admin/src/pages/dashboard/Dashboard.tsx](../admin/src/pages/dashboard/Dashboard.tsx))
- Integração com backend newsletter API (Phase 4)
- Filtros por status e busca por email
- Paginação de resultados
- Exportação CSV com download em blob
- Delete com AlertDialog de confirmação
- Loading states e error handling completo
- Toast notifications para feedback
- Rota `/newsletter` configurada no App

---

## Fase 7: Blog CMS (Semana 8-9) ✅ COMPLETA

### 7.1 Backend - Endpoints de Blog ✅
- [x] GET `/api/blog/admin/posts` - Listar posts (incluindo drafts) - implementado na Phase 5 do backend
- [x] GET `/api/blog/admin/posts/:id` - Ver post
- [x] POST `/api/blog/admin/posts` - Criar post
- [x] PUT `/api/blog/admin/posts/:id` - Atualizar post
- [x] DELETE `/api/blog/admin/posts/:id` - Deletar post
- [x] PATCH `/api/blog/admin/posts/:id/publish` - Publicar
- [x] PATCH `/api/blog/admin/posts/:id/unpublish` - Despublicar
- [x] GET `/api/blog/admin/stats` - Estatísticas
- [x] GET `/api/blog/categories` - Listar categorias
- [ ] POST `/api/admin/upload/image` - Upload de imagem (futuro)

### 7.2 Frontend - Lista de Posts ✅
- [x] Página de listagem de posts
- [x] Filtros (todos, publicados, drafts)
- [x] Busca por título
- [x] Tabela de posts com todas as informações
  - Título
  - Autor
  - Categoria
  - Status (publicado/draft)
  - Data de publicação/criação
  - Visualizações
  - Ações (editar, deletar, publicar/despublicar)
- [x] Botão "Novo Post"
- [x] Dropdown menu com ações
- [x] Paginação
- [x] Confirmação antes de deletar

### 7.3 Frontend - Editor de Posts ✅
- [x] Página de edição/criação
- [x] Campo de título
- [x] Campo de excerpt/resumo
- [x] Campo de conteúdo (Textarea com suporte a Markdown)
- [x] Campo de cover image (URL)
- [x] Campo de autor
- [x] Seletor de categoria (com opção de criar nova)
- [x] Input de tags (separado por vírgula)
- [x] Botão Criar/Atualizar Post
- [x] Validação de campos obrigatórios
- [x] Navegação após salvar
- [ ] Rich Text Editor (Tiptap) - não implementado (futuro)
- [ ] Campo de slug editável - gerado automaticamente pelo backend
- [ ] Toggle de status - controlado via botão publicar/despublicar
- [ ] Date picker para agendamento - não implementado (futuro)
- [ ] Preview do post - não implementado (futuro)
- [ ] Auto-save - não implementado (futuro)

### 7.4 Upload de Imagens
- [ ] Drag & drop de imagens - não implementado (futuro)
- [ ] Preview antes do upload - não implementado (futuro)
- [ ] Progress bar - não implementado (futuro)
- [ ] Validação (tipo, tamanho) - não implementado (futuro)
- [ ] Galeria de imagens já enviadas - não implementado (futuro)
- [ ] Inserir imagem no editor - não implementado (futuro)

**Entregável**: ✅ CMS de blog funcionando - **COMPLETO**

**Implementação**:
- Tipos e API client ([admin/src/types/blog.ts](../admin/src/types/blog.ts), [admin/src/api/blog.ts](../admin/src/api/blog.ts))
- Página de listagem completa ([admin/src/pages/blog/BlogList.tsx](../admin/src/pages/blog/BlogList.tsx))
- Editor de posts ([admin/src/pages/blog/BlogEditor.tsx](../admin/src/pages/blog/BlogEditor.tsx))
- Estatísticas no Dashboard ([admin/src/pages/dashboard/Dashboard.tsx](../admin/src/pages/dashboard/Dashboard.tsx))
- Integração com backend blog API (Phase 5)
- Filtros por status e busca por título
- Paginação de resultados
- CRUD completo: criar, editar, deletar posts
- Publicar/despublicar posts
- Dropdown menu com ações contextuais
- Confirmação antes de deletar
- Loading states e error handling
- Toast notifications para feedback
- Rotas `/blog` e `/blog/:id` configuradas
- Botão "Novo Post" no Dashboard
- Suporte a Markdown no editor

---

## Fase 8: Gestão de Serviços (Semana 10) ✅ COMPLETA

### 8.1 Backend - Endpoints de Serviços ✅
- [x] GET `/api/services/admin/all` - Listar serviços (implementado na Phase 6 do backend)
- [x] GET `/api/services/admin/:id` - Ver serviço
- [x] POST `/api/services/admin` - Criar serviço
- [x] PUT `/api/services/admin/:id` - Atualizar serviço
- [x] DELETE `/api/services/admin/:id` - Deletar serviço
- [x] PATCH `/api/services/admin/reorder` - Reordenar serviços
- [x] PATCH `/api/services/admin/:id/toggle` - Toggle ativo/inativo

### 8.2 Frontend - Gestão de Serviços ✅
- [x] Página de listagem de serviços
- [x] Card de cada serviço com preview completo
- [x] Botão "Novo Serviço"
- [x] Dialog de edição/criação com todos os campos
  - Título
  - Ícone Lucide (input de texto)
  - Descrição (textarea)
  - Benefícios (lista editável com add/remove)
  - Slug gerado automaticamente pelo backend
- [x] Toggle ativo/inativo com botão
- [x] Deletar serviço com confirmação (AlertDialog)
- [x] Preview completo no card (título, descrição, benefícios, status)
- [x] Badge de status (Ativo/Inativo)
- [x] Ícone drag handle para reordenação futura
- [ ] Drag & drop para reordenar - não implementado (funcionalidade básica pronta)

**Entregável**: ✅ Gestão de serviços funcionando - **COMPLETO**

**Implementação**:
- Tipos e API client ([admin/src/types/service.ts](../admin/src/types/service.ts), [admin/src/api/services.ts](../admin/src/api/services.ts))
- Página completa de gestão ([admin/src/pages/services/ServicesList.tsx](../admin/src/pages/services/ServicesList.tsx))
- Integração com backend services API (Phase 6)
- Dialog modal para criar/editar serviços
- CRUD completo: criar, editar, deletar serviços
- Toggle ativo/inativo
- Lista de benefícios editável (add/remove dinamicamente)
- Validação de campos obrigatórios
- Confirmação antes de deletar
- Loading states e error handling
- Toast notifications para feedback
- Rota `/services` configurada
- Cards com preview visual completo

---

## Fase 9: Gestão de Depoimentos (Semana 11)

### 9.1 Backend - Endpoints de Depoimentos (se não existir)
- [ ] GET `/api/admin/testimonials` - Listar depoimentos
- [ ] GET `/api/admin/testimonials/:id` - Ver depoimento
- [ ] POST `/api/admin/testimonials` - Criar depoimento
- [ ] PUT `/api/admin/testimonials/:id` - Atualizar depoimento
- [ ] DELETE `/api/admin/testimonials/:id` - Deletar depoimento
- [ ] PATCH `/api/admin/testimonials/:id/publish` - Publicar
- [ ] PATCH `/api/admin/testimonials/reorder` - Reordenar

### 9.2 Frontend - Gestão de Depoimentos
- [ ] Página de listagem de depoimentos
- [ ] Lista ordenável (drag & drop)
- [ ] Filtros (publicados, não publicados)
- [ ] Botão "Novo Depoimento"
- [ ] Modal de edição/criação
  - Nome do cliente
  - Cargo/Empresa
  - Conteúdo do depoimento
  - Rating (1-5 estrelas)
  - Avatar (upload opcional)
  - Status (publicado/não publicado)
- [ ] Toggle publicado/não publicado
- [ ] Deletar depoimento (com confirmação)
- [ ] Preview do card

**Entregável**: Gestão de depoimentos

---

## Fase 10: Configurações e Usuários (Semana 12)

### 10.1 Backend - Endpoints de Usuários
- [ ] GET `/api/admin/users` - Listar usuários admin
- [ ] POST `/api/admin/users` - Criar novo admin
- [ ] PUT `/api/admin/users/:id` - Atualizar admin
- [ ] DELETE `/api/admin/users/:id` - Deletar admin
- [ ] PATCH `/api/admin/users/:id/toggle-active` - Ativar/desativar
- [ ] PUT `/api/admin/profile` - Atualizar próprio perfil
- [ ] PUT `/api/admin/profile/password` - Mudar senha

### 10.2 Frontend - Perfil do Usuário
- [ ] Página de perfil
- [ ] Editar informações
  - Nome
  - Email
  - Avatar (upload)
- [ ] Mudar senha
- [ ] Preferências
  - Notificações
  - Tema (light/dark)

### 10.3 Frontend - Gestão de Usuários (Super Admin)
- [ ] Página de usuários (apenas super admin)
- [ ] Listar usuários admin
- [ ] Criar novo admin
  - Nome
  - Email
  - Senha
  - Role (admin/super_admin)
- [ ] Editar admin
- [ ] Desativar/ativar admin
- [ ] Deletar admin (com confirmação)

### 10.4 Configurações Gerais
- [ ] Página de configurações do site
- [ ] Informações de contato (email, telefone)
- [ ] Redes sociais (URLs)
- [ ] SEO settings (meta description, keywords)
- [ ] Configurações de email (SMTP)

**Entregável**: Gestão completa de usuários e configurações

---

## Fase 11: Melhorias e Otimizações (Semana 13)

### 11.1 Performance
- [ ] Lazy loading de rotas
- [ ] Virtualization em listas grandes
- [ ] Otimização de imagens
- [ ] Code splitting
- [ ] Cache de queries (TanStack Query)

### 11.2 UX/UI
- [ ] Loading skeletons
- [ ] Empty states
- [ ] Error boundaries
- [ ] Confirmações de ações destrutivas
- [ ] Undo/redo (onde aplicável)
- [ ] Keyboard shortcuts
- [ ] Tooltips informativos

### 11.3 Mobile Responsiveness
- [ ] Layout responsivo para tablet
- [ ] Menu mobile (hamburger)
- [ ] Tabelas responsivas (scroll horizontal)
- [ ] Touch gestures (onde aplicável)

### 11.4 Acessibilidade
- [ ] Navegação por teclado
- [ ] Screen reader support
- [ ] Focus management
- [ ] ARIA labels
- [ ] Contraste adequado

**Entregável**: Admin otimizado e polido

---

## Fase 12: Deploy e Documentação (Semana 14)

### 12.1 Build e Deploy
- [ ] Configurar build de produção
- [ ] Otimizar bundle size
- [ ] Configurar variáveis de ambiente de produção
- [ ] Deploy no Easypanel ou Vercel
- [ ] Configurar domínio (admin.jbadvocacia.roilabs.com.br)
- [ ] SSL configurado
- [ ] Testes de produção

### 12.2 Documentação
- [ ] README do admin
- [ ] Guia de uso do CRM
- [ ] Manual do usuário
- [ ] Documentação de componentes
- [ ] Changelog

### 12.3 Testes Finais
- [ ] Testes E2E (Playwright/Cypress)
- [ ] Testes de usabilidade
- [ ] Testes em diferentes navegadores
- [ ] Testes mobile
- [ ] Load testing

**Entregável**: Admin em produção documentado

---

## Recursos e Funcionalidades Principais

### Dashboard
- ✅ Métricas de leads em tempo real
- ✅ Gráficos e visualizações
- ✅ Atividades recentes
- ✅ Alertas e notificações

### CRM de Leads
- ✅ Captura automática do formulário do site
- ✅ Pipeline visual (Kanban)
- ✅ Status personalizáveis
- ✅ Priorização de leads
- ✅ Atribuição de responsáveis
- ✅ Timeline de interações
- ✅ Notas e comentários
- ✅ Lembretes de follow-up
- ✅ Tags e categorização
- ✅ Exportação de dados

### Blog CMS
- ✅ Editor visual rico
- ✅ Upload de imagens
- ✅ Sistema de categorias e tags
- ✅ Drafts e agendamento
- ✅ SEO-friendly (slug, meta)
- ✅ Preview antes de publicar

### Gestão de Conteúdo
- ✅ Serviços oferecidos
- ✅ Depoimentos de clientes
- ✅ Newsletter
- ✅ Configurações gerais

---

## Estimativa de Tempo

| Fase | Descrição | Tempo Estimado |
|------|-----------|----------------|
| 1 | Setup Admin Frontend | 1 semana |
| 2 | Autenticação | 1 semana |
| 3 | Dashboard & Analytics | 1 semana |
| 4 | CRM - Gestão de Leads | 2 semanas |
| 5 | Gestão de Contatos | 1 semana |
| 6 | Newsletter Management | 1 semana |
| 7 | Blog CMS | 2 semanas |
| 8 | Gestão de Serviços | 1 semana |
| 9 | Gestão de Depoimentos | 1 semana |
| 10 | Configurações e Usuários | 1 semana |
| 11 | Melhorias e Otimizações | 1 semana |
| 12 | Deploy e Documentação | 1 semana |
| **TOTAL** | **Admin Completo** | **14 semanas** |

---

## Priorização

### MVP (6 semanas)
1. Setup Frontend (Fase 1)
2. Autenticação (Fase 2)
3. Dashboard básico (Fase 3)
4. CRM de Leads (Fase 4)
5. Blog CMS básico (Fase 7 - simplificado)
6. Deploy (Fase 12)

### Versão 1.0 Completa (14 semanas)
MVP + Todas as outras fases

### Futuro (Pós-lançamento)
- Relatórios avançados
- Integração com WhatsApp Business API
- Email marketing integrado
- Sistema de propostas e contratos
- Agenda de compromissos
- Integração com Google Calendar
- Notificações push
- App mobile

---

## Fluxo do Lead (Site → CRM)

```
1. Usuário preenche formulário em https://jbadvocacia.roilabs.com.br/contato
   ↓
2. POST /api/contacts → Cria contato no banco
   ↓
3. Backend envia email de notificação para admin
   ↓
4. Lead aparece no CRM com status "NEW"
   ↓
5. Admin recebe notificação no painel
   ↓
6. Admin visualiza lead e adiciona informações
   ↓
7. Admin registra interações e move pelo pipeline
   ↓
8. Lead é qualificado → Status "QUALIFIED"
   ↓
9. Proposta enviada → Status "PROPOSAL"
   ↓
10. Cliente fechado → Status "CONVERTED" 🎉
```

---

## Integrações Futuras

### Email
- [ ] Integração com Gmail API
- [ ] Enviar emails direto do CRM
- [ ] Sincronizar emails com leads

### WhatsApp
- [ ] WhatsApp Business API
- [ ] Enviar mensagens pelo CRM
- [ ] Histórico de conversas

### Calendário
- [ ] Integração com Google Calendar
- [ ] Agendar reuniões com leads
- [ ] Lembretes automáticos

### Pagamentos
- [ ] Integração com Stripe/PayPal
- [ ] Receber pagamentos online
- [ ] Gestão de faturas

---

## Segurança

- ✅ Autenticação JWT
- ✅ HttpOnly cookies
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Input validation
- ✅ XSS protection
- ✅ SQL injection prevention (Prisma)
- ✅ HTTPS obrigatório
- ✅ Roles e permissões
- ✅ Audit logs (quem fez o quê)

---

## Tecnologias Complementares

### Monitoramento
- Sentry (error tracking)
- Google Analytics
- Hotjar (heatmaps)

### Comunicação
- Slack webhooks (notificações)
- Email transacional (SendGrid)

### Backup
- Backups automáticos do banco
- Backup de uploads

---

## Design Inspirações

### Admin Dashboards
- Vercel Dashboard
- Notion
- Linear
- Stripe Dashboard
- Airtable

### CRM
- Pipedrive (Kanban)
- HubSpot CRM
- Salesforce Lightning

---

## Próximos Passos

1. **Revisar e aprovar este roadmap**
2. **Decidir sobre MVP vs Completo**
3. **Definir ordem de prioridade das funcionalidades**
4. **Iniciar Fase 1: Setup Admin Frontend**
5. **Configurar repositório para admin**

---

**Documento criado em**: 2025-11-06
**Versão**: 1.0
**Última atualização**: 2025-11-06
**Deploy**: Easypanel ou Vercel
