-- CreateTable
CREATE TABLE `histories` (
    `id` VARCHAR(191) NOT NULL,
    `clock` BIGINT NOT NULL,
    `ns` BIGINT NOT NULL,
    `value` DOUBLE NOT NULL,
    `file_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `histories` ADD CONSTRAINT `histories_file_id_fkey` FOREIGN KEY (`file_id`) REFERENCES `files`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
