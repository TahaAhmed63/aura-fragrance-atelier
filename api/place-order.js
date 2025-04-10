
import { createTransport } from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const orderData = req.body;
    
    // Setup email transporter
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'ataha6381@gmail.com',
        pass: process.env.EMAIL_PASS || 'nlio jyhq piii tklg',
      },
    });
    
    // Format order items for email
    const items = orderData.items.map(item => 
      `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    // Create email content
    const emailContent = {
      from: process.env.EMAIL_USER || 'ataha6381@gmail.com',
      to: orderData.customer.email,
      subject: 'Your Order Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #000; text-align: center; padding: 20px 0; background-color: #f8f8f8;">Thank You For Your Order!</h2>
          
          <div style="padding: 20px;">
            <p>Dear ${orderData.customer.firstName} ${orderData.customer.lastName},</p>
            
            <p>We're pleased to confirm your order. Your luxury fragrance is on its way!</p>
            
            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
            
            <div style="margin: 20px 0;">
              <pre style="white-space: pre-wrap;">${items}</pre>
            </div>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0;">Subtotal</td>
                <td style="text-align: right;">$${orderData.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0;">Shipping</td>
                <td style="text-align: right;">$${orderData.shipping.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0;">Tax</td>
                <td style="text-align: right;">$${orderData.tax.toFixed(2)}</td>
              </tr>
              <tr style="font-weight: bold;">
                <td style="padding: 10px 0; border-top: 2px solid #eee;">Total</td>
                <td style="text-align: right; border-top: 2px solid #eee;">$${orderData.total.toFixed(2)}</td>
              </tr>
            </table>
            
            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 30px;">Payment Method</h3>
            <p>${orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
            
            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 30px;">Shipping Address</h3>
            <p>
              ${orderData.customer.firstName} ${orderData.customer.lastName}<br>
              ${orderData.customer.address}<br>
              ${orderData.customer.addressLine2 ? orderData.customer.addressLine2 + '<br>' : ''}
              ${orderData.customer.city}, ${orderData.customer.state} ${orderData.customer.zipCode}
            </p>
            
            <p style="margin-top: 30px;">
              If you have any questions about your order, please contact our customer service team.
            </p>
            
            <p style="margin-top: 40px; font-size: 12px; color: #777; text-align: center;">
              This is an automated email, please do not reply directly to this message.
            </p>
          </div>
        </div>
      `,
    };
    
    // Also send an admin notification
    const adminEmail = {
      from: process.env.EMAIL_USER || 'ataha6381@gmail.com',
      to: process.env.EMAIL_USER || 'ataha6381@gmail.com',
      subject: 'New Order Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #000; text-align: center; padding: 20px 0; background-color: #f8f8f8;">New Order Received</h2>
          
          <div style="padding: 20px;">
            <p><strong>Customer:</strong> ${orderData.customer.firstName} ${orderData.customer.lastName}</p>
            <p><strong>Email:</strong> ${orderData.customer.email}</p>
            <p><strong>Payment Method:</strong> ${orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
            <p><strong>Total Amount:</strong> $${orderData.total.toFixed(2)}</p>
            
            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Items</h3>
            <div style="margin: 20px 0;">
              <pre style="white-space: pre-wrap;">${items}</pre>
            </div>
            
            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 30px;">Shipping Address</h3>
            <p>
              ${orderData.customer.address}<br>
              ${orderData.customer.addressLine2 ? orderData.customer.addressLine2 + '<br>' : ''}
              ${orderData.customer.city}, ${orderData.customer.state} ${orderData.customer.zipCode}
            </p>
          </div>
        </div>
      `,
    };
    
    // Send both emails
    await transporter.sendMail(emailContent);
    await transporter.sendMail(adminEmail);
    
    // For real implementation, you might want to store the order in a database here
    
    res.status(200).json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    console.error('Order placement error:', error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
}
