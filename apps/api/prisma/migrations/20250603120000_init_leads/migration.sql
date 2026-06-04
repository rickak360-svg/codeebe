-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('new', 'contacted', 'meeting_scheduled', 'proposal_sent', 'converted', 'lost');

-- CreateEnum
CREATE TYPE "LeadSource" AS ENUM ('estimate', 'contact');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "companyName" TEXT,
    "projectType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT[],
    "timeline" TEXT NOT NULL,
    "budgetRange" TEXT,
    "source" "LeadSource",
    "status" "LeadStatus" NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estimate" JSONB,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "Lead_email_idx" ON "Lead"("email");
