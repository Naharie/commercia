import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import Stripe from "stripe";
import {z} from "zod";
import {inArray, sum} from "drizzle-orm";
import {orderedProducts, orders, products} from "~/server/db/schema";
import {Address} from "~/server/_utilities/format-address";
import {LibSQLDatabase} from "drizzle-orm/libsql";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_failure", {
    stripeAccount: "acct_1H08bPDM0FmshmtU"
});

interface Shipping
{
    name: string;
    address: Address;
}

const pendingOrders = new Map<string, { products: number[], shipping: Shipping }>();

const finishOrder = async (db: LibSQLDatabase<typeof import("../../db/schema")>, products: number[], shipping: Shipping) =>
{
    const order = await db.insert(orders).values([
        {
            name: shipping.name,
            
            address_line_1: shipping.address.line1,
            address_line_2: shipping.address.line2,
            city: shipping.address.city,
            state: shipping.address.state,
            postalCode: shipping.address.postal_code,
            country: shipping.address.country
        } 
    ]).returning();
    
    const orderId = order[0]?.id ?? undefined;
    if (orderId == undefined) return;
    
    await db.insert(orderedProducts).values(products.map(product => ({ order: orderId, product })));
};

export const stripeRouter = createTRPCRouter({
    pay: publicProcedure
        .input(z.object({
            products: z.array(z.number().int()),
            shipping: z.object({
                name: z.string(),
                address: z.object({
                    line1: z.string(),
                    line2: z.string(),
                    city: z.string(),
                    state: z.string(),
                    postal_code: z.string(),
                    country: z.string(),
                })
            }),
            confirmationToken: z.string()
        }))
        .mutation(async ({ctx, input}) :
            Promise<{ error: unknown } | { client_secret: string | null, status: Stripe.PaymentIntent.Status }> =>
        {
            try
            {
                if (input.products.length === 0) return ({ error: "There are no products in your order." })
                
                const cost = await ctx.db.select({ amount: sum(products.priceUSD) }).from(products).where(inArray(products.id, input.products));

                if (cost.length === 0 || cost[0]?.amount == null)
                {
                    return ({ error: "There are no products in your order." })
                }
                
                const intent = await stripe.paymentIntents.create({
                    amount: parseInt(cost[0].amount),
                    currency: "usd",
                    automatic_payment_methods: { enabled: true },
                    confirmation_token: input.confirmationToken,
                    confirm: true
                });
                
                if (intent.status === "succeeded")
                {
                    await finishOrder(ctx.db, input.products, input.shipping);
                }
                else if (intent.status === "processing" || intent.status === "requires_capture" || intent.status === "requires_confirmation")
                {
                    const id = intent.id;
                    
                    pendingOrders.set(id, {
                        products: input.products,
                        shipping: input.shipping
                    });
                    
                    setTimeout(() => pendingOrders.delete(id), 10 * 60 * 1000);
                }
                
                return ({
                    client_secret: intent.client_secret,
                    status: intent.status
                });
            }
            catch (error)
            {
                return ({ error: error })
            }
        }),
    
    finishOrder: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ctx, input}) =>
        {
            const order = pendingOrders.get(input.id);
            if (order == undefined) return;
            
            pendingOrders.delete(input.id);
            await finishOrder(ctx.db, order.products, order.shipping);
        })
});