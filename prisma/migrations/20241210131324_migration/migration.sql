-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isBan" BOOLEAN NOT NULL DEFAULT false;
