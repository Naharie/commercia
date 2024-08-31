import React from "react";
import {getServerAuthSession} from "~/server/auth";
import {redirect} from "next/navigation";
import { ProductEditor} from "~/app/account/listings/_components/product-editor";
import {Product} from "~/shared/_types/product";
import {api} from "~/trpc/server";

export default async function NewListing()
{
    const session = await getServerAuthSession();
    if (!session) return redirect("/");

    const userName = await api.shop.getName({ id: session.user.id });
    const categories = await api.category.getCategories();
    
    const product: Product = {
        id: -1,
        name: "",
        description: "",
        category: 1,
        shop: userName ?? "Unknown",
        shopId: session.user.id,
        price: 0,
        image: ""
    };
    
    return (<ProductEditor product={product} categories={categories} newListing />);
}