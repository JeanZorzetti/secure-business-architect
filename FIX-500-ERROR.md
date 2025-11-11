# ⚠️ CORREÇÃO URGENTE - Erro 500 no Blog

## 🔍 Problema

O endpoint `/api/admin/blog/posts` está retornando erro 500 porque há uma **migração pendente** no banco de dados.

## ✅ Solução Rápida (3 comandos)

Execute estes comandos no **servidor de produção**:

```bash
# 1. Conectar ao servidor
ssh root@31.97.23.166

# 2. Aplicar a migração
cd /root/secure-business-architect && \
git pull && \
docker exec secure-business-architect-backend npx prisma migrate deploy && \
docker restart secure-business-architect-backend

# 3. Verificar se funcionou
docker logs secure-business-architect-backend --tail 20
```

### ✨ Logs esperados após o fix:

```
✅ Database connected successfully
⏰ Scheduler started for post publishing
🚀 Server running on port 5000
```

## 🧪 Testar

Após aplicar, acesse: https://jbadmin.roilabs.com.br/blog

O erro 500 deve ter desaparecido.

## 📋 O que a migração adiciona?

- ✅ Sistema de **rascunhos automáticos** (auto-save)
- ✅ **Preview** de posts antes de publicar
- ✅ **Agendamento** de publicação com cron job
- ✅ Tabela de **categorias** de blog
- ✅ Índices para otimização de performance

## 🆘 Se der erro

Veja o guia completo em [MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md) com 3 opções de deploy.
