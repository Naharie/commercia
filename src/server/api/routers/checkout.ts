import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import Stripe from "stripe";
import {z} from "zod";
import {inArray, sum} from "drizzle-orm";
import {products} from "~/server/db/schema";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_failure", {
    stripeAccount: "acct_1H08bPDM0FmshmtU"
});

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
                
                console.log(JSON.stringify(input));
                
                const intent = await stripe.paymentIntents.create({
                    amount: parseInt(cost[0].amount),
                    currency: "usd",
                    automatic_payment_methods: { enabled: true },
                    confirmation_token: input.confirmationToken
                });
                
                // https://www.npmjs.com/package/@fragaria/address-formatter
                //ctx.db.insert(orders).values(input.products.map(product => ({ product })));
                
                return ({
                    client_secret: intent.client_secret,
                    status: intent.status
                });
            }
            catch (error)
            {
                return ({ error: error })
            }
        })
});