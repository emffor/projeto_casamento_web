/* eslint-disable import/no-anonymous-default-export */
interface Item {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image?: string;
}

class StripeService {
  private baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8888'
      : 'https://brunaeeloan.com.br/';

  async createCheckoutSession(items: Item[]): Promise<{ id: string; url: string }> {
    const resp = await fetch(`${this.baseUrl}/.netlify/functions/create-checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    if (!resp.ok) throw new Error('Falha ao criar sessão de pagamento');
    return resp.json();
  }
}

export default new StripeService();
