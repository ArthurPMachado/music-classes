/*
  Warnings:

  - You are about to drop the column `has_permission` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_admin` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'STUDENT');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "has_permission",
DROP COLUMN "is_admin",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'STUDENT';
