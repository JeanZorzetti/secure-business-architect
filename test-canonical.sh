#!/bin/bash

# Script para validar canonical URLs após deploy
# Uso: bash test-canonical.sh

echo "🔍 Testando Canonical URLs em Produção"
echo "========================================"
echo ""

BASE_URL="https://jbadvocacia.roilabs.com.br"

# Array de URLs para testar
declare -a urls=(
  "/"
  "/sobre"
  "/servicos"
  "/conteudo"
  "/contato"
  "/conteudo/contratos-empresariais-clausulas-essenciais"
  "/conteudo/gestao-contratos-lucratividade"
  "/conteudo/sociedade-50-50-riscos"
)

# Função para extrair canonical
extract_canonical() {
  local url=$1
  echo "📄 Testando: $url"

  # Fazer request e procurar por canonical
  canonical=$(curl -s "$BASE_URL$url" | grep -oP '<link rel="canonical" href="\K[^"]+' | head -1)

  if [ -z "$canonical" ]; then
    echo "   ❌ ERRO: Canonical NÃO encontrado!"
  elif [ "$canonical" == "$BASE_URL/" ] && [ "$url" != "/" ]; then
    echo "   ❌ ERRO: Canonical aponta para homepage (INCORRETO)"
    echo "   Found: $canonical"
  elif [ "$canonical" == "$BASE_URL$url" ]; then
    echo "   ✅ OK: $canonical"
  else
    echo "   ⚠️  AVISO: Canonical diferente do esperado"
    echo "   Expected: $BASE_URL$url"
    echo "   Found: $canonical"
  fi
  echo ""
}

# Testar todas as URLs
for url in "${urls[@]}"; do
  extract_canonical "$url"
  sleep 0.5  # Pequeno delay para não sobrecarregar
done

echo "========================================"
echo "✅ Teste concluído!"
echo ""
echo "Se todos mostrarem ✅ OK, o problema está resolvido."
echo "Se houver ❌ ERRO, aguarde o deploy completar (3-5 min)."
