"use client";

import {useCart} from "~/app/_hooks/useCart";
import {api} from "~/trpc/react";
import React, {useMemo, useState} from "react";
import Link from "next/link";
import {loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {CheckoutForm} from "./_components/checkout-form";

interface Product
{
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    shopName: string;
    shopId: string;
}

const ItemInCart = ({ product, removeProduct } : { product: Product, removeProduct: () => void }) =>
{
    return (
        <div className="flex flex-row gap-4">
            <img className="w-32 h-32 rounded-md" src={product.image} alt={product.description} />
            <div className="grid grid-rows-2 gap-4">
                <div>
                    <Link href={"/product/" + product.id} target="_blank" className="text-blue-500 cursor-pointer">{product.name}</Link>
                    <span> - </span>
                    <Link href={"/shop/" + product.shopId} target="_blank">
                        <span className="text-gray-500">{product.shopName}</span>
                    </Link>
                    <span> (</span>
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    <span>)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full self-center">
                    <Link href={"/product/" + product.id} className="cursor-pointer bg-green-400 p-2 rounded-md" target="_blank">Product Page</Link>
                    <div className="cursor-pointer bg-red-400 p-2 rounded-md" onClick={removeProduct}>Remove from Cart</div>
                </div>
            </div>
        </div>
    )  
};

const stripePublishableKey = "pk_test_51H08bPDM0FmshmtUEQXYGiqNzROyphEIIsx9VEYz88W1zBcf2FSwTfh2EHOFVS8AFz4094x7n6S3MSmksRTnghb200uPfYbdfI";

export default () => {
    const stripePromise = useMemo(() => loadStripe(stripePublishableKey), [])
    
    const [cart, setCart] = useCart();
    
    const productsQuery = api.product.getProducts.useQuery(cart);
    const products = productsQuery.data ?? [];
    
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    const cartTotal = products.map(product => product.price).reduce((a, b) => a + b, 0);

    const options: StripeElementsOptions = {
        mode: "payment",
        amount: cartTotal,
        currency: "usd"
    };
    
    const checkout = () =>
    {
        setCart([]);
    };
    const removeProduct = (index: number) => () =>
    {
        const newCart = cart.filter((_, cartIndex) => cartIndex !== index);
        setCart(newCart);
    };
    
    return (
        <div className="flex flex-row justify-center w-full">
            {
                showSuccessMessage ?
                    <div className="text-3xl bg-green-400 p-2 rounded-md">Checkout complete, your items are on the way!</div> :
                cart.length === 0 ?
                    <div className="text-3xl bg-blue-400 p-2 rounded-md">You have no items in your cart.</div> :

                    <div className="grid grid-cols-2 gap-8 w-[50%]">
                        <div className="flex flex-col text-lg gap-4">
                            {products.map((product, index) =>
                                <ItemInCart key={index} product={product} removeProduct={removeProduct(index)} />
                            )}
                        </div>
                        <div className="justify-self-end w-full">
                            {
                                cartTotal > 0 &&
                                <Elements stripe={stripePromise} options={options}>
                                    <CheckoutForm onCheckout={checkout} />
                                </Elements>
                            }
                        </div>
                    </div>
            }
        </div>
    );
};