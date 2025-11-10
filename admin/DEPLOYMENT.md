# Guia de Deploy - Admin Panel

Este guia explica como fazer o deploy do painel administrativo e resolver problemas comuns de roteamento em SPAs (Single Page Applications).

## Problema: 404 ao Fazer Refresh em Rotas

Quando você acessa diretamente uma URL como `https://jbadmin.roilabs.com.br/leads/new` ou faz refresh (F5), você pode receber um erro 404. Isso acontece porque:

1. O React Router gerencia rotas no **client-side**
2. Quando você faz refresh, o servidor tenta buscar um arquivo físico
3. Como o arquivo não existe, retorna 404

**Solução:** Configurar o servidor para redirecionar todas as requisições para `index.html`

---

## Opções de Deploy

### 1. Vercel (Recomendado)

O arquivo `vercel.json` já está configurado:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Deploy:**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer deploy
cd admin
vercel --prod
```

### 2. Netlify

O arquivo `public/_redirects` já está configurado:

```
/*    /index.html   200
```

**Deploy:**
```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Fazer deploy
cd admin
npm run build
netlify deploy --prod --dir=dist
```

### 3. Servidor Nginx

Use o arquivo `nginx.conf.example` como base:

```bash
# 1. Build da aplicação
npm run build

# 2. Copiar arquivos para o servidor
scp -r dist/* user@server:/var/www/jbadmin/

# 3. Configurar Nginx
sudo cp nginx.conf.example /etc/nginx/sites-available/jbadmin.roilabs.com.br
sudo ln -s /etc/nginx/sites-available/jbadmin.roilabs.com.br /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**Linha importante no nginx.conf:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 4. Apache

Crie um arquivo `.htaccess` na pasta `dist`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 5. Docker + Nginx

Crie um `Dockerfile` na pasta admin:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build e run:**
```bash
docker build -t admin-panel .
docker run -p 80:80 admin-panel
```

---

## Verificação

Após fazer o deploy, teste:

1. Acesse a página inicial: `https://jbadmin.roilabs.com.br`
2. Navegue para: `https://jbadmin.roilabs.com.br/leads/new`
3. Faça **hard refresh** (Ctrl+Shift+R ou Cmd+Shift+R)
4. ✅ A página deve carregar corretamente, sem erro 404

---

## Deploy Atual (Inferido)

Baseado no domínio `jbadmin.roilabs.com.br`, parece que você está usando um servidor próprio.

**Ação necessária:**

1. Verifique se o Nginx está configurado corretamente
2. Certifique-se de que a linha `try_files $uri $uri/ /index.html;` está presente
3. Rebuild a aplicação: `npm run build`
4. Copie os arquivos da pasta `dist` para o servidor
5. Recarregue o Nginx: `sudo systemctl reload nginx`

---

## Troubleshooting

### Erro persiste após configuração

1. Limpe o cache do navegador
2. Verifique os logs do servidor:
   ```bash
   # Nginx
   sudo tail -f /var/log/nginx/error.log

   # Apache
   sudo tail -f /var/log/apache2/error.log
   ```
3. Verifique se o arquivo de configuração está sendo usado:
   ```bash
   sudo nginx -T | grep try_files
   ```

### API retorna erro CORS

Certifique-se de que o backend está configurado com o domínio correto em `ALLOWED_ORIGINS`:

```env
ALLOWED_ORIGINS=https://jbadmin.roilabs.com.br,http://localhost:5173
```

---

## Suporte

Se o problema persistir, entre em contato com o time de DevOps ou verifique a documentação específica do seu provedor de hospedagem.
