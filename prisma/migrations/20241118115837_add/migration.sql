/*
  Warnings:

  - You are about to drop the column `reps` on the `ExerciceResults` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `ExerciceResults` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExerciceResults" DROP COLUMN "reps",
DROP COLUMN "weight";

-- CreateTable
CREATE TABLE "Sets" (
    "id" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "exerciceResultId" TEXT NOT NULL,

    CONSTRAINT "Sets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sets" ADD CONSTRAINT "Sets_exerciceResultId_fkey" FOREIGN KEY ("exerciceResultId") REFERENCES "ExerciceResults"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
