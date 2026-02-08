CREATE TABLE `todos` (
	`id` char(36) NOT NULL DEFAULT (uuid()),
	`name` text NOT NULL,
	`is_complete` boolean NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `todos_id` PRIMARY KEY(`id`)
);
