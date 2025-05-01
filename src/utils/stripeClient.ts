import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  console.error('Chave pública do Stripe não configurada');
}

export const getStripe = () => loadStripe(stripePublicKey!);
