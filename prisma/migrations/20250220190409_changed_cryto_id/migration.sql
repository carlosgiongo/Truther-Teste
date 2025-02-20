/*
  Warnings:

  - The primary key for the `CryptoCoin` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "CryptoCoin" DROP CONSTRAINT "CryptoCoin_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CryptoCoin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CryptoCoin_id_seq";
