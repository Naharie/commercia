import React, {FormEvent, useState} from 'react';
import {PaymentElement, useStripe, useElements, AddressElement} from '@stripe/react-stripe-js';
import {awaitableAPI} from "~/trpc/react";
import {useCart} from "~/app/_hooks/useCart";
import {hasProperties} from "~/app/cart/_utilities/hasProperties";

const unknownError = "An unknown error occurred, please try again later.";
const needShippingInformation = "You must provide complete shipping information.";

export const CheckoutForm = (props: { onCheckout: () => void }) =>
{
    const stripe = useStripe();
    const elements = useElements();
    
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const [cart] = useCart();
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        if (elements === null || stripe === null) return;
        
        setLoading(true);
        
        const {error: submitError} = await elements.submit();
        
        if (submitError !== undefined)
        {
            setErrorMessage(submitError.message ?? unknownError);
            return;
        }
        
        const {error, confirmationToken} = await stripe.createConfirmationToken({ elements });

        if (error)
        {
            // Payment details were incomplete.
            setErrorMessage(error.message ?? unknownError);
            setLoading(false);
            return;
        }
        
        const shippingName = confirmationToken?.shipping?.name;
        const shippingAddress = confirmationToken?.shipping?.address;
        
        if (!hasProperties(shippingAddress))
        {
            setErrorMessage(needShippingInformation)
            setLoading(false);
            return;
        }
        
        if (shippingName == undefined)
        {
            setErrorMessage(needShippingInformation)
            setLoading(false);
            return;
        }
        
        const paymentResponse = await awaitableAPI.checkout.pay.mutate({
            products: cart,
            shipping: {
                name: shippingName,
                address: shippingAddress
            },
            confirmationToken: confirmationToken.id
        });
        
        if ("error" in paymentResponse)
        {
            setErrorMessage(paymentResponse.error + "");
            setLoading(false);
            return;
        }
        if (paymentResponse.status === "requires_action")
        {
            const { error, paymentIntent } = await stripe.handleNextAction({ clientSecret: paymentResponse.client_secret ?? "this-can't-happen-and-we-should-fail" });
            
            if (error || paymentIntent == undefined)
            {
                setErrorMessage(error?.message ?? unknownError);
                setLoading(false);
                return;
            }
            
            await awaitableAPI.checkout.finishOrder.mutate({ id: paymentIntent.id });
        }

        setLoading(false);
        props.onCheckout();
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <PaymentElement />
            <AddressElement options={{ mode: "shipping" }} />
            
            <button className="bg-blue-400 rounded-md p-2 w-full" type="submit" disabled={!stripe || !elements || loading}>Pay</button>
            
            {errorMessage && <div className="bg-red-400 rounded-md p-2">{errorMessage}</div>}
        </form>
    );
};