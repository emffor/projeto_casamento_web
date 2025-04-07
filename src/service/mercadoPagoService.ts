import { getAccessToken } from './mercadoPagoConfig';

interface Item {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id?: string;
  description?: string;
  category_id?: string;
}

interface Payer {
  email: string;
  name?: string;
  surname?: string;
  identification?: {
    type: string;
    number: string;
  };
}

interface PreferenceResponse {
  id: string;
  init_point: string;
  sandbox_init_point: string;
  [key: string]: any;
}

const MercadoPagoService = {
  async createPreference(
    items: Item[],
    payer: Payer,
    marketplace_fee: number = 0
  ): Promise<PreferenceResponse> {
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error('Token de acesso do Mercado Pago não configurado');
    }

    try {
      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          payer,
          marketplace_fee,
          back_urls: {
            success: `${window.location.origin}/success`,
            failure: `${window.location.origin}/failure`,
            pending: `${window.location.origin}/pending`,
          },
          auto_return: 'approved',
          marketplace: 'NONE',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao criar preferência: ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao criar preferência:', error);
      throw error;
    }
  },

  async createMarketplacePreference(
    items: Item[],
    payer: Payer,
    seller_id: string,
    application_fee: number
  ): Promise<PreferenceResponse> {
    try {
      const preferenceData = {
        items,
        payer,
        marketplace_fee: application_fee,
        back_urls: {
          success: `${window.location.origin}/success`,
          failure: `${window.location.origin}/failure`,
          pending: `${window.location.origin}/pending`,
        },
        auto_return: 'approved',
        processing_modes: ['aggregator'],
        collector_id: seller_id,
      };

      const accessToken = getAccessToken();

      if (!accessToken) {
        throw new Error('Token de acesso não configurado');
      }

      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferenceData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro na preferência marketplace: ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na preferência marketplace:', error);
      throw error;
    }
  },
};

export default MercadoPagoService;
