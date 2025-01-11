/*
  Warnings:

  - You are about to drop the column `name` on the `ExerciceMuscleGroups` table. All the data in the column will be lost.
  - Added the required column `name` to the `MuscleGroups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciceMuscleGroups" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "MuscleGroups" ADD COLUMN     "name" TEXT NOT NULL;
