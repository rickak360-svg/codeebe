-- CreateEnum
CREATE TYPE "ServiceKind" AS ENUM ('card', 'badge');

-- CreateTable
CREATE TABLE "ServiceItem" (
    "id" TEXT NOT NULL,
    "kind" "ServiceKind" NOT NULL DEFAULT 'card',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ServiceItem_kind_published_sortOrder_idx" ON "ServiceItem"("kind", "published", "sortOrder");

-- CreateIndex
CREATE INDEX "ServiceItem_sortOrder_idx" ON "ServiceItem"("sortOrder");
