import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton=({price})=>{
    const priceForStripe=price*100;
    const publishableKey='pk_test_51H6KxaGimlMvXg6C0TcUUXBYlhlaYWePKSJf6gN7YI01q9ctsGxThQ8vL5ZaXWiyUnxAU7DH2vCjubMWFBcyyYQ900ZCTolZyy';
    const onToken=token=>{
        console.log(token);
        alert('Payment Success')
    }
    return(
        <div>

        <StripeCheckout lable='Pay Now' 
        currency="INR"
        name='CRWN Cloths Ltd.'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`YOur Total is ₹${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
        </div>
    )
}

export default StripeCheckoutButton;
