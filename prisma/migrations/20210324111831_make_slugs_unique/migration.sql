/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[slug]` on the table `Course`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[slug]` on the table `Lesson`. If there are existing duplicate values, the migration will fail.
  - Made the column `slug` on table `Course` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Lesson` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course.slug_unique" ON "Course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson.slug_unique" ON "Lesson"("slug");
