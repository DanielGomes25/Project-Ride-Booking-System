/*
  Warnings:

  - You are about to drop the column `price` on the `rides` table. All the data in the column will be lost.
  - Added the required column `value` to the `rides` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rides" DROP COLUMN "price",
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;
