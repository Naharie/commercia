import {createTRPCRouter, publicProcedure,} from "~/server/api/trpc";
import Stripe from "stripe";
import {z} from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_failure", {
    stripeAccount: ""
});

export const stripeRouter = createTRPCRouter({
    getClientSecret: publicProcedure
        .input(z.object({ amount: z.number() }))
        .query(async ({ctx, input}) =>
        {
            const intent = await stripe.paymentIntents.create({
                amount: input.amount,
                currency: "usd",
                automatic_payment_methods: { enabled: true }
            });
            
            return intent.client_secret ?? "pi_failure";
        })
});