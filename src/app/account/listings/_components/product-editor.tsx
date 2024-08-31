"use client";

import {Product, ProductValidator} from "~/shared/_types/product";
import React, {ChangeEvent, useState} from "react";
import {SaveProductButton} from "~/app/account/listings/_components/save-product-button";
import TextareaAutosize from "react-textarea-autosize";
import {awaitableAPI} from "~/trpc/react";
import {DeleteProductButton} from "~/app/account/listings/_components/delete-product-button";
import {FileUpload} from "~/app/account/listings/_components/file-upload";

interface Category
{
    id: number;
    name: string;
}

export const ProductEditor = ({ product, categories, newListing } : { product: Product, categories: Category[], newListing?: boolean }) =>
{
    const [name, setName] = useState(product.name);
    const [category, setCategory] = useState(product.category);
    const [description, setDescription] = useState(product.description);
    const [image, setImage] = useState(product.image);
    
    const [price, setPrice] = useState((product.price / 100).toFixed(2));
    const updatePrice = (event: ChangeEvent<HTMLInputElement>) =>
    {
        if (/^\d*(?:\.\d{0,2})?$/.test(event.target.value))
        {
            console.log("Update: " + event.target.value);
            setPrice(event.target.value);
        }
    };
    
    const [error, setError] = useState<string | null>(null);
    
    const saveProduct = async () =>
    {
        const updatedProduct: Product = {
            id: product.id,
            name,
            description,
            image,
            price: parseFloat(price === "" ? "0.00" : price) * 100,
            category: category,
            shop: product.shop,
            shopId: product.shopId
        };
        const validation = ProductValidator.safeParse(updatedProduct);
        
        if (!validation.success)
        {
            setError(validation.error.message);
            return;
        }
        
        const response = await awaitableAPI.product.updateProduct.mutate({
            product: updatedProduct
        });
        
        if ("error" in response)
        {
            setError(response.error);
            return;
        }
        
        if (newListing)
        {
            location.href = "/account";
        }
    };
    const deleteProduct = async () =>
    {
        if (product.id == -1)
        {
            setError("Can't delete a product that doesn't exist yet!");
            return;
        }
        
        const response = await awaitableAPI.product.deleteProduct.mutate({ id: product.id });
        
        if (!response.success)
        {
            setError(response.error);
        }
        else
        {
            location.href = "/account";
        }
    };
    
    return (
        <div className="flex flex-col items-center gap-8 w-full p-4 ">
            {error != null && <div className="text-xl rounded-md p-2 bg-red-400">{error}</div>}
            
            <div className="flex flex-row gap-4 text-xl">
                <input
                    type="text"
                    placeholder="Product Name"
                    maxLength={50}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <select className="p-1 rounded-md" value={category} onChange={e => setCategory(parseInt(e.target.value))}>
                    {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-8 justify-center items-center md:w-[70%] lg:w-[40%] max-w-[45rem]">
                <div className="flex flex-col gap-4">
                    <img className="rounded-md w-30 h-30 xl:w-52 xl:h-52 cursor-pointer" src={image}/>
                    <FileUpload reportError={error => setError(error)} onUpload={url => setImage(url)} />
                </div>

                <div className="flex flex-col gap-4">
                <div className="text-lg font-bold">
                        $<input type="text" inputMode="decimal" value={price} onChange={updatePrice}/>
                    </div>
                    <TextareaAutosize
                        maxLength={500}
                        placeholder="Product Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <div className="flex flex-row gap-4">
                        <SaveProductButton onClick={saveProduct}/>
                        <DeleteProductButton onClick={deleteProduct} />
                    </div>
                </div>
            </div>
        </div>
    );
};