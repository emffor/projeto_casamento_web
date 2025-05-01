import React, { useEffect, useState } from 'react';
import { getStripe } from 'src/utils/stripeClient';

const StripeConfigTest: React.FC = () => {
  const [configStatus, setConfigStatus] = useState<string>('Verificando...');

  useEffect(() => {
    const testConfig = async (): Promise<void> => {
      try {
        const stripe = await getStripe();
        setConfigStatus(stripe ? 'Configuração do Stripe OK' : 'Falha na configuração do Stripe');
      } catch (error) {
        if (error instanceof Error) {
          setConfigStatus(`Erro: ${error.message}`);
        } else {
          setConfigStatus('Erro desconhecido');
        }
      }
    };
    testConfig();
  }, []);

  return (
    <div className="stripe-config-test">
      <h3>Teste de Configuração do Stripe</h3>
      <p>
        Status: <strong>{configStatus}</strong>
      </p>
      <p>Chave Pública: {process.env.STRIPE_PUBLIC_KEY ? '✓' : '✗'}</p>
    </div>
  );
};

export default StripeConfigTest;
