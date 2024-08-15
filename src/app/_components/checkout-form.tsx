import React, {FormEvent, useState} from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {api, awaitableAPI} from "~/trpc/react";

const unknownError = "An unknown error occurred, please try again later.";

export const CheckoutForm = (props: { amount: number }) =>
{
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        if (elements === null || stripe === null) return;
        
        const {error: submitError} = await elements.submit();
        
        if (submitError !== undefined)
        {
            setErrorMessage(submitError.message ?? unknownError);
            return;
        }

        const clientSecret = await awaitableAPI.stripe.getClientSecret.query({ amount: props.amount });
        
        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: "http://localhost:3000/order_complete"
            },
        });

        if (error)
        {
            // Payment details were incomplete.
            setErrorMessage(error.message ?? unknownError);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement className="mb-4" />
            <button className="bg-blue-400 rounded-md p-2 w-full" type="submit" disabled={!stripe || !elements}>
                Pay
            </button>
            {
                errorMessage &&
                <div className="bg-red-400 rounded-md mt-4 p-2">{errorMessage}</div>
            }
        </form>
    );
};