// Helper function to handle payments via Stripe

import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = 'pk_test_'; // key

// checkout with user and token id
// CHECKOUT has been got from the cart component
const onToken = (user,checkout) => token =>
    checkout(user,token.id);

const Checkout = ({amount, user, checkout}) =>
    <StripeCheckout
        amount={amount*100} // lowest value is 1 paisa so *100
        token={onToken(user,checkout)} //token
        currency='INR' // indian rupee
        stripeKey={STRIPE_PUBLISHABLE} // key
    />

export default Checkout;