// netlify/functions/create-checkout.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { items } = JSON.parse(event.body);

    const line_items = items.map((item) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.name,
          ...(item.image?.startsWith('http') ? { images: [item.image] } : {}),
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      payment_method_options: {
        card: {
          installments: {
            enabled: true,
          },
        },
      },
      line_items,
      mode: 'payment',
      success_url: `${process.env.URL_STRIPE}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL_STRIPE}/failure`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id, url: session.url }),
    };
  } catch (err) {
    console.error('❌ create-checkout error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
