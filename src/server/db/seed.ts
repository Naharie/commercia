import {accounts, categories, products, sessions, users, verificationTokens} from "./schema";
import {db} from "./";

const main = async () => {
    console.log("Seed start");

    db.delete(verificationTokens);
    db.delete(sessions);
    db.delete(accounts);
    db.delete(users);

    db.delete(categories);
    db.delete(products);

    // Users

    // For this project I have decided to simply use the email as the id (as many services effectively do).
    // However, the id column is separate and could use a uuid instead if you so desire.

    // require("crypto").randomUUID()

    await db.insert(users).values([
        {
            id: "venral@example.com",
            email: "venral@example.com",
            emailVerified: new Date("2024-7-14 12:53:09.63"),
            name: "Venral",
            image: "9c64d378-b9cc-4f07-bf46-b1c02999c8b6.png"
        }
    ]);

    // Products

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

    await db.insert(products).values({
        name: "Vintage Postcard",
        description: "Vintage style postcards made from a collage of old timey photos and pressed flowers. The photos used are a combination of free for use content found online and ones personally taken by the artists.",
        image: "https://images.unsplash.com/photo-1719938571129-473874150f78?w=600&auto=format&fit=crop",
        category: 5, // Arts & Crafts
        priceUSD: 25,
        shop: 1 // Venral
    });

    console.log("Seed done");
};

main();