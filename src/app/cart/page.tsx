"use client";

import {z} from "zod";
import {useLocalStorage} from "../_hooks/useLocalStorage";

const cartValidator = z.array(z.number().int());

export default () => {
    const [cart] = useLocalStorage("cart", cartValidator, () => []);

    return (
        <div className="flex flex-col justify-center items-center text-3xl">
            {cart.length === 0 ? "You have no items in your cart." : `You have ${cart.length} item${cart.length != 1 ? "s" : ""} in your cart.`}
        </div>
    );
};