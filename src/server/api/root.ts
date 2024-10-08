import {categoryRouter} from "~/server/api/routers/category";
import {createCallerFactory, createTRPCRouter} from "~/server/api/trpc";
import {shopRouter} from "~/server/api/routers/shop";
import {productRouter} from "~/server/api/routers/product";
import {stripeRouter} from "~/server/api/routers/checkout";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    category: categoryRouter,
    shop: shopRouter,
    product: productRouter,
    checkout: stripeRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
