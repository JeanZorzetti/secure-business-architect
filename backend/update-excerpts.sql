-- Script para atualizar meta descriptions (excerpts) dos posts
-- Otimizado para 110-160 caracteres conforme recomendação do Google

-- 1. Gestão de Contratos e Lucratividade (249 → 156 chars)
UPDATE blog_posts
SET excerpt = 'Entenda como o ciclo de vida contratual impacta seu resultado financeiro e como evitar as armadilhas mais comuns que drenam recursos da empresa.'
WHERE slug = 'gestao-contratos-lucratividade';

-- 2. Contrato de Parceria no Agronegócio (237 → 154 chars)
UPDATE blog_posts
SET excerpt = 'Descubra como estruturar contratos de parceria no agronegócio que protejam ambas as partes, garantam continuidade operacional e compartilhem riscos.'
WHERE slug = 'contrato-parceria-agronegocio';

-- 3. Sociedade 50/50 - Riscos (253 → 159 chars)
UPDATE blog_posts
SET excerpt = 'Divisão igualitária pode virar pesadelo. Conheça os riscos da sociedade 50/50 e alternativas inteligentes para evitar impasses nas decisões estratégicas.'
WHERE slug = 'sociedade-50-50-riscos';

-- 4. Cláusulas Essenciais em Contratos (175 → 144 chars)
UPDATE blog_posts
SET excerpt = 'Descubra as 3 cláusulas essenciais que são verdadeiras "vacinas jurídicas" para sua empresa e evitam litígios caros e demorados.'
WHERE slug = 'clausulas-essenciais-contratos';

-- 5. POPs no Ambiente Corporativo (195 → 151 chars)
UPDATE blog_posts
SET excerpt = 'POPs são ferramentas poderosas de gestão e proteção legal. Veja como transformar expectativas implícitas em regras explícitas que blindam sua empresa.'
WHERE slug = 'pops-ambiente-corporativo';

-- 6. Negociação Estratégica de Contratos (192 → 138 chars)
UPDATE blog_posts
SET excerpt = 'Aprenda estratégias para fechar acordos vantajosos sem comprometer relações comerciais. Negociação é sobre equilíbrio, não vitória.'
WHERE slug = 'negociacao-estrategica-contratos';

-- 7. Due Diligence Checklist (205 → 153 chars)
UPDATE blog_posts
SET excerpt = 'Conheça os 7 pontos críticos para avaliar antes de qualquer aquisição. Due diligence adequada evita surpresas que podem custar milhões à sua empresa.'
WHERE slug = 'due-diligence-checklist';

-- 8. Passivos Trabalhistas - Prevenção (188 → 148 chars)
UPDATE blog_posts
SET excerpt = 'Identifique sinais de alerta de passivos trabalhistas e implemente cultura de compliance que protege sua empresa antes que seja tarde demais.'
WHERE slug = 'passivos-trabalhistas-prevencao';

-- 9. Contrato Social vs. Acordo de Sócios (210 → 159 chars)
UPDATE blog_posts
SET excerpt = 'Entenda a diferença crucial entre Contrato Social e Acordo de Sócios. Descubra quando usar cada um e por que o Acordo pode ser o mais estratégico.'
WHERE slug = 'contrato-social-acordo-socios';

-- Verificar atualizações
SELECT slug, LENGTH(excerpt) as chars, excerpt
FROM blog_posts
WHERE slug IN (
    'gestao-contratos-lucratividade',
    'contrato-parceria-agronegocio',
    'sociedade-50-50-riscos',
    'clausulas-essenciais-contratos',
    'pops-ambiente-corporativo',
    'negociacao-estrategica-contratos',
    'due-diligence-checklist',
    'passivos-trabalhistas-prevencao',
    'contrato-social-acordo-socios'
)
ORDER BY slug;
