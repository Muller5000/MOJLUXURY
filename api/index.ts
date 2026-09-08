import express from 'express';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { supabaseAdmin } from './supabaseAdmin';

dotenv.config();

const app = express();

// Middleware to capture the raw body for signature verification
app.use(express.json({
  verify: (req, res, buf) => {
    (req as any).rawBody = buf;
  }
}));

const PORT = process.env.PORT || 3001;
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

// Paystack Webhook endpoint
app.post('/api/webhooks/paystack', async (req, res) => {
  const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY)
                     .update((req as any).rawBody || JSON.stringify(req.body))
                     .digest('hex');
                     
  if (hash !== req.headers['x-paystack-signature']) {
    console.error('Invalid Paystack signature');
    return res.status(401).send('Invalid signature');
  }

  // Acknowledge the webhook promptly as per Paystack best practices
  res.status(200).send('Webhook received successfully');

  const event = req.body;
  
  if (event.event === 'charge.success') {
    const transaction = event.data;
    console.log('Payment successful:', transaction.reference);

    if (supabaseAdmin) {
      try {
        const { error } = await supabaseAdmin
          .from('orders')
          .update({ status: 'verified', payment_status: 'paid' })
          .eq('paystack_reference', transaction.reference);
          
        if (error) throw error;
        console.log('Order verified in Supabase');
      } catch (err) {
        console.error('Error updating order in Supabase:', err);
      }
    }
  }
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

// Export the app for Vercel serverless function support
export default app;
