import {createTRPCRouter, publicProcedure,} from "~/server/api/trpc";
import {z} from "zod";
import {count, eq, gt, inArray} from "drizzle-orm";
import {products, users} from "~/server/db/schema";
import {randomInInterval} from "~/server/random";

export const shopRouter = createTRPCRouter({
    getFeaturedShops: publicProcedure.query(async ({ctx}) =>
    {
        const shopIds = await ctx.db
            .select({ id: users.id })
            .from(users)
            .where(gt(ctx.db
                .select({ count: count(products.id) })
                .from(products)
                .where(eq(products.shop, users.id)
            ), 0)
        );
        const pickedShops: string[] = [];
        const alreadyPicked = new Set<number>();
        
        while (pickedShops.length < 4 && alreadyPicked.size < shopIds.length)
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
        })).sort((a, b) => pickedShops.indexOf(a.id) - pickedShops.indexOf(b.id)) 
    }),
    
    getFeaturedProducts: publicProcedure
        .input(z.string())
        .query(async ({ input, ctx }) => 
        {
            const productIds = await ctx.db.query.products.findMany({
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
                    (await ctx.db.query.products.findMany({
                        limit: 4,
                        columns: { id: true, image: true },
                        where: inArray(products.id, pickedProducts)
                    })).sort((a, b) => pickedProducts.indexOf(a.id) - pickedProducts.indexOf(b.id));
            
            while (featuredProducts.length < 4)
            {
                featuredProducts.push(undefined);
            }
            
            return featuredProducts;
        }),

    getProducts: publicProcedure
        .input(z.object({ shopId: z.string().uuid() }))
        .query(({ ctx, input }) =>
            ctx.db
                .select({
                    id: products.id,
                    name: products.name,
                    description: products.description,
                    image: products.image,
                    price: products.priceUSD,
                    shop: users.name
                })
                .from(products)
                .where(eq(products.shop, input.shopId))
                .innerJoin(users, eq(users.id, products.shop))
        )

    /*
    create: protectedProcedure
      .input(z.object({ name: z.string().min(1) }))
      .mutation(async ({ ctx, input }) => {
        // simulate a slow db call
        await new Promise((resolve) => setTimeout(resolve, 1000));
  
        
        await ctx.db.insert(posts).values({
          name: input.name,
          createdById: ctx.session.user.id,
        });
        
      })
      */
});