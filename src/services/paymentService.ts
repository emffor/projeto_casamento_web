import API_CONFIG from 'src/config/api';
import { CustomerData, TransactionData } from 'src/types/payment';

export const createCustomer = async (customerData: CustomerData) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao criar cliente');
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao criar cliente: ${error.message}`);
    }
    throw new Error('Erro desconhecido ao criar cliente');
  }
};

export const createTransaction = async (transactionData: TransactionData) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao processar pagamento');
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao processar pagamento: ${error.message}`);
    }
    throw new Error('Erro desconhecido ao processar pagamento');
  }
};

export const createCheckoutSession = async (items: any[], customerInfo?: any) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        customerInfo
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao criar sessão de checkout');
    }
    
    const checkoutData = await response.json();
    
    // Redirecionar para a URL de checkout fornecida pelo backend
    if (checkoutData.checkoutUrl) {
      window.location.href = checkoutData.checkoutUrl;
      return checkoutData;
    }
    
    return checkoutData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao criar sessão de checkout: ${error.message}`);
    }
    throw new Error('Erro desconhecido ao criar sessão de checkout');
  }
};

export const getCheckoutStatus = async (sessionId: string) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/checkout/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao verificar status do pagamento');
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Erro ao verificar status do pagamento: ${error.message}`);
    }
    throw new Error('Erro desconhecido ao verificar status do pagamento');
  }
};
