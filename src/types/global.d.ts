interface Window {
    PagarMeCheckout: {
      Checkout: new (config: any) => {
        open: (params: any) => void;
      };
    };
  }
  