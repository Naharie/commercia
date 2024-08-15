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
        image: "9c64d378-b9cc-4f07-bf46-b1c02999c8b6.png",
        // Passwords here are pre-hashed to ensure fast seed times for development.
        // The current master password can be found in the README.
        // Feel free to replace these with calls to bcrypt.hashSync("your-password", 13 /* The smallest number that results in >= 250 ms delay on your cpu */)
        password: "$2b$13$A6iQEshEFlzRxD.tPYG0cusgHPeuoiGJAuN7pR0x/fyuOJ92dYYGG"
    }
]);
await db.insert(users).values([
    {
        id: telunId,
        email: "telun@example.com",
        emailVerified: new Date("2024-7-14 12:53:09.63"),
        name: "Telun",
        image: "6fd7a884-1b54-4c18-bba7-af04e8f68b7a.png",
        password: "$2b$13$gXqpMGeu4Dj1O08dUrw3wepo6zo/c0W51KP81flv2BcSJCP7.EJcS"
    }
]);
await db.insert(users).values([
    {
        id: krieId,
        email: "krie@example.com",
        emailVerified: new Date("2024-7-14 12:53:09.63"),
        name: "Krie",
        image: "a0d5da62-9d53-44ba-9cc2-20dd2adb1194.png",
        password: "$2b$13$LDux1Dire/e58OsOXtgfsej/bwlkui01cZhJI6EcBLHLy90ZAtfSm"
    }
]);
await db.insert(users).values([
    {
        id: memerId,
        email: "memer@example.com",
        emailVerified: new Date("2024-7-14 12:53:09.63"),
        name: "Memer",
        image: "eb65cb41-6a6b-411a-81fb-26e84e69d959.png",
        password: "$2b$13$px6wleIi8B8/SwHOdlZiLuam8f3T1j5C85WVgerR7BgT3td4r6Kuy"
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

const jewelry = 1; // Example empty category - force this to be handled correctly client side.
const clothing = 2;
const interiorDecorations = 3;
const gardenAndFloral = 4;
const artsAndCrafts = 5;
const bagsAndBackpacks = 6;
const bathAndBeauty = 7;
const booksMoviesAndMusic = 8;
const accessories = 9;
const toysAndGames = 10;

// Venral

await db.insert(products).values({
    name: "Vintage Postcard",
    description: "Vintage style postcard made from a collage of old timey photos and pressed flowers. The photos used are a combination of free for use content found online and ones personally taken by the artists.",
    image: "https://images.unsplash.com/photo-1719938571129-473874150f78?w=200&h=200&fit=crop",
    category: artsAndCrafts,
    priceUSD: 25,
    shop: venralId
});
await db.insert(products).values({
   name: "Gratitude Journal",
   description: "Handmade and decorated gratitude journal. Each journal has its own unique style; some journals may be space themed, others ocean themed, still others fantasy, and much more.",
   image: "https://images.unsplash.com/photo-1528938102132-4a9276b8e320?w=200&h=200&fit=crop",
   category: artsAndCrafts,
   priceUSD: 65,
   shop: venralId
});
await db.insert(products).values({
    name: "Decorative Pot",
    description: "Small decorative pot for windowsill plants and succulents. The pots are made from a combination of chiseled natural rock and artificial accentation and detail.",
    image: "https://images.unsplash.com/photo-1505423070828-64bf1f80c053?w=200&h=200&fit=crop",
    category: gardenAndFloral,
    priceUSD: 15,
    shop: venralId
});
await db.insert(products).values({
    name: "Stylish Travel Bag",
    description: "Extremely stylish black leather travel bag. Perfect for electronic equipment such as cameras, laptops, phones, and more.",
    image: "https://plus.unsplash.com/premium_photo-1678739395192-bfdd13322d34?w=200&h=200&fit=crop",
    category: bagsAndBackpacks,
    priceUSD: 95,
    shop: venralId
});

// Telun

await db.insert(products).values({
    name: "Scented Soap",
    description: "Home made vintage style soap. Each package includes a random assortment from the various scents such as lemon, lavender, mint, peppermint, etc.",
    image: "https://images.unsplash.com/photo-1546552768-9e3a94b38a59?w=200&h=200&fit=crop",
    category: bathAndBeauty,
    priceUSD: 30,
    shop: telunId
});
await db.insert(products).values({
    name: "Colored Bath Soap",
    description: "Simple unscented soap with odor free dyes that don't stick to your skin, giving the soap a nifty color while keeping you clean.",
    image: "https://plus.unsplash.com/premium_photo-1671379506196-e04f6a65772a?w=200&h=200&fit=crop",
    category: bathAndBeauty,
    priceUSD: 30,
    shop: telunId
});
await db.insert(products).values({
    name: "Sock Puppet Monkey",
    description: "Hand made sock puppet monkey for use as a toy for children or as a decorative with charm to go on a shelf.",
    image: "https://images.unsplash.com/photo-1517686748843-bb360cfc62b3?w=200&h=200&fit=crop",
    category: toysAndGames,
    priceUSD: 15,
    shop: telunId
});
await db.insert(products).values({
    name: "Leather Purse",
    description: "Stylish leather purse with a soft coating on the inside. Handmade with care.",
    image: "https://images.unsplash.com/photo-1484527273420-c598cb0601f8?w=200&h=200&fit=crop",
    category: bagsAndBackpacks,
    priceUSD: 50,
    shop: telunId
});

// Krie

await db.insert(products).values({
    name: "Toy Yellow Taxicab",
    description: "A small yellow toy taxicab. Hand painted and lightweight due to being made from pure aluminum.",
    image: "https://images.unsplash.com/photo-1456082902841-3335005c3082?w=200&h=200&fit=crop",
    category: toysAndGames,
    priceUSD: 45,
    shop: krieId
});
await db.insert(products).values({
    name: "Wooden Baby Yoda Statue",
    description: "Wooden statue carved and painted to look like baby yoda from Star Wars. This shop and this product are not affiliated with Disney or Lucas Films.",
    image: "https://images.unsplash.com/photo-1603621760091-d7b12c66549a?w=200&h=200&fit=crop",
    category: toysAndGames,
    priceUSD: 40,
    shop: krieId
});
await db.insert(products).values({
    name: "Hand Carved Wooden Top",
    description: "A hand carved wooden top. While the product has no rough edges, the wooden texture is clearly obvious and care should be taken to avoid splinters when using this product.",
    image: "https://images.unsplash.com/photo-1518440067858-55678e303a04?w=200&h=200&fit=crop",
    category: toysAndGames,
    priceUSD: 25,
    shop: krieId
});
await db.insert(products).values({
    name: "Toy Robot",
    description: "A small clockwork toy robot made from a combination of metal and high quality plastic. Wind it up to watch it walk.",
    image: "https://images.unsplash.com/photo-1546776230-bb86256870ce?w=200&h=200&fit=crop",
    category: toysAndGames,
    priceUSD: 35,
    shop: krieId
});

// Memer

await db.insert(products).values({
    name: "Classilikes Cassette Tape",
    description: "Cassette tape with hours of new compositions in the style of classical music.",
    image: "https://plus.unsplash.com/premium_photo-1668418188928-eb7d85411c01?w=200&h=200&fit=crop",
    category: booksMoviesAndMusic,
    priceUSD: 30,
    shop: memerId
});
await db.insert(products).values({
    name: "Black Sunglasses",
    description: "UV blocking black tinted sunglasses. Custom molded and cast from high quality plastic.",
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=200&h=200&fit=crop",
    category: accessories,
    priceUSD: 15,
    shop: memerId
});
await db.insert(products).values({
    name: "Watermelon Tie",
    description: "A tie made from soft fabric with a watermelon pattern printed on it.",
    image: "https://plus.unsplash.com/premium_photo-1673814842470-05afedfe6f5b?w=200&h=200&fit=crop",
    category: clothing,
    priceUSD: 25,
    shop: memerId
});
await db.insert(products).values({
    name: "Grabbing Hand Wall Lamp",
    description: "A wall mounted lamp which appears to be a hand emerging from a portal to grab the lamp.",
    image: "https://plus.unsplash.com/premium_photo-1668005190411-1042cd38522e?w=200&h=200&fit=crop",
    category: interiorDecorations,
    priceUSD: 75,
    shop: memerId
});

console.log("Seed done");