import {z} from "zod";

export const ProductValidator = z.object({
    id: z.number().int(), 
    name: z.string().max(50),
    category: z.number().int(),
    description: z.string().max(500),
    image: z.string().max(255),
    price: z.number().int(),
    shop: z.string().max(50),
    shopId: z.string().uuid().max(36)
});

export type Product = z.infer<typeof ProductValidator>;