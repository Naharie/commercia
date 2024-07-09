import { categories } from "./schema";
import { db } from "./";

const main = async () =>
{
	console.log("Seed start");
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
	console.log("Seed done");
};
 
main();