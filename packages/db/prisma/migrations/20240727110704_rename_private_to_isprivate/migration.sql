/*
  Warnings:

  - You are about to drop the column `private` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "private",
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
