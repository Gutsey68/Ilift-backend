/*
  Warnings:

  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exercice_results` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exercices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `follow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `muscle_groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `programs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `targets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_progress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workout_exercices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workouts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "exercice_results" DROP CONSTRAINT "exercice_results_exerciceId_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_followerId_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_followingId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_postId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_userId_fkey";

-- DropForeignKey
ALTER TABLE "programs" DROP CONSTRAINT "programs_userId_fkey";

-- DropForeignKey
ALTER TABLE "targets" DROP CONSTRAINT "targets_exerciceId_fkey";

-- DropForeignKey
ALTER TABLE "targets" DROP CONSTRAINT "targets_muscleGroupId_fkey";

-- DropForeignKey
ALTER TABLE "user_progress" DROP CONSTRAINT "user_progress_userId_fkey";

-- DropForeignKey
ALTER TABLE "workout_exercices" DROP CONSTRAINT "workout_exercices_exerciceId_fkey";

-- DropForeignKey
ALTER TABLE "workout_exercices" DROP CONSTRAINT "workout_exercices_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "workouts" DROP CONSTRAINT "workouts_userId_fkey";

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "exercice_results";

-- DropTable
DROP TABLE "exercices";

-- DropTable
DROP TABLE "follow";

-- DropTable
DROP TABLE "likes";

-- DropTable
DROP TABLE "muscle_groups";

-- DropTable
DROP TABLE "posts";

-- DropTable
DROP TABLE "programs";

-- DropTable
DROP TABLE "targets";

-- DropTable
DROP TABLE "user_progress";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "workout_exercices";

-- DropTable
DROP TABLE "workouts";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profilePhoto" TEXT,
    "roleId" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "followerId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Programs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workouts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "programId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercices" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciceResults" (
    "id" TEXT NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "exerciceId" TEXT NOT NULL,

    CONSTRAINT "ExerciceResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MuscleGroups" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MuscleGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersFollowers" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsersFollowers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersLikes" (
    "postsId" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersLikes_pkey" PRIMARY KEY ("postsId","usersId")
);

-- CreateTable
CREATE TABLE "UsersShares" (
    "postsId" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersShares_pkey" PRIMARY KEY ("postsId","usersId")
);

-- CreateTable
CREATE TABLE "UsersComments" (
    "postsId" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsersComments_pkey" PRIMARY KEY ("postsId","usersId")
);

-- CreateTable
CREATE TABLE "ExerciceMuscleGroups" (
    "exercicesId" TEXT NOT NULL,
    "musculeGroupsId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExerciceMuscleGroups_pkey" PRIMARY KEY ("musculeGroupsId","exercicesId")
);

-- CreateTable
CREATE TABLE "WorkoutsExercises" (
    "workoutId" TEXT NOT NULL,
    "exerciceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutsExercises_pkey" PRIMARY KEY ("exerciceId","workoutId")
);

-- CreateTable
CREATE TABLE "UsersProgramsFollows" (
    "programId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsersProgramsFollows_pkey" PRIMARY KEY ("programId","userId")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExercicesResultsPosts" (
    "postsId" TEXT NOT NULL,
    "exercicesResultsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExercicesResultsPosts_pkey" PRIMARY KEY ("exercicesResultsId","postsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_pseudo_key" ON "User"("pseudo");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_followerId_key" ON "User"("followerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programs" ADD CONSTRAINT "Programs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workouts" ADD CONSTRAINT "Workouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workouts" ADD CONSTRAINT "Workouts_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciceResults" ADD CONSTRAINT "ExerciceResults_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "Exercices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersLikes" ADD CONSTRAINT "UsersLikes_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersLikes" ADD CONSTRAINT "UsersLikes_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersShares" ADD CONSTRAINT "UsersShares_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersShares" ADD CONSTRAINT "UsersShares_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersComments" ADD CONSTRAINT "UsersComments_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersComments" ADD CONSTRAINT "UsersComments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciceMuscleGroups" ADD CONSTRAINT "ExerciceMuscleGroups_exercicesId_fkey" FOREIGN KEY ("exercicesId") REFERENCES "Exercices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciceMuscleGroups" ADD CONSTRAINT "ExerciceMuscleGroups_musculeGroupsId_fkey" FOREIGN KEY ("musculeGroupsId") REFERENCES "MuscleGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutsExercises" ADD CONSTRAINT "WorkoutsExercises_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutsExercises" ADD CONSTRAINT "WorkoutsExercises_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "Exercices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersProgramsFollows" ADD CONSTRAINT "UsersProgramsFollows_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersProgramsFollows" ADD CONSTRAINT "UsersProgramsFollows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercicesResultsPosts" ADD CONSTRAINT "ExercicesResultsPosts_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercicesResultsPosts" ADD CONSTRAINT "ExercicesResultsPosts_exercicesResultsId_fkey" FOREIGN KEY ("exercicesResultsId") REFERENCES "ExerciceResults"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
