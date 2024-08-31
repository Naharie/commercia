"use client";

import React, {useState} from "react";
import {useCart} from "~/app/_hooks/useCart";

export const DeleteProductButton = (props: { onClick: () => void }) =>
{
    const [pressed, setPressed] = useState(false);

    return (
        <div
            className={`${pressed ? "bg-red-600" : "bg-red-500 hover:bg-red-400"} text-center w-full rounded-md p-3 cursor-pointer`}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onClick={props.onClick}
        >Delete</div>
    );
};