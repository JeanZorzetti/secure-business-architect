#!/bin/bash

# Script para aplicar migração do Prisma no servidor de produção
# Uso: ./deploy-migration.sh

set -e

echo "🚀 Iniciando deploy da migração..."

# Configurações
SERVER="root@31.97.23.166"
CONTAINER="secure-business-architect-backend"
APP_DIR="/root/secure-business-architect"

echo "📦 1. Fazendo pull das últimas alterações no servidor..."
ssh $SERVER "cd $APP_DIR && git pull"

echo "🔄 2. Reconstruindo o container backend..."
ssh $SERVER "cd $APP_DIR && docker-compose up -d --build backend"

echo "⏳ 3. Aguardando container inicializar (10 segundos)..."
sleep 10

echo "🗄️  4. Aplicando migrações do Prisma..."
ssh $SERVER "docker exec $CONTAINER npx prisma migrate deploy"

echo "♻️  5. Reiniciando container para garantir mudanças..."
ssh $SERVER "docker restart $CONTAINER"

echo "⏳ 6. Aguardando reinicialização (5 segundos)..."
sleep 5

echo "✅ Deploy da migração concluído!"
echo ""
echo "📊 Status do container:"
ssh $SERVER "docker ps | grep $CONTAINER"
echo ""
echo "📝 Últimos logs:"
ssh $SERVER "docker logs $CONTAINER --tail 20"
