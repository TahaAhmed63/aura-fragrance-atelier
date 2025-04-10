
import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { session_id } = req.query;
    
    if (!session_id) {
      return res.status(400).json({ error: 'Missing session ID' });
    }
    
    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51OnMG5D3dsM4GvDNJzN9tvy8SVVQld50y4TkZzJprrEihsu6RRUf4VCQJpBYZp3hHlZwXAh3fysJPJMbfdXAoChD00iLEjBSvk');
    
    // Retrieve session to check payment status
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    if (session.payment_status === 'paid') {
      return res.status(200).json({ 
        success: true, 
        customer: session.customer_details,
        paymentId: session.payment_intent,
        paymentStatus: session.payment_status
      });
    } else {
      return res.status(200).json({ 
        success: false, 
        paymentStatus: session.payment_status 
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
