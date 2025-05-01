/* eslint-disable class-methods-use-this */
interface Item {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image?: string;
}

class StripeService {
  private isDev = process.env.NODE_ENV === 'development';

  private baseUrl = this.isDev ? 'http://localhost:8888' : '';

  async createCheckoutSession(items: Item[]) {
    try {
      // Em desenvolvimento, simular checkout para testes
      if (this.isDev) {
        console.log('Modo simulação: Itens para checkout:', items);
        setTimeout(() => {
          window.location.href = `${this.baseUrl}/success`;
        }, 1500);
        return `${this.baseUrl}/success`;
      }

      // Fluxo real com Netlify Functions
      const response = await fetch(`${this.baseUrl}/.netlify/functions/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData.error || 'Erro na requisição';
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Erro ao criar sessão de checkout:', error);
      throw error;
    }
  }
}

export default new StripeService();
