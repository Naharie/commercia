"use client";

import React, {useState} from "react";
import {useCart} from "~/app/_hooks/useCart";

interface AddToCartButtonProps
{
    productId: number;
}

export const AddToCartButton = (props: AddToCartButtonProps) =>
{
    const [cart, setCart] = useCart();
    const [inCart, setInCart] = useState(false);
    const [pressed, setPressed] = useState(false);

    const addToCart = () =>
    {
        setCart([...cart, props.productId]);
        setInCart(true);

        setTimeout(() => setInCart(false), 1500);
    };
    
    return (
        <div
            className={`${pressed ? "bg-green-600" : "bg-green-500 hover:bg-green-400"} text-center w-full rounded-md p-3 cursor-pointer`}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onClick={addToCart}
        >{inCart ? "Added to cart" : "Add to cart"}</div>
    );
};