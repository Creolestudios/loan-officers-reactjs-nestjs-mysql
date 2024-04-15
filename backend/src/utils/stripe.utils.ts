import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: null,
});

console.log('******** Stripe Instance Created Successfully ********');

export default stripe;
