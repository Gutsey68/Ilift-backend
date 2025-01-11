/*
  Warnings:

  - Added the required column `senderId` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercices" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "senderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Programs" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UsersProgramsFollows" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Workouts" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
