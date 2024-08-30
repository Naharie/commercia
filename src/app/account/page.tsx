import {api} from "~/trpc/server";
import {getServerAuthSession} from "~/server/auth";
import {redirect} from "next/navigation";
import {ProductCard} from "~/app/_components/product-card";
import Plus from "~/app/assets/plus.svg";
import Link from "next/link";
import React from "react";
import {Order} from "~/app/account/_components/order";
import {OrderList} from "~/app/account/_components/order-list";

export default async function Account() {
    const session = await getServerAuthSession();
    if (!session) return redirect("/");

    const products = await api.shop.getProducts({ shopId: session.user.id });
    const orders = await api.shop.getOrders();
    
    return (
        <main className="grid grid-cols-1 xl:grid-cols-2 gap-16 p-4">
            <div className="flex flex-col items-center gap-8">
                <h3 className="text-2xl">Products</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map((product, index) => <ProductCard key={index} product={product} editMode />)}
                    <Link className="cursor-pointer" href="/account/listings/new">
                        <img className="rounded-md bg-gray-300 w-40 h-40 3xl:w-52 3xl:h-52" src={Plus.src} alt="A plus sign." title="Create a new product listing" />
                    </Link>
                </div>
            </div>

            <div className="flex flex-col items-center gap-8">
                <h3 className="text-2xl">Orders</h3>
                <OrderList orders={orders} />
            </div>
        </main>
    );
}