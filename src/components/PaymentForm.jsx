import React from 'react'
import {CardElement} from '@stripe/react-stripe-js'

const PaymentForm = ({handleCheckout, stripe}) => {
  return (
    <div>
        <form onSubmit={handleCheckout}>
            <CardElement options={{hidePostalCode: true}}>
                <button type="submit" disabled={!stripe}>
                    Pay 
                </button>
            </CardElement>
        </form>
    </div>
  )
}

export default PaymentForm