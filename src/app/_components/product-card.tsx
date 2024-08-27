import Link from "next/link";

interface Product
{
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    shop: string;
}

export const ProductCard = ({ product }: { product: Product }) =>
{
    return (
        <Link href={`/product/${product.id}`}>
            <img className="rounded-md w-40 h-40 3xl:w-52 3xl:h-52" src={product.image}  alt={product.description}/>
            <div className="flex flex-col text-lg">
                <span>{product.name}</span>
                <span>${(product.price / 100).toFixed(2)}</span>
                <span className="text-gray-500">{product.shop}</span>
            </div>
        </Link>  
    );
};