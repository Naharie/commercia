"use client";

import {Product} from "~/app/_types/product";
import React from "react";
import {SaveProductButton} from "~/app/account/listings/_components/save-product-button";

export const ProductEditor = ({ product, newListing } : { product: Product, newListing?: boolean }) =>
{
    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <div className="grid grid-cols-2 gap-8 justify-center items-center p-4 md:w-[70%] lg:w-[40%] max-w-[45rem]">
                <img className="rounded-md w-30 h-30 xl:w-52 xl:h-52" src={product.image}/>
                <div className="flex flex-col gap-4">
                    <div className="text-lg font-bold">${(product.price / 100).toFixed(2)}</div>
                    <div>{product.description}</div>
                    <SaveProductButton onClick={() => Promise.resolve()} />
                </div>
            </div>
        </div>
    );
};