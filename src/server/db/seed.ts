import {accounts, categories, products, sessions, users, verificationTokens} from "./schema";
import {db} from "./";
import {sql} from "drizzle-orm";

console.log("Seed start");

await db.delete(products);
await db.delete(categories);

await db.delete(verificationTokens);
await db.delete(sessions);
await db.delete(accounts);
await db.delete(users);

// Reset the auto increments
// noinspection SqlWithoutWhere
await db.run(sql`delete from sqlite_sequence`);

// Users

// require("crypto").randomUUID()

const venralId = "11624ed7-e0f6-4652-8742-d09147aa5c58";
const telunId = "20a50d66-e84e-410a-b31d-81e1446f6397";
const krieId = "0f598dcc-988b-4894-a097-c4d28496d48d";
const memerId = "f284f2ef-e502-4652-9c28-834beb19e3f6";

await db.insert(users).values([
    {
        id: venralId,
        email: "venral@example.com",
        emailVerified: new Date("2024-7-14 12:53:09.63"),
        name: "Venral",
        image: "9c64d378-b9cc-4f07-bf46-b1c02999c8b6.png"
    }
]);
await db.insert(users).values([
    {
        id: telunId,
        email: "telun@example.com",
        emailVerified: new Date("2024-7-14 12:53:09.63"),
        name: "Telun",
        image: "6fd7a884-1b54-4c18-bba7-af04e8f68b7a.png"
    }
]);
await db.insert(users).values([
    {
        id: krieId,
        email: "krie@example.com",
        emailVerified: new Date("2024-7-14 12:53:09.63"),
        name: "Krie",
        image: "a0d5da62-9d53-44ba-9cc2-20dd2adb1194.png"
    }
]);
await db.insert(users).values([
    {
        id: memerId,
        email: "memer@example.com",
        emailVerified: new Date("2024-7-14 12:53:09.63"),
        name: "Memer",
        image: "eb65cb41-6a6b-411a-81fb-26e84e69d959.png"
    }
]);

// Categories

await db.insert(categories).values([
    {
        name: "Jewelry",
        image: "https://plus.unsplash.com/premium_photo-1661645473770-90d750452fa0?w=200&h=200&fit=crop"
    },
    {
        name: "Clothing",
        image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=200&h=200&fit=crop"
    },
    {
        name: "Interior Decorations",
        image: "https://images.unsplash.com/photo-1708164970111-8ae9a5eed7b1?w=200&h=200&auto=format&fit=crop"
    },
    {
        name: "Garden & Floral",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200&h=200&fit=crop"
    },
    {
        name: "Arts & Crafts",
        image: "https://images.unsplash.com/photo-1528938102132-4a9276b8e320?w=200&h=200&fit=crop"
    },

    {
        name: "Bags & Backpacks",
        image: "https://plus.unsplash.com/premium_photo-1680373109883-47a3617e9acd?w=200&h=200&fit=crop"
    },
    {
        name: "Bath & Beauty",
        image: "https://images.unsplash.com/photo-1454873019514-eae2f086587a?w=200&h=200&fit=crop"
    },
    {
        name: "Books, Movies & Music",
        image: "https://plus.unsplash.com/premium_photo-1686314406088-f25c0cf842ff?w=200&h=200&fit=crop"
    },
    {
        name: "Accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=200&fit=crop"
    },
    {
        name: "Toys & Games",
        image: "https://plus.unsplash.com/premium_photo-1684623605109-263925d88106?w=200&h=200&fit=crop"
    }
]);

// Products

await db.insert(products).values({
    name: "Vintage Postcard",
    description: "Vintage style postcards made from a collage of old timey photos and pressed flowers. The photos used are a combination of free for use content found online and ones personally taken by the artists.",
    image: "https://images.unsplash.com/photo-1719938571129-473874150f78?w=200&h=200&fit=crop",
    category: 5, // Arts & Crafts
    priceUSD: 25,
    shop: venralId
});

console.log("Seed done");