# Domínios e URLs do Projeto

## Produção

### Frontend (Site Institucional)
- **URL**: https://jbadvocacia.roilabs.com.br
- **Tecnologia**: React + Vite + TypeScript
- **Deploy**: Vercel ou Easypanel
- **Pasta**: `/frontend`

### Backend (API)
- **URL**: https://backjennifer.roilabs.com.br
- **Tecnologia**: Node.js + Express + TypeScript + Prisma
- **Deploy**: Easypanel (VPS)
- **Pasta**: `/backend`
- **Porta**: 3000

### Admin (Painel Administrativo & CRM)
- **URL**: https://jbadmin.roilabs.com.br
- **Tecnologia**: React + Vite + TypeScript (a implementar)
- **Deploy**: Vercel ou Easypanel
- **Pasta**: `/admin` (a criar)

---

## Desenvolvimento Local

### Frontend
```bash
cd frontend
npm run dev
```
- URL: http://localhost:8080

### Backend
```bash
cd backend
npm run dev
```
- URL: http://localhost:3000
- Health check: http://localhost:3000/health

### Admin (quando implementado)
```bash
cd admin
npm run dev
```
- URL: http://localhost:5173

---

## Configuração de CORS

### Backend (.env)

**Desenvolvimento:**
```env
ALLOWED_ORIGINS=http://localhost:8080,http://localhost:5173
```

**Produção:**
```env
ALLOWED_ORIGINS=https://jbadvocacia.roilabs.com.br,https://jbadmin.roilabs.com.br
```

---

## Configuração no Easypanel

### Backend API

1. **Criar App no Easypanel**
   - Nome: `secure-business-architect-backend`
   - Tipo: Node.js (via Dockerfile)

2. **Conectar Repositório**
   - GitHub: `JeanZorzetti/secure-business-architect`
   - Branch: `main`
   - Path: `/backend`

3. **Configurar Build**
   - Build Method: Dockerfile
   - Dockerfile Path: `backend/Dockerfile`

4. **Configurar Domínio**
   - Adicionar domínio customizado: `backjennifer.roilabs.com.br`
   - SSL automático (Let's Encrypt)

5. **Variáveis de Ambiente**
   ```env
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=postgresql://jennifer:PAzo18**@dados_jennifer:5432/jennifer?schema=public
   REDIS_URL=redis://redis-service:6379
   JWT_SECRET=<gerar-secret-seguro-32-chars>
   JWT_REFRESH_SECRET=<gerar-secret-seguro-32-chars>
   ALLOWED_ORIGINS=https://jbadvocacia.roilabs.com.br,https://jbadmin.roilabs.com.br
   FRONTEND_URL=https://jbadvocacia.roilabs.com.br
   BACKEND_URL=https://backjennifer.roilabs.com.br
   ADMIN_URL=https://jbadmin.roilabs.com.br
   SMTP_HOST=<seu-smtp-host>
   SMTP_USER=<seu-smtp-user>
   SMTP_PASSWORD=<seu-smtp-password>
   EMAIL_FROM=noreply@jbadvocacia.com.br
   ADMIN_EMAIL=contato@jbadvocacia.com.br
   ```

6. **Executar Migrations**
   - One-off command: `npm run migrate:deploy`

### Frontend

1. **Deploy no Vercel (Recomendado)**
   - Conectar repositório GitHub
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework Preset: Vite

2. **Variáveis de Ambiente**
   ```env
   VITE_API_URL=https://backjennifer.roilabs.com.br
   ```

3. **Domínio Customizado**
   - Adicionar: `jbadvocacia.roilabs.com.br`

### Admin (quando implementado)

1. **Deploy no Vercel**
   - Root Directory: `admin`
   - Build Command: `npm run build`
   - Output Directory: `dist`

2. **Variáveis de Ambiente**
   ```env
   VITE_API_URL=https://backjennifer.roilabs.com.br
   ```

3. **Domínio Customizado**
   - Adicionar: `jbadmin.roilabs.com.br`

---

## DNS (Configuração necessária)

Configure os seguintes registros DNS no seu provedor de domínio:

### Frontend
```
Tipo: A ou CNAME
Host: jbadvocacia
Valor: <IP do Vercel ou Easypanel>
```

### Backend
```
Tipo: A
Host: backjennifer
Valor: 31.97.23.166 (IP da VPS)
```

### Admin
```
Tipo: A ou CNAME
Host: jbadmin
Valor: <IP do Vercel ou Easypanel>
```

---

## SSL/HTTPS

Todos os domínios devem ter SSL configurado:

- **Easypanel**: SSL automático via Let's Encrypt
- **Vercel**: SSL automático incluído

---

## Health Checks

### Backend
- **Endpoint**: `GET /health`
- **Response**:
  ```json
  {
    "status": "ok",
    "timestamp": "2025-11-06T...",
    "uptime": 123.456,
    "environment": "production"
  }
  ```

### Verificação em Produção
```bash
curl https://backjennifer.roilabs.com.br/health
```

---

## Fluxo de Integração

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Usuário acessa: https://jbadvocacia.roilabs.com.br       │
│                                                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Preenche formulário de contato
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  POST https://backjennifer.roilabs.com.br/api/contacts    │
│                                                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Salva no banco + Envia email
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Admin visualiza em: https://jbadmin.roilabs.com.br       │
│  (CRM - Dashboard de Leads)                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Segurança

### Secrets a Gerar

Para produção, gere secrets seguros:

```bash
# JWT Secret (min 32 caracteres)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# JWT Refresh Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### HTTPS Obrigatório

Em produção, forçar HTTPS:
- Configurado automaticamente pelo Easypanel/Vercel
- Backend rejeita requisições HTTP em produção

### CORS Restritivo

Apenas os domínios listados em `ALLOWED_ORIGINS` podem acessar a API.

---

## Monitoramento

### Logs
- **Easypanel**: Logs disponíveis no painel
- **Vercel**: Logs em tempo real no dashboard

### Uptime Monitoring
Recomendado usar:
- UptimeRobot
- Pingdom
- Better Uptime

Configure alertas para:
- `https://backjennifer.roilabs.com.br/health`
- `https://jbadvocacia.roilabs.com.br`
- `https://jbadmin.roilabs.com.br`

---

## Backup

### Banco de Dados
- Configurar backups automáticos no Easypanel
- Frequência recomendada: Diário
- Retenção: 30 dias

### Uploads
- Se usar S3/Cloudinary: backups automáticos
- Se local: incluir `/uploads` no backup

---

## Troubleshooting

### CORS Error
**Problema**: Frontend não consegue fazer requisições para o backend

**Solução**:
1. Verificar `ALLOWED_ORIGINS` no backend
2. Confirmar que o domínio está correto (com https://)
3. Verificar se o backend está rodando

### 502 Bad Gateway
**Problema**: Backend não está respondendo

**Solução**:
1. Verificar logs no Easypanel
2. Verificar se migrations foram executadas
3. Verificar conexão com banco de dados
4. Reiniciar o serviço

### Database Connection Error
**Problema**: Backend não conecta ao PostgreSQL

**Solução**:
1. Verificar `DATABASE_URL` nas variáveis de ambiente
2. Confirmar que PostgreSQL está rodando
3. Verificar credenciais (user, password, database name)
4. Testar conexão manualmente

---

## Checklist de Deploy

### Backend
- [ ] Código no GitHub
- [ ] App criado no Easypanel
- [ ] Dockerfile configurado
- [ ] Variáveis de ambiente configuradas
- [ ] PostgreSQL conectado
- [ ] Redis conectado (opcional)
- [ ] Migrations executadas
- [ ] Seed executado (se necessário)
- [ ] Domínio configurado (backjennifer.roilabs.com.br)
- [ ] SSL ativo
- [ ] Health check respondendo
- [ ] CORS configurado
- [ ] Emails funcionando

### Frontend
- [ ] Deploy no Vercel
- [ ] Variável VITE_API_URL configurada
- [ ] Build funcionando
- [ ] Domínio configurado (jbadvocacia.roilabs.com.br)
- [ ] SSL ativo
- [ ] Site acessível
- [ ] Formulário de contato funcionando

### Admin (futuro)
- [ ] Deploy no Vercel
- [ ] Variável VITE_API_URL configurada
- [ ] Domínio configurado (jbadmin.roilabs.com.br)
- [ ] SSL ativo
- [ ] Login funcionando
- [ ] Dashboard carregando

---

**Última atualização**: 2025-11-06
