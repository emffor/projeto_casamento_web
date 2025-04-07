import React, { useState, useEffect } from 'react';
import { initializeMP } from 'src/service/mercadoPagoConfig';

const MPConfigTest: React.FC = () => {
  const [configStatus, setConfigStatus] = useState<string>('Verificando...');

  useEffect(() => {
    const testConfig = (): void => {
      try {
        const initialized = initializeMP();
        setConfigStatus(
          initialized ? 'Configuração do Mercado Pago OK' : 'Falha na configuração do Mercado Pago'
        );
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
    <div className="mp-config-test">
      <h3>Teste de Configuração do Mercado Pago</h3>
      <p>
        Status: <strong>{configStatus}</strong>
      </p>
      <p>Chave Pública: {process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY ? '✓' : '✗'}</p>
      <p>Token de Acesso: {process.env.REACT_APP_MERCADO_PAGO_ACCESS_TOKEN ? '✓' : '✗'}</p>
    </div>
  );
};

export default MPConfigTest;
