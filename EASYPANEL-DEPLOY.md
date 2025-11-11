# 🚀 Deploy no Easypanel com Configuração SPA

## 📋 Pré-requisitos

- Conta no Easypanel configurada
- Repositório GitHub conectado
- Domínios configurados (jbadvocacia.roilabs.com.br e jbadmin.roilabs.com.br)

## 🎯 Arquivos Criados

Para resolver permanentemente o problema de 404 em rotas SPA, foram criados:

### Frontend (Site Público)
- ✅ `frontend/Dockerfile` - Build otimizado com nginx
- ✅ `frontend/nginx.conf` - Configuração nginx com SPA fallback
- ✅ `frontend/.dockerignore` - Otimização de build

### Admin
- ✅ `admin/Dockerfile` - Build otimizado com nginx
- ✅ `admin/nginx.conf` - Configuração nginx com SPA fallback
- ✅ `admin/.dockerignore` - Otimização de build

## 🔧 Configuração no Easypanel

### 1. Frontend (jbadvocacia.roilabs.com.br)

#### Criar Aplicação

1. No Easypanel, clique em **"Create Application"**
2. Escolha **"Deploy from GitHub"**
3. Selecione o repositório: `secure-business-architect`
4. Configure:

```yaml
Name: jbadvocacia-frontend
Type: Dockerfile
Branch: main
Build Context: ./frontend
Dockerfile Path: ./frontend/Dockerfile
Port: 80
```

#### Variáveis de Ambiente (Build Time)

```env
VITE_API_URL=https://backjennifer.roilabs.com.br/api
VITE_APP_URL=https://jbadvocacia.roilabs.com.br
```

#### Domínio

- Domain: `jbadvocacia.roilabs.com.br`
- SSL: Ativar (Let's Encrypt)

### 2. Admin (jbadmin.roilabs.com.br)

#### Criar Aplicação

1. No Easypanel, clique em **"Create Application"**
2. Escolha **"Deploy from GitHub"**
3. Selecione o repositório: `secure-business-architect`
4. Configure:

```yaml
Name: jbadmin
Type: Dockerfile
Branch: main
Build Context: ./admin
Dockerfile Path: ./admin/Dockerfile
Port: 80
```

#### Variáveis de Ambiente (Build Time)

```env
VITE_API_URL=https://backjennifer.roilabs.com.br/api
VITE_APP_URL=https://jbadmin.roilabs.com.br
```

#### Domínio

- Domain: `jbadmin.roilabs.com.br`
- SSL: Ativar (Let's Encrypt)

### 3. Backend (backjennifer.roilabs.com.br)

Se ainda não configurado:

```yaml
Name: backend
Type: Dockerfile
Branch: main
Build Context: ./backend
Dockerfile Path: ./backend/Dockerfile
Port: 5000
```

#### Variáveis de Ambiente

Todas as variáveis do `.env` do backend.

## 🎨 Como Funciona

### nginx.conf Explicado

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Esta linha é **crítica** para SPAs:

1. **`$uri`** - Tenta servir o arquivo exato (ex: `/logo.svg`)
2. **`$uri/`** - Tenta servir como diretório
3. **`/index.html`** - Se nada funcionar, serve o index.html

**Resultado:** Todas as rotas do React Router funcionam, mesmo com F5!

### Dockerfile Explicado

#### Build Stage
```dockerfile
FROM node:18-alpine AS builder
# Instala dependências e builda o projeto
```

#### Production Stage
```dockerfile
FROM nginx:alpine
# Copia nginx.conf customizado
# Copia arquivos buildados
# Serve com nginx
```

**Benefícios:**
- ✅ Imagem final pequena (~25MB)
- ✅ nginx.conf sempre aplicado em cada deploy
- ✅ Health checks automáticos
- ✅ Gzip compression ativado
- ✅ Cache de assets estáticos (1 ano)

## 🔄 Deploy Automático

Após configurar, **cada push para main** vai:

1. ✅ Triggerar build automático no Easypanel
2. ✅ Aplicar a configuração nginx.conf
3. ✅ Fazer deploy da nova versão
4. ✅ Manter as rotas SPA funcionando

## ✅ Verificação Pós-Deploy

### Teste Manual

1. Acesse https://jbadvocacia.roilabs.com.br/contato
2. Pressione F5 (hard refresh)
3. Deve carregar normalmente ✅

### Teste com curl

```bash
# Deve retornar 200 OK
curl -I https://jbadvocacia.roilabs.com.br/contato

# Deve retornar "healthy"
curl https://jbadvocacia.roilabs.com.br/health
```

### Verificar Logs

No Easypanel:
1. Vá em **Applications** → **jbadvocacia-frontend**
2. Clique em **Logs**
3. Procure por erros de nginx

## 🐛 Troubleshooting

### Problema: Ainda dá 404

**Causa:** Build não pegou o nginx.conf

**Solução:**
1. No Easypanel, vá em **Settings**
2. Em **Rebuild**, clique em **Rebuild from Scratch**
3. Aguarde o build completo

### Problema: Build falha

**Causa:** Variáveis de ambiente faltando

**Solução:**
1. Verifique se todas as env vars estão configuradas
2. Especialmente `VITE_API_URL`

### Problema: Assets 404

**Causa:** Base URL incorreta no Vite

**Solução:**
Adicione ao `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/',  // Importante para rotas funcionarem
  // ... resto da config
})
```

## 📊 Monitoramento

### Health Checks

O Dockerfile inclui health checks automáticos:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --quiet --tries=1 --spider http://localhost/health
```

O Easypanel vai marcar a aplicação como "unhealthy" se falhar.

### Logs

Verifique logs regularmente:
- Erros de nginx
- Requests 404 (não devem existir mais!)
- Performance

## 🎯 Próximos Passos

1. Fazer push dessas mudanças:
   ```bash
   git add frontend/Dockerfile frontend/nginx.conf frontend/.dockerignore
   git add admin/Dockerfile admin/nginx.conf admin/.dockerignore
   git commit -m "feat: add Dockerfiles with nginx SPA config for Easypanel"
   git push
   ```

2. No Easypanel:
   - Reconfigurar as aplicações para usar Dockerfile
   - Triggerar rebuild
   - Verificar funcionamento

3. Testar todas as rotas com F5

## 📚 Referências

- [Easypanel Documentation](https://easypanel.io/docs)
- [Nginx SPA Configuration](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files)
- [Vite Build Options](https://vitejs.dev/guide/build.html)
- [Docker Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)

---

**✨ Agora os 404 são coisa do passado! Cada deploy vai manter a configuração correta automaticamente.**
