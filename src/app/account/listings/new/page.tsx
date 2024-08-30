import React from "react";
import {getServerAuthSession} from "~/server/auth";
import {redirect} from "next/navigation";
import { ProductEditor} from "~/app/account/listings/_components/product-editor";
import {Product} from "~/app/_types/product";

export default async function NewListing()
{
    const session = await getServerAuthSession();
    if (!session) return redirect("/");

    const product: Product = {
        id: -1,
        name: "",
        description: "",
        shop: "",
        price: 1,
        image: ""
    };
    
    return (<ProductEditor product={product} newListing />);
}