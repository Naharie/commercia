import {api} from "~/trpc/server";
import React from "react";
import {AddToCartButton} from "../_components/add-to-cart-button";

export default async (input: { params: { id: string } }) => {
    const product = await api.product.getProduct({ productId: parseInt(input.params.id) });
    
    
    if (product === undefined) {
        return (
            <div className="flex justify-center items-center text-3xl w-full h-[calc(100%-5rem)]">
                <div>Hmmm...that product doesn't seem to exist.</div>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col items-center gap-8 p-4 w-full">
            <div className="text-2xl">{product.name}</div>
            <div className="grid grid-cols-2 gap-8 justify-center items-center md:w-[70%] lg:w-[40%] max-w-[45rem]">
                <img className="rounded-md w-30 h-30 xl:w-52 xl:h-52" src={product.image} />
                <div className="flex flex-col gap-4">
                    <div className="text-lg font-bold">${(product.price / 100).toFixed(2)}</div>
                    <div>{product.description}</div>
                    <AddToCartButton productId={product.id} />
                </div>
            </div>
            
            <div className="p-2">
                Pssst...this page is intentionally simple to keep the scope of the demo reasonable.<br/>
                If you are are someone who is still learning fullstack, consider trying to add product reviews,<br/>
                As a way of learning how to extend the database schema, add API routes, and add client side rendering.
            </div>
        </div>
    );
};