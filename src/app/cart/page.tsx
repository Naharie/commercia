"use client";

import {useCart} from "~/app/_hooks/useCart";
import {api} from "~/trpc/react";
import React, {useMemo, useState} from "react";
import {loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {CheckoutForm} from "./_components/checkout-form";
import {ItemInCart} from "~/app/cart/_components/item-in-cart";

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4 sm:p-0 w-full sm:w-[95%] lg:w-[70%] xl:w-[50%]">
                        <div className="flex flex-col gap-4">
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