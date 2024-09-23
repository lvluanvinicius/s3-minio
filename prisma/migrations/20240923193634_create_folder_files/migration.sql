-- CreateTable
CREATE TABLE `folders` (
    `id` VARCHAR(191) NOT NULL,
    `bucket_id` VARCHAR(191) NOT NULL,
    `folder_id` VARCHAR(191) NULL,
    `folder_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `files` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `bucket_id` VARCHAR(191) NOT NULL,
    `folder_id` VARCHAR(191) NULL,
    `file_name` VARCHAR(191) NOT NULL,
    `file_hash` VARCHAR(191) NOT NULL,
    `file_size` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `folders` ADD CONSTRAINT `folders_bucket_id_fkey` FOREIGN KEY (`bucket_id`) REFERENCES `buckets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `files` ADD CONSTRAINT `files_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `files` ADD CONSTRAINT `files_bucket_id_fkey` FOREIGN KEY (`bucket_id`) REFERENCES `buckets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `files` ADD CONSTRAINT `files_folder_id_fkey` FOREIGN KEY (`folder_id`) REFERENCES `folders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
