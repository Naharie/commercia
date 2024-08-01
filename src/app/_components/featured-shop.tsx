import Link from "next/link";
import {api} from "~/trpc/server";
import React from "react";

interface FeaturedShopProps {
    id: string;
    name: string;
}

interface FeaturedProductProps
{
    id?: number;
    image?: string;
}

const FeaturedProduct = (props: FeaturedProductProps) => {
    return (
        <div className="relative rounded-md overflow-clip w-52 h-52">
            {props.id ?
                <Link href={`/product/${props.id}`}>
                    <img className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full" src={props.image ?? ""}></img>
                </Link> :
                ""
            }
        </div>
    );
};

export const FeaturedShop = async (props: FeaturedShopProps) => {
    const featuredProducts = await api.shop.getFeaturedProducts(props.id);
    
    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-1 rounded-md border-solid border-2 border-gray-300 p-1">
                {featuredProducts.map((product, index) =>
                    <FeaturedProduct key={product?.id ?? (index * 1000)} id={product?.id} image={product?.image}/>
                )}
            </div>
            <h5 className="text-xl">See more from <Link className="text-blue-600" href={"/shop/" + props.id}>{props.name}</Link></h5>
        </div>
    );
};