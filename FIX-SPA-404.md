# 🔧 Correção: Erro 404 em Rotas SPA

## 🔍 Problema

Ao acessar diretamente rotas como `/contato`, `/servicos`, `/blog` e dar refresh (F5), o servidor retorna erro 404.

**Causa:** O servidor web (nginx) não está configurado para Single Page Application (SPA). Ele está tentando encontrar arquivos físicos nas rotas em vez de redirecionar tudo para `index.html`.

## ✅ Solução

### Opção 1: Configuração Nginx (Recomendado)

#### 1. Conectar ao servidor

```bash
ssh root@31.97.23.166
```

#### 2. Editar configuração do frontend

```bash
nano /etc/nginx/sites-available/jbadvocacia.roilabs.com.br
```

#### 3. Adicionar a linha mágica

Dentro do bloco `location /`, adicione:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Configuração completa deve ficar assim:**

```nginx
server {
    listen 443 ssl http2;
    server_name jbadvocacia.roilabs.com.br;

    root /var/www/jbadvocacia/dist;
    index index.html;

    # ⭐ Esta é a linha que corrige o problema
    location / {
        try_files $uri $uri/ /index.html;
    }

    # ... resto da configuração
}
```

#### 4. Fazer o mesmo para o admin

```bash
nano /etc/nginx/sites-available/jbadmin.roilabs.com.br
```

Adicionar a mesma linha `try_files $uri $uri/ /index.html;`

#### 5. Testar a configuração

```bash
nginx -t
```

Se aparecer "syntax is ok" e "test is successful", prossiga.

#### 6. Recarregar nginx

```bash
systemctl reload nginx
```

#### 7. Testar

Acesse:
- https://jbadvocacia.roilabs.com.br/contato
- https://jbadvocacia.roilabs.com.br/servicos
- https://jbadvocacia.roilabs.com.br/blog

Dê F5 (refresh) em cada uma. Deve funcionar!

---

## 📋 Configurações Completas

Criei dois arquivos de configuração completos:

1. **[nginx-spa-config.conf](./nginx-spa-config.conf)** - Frontend público
2. **[nginx-admin-config.conf](./nginx-admin-config.conf)** - Admin

Você pode copiar essas configurações inteiras se preferir.

---

## 🔍 Como Verificar se Está Funcionando

### Teste Manual

1. Acesse https://jbadvocacia.roilabs.com.br/contato
2. Pressione F5 (refresh)
3. Se carregar normalmente sem 404, está funcionando! ✅

### Teste com curl

```bash
curl -I https://jbadvocacia.roilabs.com.br/contato
```

Deve retornar **200 OK** em vez de 404.

---

## 🎯 O que a Configuração Faz

```nginx
try_files $uri $uri/ /index.html;
```

Esta linha diz ao nginx:

1. **$uri** - Tente servir o arquivo exato (ex: `contato` como arquivo)
2. **$uri/** - Tente servir como diretório
3. **/index.html** - Se nada funcionar, sirva o index.html

Como SPAs usam client-side routing (React Router), todas as rotas devem cair no `index.html`, que então carrega o JavaScript que renderiza a rota correta.

---

## ⚠️ Problemas Comuns

### Erro: "No such file or directory"

Verifique se o caminho do `root` está correto:

```bash
ls -la /var/www/jbadvocacia/dist
```

Deve listar os arquivos do build incluindo `index.html`.

### Erro: "Permission denied"

Execute com sudo:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Assets não carregam após refresh

Adicione cache headers:

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## 📚 Recursos

- [Nginx try_files documentation](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files)
- [React Router server configuration](https://reactrouter.com/web/guides/server-rendering)
- [SPA deployment best practices](https://create-react-app.dev/docs/deployment/)

---

## 🆘 Ainda não funciona?

Se mesmo após aplicar essa configuração o problema persistir:

1. Verifique os logs do nginx:
   ```bash
   tail -f /var/log/nginx/error.log
   ```

2. Confirme que o build do React está correto:
   ```bash
   ls /var/www/jbadvocacia/dist/index.html
   ```

3. Teste a configuração do nginx:
   ```bash
   nginx -T | grep "try_files"
   ```

4. Reinicie o nginx completamente:
   ```bash
   systemctl restart nginx
   ```
