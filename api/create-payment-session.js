
import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { orderDetails } = req.body;
    
    // Initialize Stripe with your secret key
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51OnMG5D3dsM4GvDNJzN9tvy8SVVQld50y4TkZzJprrEihsu6RRUf4VCQJpBYZp3hHlZwXAh3fysJPJMbfdXAoChD00iLEjBSvk');
    
    // Format line items for Stripe
    const lineItems = orderDetails.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.tagline || '',
          images: [item.imageSrc]
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.quantity,
    }));
    
    // Create a shipping fee item
    if (orderDetails.shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping Fee',
          },
          unit_amount: Math.round(orderDetails.shipping * 100),
        },
        quantity: 1,
      });
    }

    // Create a tax item
    if (orderDetails.tax > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Tax',
          },
          unit_amount: Math.round(orderDetails.tax * 100),
        },
        quantity: 1,
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout?canceled=true`,
      customer_email: orderDetails.customer.email,
      metadata: {
        orderId: orderDetails.date, // Using date as a simple order ID
        customerName: `${orderDetails.customer.firstName} ${orderDetails.customer.lastName}`,
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
    });

    res.status(200).json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Payment session error:', error);
    res.status(500).json({ error: error.message });
  }
}
