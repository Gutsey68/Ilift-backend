-- DropForeignKey
ALTER TABLE "ExercicesResultsPosts" DROP CONSTRAINT "ExercicesResultsPosts_postsId_fkey";

-- DropForeignKey
ALTER TABLE "UsersComments" DROP CONSTRAINT "UsersComments_postsId_fkey";

-- DropForeignKey
ALTER TABLE "UsersLikes" DROP CONSTRAINT "UsersLikes_postsId_fkey";

-- DropForeignKey
ALTER TABLE "UsersShares" DROP CONSTRAINT "UsersShares_postsId_fkey";

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TagsPosts" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "UsersLikes" ADD CONSTRAINT "UsersLikes_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersShares" ADD CONSTRAINT "UsersShares_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersComments" ADD CONSTRAINT "UsersComments_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercicesResultsPosts" ADD CONSTRAINT "ExercicesResultsPosts_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
