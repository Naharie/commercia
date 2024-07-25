import {createTRPCRouter, publicProcedure,} from "~/server/api/trpc";
import {z} from "zod";
import {eq, inArray} from "drizzle-orm";
import {products, users} from "~/server/db/schema";
import {randomInInterval} from "~/server/random";

export const shopRouter = createTRPCRouter({
    getFeaturedShops: publicProcedure.query(async ({ctx}) =>
    {
        const shopIds = await ctx.db.select({ id: users.id }).from(users);
        const pickedShops: string[] = [];
        const alreadyPicked = new Set<number>();
        
        while (pickedShops.length < 4)
        {
            const picked = randomInInterval(0, shopIds.length - 1);
            const shop = shopIds[picked];
            
            if (alreadyPicked.has(picked) || shop == undefined) continue;
            
            alreadyPicked.add(picked);
            pickedShops.push(shop.id);
        }
        
        return (await ctx.db.query.users.findMany({
            limit: 4,
            columns: { id: true, name: true },
            where: inArray(users.id, pickedShops)
        })).map(user => ({
            id: user.id,
            name: user.name,
            products: []
        }))    
    }),
    
    getFeaturedProducts: publicProcedure
        .input(z.string())
        .query(async ({ input, ctx }) => 
        {
            const productIds = await ctx.db.query.products.findMany({
                limit: 4,
                where: eq(products.shop, input),
                columns: { id: true }
            });
            const pickedProducts: number[] = [];
            const alreadyPicked = new Set<number>();

            while (pickedProducts.length < 4 && alreadyPicked.size < productIds.length)
            {
                const picked = randomInInterval(0, productIds.length - 1);
                const product = productIds[picked];
                
                if (alreadyPicked.has(picked) || product == undefined) continue;

                alreadyPicked.add(picked);
                pickedProducts.push(product.id);
            }
            
            const featuredProducts: ({ id: number, image: string } | undefined)[] =
                pickedProducts.length == 0 ? [] :
                    await ctx.db.query.products.findMany({
                        limit: 4,
                        columns: { id: true, image: true },
                        where: inArray(products.id, pickedProducts)
                    });
            
            while (featuredProducts.length < 4)
            {
                featuredProducts.push(undefined);
            }
            
            return featuredProducts;
        })
});