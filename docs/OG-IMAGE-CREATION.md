# 🎨 Criando Imagem Open Graph PNG

## Problema

O WhatsApp não suporta SVG para Open Graph. Precisamos de PNG ou JPG.

## Solução Rápida - Método 1: Screenshot do HTML

1. **Abrir o arquivo HTML**:
   ```bash
   # Navegue até:
   frontend/public/generate-og-image.html
   ```

2. **Abrir no navegador**:
   - Chrome/Edge: Apertar F12 (DevTools)
   - Definir resolução: 1200x630px
   - Device: Responsive
   - Zoom: 100%

3. **Tirar screenshot**:
   - Windows: Win + Shift + S (Ferramenta de Captura)
   - Ou usar extensão do navegador
   - Cortar exatamente 1200x630px

4. **Salvar**:
   ```bash
   # Salvar como:
   frontend/public/og-image.png
   ```

5. **Atualizar index.html**:
   ```html
   <meta property="og:image" content="https://jbadvocacia.roilabs.com.br/og-image.png" />
   <meta property="og:image:type" content="image/png" />
   ```

---

## Solução Profissional - Método 2: Canva

### 1. Criar no Canva

1. Acesse: https://www.canva.com
2. Criar design personalizado: **1200 x 630 px**
3. Design sugerido:

**Background**:
- Cor: `#0A0F1C` (azul escuro)
- Ou gradiente: `#1E293B` → `#0A0F1C`

**Elementos**:
- Texto principal: "Jennifer Barreto" (branco, bold, 72px)
- Subtítulo: "Advocacia Empresarial Estratégica" (dourado `#C9A875`, 40px)
- Tagline: "Estratégia Antes da Minuta" (cinza `#94A3B8`, 32px)
- Descrição: "Assessoria jurídica que começa..." (cinza `#64748B`, 26px)
- URL: "jbadvocacia.roilabs.com.br" (dourado `#C9A875`, 28px)

**Decoração**:
- Linha vertical dourada (6px, `#C9A875`)
- Círculos decorativos (opcional)
- Aspas gigantes (opcional, marca d'água)

### 2. Exportar
- Formato: PNG
- Qualidade: Alta
- Nome: `og-image.png`

### 3. Upload
- Colocar em `frontend/public/og-image.png`

---

## Solução Automática - Método 3: Serviço Online

### Opção A: Vercel OG Image (Recomendado)

**Vantagens**: Gratuito, dinâmico, CDN rápido

1. **Criar API Route** em `frontend`:
   ```bash
   # Estrutura:
   frontend/api/og-image.tsx  # Edge function
   ```

2. **Código**:
   ```tsx
   import { ImageResponse } from '@vercel/og';

   export const config = {
     runtime: 'edge',
   };

   export default function handler() {
     return new ImageResponse(
       (
         <div
           style={{
             background: 'linear-gradient(135deg, #1E293B 0%, #0A0F1C 100%)',
             width: '100%',
             height: '100%',
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'center',
             padding: '80px 120px',
           }}
         >
           <div style={{ color: '#FFF', fontSize: 72, fontWeight: 700 }}>
             Jennifer Barreto
           </div>
           <div style={{ color: '#C9A875', fontSize: 40, fontWeight: 300, marginTop: 20 }}>
             Advocacia Empresarial Estratégica
           </div>
           <div style={{ color: '#94A3B8', fontSize: 32, marginTop: 50 }}>
             Estratégia Antes da Minuta
           </div>
           <div style={{ color: '#64748B', fontSize: 26, marginTop: 20 }}>
             Assessoria jurídica que começa na negociação
           </div>
           <div style={{ color: '#C9A875', fontSize: 28, marginTop: 50 }}>
             jbadvocacia.roilabs.com.br
           </div>
         </div>
       ),
       {
         width: 1200,
         height: 630,
       }
     );
   }
   ```

3. **Usar**:
   ```html
   <meta property="og:image" content="https://jbadvocacia.roilabs.com.br/api/og-image" />
   ```

### Opção B: Cloudinary

1. **Upload manual** em https://cloudinary.com
2. **Obter URL**: `https://res.cloudinary.com/[cloud]/image/upload/og-image.png`
3. **Usar URL** no meta tag

### Opção C: Imgix / ImageKit

Similar ao Cloudinary, hospedagem + CDN + otimização automática

---

## Método Temporário - Placeholder

Enquanto cria a imagem final, use um placeholder:

```html
<!-- Temporário: usa um serviço de placeholder -->
<meta property="og:image" content="https://placehold.co/1200x630/0A0F1C/C9A875/png?text=Jennifer+Barreto+-+Advocacia+Empresarial" />
```

---

## Teste Final

### 1. Facebook Debugger
https://developers.facebook.com/tools/debug/

### 2. LinkedIn Post Inspector
https://www.linkedin.com/post-inspector/

### 3. Twitter Card Validator
https://cards-dev.twitter.com/validator

### 4. WhatsApp
- Enviar URL para você mesmo
- Verificar preview

### 5. Limpar Cache
Se ainda mostra imagem antiga:

**Facebook**:
```bash
curl -X POST -F "id=https://jbadvocacia.roilabs.com.br" \
     -F "scrape=true" \
     "https://graph.facebook.com"
```

**WhatsApp**:
- Aguardar 24h (cache agressivo)
- Ou adicionar query param: `?v=2`

---

## Checklist

- [ ] Imagem criada (1200x630px)
- [ ] Formato PNG ou JPG
- [ ] Tamanho < 8MB
- [ ] Upload em `frontend/public/`
- [ ] Meta tag atualizada
- [ ] Commit e push
- [ ] Deploy no Vercel
- [ ] Teste no Facebook Debugger
- [ ] Teste no WhatsApp
- [ ] Cache limpo (se necessário)

---

## Solução URGENTE

**Se precisa resolver AGORA**:

1. Use este placeholder temporário:
   ```html
   <meta property="og:image" content="https://via.placeholder.com/1200x630/0A0F1C/C9A875?text=Jennifer+Barreto" />
   ```

2. Depois substitua por imagem real quando tiver tempo

---

## Arquivo Atual

O arquivo `frontend/public/generate-og-image.html` está pronto para ser aberto no navegador e ter screenshot tirado. É a forma mais rápida sem precisar de ferramentas externas.

**Passos**:
1. Abrir arquivo no navegador
2. F12 → Set viewport 1200x630
3. Screenshot (Win+Shift+S)
4. Salvar como og-image.png
5. Commit e push
6. Testar!

✅ Isso resolve o problema do WhatsApp não mostrando preview.
