// pages/api/create_customer.js
import { getSession } from 'next-auth/react';
import stripePackage from 'stripe';
import { get } from 'firebase/database';
import { ref, set } from 'firebase/database';
import { db } from '../../lib/firebase';

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      const { email, paymentMethodId } = req.body;
      const customer = await stripe.customers.create({
        email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      // Save the customer ID to the user database
      const userRef = ref(db, `users/${session.user.id}`);
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        await set(userRef, {
          ...userSnapshot.val(),
          stripeCustomerId: customer.id,
          paymentVerified: true,
        });
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({ error: 'An error occurred while creating the customer.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
