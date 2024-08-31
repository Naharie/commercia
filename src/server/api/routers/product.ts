import {createTRPCRouter, protectedProcedure, publicProcedure,} from "~/server/api/trpc";
import {z} from "zod";
import {orderedProducts, products, users} from "~/server/db/schema";
import {eq, inArray, like, sql} from "drizzle-orm";
import {ProductValidator} from "~/shared/_types/product";
import fs from "fs/promises";
import {randomUUID} from "crypto";

export const productRouter = createTRPCRouter({
    getProduct: publicProcedure
        .input(z.object({ productId: z.number().int() }))
        .query(async ({ ctx, input }) =>
            (await ctx.db
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
                .where(eq(products.id, input.productId))
                .innerJoin(users, eq(users.id, products.shop))
                .limit(1)
            )[0]
        ),

    getProducts: publicProcedure
        .input(z.array(z.number().int()))
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
                .where(inArray(products.id, input))
                .innerJoin(users, eq(users.id, products.shop))
        ),

    searchProducts: publicProcedure
        .input(z.object({ query: z.string() }))
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
                .where(like(products.name, `%${input.query}%`))
                .innerJoin(users, eq(users.id, products.shop))
        ),
    
    updateProduct: protectedProcedure
        .input(z.object({ product: ProductValidator }))
        .mutation(async ({ ctx, input }) : Promise<{ success: true} | { success: false, error: string }> =>
        {
            const product = input.product;
            if (product.shopId != ctx.session.user.id) return ({ success: false, error: "You can't update products for other users!"});
            
            try
            {
                if (product.id === -1)
                {
                    await ctx.db.insert(products).values({
                        name: product.name,
                        description: product.description,
                        image: product.image,
                        priceUSD: product.price,
                        category: product.category,
                        shop: product.shopId
                    });
                    return ({ success: true });
                }
                else
                {
                    const oldImage =
                        (
                            await ctx.db
                            .select({ image: products.image })
                            .from(products)
                            .where(eq(products.id, product.id))
                            .limit(1)
                        )[0]?.image;
                    
                    if (oldImage !== undefined && oldImage !== product.image && oldImage.startsWith("/api/images/"))
                    {
                        await fs.rm("." + oldImage.replace("/api", ""), { force: true });
                    }
                    
                    if (product.image.startsWith("/api/images/"))
                    {
                        const parts = product.image.split(".");
                        const uuid = randomUUID();
                        const extension = parts[parts.length - 1] ?? "jpg";

                        const oldPath = "./images/" + product.image.replace("/api/images/", "").split("..").join("").split("/").join("").split("\\").join("");
                        const newPath = "/images/" + uuid + "." + extension;
                        
                        await fs.rename(oldPath, "." + newPath);
                        product.image = "/api" + newPath;
                    }
                    
                    await ctx.db.update(products).set({
                        name: product.name,
                        description: product.description,
                        image: product.image,
                        priceUSD: product.price,
                        category: product.category
                    }).where(eq(products.id, product.id));
                    
                    return ({ success: true });
                }
            }
            catch (error)
            {
                console.log(error);
                return ({ success: false, error: "Sorry, but your product information is invalid." })
            }
        }),

    deleteProduct: protectedProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) : Promise<{ success: true } | { success: false, error: string }> =>
        {
            const shopId = (await ctx.db.select({ shopId: products.shop }).from(products).where(eq(products.id, input.id)).limit(1))[0]?.shopId;
            if (shopId === undefined) return ({ success: false, error: "No such product exists." })
            if (shopId != ctx.session.user.id) return ({ success: false, error: "You can't delete products for other users!"});

            const orderExists = (await ctx.db.get<{ order_exists: boolean }>(
                sql`select exists${ctx.db.select({ n: sql`1` }).from(orderedProducts).where(eq(orderedProducts.product, input.id))} as order_exists`
            )).order_exists;
            
            if (orderExists)
            {
                return ({ success: false, error: "You can't delete a product before completing all orders it appears in. "});
            }
            
            await ctx.db.delete(products).where(eq(products.id, input.id));
            return ({ success: true });
        })
});
