import {Address} from "~/app/account/_components/address";
import {ProductCard} from "~/app/_components/product-card";
import { Order as OrderInfo } from "~/app/_types/order";
import {api, awaitableAPI} from "~/trpc/react";

export const Order = ({ order, onRemoveOrder } : { order: OrderInfo, onRemoveOrder: () => void }) =>
{
    const [products] = api.product.getProducts.useSuspenseQuery(order.products);
    
    const markAsShipped = async () =>
    {
        await awaitableAPI.shop.markOrderAsShipped.mutate({ orderId: order.id });
        onRemoveOrder();
    };
    
    return (
        <div className="flex flex-col gap-4 rounded-md border border-solid border-gray-500 p-4">
            <Address name={order.name} lines={order.address} />
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {products.map((product, index) => <ProductCard key={index} product={product} />)}
            </div>
            <div className="bg-green-500 rounded-md p-2 cursor-pointer" onClick={markAsShipped}>Mark as shipped</div>
        </div>  
    );
};