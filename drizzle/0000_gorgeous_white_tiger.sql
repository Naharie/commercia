CREATE TABLE `commercia_account`
(
    `userId`            text(255) NOT NULL,
    `type`              text(255) NOT NULL,
    `provider`          text(255) NOT NULL,
    `providerAccountId` text(255) NOT NULL,
    `refresh_token`     text,
    `access_token`      text,
    `expires_at`        integer,
    `token_type`        text(255),
    `scope`             text(255),
    `id_token`          text,
    `session_state`     text(255),
    PRIMARY KEY (`provider`, `providerAccountId`),
    FOREIGN KEY (`userId`) REFERENCES `commercia_user` (`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `commercia_product_image`
(
    `uuid`       text(36),
    `product_id` integer,
    FOREIGN KEY (`product_id`) REFERENCES `commercia_product` (`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `commercia_product`
(
    `id`          integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `name`        text(50) NOT NULL,
    `description` text(1000),
    `price`       real,
    `category`    text(30) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `commercia_reviews`
(
    `id`         integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `product_id` integer,
    `user_id`    text NOT NULL,
    `rating`     integer,
    `text`       text(2000) NOT NULL,
    FOREIGN KEY (`product_id`) REFERENCES `commercia_product` (`id`) ON UPDATE no action ON DELETE no action,
    FOREIGN KEY (`user_id`) REFERENCES `commercia_user` (`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `commercia_session`
(
    `sessionToken` text(255) PRIMARY KEY NOT NULL,
    `userId`       text(255) NOT NULL,
    `expires`      integer NOT NULL,
    FOREIGN KEY (`userId`) REFERENCES `commercia_user` (`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `commercia_user`
(
    `id`            text(255) PRIMARY KEY NOT NULL,
    `name`          text(255),
    `email`         text(255) NOT NULL,
    `emailVerified` integer DEFAULT CURRENT_TIMESTAMP,
    `image`         text(255)
);
--> statement-breakpoint
CREATE TABLE `commercia_verificationToken`
(
    `identifier` text(255) NOT NULL,
    `token`      text(255) NOT NULL,
    `expires`    integer NOT NULL,
    PRIMARY KEY (`identifier`, `token`)
);
--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `commercia_account` (`userId`);--> statement-breakpoint
CREATE INDEX `product_id_idx` ON `commercia_product_image` (`product_id`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `commercia_product` (`name`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `commercia_session` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `commercia_user_id_unique` ON `commercia_user` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `commercia_user_email_unique` ON `commercia_user` (`email`);