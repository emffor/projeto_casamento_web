import { Button, CircularProgress, Typography } from '@mui/material';
import React, { useState } from 'react';
import stripeService from 'src/service/stripeService';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Props {
  cartItems: CartItem[];
}

const CheckoutButton: React.FC<Props> = ({ cartItems }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleProceedToPayment = async () => {
    if (cartItems.length === 0) {
      setErrorMsg('Seu carrinho está vazio.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const items = cartItems.map((item) => ({
        id: String(item.id),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      // cria sessão no Netlify Function
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: sessionId, url } = await stripeService.createCheckoutSession(items);

      // redireciona para a página hospedada pelo Stripe
      window.location.href = url;

      // ou, se preferir usar Stripe.js:
      // const stripe = await getStripe();
      // await stripe!.redirectToCheckout({ sessionId });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Erro ao iniciar pagamento');
      setIsLoading(false);
    }
  };

  return (
    <>
      {errorMsg && (
        <Typography color="error" sx={{ mb: 2 }}>
          {errorMsg}
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={handleProceedToPayment}
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
      >
        {isLoading ? 'Processando...' : 'Ir para Pagamento'}
      </Button>
    </>
  );
};

export default CheckoutButton;
