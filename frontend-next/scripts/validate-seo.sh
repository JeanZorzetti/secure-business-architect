#!/bin/bash

# SEO Validation Script
# Validates all critical SEO elements in production

DOMAIN="https://jbadvocacia.roilabs.com.br"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================="
echo "SEO VALIDATION - Jennifer Barreto Advocacia"
echo "Domain: $DOMAIN"
echo "========================================="
echo ""

# Pages to validate
PAGES=(
  "/"
  "/sobre"
  "/servicos"
  "/contato"
  "/calculadora"
  "/conteudo"
)

# Function to check canonical URL
check_canonical() {
  local page=$1
  local url="${DOMAIN}${page}"

  echo -n "Checking canonical for $page... "

  canonical=$(curl -s "$url" | grep -o '<link rel="canonical" href="[^"]*"' | sed 's/.*href="\([^"]*\)".*/\1/')

  if [ -n "$canonical" ]; then
    echo -e "${GREEN}✓ Found:${NC} $canonical"
  else
    echo -e "${RED}✗ Missing${NC}"
  fi
}

# Function to check title
check_title() {
  local page=$1
  local url="${DOMAIN}${page}"

  echo -n "Checking title for $page... "

  title=$(curl -s "$url" | grep -o '<title>[^<]*</title>' | sed 's/<title>\(.*\)<\/title>/\1/')

  if [ -n "$title" ]; then
    echo -e "${GREEN}✓${NC} $title"
  else
    echo -e "${RED}✗ Missing${NC}"
  fi
}

# Function to check meta description
check_description() {
  local page=$1
  local url="${DOMAIN}${page}"

  echo -n "Checking description for $page... "

  description=$(curl -s "$url" | grep -o '<meta name="description" content="[^"]*"' | sed 's/.*content="\([^"]*\)".*/\1/')

  if [ -n "$description" ]; then
    echo -e "${GREEN}✓${NC} ${description:0:60}..."
  else
    echo -e "${RED}✗ Missing${NC}"
  fi
}

# Function to check Open Graph
check_og() {
  local page=$1
  local url="${DOMAIN}${page}"

  echo -n "Checking OG tags for $page... "

  og_title=$(curl -s "$url" | grep -o '<meta property="og:title" content="[^"]*"' | wc -l)
  og_desc=$(curl -s "$url" | grep -o '<meta property="og:description" content="[^"]*"' | wc -l)

  if [ "$og_title" -gt 0 ] && [ "$og_desc" -gt 0 ]; then
    echo -e "${GREEN}✓ Complete${NC}"
  else
    echo -e "${YELLOW}⚠ Incomplete${NC}"
  fi
}

echo "========================================="
echo "1. CANONICAL URLs"
echo "========================================="
for page in "${PAGES[@]}"; do
  check_canonical "$page"
done

echo ""
echo "========================================="
echo "2. TITLE TAGS"
echo "========================================="
for page in "${PAGES[@]}"; do
  check_title "$page"
done

echo ""
echo "========================================="
echo "3. META DESCRIPTIONS"
echo "========================================="
for page in "${PAGES[@]}"; do
  check_description "$page"
done

echo ""
echo "========================================="
echo "4. OPEN GRAPH TAGS"
echo "========================================="
for page in "${PAGES[@]}"; do
  check_og "$page"
done

echo ""
echo "========================================="
echo "5. SITEMAP & ROBOTS"
echo "========================================="

echo -n "Checking sitemap.xml... "
sitemap=$(curl -s "${DOMAIN}/sitemap.xml" | grep -o '<url>' | wc -l)
if [ "$sitemap" -gt 0 ]; then
  echo -e "${GREEN}✓ Found $sitemap URLs${NC}"
else
  echo -e "${RED}✗ Not found${NC}"
fi

echo -n "Checking robots.txt... "
robots=$(curl -s "${DOMAIN}/robots.txt" | grep -o 'Sitemap:' | wc -l)
if [ "$robots" -gt 0 ]; then
  echo -e "${GREEN}✓ Found${NC}"
else
  echo -e "${RED}✗ Not found${NC}"
fi

echo ""
echo "========================================="
echo "6. PERFORMANCE CHECK"
echo "========================================="

echo -n "Checking homepage response time... "
start_time=$(date +%s%N)
curl -s "$DOMAIN" > /dev/null
end_time=$(date +%s%N)
elapsed=$((($end_time - $start_time) / 1000000))

if [ "$elapsed" -lt 1000 ]; then
  echo -e "${GREEN}✓ ${elapsed}ms${NC} (Excellent)"
elif [ "$elapsed" -lt 2000 ]; then
  echo -e "${YELLOW}⚠ ${elapsed}ms${NC} (Good)"
else
  echo -e "${RED}✗ ${elapsed}ms${NC} (Slow)"
fi

echo ""
echo "========================================="
echo "VALIDATION COMPLETE"
echo "========================================="
