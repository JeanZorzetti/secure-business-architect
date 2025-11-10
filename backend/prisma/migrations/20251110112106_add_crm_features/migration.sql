-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CONVERTED', 'LOST');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('EMAIL', 'PHONE', 'MEETING', 'WHATSAPP', 'OTHER');

-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "assignedTo" TEXT,
ADD COLUMN     "lastContact" TIMESTAMP(3),
ADD COLUMN     "leadStatus" "LeadStatus" DEFAULT 'NEW',
ADD COLUMN     "nextFollowUp" TIMESTAMP(3),
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "source" TEXT DEFAULT 'website',
ADD COLUMN     "tags" TEXT[];

-- CreateTable
CREATE TABLE "interactions" (
    "id" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "InteractionType" NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "interactions_contactId_idx" ON "interactions"("contactId");

-- CreateIndex
CREATE INDEX "interactions_userId_idx" ON "interactions"("userId");

-- CreateIndex
CREATE INDEX "interactions_createdAt_idx" ON "interactions"("createdAt");

-- CreateIndex
CREATE INDEX "notes_contactId_idx" ON "notes"("contactId");

-- CreateIndex
CREATE INDEX "notes_userId_idx" ON "notes"("userId");

-- CreateIndex
CREATE INDEX "notes_createdAt_idx" ON "notes"("createdAt");

-- CreateIndex
CREATE INDEX "contacts_leadStatus_idx" ON "contacts"("leadStatus");

-- CreateIndex
CREATE INDEX "contacts_priority_idx" ON "contacts"("priority");

-- CreateIndex
CREATE INDEX "contacts_assignedTo_idx" ON "contacts"("assignedTo");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
