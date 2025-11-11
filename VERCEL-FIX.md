# 🔧 Correção de 404 para Vercel (Frontend e Admin)

## 🎯 Problema

Quando você acessa rotas como `/contato`, `/servicos`, `/leads` diretamente ou dá F5, o Vercel retorna **404 NOT_FOUND**.

## ✅ Solução Simples

Basta ter um arquivo `vercel.json` na raiz de cada projeto!

## 📁 Arquivos Criados

✅ **frontend/vercel.json** - Configuração do site público
✅ **admin/vercel.json** - Configuração do painel admin

## 🚀 Como Funciona

O arquivo `vercel.json` contém:

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

Esta configuração diz ao Vercel:
- **Todas as rotas** (`/(.*)`) devem ser redirecionadas para `/index.html`
- O React Router então assume e renderiza a rota correta
- Funciona com F5, acesso direto, compartilhamento de links

## 📦 Deploy Automático

**Não precisa fazer nada no painel do Vercel!**

1. Faça commit dos arquivos `vercel.json`:
   ```bash
   git add frontend/vercel.json admin/vercel.json
   git commit -m "fix: add vercel.json for SPA routing"
   git push
   ```

2. O Vercel vai detectar automaticamente e fazer redeploy

3. Aguarde o deploy finalizar (~1-2 minutos)

4. Teste as rotas:
   - https://jbadvocacia.roilabs.com.br/contato
   - https://jbadvocacia.roilabs.com.br/servicos
   - https://jbadmin.roilabs.com.br/leads

   Dê F5 em cada uma - deve funcionar! ✅

## 🎨 Features Adicionais (Opcional)

O `vercel.json` também pode incluir:

### Security Headers
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### Cache de Assets Estáticos
```json
{
  "headers": [
    {
      "source": "/(.*\\.(js|css|png|jpg|jpeg|gif|ico|svg))",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## ✅ Verificação

### Antes do Fix
```bash
curl -I https://jbadvocacia.roilabs.com.br/contato
# HTTP/2 404 ❌
```

### Depois do Fix
```bash
curl -I https://jbadvocacia.roilabs.com.br/contato
# HTTP/2 200 ✅
```

## 📊 Estrutura Final

```
frontend/
├── src/
├── public/
├── package.json
├── vite.config.ts
└── vercel.json ← Novo arquivo!

admin/
├── src/
├── public/
├── package.json
├── vite.config.ts
└── vercel.json ← Novo arquivo!
```

## 🐛 Troubleshooting

### Ainda dá 404 após deploy

1. Verifique se o `vercel.json` está na **raiz do projeto** (mesma pasta do `package.json`)
2. Force um redeploy no Vercel:
   - Vá em **Deployments**
   - Clique nos 3 pontinhos
   - **Redeploy**
3. Limpe o cache do navegador (Ctrl+Shift+Delete)

### Deploy falhou

Verifique se o JSON está válido:
```bash
cat frontend/vercel.json | jq .
```

## 📚 Documentação Oficial

- [Vercel Rewrites](https://vercel.com/docs/project-configuration#rewrites)
- [Vercel Headers](https://vercel.com/docs/project-configuration#headers)
- [SPA on Vercel](https://vercel.com/guides/deploying-react-with-vercel)

---

## 🎯 Resumo

1. ✅ Criar `vercel.json` com rewrites
2. ✅ Commit e push
3. ✅ Vercel redeploy automático
4. ✅ Testar rotas com F5
5. ✅ Problema resolvido permanentemente!

**É isso! Super simples no Vercel.** 🎉
