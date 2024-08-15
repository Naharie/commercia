"use client";

import React, {useEffect} from "react";
import {useCart} from "~/app/_hooks/useCart";

export default () => {
    const [, setCart] = useCart();
    
    useEffect(() =>
    {
        // TODO: Add the order to the shop's fulfillment page.
        setCart([]);
    }, []);

    return (
        <div className="flex flex-row justify-center">
            <span className="text-3xl">Your order is complete. You can continue shopping now.</span>
        </div>
    );
};