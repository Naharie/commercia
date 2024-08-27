import {InferInsertModel, InferSelectModel, relations, sql} from "drizzle-orm";
import {index, int, primaryKey, real, sqliteTableCreator, text,} from "drizzle-orm/sqlite-core";
import {type AdapterAccount} from "next-auth/adapters";

export const createTable = sqliteTableCreator((name) => `commercia_${name}`);

// Users and Auth

export const users = createTable("user", {
    id: text("id", {length: 36}).notNull().primaryKey().unique(),
    name: text("name", {length: 50}).notNull().unique(),
    email: text("email", {length: 255}).notNull().unique(),
    emailVerified: int("emailVerified", {
        mode: "timestamp",
    }).default(sql`CURRENT_TIMESTAMP`),
    image: text("image", {length: 255}),
    password: text("password", {length: 60}).notNull()
});

export const usersRelations = relations(users, ({many}) => ({
    accounts: many(accounts),
}));

export const accounts = createTable(
    "account",
    {
        userId: text("userId", {length: 255})
            .notNull()
            .references(() => users.id),
        type: text("type", {length: 255})
            .$type<AdapterAccount["type"]>()
            .notNull(),
        provider: text("provider", {length: 255}).notNull(),
        providerAccountId: text("providerAccountId", {length: 255}).notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: int("expires_at"),
        token_type: text("token_type", {length: 255}),
        scope: text("scope", {length: 255}),
        id_token: text("id_token"),
        session_state: text("session_state", {length: 255}),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
        userIdIdx: index("account_userId_idx").on(account.userId),
    })
);

export const accountsRelations = relations(accounts, ({one}) => ({
    user: one(users, {fields: [accounts.userId], references: [users.id]}),
}));

export const sessions = createTable(
    "session",
    {
        sessionToken: text("sessionToken", {length: 255}).notNull().primaryKey(),
        userId: text("userId", {length: 255})
            .notNull()
            .references(() => users.id),
        expires: int("expires", {mode: "timestamp"}).notNull(),
    },
    (session) => ({
        userIdIdx: index("session_userId_idx").on(session.userId),
    })
);

export const sessionsRelations = relations(sessions, ({one}) => ({
    user: one(users, {fields: [sessions.userId], references: [users.id]}),
}));

export const verificationTokens = createTable(
    "verificationToken",
    {
        identifier: text("identifier", {length: 255}).notNull(),
        token: text("token", {length: 255}).notNull(),
        expires: int("expires", {mode: "timestamp"}).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({columns: [vt.identifier, vt.token]}),
    })
);

// Products

export const categories = createTable(
    "category",
    {
        id: int("id", {mode: "number"}).primaryKey({autoIncrement: true}).notNull(),
        name: text("name", {length: 30}).notNull(),
        image: text("image", {length: 100}).notNull()
    }
);

export const products = createTable(
    "product",
    {
        id: int("id", {mode: "number"}).primaryKey({autoIncrement: true}).notNull(),
        name: text("name", {length: 50}).notNull(),
        description: text("description", {length: 500}).notNull(),
        image: text("image", {length: 255}).notNull(),
        priceUSD: int("price").notNull(),
        category: int("category", {mode: "number"}).references(() => categories.id).notNull(),
        shop: text("shop", {length: 36}).references(() => users.id).notNull()
    },
    product => ({
        nameIndex: index("name_idx").on(product.name),
    })
);

export const orders = createTable(
    "orders",
    {
        id: int("id", {mode: "number"}).primaryKey({autoIncrement: true}).notNull(),
        
        name: text("name", { length: 50 }).notNull(),

        address_line_1: text("addressLine1", { length: 256 }).notNull(),
        address_line_2: text("addressLine2", { length: 256 }).notNull(),
        city: text("city", { length: 100 }).notNull(),
        state: text("state", { length: 100 }).notNull(),
        postalCode: text("postalCode", { length: 30 }).notNull(),
        country: text("country", { length: 30 }).notNull()
    }
);
export const orderedProducts = createTable(
    "orderedProducts",
    {
        id: int("id", {mode: "number"}).primaryKey({autoIncrement: true}).notNull(),
        order: int("order", {mode: "number"}).references(() => orders.id).notNull(),
        product: int("product", {mode: "number"}).references(() => products.id).notNull()
    }
);