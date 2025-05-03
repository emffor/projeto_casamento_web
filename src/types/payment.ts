export interface CustomerData {
    name: string;
    email: string;
    documents: {
      type: string;
      number: string;
    }[];
    phone_numbers?: string[];
    address?: {
      street: string;
      street_number: string;
      complementary?: string;
      neighborhood: string;
      city: string;
      state: string;
      zipcode: string;
    };
  }
  
  export interface CardData {
    number: string;
    holder: string;
    expiration: string;
    cvv: string;
  }
  
  export interface TransactionData {
    amount: number;
    card_number: string;
    card_holder_name: string;
    card_expiration_date: string;
    card_cvv: string;
    customer: {
      id: string;
    };
    billing: {
      name: string;
      address: {
        street: string;
        street_number: string;
        neighborhood: string;
        city: string;
        state: string;
        zipcode: string;
      };
    };
    items: {
      id: string;
      title: string;
      unit_price: number;
      quantity: number;
      tangible: boolean;
      picture_url?: string;
    }[];
    metadata?: {
      description: string;
    };
  }

  export interface CheckoutSessionData {
    id: string;
    checkoutUrl: string;
    status?: string;
  }
  