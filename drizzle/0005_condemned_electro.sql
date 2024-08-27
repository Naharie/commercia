CREATE TABLE `commercia_orderedProducts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order` integer NOT NULL,
	`product` integer NOT NULL,
	FOREIGN KEY (`order`) REFERENCES `commercia_orders`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product`) REFERENCES `commercia_product`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `commercia_orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(50) NOT NULL,
	`addressLine1` text(256) NOT NULL,
	`addressLine2` text(256) NOT NULL,
	`city` text(100) NOT NULL,
	`state` text(100) NOT NULL,
	`postalCode` integer NOT NULL,
	`country` text(30) NOT NULL
);
--> statement-breakpoint
DROP TABLE `commercia_reviews`;--> statement-breakpoint
/*
 SQLite does not support "Changing existing column type" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
CREATE UNIQUE INDEX `commercia_user_name_unique` ON `commercia_user` (`name`);