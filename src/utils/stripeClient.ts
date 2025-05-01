import { loadStripe, Stripe } from '@stripe/stripe-js';

const stripePromise: Promise<Stripe | null> = loadStripe(process.env.STRIPE_PUBLIC_KEY!);

export const getStripe = () => stripePromise;
