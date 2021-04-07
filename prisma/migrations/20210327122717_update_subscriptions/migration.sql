/*
  Warnings:

  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeId" TEXT NOT NULL DEFAULT E'hi',
ADD COLUMN     "isSubscribed" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Subscription";
