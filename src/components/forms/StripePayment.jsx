/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {  useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LoadIcon } from '../Loader/Loader';


const StripePayment = ({closeModal}) => {
    const axios = useAxios();
    const stripe = useStripe()
    const elements = useElements()
    const { user } = useAuth()
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const navigate = useNavigate();
  

    //  get Client Secret
    useEffect(() => {
        const getSecret = async () => {
            const res = await axios.post('/create-payment-intent', {price: 30});
            const secret = await res.data.clientSecret;
            if(secret){
                // console.log(secret);
                setClientSecret(secret)
            }
        };
        getSecret();
    },[axios])

    // Create Payment Intent
    const handleSubmit = async event => {
      
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
            if (card === null) {
            return
        }

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            // console.log('error', error)
            setCardError(error.message)
        } else {
            setCardError('')
        
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName,
                },
            },
        })

        if (confirmError) {
            // console.log(confirmError)
            setCardError(confirmError.message)
        }

        // console.log('payment intent', paymentIntent)

        if (paymentIntent.status === 'succeeded') {
           

            try {
                await axios.patch(`/user/${user?.email}`, {badge:'gold'})
                toast.success("Payment Successfull")
                navigate("/dashboard/add-posts")
            } catch (error) {
                // console.log('payment error', error.message);
                toast.error(error.message,)
            }finally{
                setProcessing(false)
            }

             // Update room status in db

          
        }
    }
  


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                    style: {
                        base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                        },
                        invalid: {
                        color: '#9e2146',
                        },
                    },
                    }}
                />
                <div className='flex justify-between'>
                    <button onClick={closeModal} type="button" className='px-3 py-1 inline-block bg-red-100 text-red-500 rounded-md' >Cancal</button>
                    <button type="submit" className='px-3 py-1 inline-block bg-green-100 text-green-600 rounded-md' disabled={!stripe}> {processing ? <LoadIcon size={20} /> : 'Pay $30' } </button>
                </div>
               
            </form>
        </div>
    );
};

export default StripePayment;