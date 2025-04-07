import { initMercadoPago } from '@mercadopago/sdk-react';

export const initializeMP = (): boolean => {
  const publicKey = process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY;

  if (!publicKey) {
    console.error('Chave pública do Mercado Pago não configurada');
    return false;
  }

  try {
    initMercadoPago(publicKey);
    return true;
  } catch (error) {
    console.error('Erro ao inicializar Mercado Pago:', error);
    return false;
  }
};

export const getAccessToken = (): string | undefined => {
  return process.env.REACT_APP_MERCADO_PAGO_ACCESS_TOKEN;
};
