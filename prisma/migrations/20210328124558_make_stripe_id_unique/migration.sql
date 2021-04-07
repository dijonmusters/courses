/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[stripeId]` on the table `User`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User.stripeId_unique" ON "User"("stripeId");
