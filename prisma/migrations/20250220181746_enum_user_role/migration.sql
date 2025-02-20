/*
  Warnings:

  - The `funcao` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('cliente', 'admin');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "funcao",
ADD COLUMN     "funcao" "UserRole" NOT NULL DEFAULT 'cliente';
