/*
  Warnings:

  - You are about to drop the column `reps` on the `Exercices` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `Exercices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercices" DROP COLUMN "reps",
DROP COLUMN "sets";
