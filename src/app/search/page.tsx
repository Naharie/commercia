import notFound from "~/app/not-found";
import {api} from "~/trpc/server";
import React from "react";
import {ProductCard} from "~/app/_components/product-card";

export default async ({searchParams}: { searchParams: Record<string, string | string[] | undefined> }) => {
    if (searchParams["q"] == undefined) {
        return notFound();
    }

    const query = searchParams["q"]?.toString();

    const products = await api.product.searchProducts({ query });

    if (products.length === 0)
    {
        return (
            <div className="flex justify-center items-center text-3xl w-full h-[calc(100%-5rem)]">
                <div className="">Sorry, but no products match that query.</div>
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