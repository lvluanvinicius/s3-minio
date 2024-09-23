/*
  Warnings:

  - You are about to alter the column `file_size` on the `files` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `files` MODIFY `file_size` INTEGER NOT NULL;
