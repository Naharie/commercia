import {createTRPCRouter, publicProcedure,} from "~/server/api/trpc";
import {z} from "zod";
import {products, users} from "~/server/db/schema";
import {eq, like} from "drizzle-orm";

export const productRouter = createTRPCRouter({
    getProduct: publicProcedure
        .input(z.object({ productId: z.number().int() }))
        .query(async ({ ctx, input }) =>
            (await ctx.db
                .select({
                    id: products.id,
                    name: products.name,
                    description: products.description,
                    image: products.image,
                    price: products.priceUSD,
                    shop: users.name
                })
                .from(products)
                .where(eq(products.id, input.productId))
                .innerJoin(users, eq(users.id, products.shop))
                .limit(1)
            )[0]
        ),

    searchProducts: publicProcedure
        .input(z.object({ query: z.string() }))
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
                .where(like(products.name, `%${input.query}%`))
                .innerJoin(users, eq(users.id, products.shop))
        )
});
