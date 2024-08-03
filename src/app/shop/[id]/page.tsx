import {api} from "~/trpc/server";
import React from "react";
import {ProductCard} from "~/app/_components/product-card";

export default async (input: { params: { id: string } }) => {
    const products = await api.shop.getProducts({ shopId: input.params.id });

    if (products.length === 0)
    {
        return (
            <div className="flex justify-center items-center text-3xl w-full h-[calc(100%-5rem)]">
                <div className="">Sorry, but this shop hasn't listed any products yet.</div>
            </div>
        );
    }

    return (
        <div className="flex flex-row justify-center w-full p-4">
            <div className="grid grid-cols-5 gap-4 justify-center">
                {products.map(product =>
                    <ProductCard key={product.id} product={product} />
                )}
            </div>
        </div>
    );
};