-- CreateTable
CREATE TABLE "ShowcaseProject" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "techStack" TEXT[],
    "overview" TEXT NOT NULL,
    "problemSolved" TEXT NOT NULL,
    "keyFeatures" TEXT[],
    "businessValue" TEXT NOT NULL,
    "costRange" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShowcaseProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShowcaseProject_slug_key" ON "ShowcaseProject"("slug");

-- CreateIndex
CREATE INDEX "ShowcaseProject_published_sortOrder_idx" ON "ShowcaseProject"("published", "sortOrder");

-- CreateIndex
CREATE INDEX "ShowcaseProject_sortOrder_idx" ON "ShowcaseProject"("sortOrder");
