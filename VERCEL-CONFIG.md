# 🚀 Configuração Correta do Vercel (Monorepo)

## ⚠️ Problema

O repositório é um **monorepo** com múltiplos projetos:
```
secure-business-architect/
├── frontend/       ← Site público
├── admin/          ← Painel admin
└── backend/        ← API (não vai no Vercel)
```

O Vercel precisa saber qual pasta fazer build.

## ✅ Solução: Configurar no Painel do Vercel

### Frontend (jbadvocacia.roilabs.com.br)

1. Acesse o projeto no Vercel Dashboard
2. Vá em **Settings** → **General**
3. Configure:

```
Root Directory: frontend
```

4. Em **Build & Development Settings**:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. Clique em **Save**

6. Vá em **Deployments** → Clique no último deploy → **Redeploy**

### Admin (jbadmin.roilabs.com.br)

1. Acesse o projeto no Vercel Dashboard
2. Vá em **Settings** → **General**
3. Configure:

```
Root Directory: admin
```

4. Em **Build & Development Settings**:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. Clique em **Save**

6. Vá em **Deployments** → Clique no último deploy → **Redeploy**

## 🎯 Configuração Visual

### Settings → General

![Root Directory](https://i.imgur.com/example.png)

**Root Directory**: Define qual pasta do monorepo o Vercel deve usar

- ✅ Frontend: `frontend`
- ✅ Admin: `admin`
- ❌ Deixar vazio = tenta build da raiz (erro!)

### Build & Development Settings

```yaml
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Importante:**
- ✅ Output Directory = `dist` (padrão do Vite)
- ❌ Não usar `.next` ou `build`

## 🔄 Variáveis de Ambiente

### Frontend

```
VITE_API_URL=https://backjennifer.roilabs.com.br/api
VITE_APP_URL=https://jbadvocacia.roilabs.com.br
```

### Admin

```
VITE_API_URL=https://backjennifer.roilabs.com.br/api
VITE_APP_URL=https://jbadmin.roilabs.com.br
```

## ✅ Checklist Pré-Deploy

Antes de fazer redeploy, verifique:

- [ ] Root Directory configurado (frontend ou admin)
- [ ] Framework Preset = Vite
- [ ] Build Command = `npm run build`
- [ ] Output Directory = `dist`
- [ ] Variáveis de ambiente configuradas
- [ ] vercel.json existe na pasta do projeto

## 🐛 Troubleshooting

### Erro: "An unexpected error happened"

**Causa:** Root Directory não configurado ou incorreto

**Solução:**
1. Settings → General → Root Directory
2. Definir como `frontend` ou `admin`
3. Save e Redeploy

### Erro: "Build failed"

**Causa:** Variáveis de ambiente faltando

**Solução:**
1. Settings → Environment Variables
2. Adicionar `VITE_API_URL` e `VITE_APP_URL`
3. Redeploy

### Erro: "Output directory not found"

**Causa:** Output Directory incorreto

**Solução:**
1. Settings → Build & Development Settings
2. Output Directory = `dist` (não `build` ou `.next`)
3. Redeploy

## 📸 Capturas de Tela de Referência

### 1. Root Directory

```
Settings → General
├── Root Directory: frontend     ← CRITICAL!
└── Framework Preset: Vite
```

### 2. Build Settings

```
Build & Development Settings
├── Build Command: npm run build
├── Output Directory: dist
└── Install Command: npm install
```

### 3. Environment Variables

```
Environment Variables
├── VITE_API_URL
└── VITE_APP_URL
```

## 🎯 Resultado Esperado

Após configurar corretamente:

1. ✅ Build completa em ~2 minutos
2. ✅ Deploy bem-sucedido
3. ✅ Site acessível
4. ✅ Rotas funcionam com F5 (graças ao vercel.json)

## 📚 Links Úteis

- [Vercel Monorepo Support](https://vercel.com/docs/concepts/monorepos)
- [Vite on Vercel](https://vercel.com/docs/frameworks/vite)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**⚡ Após configurar, o próximo deploy deve funcionar perfeitamente!**
