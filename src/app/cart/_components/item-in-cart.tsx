import Link from "next/link";
import React from "react";

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

export const ItemInCart = ({ product, removeProduct } : { product: Product, removeProduct: () => void }) =>
{
    return (
        <div className="flex flex-row gap-4 text-sm xl:text-md">
            <img className="w-32 h-32 rounded-md" src={product.image} alt={product.description} />
            <div className="grid gap-4">
                <div className="2xl:text-lg">
                    <Link href={"/product/" + product.id} target="_blank" className="text-blue-500 cursor-pointer">{product.name}</Link>
                    <span> - </span>
                    <Link href={"/shop/" + product.shopId} target="_blank">
                        <span className="text-gray-500">{product.shopName}</span>
                    </Link>
                    <span> (</span>
                    <span className="font-bold">${(product.price / 100).toFixed(2)}</span>
                    <span>)</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full self-center">
                    <Link href={"/product/" + product.id} className="cursor-pointer bg-green-400 p-2 rounded-md" target="_blank">Product Page</Link>
                    <div className="cursor-pointer bg-red-400 p-2 rounded-md" onClick={removeProduct}>Remove from Cart</div>
                </div>
            </div>
        </div>
    )
};