import {createTRPCRouter, protectedProcedure, publicProcedure,} from "~/server/api/trpc";
import {z} from "zod";
import {count, eq, gt, inArray, sql} from "drizzle-orm";
import {orderedProducts, orders, products, users} from "~/server/db/schema";
import {randomInInterval} from "~/server/random";
import {formatAddress} from "~/server/_utilities/format-address";
import {Order} from "~/app/_types/order";

export const shopRouter = createTRPCRouter({
    getName: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ctx, input}) =>
            (await ctx.db
                .select({ name: users.name })
                .from(users)
                .where(eq(users.id, input.id))
            )[0]?.name
        ),
    
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
                    category: products.category,
                    image: products.image,
                    price: products.priceUSD,
                    shop: users.name,
                    shopId: users.id
                })
                .from(products)
                .where(eq(products.shop, input.shopId))
                .innerJoin(users, eq(users.id, products.shop))
        ),

    getOrders: protectedProcedure
        .query(async ({ ctx }) =>
        {
            const orderIds =
                (await ctx.db
                    .selectDistinct({ order: orderedProducts.order })
                    .from(orderedProducts)
                    .innerJoin(products, eq(orderedProducts.product, products.id))
                    .where(eq(products.shop, ctx.session.user.id))
                ).map(wrapper => wrapper.order);
            
            if (orderIds.length === 0) return [];
            
            const ourOrders =
                await ctx.db
                    .select()
                    .from(orders)
                    .where(inArray(orders.id, orderIds));
            
            const orderResult: Order[] = [];
            
            for (const order of ourOrders)
            {
                orderResult.push({
                    id: order.id,
                    name: order.name,
                    address: formatAddress({
                        line1: order.address_line_1,
                        line2: order.address_line_2,
                        city: order.city,
                        state: order.state,
                        postal_code: order.postalCode,
                        country: order.country
                    }),
                    products:
                        (await ctx.db
                            .select({ id: orderedProducts.product })
                            .from(orderedProducts)
                            .where(eq(orderedProducts.order, order.id))
                        ).map(product => product.id)
                })
            }
            
            return orderResult;
        }),
    
    markOrderAsShipped: protectedProcedure
        .input(z.object({ orderId: z.number().int() }))
        .mutation(async ({ ctx, input }) =>
        {
            await ctx.db.delete(orderedProducts).where(eq(orderedProducts.order, input.orderId));
            const orderIsEmpty = (await ctx.db.get<{ order_exists: boolean }>(
                sql`select exists${ctx.db.select({ n: sql`1` }).from(orderedProducts).where(eq(orderedProducts.order, input.orderId))} as order_exists`
            )).order_exists;
            if (!orderIsEmpty) return;
            
            ctx.db.delete(orders).where(eq(orders.id, input.orderId));
        })
});