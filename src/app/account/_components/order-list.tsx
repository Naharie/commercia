"use client";

import {Order as OrderInfo } from "~/app/_types/order";
import React, {useState} from "react";
import {Order} from "~/app/account/_components/order";

export const OrderList = ({ orders: initialOrders } : { orders: OrderInfo[] }) =>
{
    const [orders, setOrders] = useState(initialOrders);
    
    const onRemoveOrder = (id: number) => () =>
    {
        setOrders(orders.filter(order => order.id != id));
    };
    
    return (
        <>
            {orders.map(order => <Order key={order.id} order={order} onRemoveOrder={onRemoveOrder(order.id)} />)}
        </>
    )
};