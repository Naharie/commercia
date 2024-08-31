import {api} from "~/trpc/server";
import React from "react";
import {getServerAuthSession} from "~/server/auth";
import {redirect} from "next/navigation";
import { ProductEditor} from "~/app/account/listings/_components/product-editor";

export default async function EditListing(props: { params: { id: string } })
{
    const session = await getServerAuthSession();
    if (!session) return redirect("/");
    
    const product = await api.product.getProduct({ productId: parseInt(props.params.id) });
    
    if (product === undefined)
    {
        return (
            <div className="flex justify-center items-center text-3xl w-full h-[calc(100%-5rem)]">
                <div>Hmmm...that product doesn't seem to exist.</div>
            </div>
        );
    }
    if (product.shopId != session.user.id) return redirect("/account");

    const categories = await api.category.getCategories();
    return (<ProductEditor product={product} categories={categories} />);
}