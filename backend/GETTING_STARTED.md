# Guia de Início Rápido - Backend

## Passo a Passo para Começar

### 1️⃣ Instalar Dependências

```bash
cd backend
npm install
```

Isso instalará todas as dependências do projeto definidas no `package.json`.

### 2️⃣ Configurar Email (IMPORTANTE)

Edite o arquivo `.env` e configure suas credenciais de email SMTP:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-de-app
EMAIL_FROM=noreply@seudominio.com
ADMIN_EMAIL=admin@seudominio.com
```

**Para Gmail:**
1. Ative a verificação em duas etapas
2. Gere uma "Senha de App" em https://myaccount.google.com/apppasswords
3. Use essa senha no `SMTP_PASSWORD`

### 3️⃣ Iniciar Banco de Dados com Docker

```bash
docker-compose up -d postgres redis
```

Isso iniciará:
- PostgreSQL na porta 5432
- Redis na porta 6379

Ou instale PostgreSQL e Redis localmente.

### 4️⃣ Executar Migrations

```bash
npm run migrate:dev
```

Isso criará todas as tabelas no banco de dados.

### 5️⃣ Popular Banco com Dados Iniciais (Opcional)

```bash
npm run seed
```

Isso criará:
- ✅ 1 usuário admin
- ✅ 5 serviços exemplo
- ✅ 3 depoimentos exemplo
- ✅ 2 posts de blog exemplo

**Credenciais do Admin:**
- Email: `admin@securebusinessarchitect.com`
- Senha: `Admin@123456`

⚠️ **IMPORTANTE**: Altere a senha após o primeiro login!

### 6️⃣ Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor estará rodando em: **http://localhost:3000**

### 7️⃣ Testar a API

#### Health Check

```bash
curl http://localhost:3000/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "timestamp": "2025-11-06T...",
  "uptime": 123.456,
  "environment": "development"
}
```

#### Ver Informações da API

```bash
curl http://localhost:3000/
```

### 8️⃣ Explorar o Banco de Dados (Opcional)

```bash
npm run prisma:studio
```

Abre interface gráfica em: http://localhost:5555

---

## Desenvolvimento com Docker (Alternativa)

Se preferir rodar tudo com Docker:

```bash
# Inicia todos os serviços (postgres, redis, api)
docker-compose up

# Em segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Parar tudo
docker-compose down
```

---

## Próximos Passos

Agora que a infraestrutura está rodando, você pode:

1. **Testar endpoints**: Use Postman ou curl
2. **Desenvolver novos recursos**: Siga o roadmap em `roadmaps/roadmap_backend.md`
3. **Executar testes**: `npm test`
4. **Ver logs**: Os logs aparecerão no terminal

---

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia dev server com hot reload

# Banco de Dados
npm run prisma:studio    # GUI do banco
npm run migrate:dev      # Criar/aplicar migrations
npm run seed             # Popular banco

# Testes
npm test                 # Executar testes
npm run test:watch       # Testes em modo watch

# Qualidade de Código
npm run lint             # Verificar problemas
npm run lint:fix         # Corrigir problemas
npm run format           # Formatar código

# Build
npm run build            # Compilar TypeScript
npm start                # Rodar versão compilada
```

---

## Troubleshooting

### Erro: "DATABASE_URL is required"

Configure a variável `DATABASE_URL` no arquivo `.env`.

### Erro: "Port 3000 is already in use"

Altere a porta no `.env`:
```env
PORT=3001
```

### Erro de conexão com PostgreSQL

Verifique se o PostgreSQL está rodando:
```bash
docker-compose ps
```

### Erro de conexão com Redis

Redis é opcional. Se não estiver rodando, a API funcionará sem cache.

Para iniciar apenas o Redis:
```bash
docker-compose up -d redis
```

### Migrations não aplicadas

Reset completo (⚠️ apaga todos os dados):
```bash
npm run migrate:reset
npm run seed
```

---

## Estrutura de Desenvolvimento

```
backend/
├── src/
│   ├── config/           ← Configurações (DB, Redis, Logger)
│   ├── middlewares/      ← Middlewares (Auth, Rate Limit, Errors)
│   ├── routes/           ← Defina novas rotas aqui
│   ├── controllers/      ← Handlers das rotas
│   ├── services/         ← Lógica de negócio
│   ├── repositories/     ← Acesso a dados (Prisma)
│   ├── validators/       ← Validação de inputs (Zod)
│   └── app.ts            ← App Express principal
├── prisma/
│   └── schema.prisma     ← Schema do banco de dados
└── tests/                ← Testes automatizados
```

---

## Fluxo de Trabalho Recomendado

1. **Crie uma branch**: `git checkout -b feature/nova-funcionalidade`
2. **Desenvolva**: Adicione código em `src/`
3. **Teste**: `npm test`
4. **Lint**: `npm run lint:fix`
5. **Commit**: `git commit -m "feat: adiciona nova funcionalidade"`
6. **Push**: `git push origin feature/nova-funcionalidade`

---

## Recursos Adicionais

- 📖 [Documentação Prisma](https://www.prisma.io/docs)
- 📖 [Documentação Express](https://expressjs.com/)
- 📖 [Documentação TypeScript](https://www.typescriptlang.org/docs)
- 📖 [Roadmap Backend](../roadmaps/roadmap_backend.md)

---

**Bom desenvolvimento! 🚀**
