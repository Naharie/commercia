"use client";

import React, {useState} from "react";
import {useCart} from "~/app/_hooks/useCart";

export const SaveProductButton = (props: { onClick: () => Promise<void> }) =>
{
    const [saved, setSaved] = useState(false);
    const [pressed, setPressed] = useState(false);

    const onClick = async () =>
    {
        await props.onClick();
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
    };

    return (
        <div
            className={`${pressed ? "bg-green-600" : "bg-green-500 hover:bg-green-400"} text-center w-full rounded-md p-3 cursor-pointer`}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onClick={onClick}
        >{saved ? "Saved" : "Save"}</div>
    );
};