import {createTRPCRouter, publicProcedure,} from "~/server/api/trpc";
import {z} from "zod";
import {products, users} from "~/server/db/schema";
import {eq} from "drizzle-orm";

export const categoryRouter = createTRPCRouter({
    getCategories: publicProcedure.query(({ctx}) =>
        ctx.db.query.categories.findMany({ orderBy: (categories, {asc}) => [asc(categories.id)] })
    ),
    
    getProducts: publicProcedure
        .input(z.object({ categoryId: z.number().int() }))
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
                .where(eq(products.category, input.categoryId))
                .innerJoin(users, eq(users.id, products.shop))
        )
});
