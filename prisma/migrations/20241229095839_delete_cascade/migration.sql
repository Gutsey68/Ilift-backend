-- DropForeignKey
ALTER TABLE "ExercicesResultsPosts" DROP CONSTRAINT "ExercicesResultsPosts_exercicesResultsId_fkey";

-- DropForeignKey
ALTER TABLE "Sets" DROP CONSTRAINT "Sets_exerciceResultId_fkey";

-- AddForeignKey
ALTER TABLE "ExercicesResultsPosts" ADD CONSTRAINT "ExercicesResultsPosts_exercicesResultsId_fkey" FOREIGN KEY ("exercicesResultsId") REFERENCES "ExerciceResults"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sets" ADD CONSTRAINT "Sets_exerciceResultId_fkey" FOREIGN KEY ("exerciceResultId") REFERENCES "ExerciceResults"("id") ON DELETE CASCADE ON UPDATE CASCADE;
