-- AlterTable
ALTER TABLE `app_config` ADD COLUMN `bucket_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `app_config` ADD CONSTRAINT `app_config_bucket_id_fkey` FOREIGN KEY (`bucket_id`) REFERENCES `buckets`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
