# 🎨 Teste de Open Graph - Preview Social Media

## Mudanças Implementadas

### ✅ Removido
- ❌ Logo "Lovable"
- ❌ URL `https://lovable.dev/opengraph-image-p98pqg.png`

### ✅ Adicionado
- ✨ Imagem customizada `og-image.svg` (1200x630px)
- ✨ Design com cores da marca (#0A0F1C background, #C9A875 accent)
- ✨ Meta tags completas (Open Graph + Twitter Cards)
- ✨ Informações corretas da Jennifer Barreto

---

## 🧪 Como Testar

### 1. Após Deploy no Vercel

Aguarde o deploy completar em: https://jbadvocacia.roilabs.com.br

### 2. Validar Open Graph

#### Facebook Sharing Debugger
1. Acesse: https://developers.facebook.com/tools/debug/
2. Cole a URL: `https://jbadvocacia.roilabs.com.br`
3. Clique em **Fetch new information**
4. Verifique se aparece:
   - ✅ Título: "Jennifer Barreto - Advocacia Empresarial Estratégica"
   - ✅ Descrição: "Estratégia Antes da Minuta..."
   - ✅ Imagem: Preview do og-image.svg (sem logo Lovable)

#### LinkedIn Post Inspector
1. Acesse: https://www.linkedin.com/post-inspector/
2. Cole a URL: `https://jbadvocacia.roilabs.com.br`
3. Clique em **Inspect**
4. Verifique preview

#### Twitter Card Validator
1. Acesse: https://cards-dev.twitter.com/validator
2. Cole a URL: `https://jbadvocacia.roilabs.com.br`
3. Clique em **Preview card**

### 3. Teste no WhatsApp

#### Método 1: Enviar URL Real
1. Abra WhatsApp Web ou App
2. Envie para você mesmo: `https://jbadvocacia.roilabs.com.br`
3. Aguarde preview carregar
4. Deve aparecer:
   - ✅ Card com design customizado
   - ✅ Título correto
   - ✅ Descrição correta
   - ✅ SEM logo Lovable

#### Método 2: Limpar Cache do WhatsApp
Se ainda aparecer a imagem antiga:

**WhatsApp Web**:
1. Ctrl + Shift + Delete (limpar cache)
2. Ou abra em aba anônima

**WhatsApp App**:
1. Android: Configurações → Armazenamento → Limpar cache
2. iOS: Desinstalar e reinstalar (última opção)

### 4. Verificar Meta Tags no Site

Acesse `https://jbadvocacia.roilabs.com.br` e inspecione (F12):

```html
<!-- Deve conter -->
<meta property="og:image" content="https://jbadvocacia.roilabs.com.br/og-image.svg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:title" content="Jennifer Barreto - Advocacia Empresarial Estratégica" />
```

---

## 🎨 Design da Imagem Open Graph

### Especificações
- **Tamanho**: 1200x630px (padrão recomendado)
- **Formato**: SVG (escalável)
- **Cores**:
  - Background: `#0A0F1C` (dark navy)
  - Accent: `#C9A875` (gold)
  - Text: `#FFFFFF` (white)
  - Secondary: `#94A3B8`, `#64748B` (grays)

### Elementos
- Logo/Nome: "Jennifer Barreto" (grande, bold)
- Subtítulo: "Advocacia Empresarial Estratégica"
- Tagline: "Estratégia Antes da Minuta"
- Descrição: "Assessoria jurídica que começa na negociação..."
- URL: "jbadvocacia.roilabs.com.br"
- Elementos decorativos (círculos, linha accent)

---

## 🔄 Atualizar Imagem (Futuro)

### Opção 1: Criar Imagem PNG/JPG Profissional

Se quiser substituir o SVG por uma imagem real:

1. **Design no Canva/Figma**:
   - Template: 1200x630px
   - Adicionar foto da Jennifer
   - Manter cores da marca
   - Exportar como PNG (alta qualidade)

2. **Substituir arquivo**:
   ```bash
   # Remover SVG
   rm frontend/public/og-image.svg

   # Adicionar PNG
   cp ~/Downloads/og-image.png frontend/public/
   ```

3. **Atualizar meta tags** em `index.html`:
   ```html
   <meta property="og:image" content="https://jbadvocacia.roilabs.com.br/og-image.png" />
   ```

### Opção 2: Imagem Dinâmica por Página

Para gerar imagens diferentes por página (blog posts, serviços):

1. Use o endpoint já criado: `/api/seo/meta/:type/:identifier`
2. Configure `react-helmet` ou `react-helmet-async`
3. Gere imagens com serviços como:
   - Vercel OG Image
   - Cloudinary
   - imgix

---

## 📱 Plataformas que Usam Open Graph

### Suportam og:image
- ✅ Facebook
- ✅ LinkedIn
- ✅ WhatsApp
- ✅ Telegram
- ✅ Discord
- ✅ Slack
- ✅ iMessage (parcial)

### Usam Twitter Cards
- ✅ Twitter/X
- ✅ Alguns apps de terceiros

---

## 🐛 Troubleshooting

### Problema: Ainda aparece logo Lovable

**Causa**: Cache de redes sociais

**Solução**:
1. Use Facebook Debugger para forçar refresh
2. Limpe cache do WhatsApp
3. Aguarde 24-48h (algumas plataformas demoram)

### Problema: Imagem não carrega

**Verificar**:
1. URL está acessível: `curl https://jbadvocacia.roilabs.com.br/og-image.svg`
2. Headers corretos (deve retornar `Content-Type: image/svg+xml`)
3. Sem bloqueio CORS
4. HTTPS funcionando (certificado válido)

### Problema: Imagem cortada ou distorcida

**Solução**:
- Manter proporção 1200:630 (ratio 1.91:1)
- Evitar textos muito pequenos
- Testar em diferentes dispositivos

---

## 📊 Métricas de Sucesso

Após implementação, monitore:

- **CTR em links compartilhados**: Deve aumentar com preview atraente
- **Tempo de permanência**: Visitantes de social media
- **Taxa de rejeição**: Deve diminuir (preview correto = expectativa alinhada)

---

## 🚀 Próximos Passos Recomendados

1. **Criar versões específicas**:
   - og-image-blog.svg (para posts)
   - og-image-servicos.svg (para serviços)

2. **Adicionar foto profissional**:
   - Foto da Jennifer em alta qualidade
   - Manter branding consistente

3. **Testar A/B**:
   - Diferentes designs
   - Com/sem foto
   - Diferentes taglines

4. **Automatizar geração**:
   - Vercel OG Image generator
   - Template dinâmico por conteúdo

---

## 📚 Referências

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Docs](https://developer.twitter.com/en/docs/twitter-for-websites/cards)
- [Facebook Sharing Best Practices](https://developers.facebook.com/docs/sharing/best-practices)
- [WhatsApp Link Preview](https://faq.whatsapp.com/general/how-to-format-your-messages)

---

**Imagem Open Graph customizada implementada!** ✅

Agora o preview em WhatsApp, Facebook, LinkedIn e outras plataformas mostrará a identidade da marca Jennifer Barreto, sem logo Lovable.
