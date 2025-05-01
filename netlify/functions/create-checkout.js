// netlify/functions/create-checkout.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { items } = JSON.parse(event.body);

    const lineItems = items.map((item) => {
      // só inclui images se for uma URL válida
      const images = [];
      if (item.image && typeof item.image === 'string' && /^https?:\/\//.test(item.image)) {
        images.push(item.image);
      }

      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.name,
            // adiciona images só quando existir URL válida
            ...(images.length > 0 ? { images } : {}),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/failure`,
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
