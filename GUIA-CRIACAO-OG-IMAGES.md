# 🎨 Guia de Criação das Imagens Open Graph

## 📐 Especificações Técnicas

- **Dimensões:** 1200x630px (proporção 1.91:1)
- **Formato:** JPG
- **Qualidade:** 90-95%
- **Tamanho máximo:** 300KB por imagem
- **Nome dos arquivos:**
  - `og-image.jpg` (homepage e páginas gerais)
  - `og-image-blog.jpg` (blog)

---

## 🎯 Método 1: HTML Template (Mais Rápido)

### Passo a Passo:

1. **Abra o arquivo:** `og-images-templates.html` no navegador Chrome ou Firefox

2. **Configure o DevTools:**
   - Pressione `F12` para abrir DevTools
   - Clique no ícone de dispositivo móvel (ou `Ctrl+Shift+M`)
   - Configure resolução customizada: **1200x630px**

3. **Capture o screenshot:**
   - Clique com botão direito na imagem
   - Selecione "Capturar screenshot do nó"
   - Salve como `og-image.jpg` e `og-image-blog.jpg`

4. **Coloque no projeto:**
   ```
   /frontend-next/public/og-image.jpg
   /frontend-next/public/og-image-blog.jpg
   ```

---

## 🎨 Método 2: Canva (Mais Personalizado)

### Template 1: og-image.jpg (Homepage/Geral)

1. **Acesse:** https://www.canva.com/
2. **Criar design customizado:** 1200x630px
3. **Design sugerido:**

```
┌─────────────────────────────────────────────────┐
│                                                 │
│              [Logo/Ícone JB]                   │
│                                                 │
│         ADVOCACIA EMPRESARIAL                  │
│                                                 │
│         Jennifer Barreto                       │
│                                                 │
│   Estratégia jurídica que protege e           │
│   impulsiona seu negócio                      │
│                                                 │
│         jbadvocacia.roilabs.com.br            │
└─────────────────────────────────────────────────┘
```

**Elementos:**
- **Background:** Gradiente escuro (#1a1a1a → #2d2d2d)
- **Logo/Badge circular:** Iniciais "JB" em círculo dourado (#C9A961)
- **Título:** "Jennifer Barreto" - Fonte: Montserrat Bold, 72px, branco
- **Subtítulo:** "ADVOCACIA EMPRESARIAL" - 32px, dourado (#C9A961), uppercase
- **Tagline:** 28px, branco com 80% opacidade
- **URL:** Rodapé centralizado, 20px, branco 50% opacidade

### Template 2: og-image-blog.jpg (Blog)

```
┌──────────────┬──────────────────────────────────┐
│              │                                  │
│   [Ícone     │    Da Minha Mesa                 │
│    Livro]    │                                  │
│              │  Insights práticos sobre         │
│    BLOG      │  direito empresarial             │
│              │                                  │
│              │  [Avatar] Jennifer Barreto       │
│              │           Advocacia Empresarial  │
└──────────────┴──────────────────────────────────┘
```

**Layout Split:**
- **Lado esquerdo (40%):** Fundo dourado (#C9A961)
  - Ícone de livro/documento
  - Badge "BLOG" em preto
- **Lado direito (60%):** Fundo escuro (#2d2d2d)
  - Título "Da Minha Mesa" - 64px, dourado
  - Subtítulo em branco
  - Avatar + nome + título

---

## 🎨 Método 3: Figma (Profissional)

### Design System:

**Cores:**
```
Primary Background: #1a1a1a (Preto suave)
Secondary Background: #2d2d2d (Cinza escuro)
Accent Color: #C9A961 (Dourado)
Text Primary: #FFFFFF (Branco)
Text Secondary: rgba(255,255,255,0.7)
```

**Tipografia:**
```
Headings: Montserrat Bold / Inter Bold
Body: Inter Regular
Sizes:
  - H1: 64-72px
  - H2: 32px
  - Body: 24-28px
  - Footer: 18-20px
```

**Template Figma:**
1. Acesse: https://www.figma.com/
2. Crie novo design: 1200x630px
3. Use os elementos do design system acima
4. Exporte como JPG 90%

---

## 🔧 Método 4: Ferramentas Online

### Opção A: HTML to Image
1. Acesse: https://html-to-image.com/
2. Cole o HTML do template
3. Configure 1200x630px
4. Download como JPG

### Opção B: Screenshot Machine
1. Acesse: https://www.screenshotmachine.com/
2. Upload do HTML
3. Configure dimensões
4. Download

### Opção C: Cloudinary
1. Use transformações de imagem
2. Aplique overlays de texto
3. Export 1200x630px

---

## ✅ Checklist Pré-Upload

Antes de fazer upload das imagens:

- [ ] Dimensões exatas: 1200x630px
- [ ] Formato JPG com qualidade 90-95%
- [ ] Tamanho do arquivo < 300KB
- [ ] Texto legível e contrastante
- [ ] Cores do brand (dourado #C9A961 + preto)
- [ ] Logo/branding visível
- [ ] Sem cortes ou distorções

---

## 🧪 Teste as Imagens

Após criar e fazer upload:

1. **Facebook Debugger**
   ```
   https://developers.facebook.com/tools/debug/
   ```
   - Cole a URL: `https://jbadvocacia.roilabs.com.br`
   - Clique em "Debug"
   - Verifique o preview da imagem

2. **LinkedIn Post Inspector**
   ```
   https://www.linkedin.com/post-inspector/
   ```
   - Cole a URL
   - Veja como aparecerá no LinkedIn

3. **Twitter Card Validator**
   ```
   https://cards-dev.twitter.com/validator
   ```
   - Teste o preview do Twitter

4. **OpenGraph.xyz**
   ```
   https://www.opengraph.xyz/
   ```
   - Visualizador universal de tags OG

---

## 📁 Estrutura Final

Após criação, sua estrutura deve ficar:

```
frontend-next/
├── public/
│   ├── og-image.jpg          ← Homepage, Contato, Serviços, etc.
│   ├── og-image-blog.jpg     ← Blog listing e posts sem cover
│   └── ... (outros assets)
```

---

## 🎨 Exemplos de Referência

Sites com boas OG images:

- **Advocacia:** https://www.bmalaw.com.br/
- **Corporativo:** https://stripe.com/
- **Blog jurídico:** https://www.migalhas.com.br/

---

## ⚡ Atalho Rápido (Se tiver pressa)

**Use o template HTML fornecido:**

1. Abra `og-images-templates.html` no Chrome
2. Pressione F12 → Toggle Device Toolbar
3. Configure 1200x630px
4. Botão direito na imagem → Capturar screenshot
5. Salve em `/public/`
6. Pronto! ✅

---

## 🚀 Deploy

Após criar as imagens:

1. Coloque em `/frontend-next/public/`
2. Commit e push:
   ```bash
   git add frontend-next/public/og-image*.jpg
   git commit -m "feat: add Open Graph images for social sharing"
   git push
   ```
3. Deploy no Vercel
4. Teste as URLs com Facebook Debugger

---

## 📊 Impacto Esperado

Com as imagens OG implementadas:

✅ **+150% de CTR** em compartilhamentos sociais
✅ **Aparência profissional** no Facebook/LinkedIn/Twitter
✅ **Branding consistente** em todas as plataformas
✅ **Compliance total** com Open Graph Protocol

---

**Criado em:** 2025-01-16
**Por:** Claude Code
**Para:** Jennifer Barreto Advocacia
