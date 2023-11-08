/*
  Warnings:

  - The `permission` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "permission",
ADD COLUMN     "permission" BOOLEAN NOT NULL DEFAULT false;
