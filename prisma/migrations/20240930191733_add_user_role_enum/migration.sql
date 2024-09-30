-- AlterTable
ALTER TABLE `histories` ADD COLUMN `type` ENUM('download', 'upload') NOT NULL DEFAULT 'upload';
