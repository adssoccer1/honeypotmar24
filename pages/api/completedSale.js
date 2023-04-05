// pages/api/completedSale.js

import { db } from '../../lib/firebase';
import { ref, push, set, get } from 'firebase/database';

export default async function handler(req, res) {
  console.log("entered completedSale.js")
  if (req.method === 'POST') {
    const { dollarAmount, uniqueIdentifier } = req.body;
    console.log("dollarAmount completedSale.js, ", dollarAmount);
    console.log("uniqueIdentifier completedSale.js, ", uniqueIdentifier);

    const uniqueLinkId = uniqueIdentifier.replace('honey', '');
    console.log("uniqueLinkId completedSale.js, ", uniqueLinkId);

    if (!dollarAmount || !uniqueLinkId) {
      res.status(400).json({ error: 'Invalid request. Both dollarAmount and uniqueLinkId are required.' });
      return;
    }

    try {
      // Find the uniqueLink object associated with the uniqueLinkId
      const uniqueLinksRef = ref(db, 'uniqueLinks');
      const uniqueLinkSnapshot = await get(uniqueLinksRef);
      let uniqueLink;

      uniqueLinkSnapshot.forEach((childSnapshot) => {
        if (childSnapshot.key === uniqueLinkId) {
          uniqueLink = childSnapshot.val();
        }
      });

      console.log("uniqueLink completedSale.js, ", uniqueLink);

      if (!uniqueLink) {
        res.status(404).json({ error: 'Unique identifier not found.' });
        return;
      }

      // Update completedSales in the database
      const newCompletedSaleId = push(ref(db, 'completedSales')).key;
      const newCompletedSale = {
        id: newCompletedSaleId,
        dollarAmount,
        time: new Date().toJSON(),
        newsletterId: uniqueLink.newsletterId,
        advertiserId: uniqueLink.advertiserId,
        dealId: uniqueLink.dealId,
        uniqueLinkId: uniqueLinkId
      };

      await set(ref(db, `completedSales/${newCompletedSaleId}`), newCompletedSale);
      console.log("pushed sales entry to db successfully completedSale.js, ");

      // Add your logic to credit and charge respective parties for the sale
      // ...

      res.status(200).json({ message: 'Completed sale processed successfully.' });
    } catch (error) {
      console.error('Error processing the completed sale:', error);
      res.status(500).json({ error: 'An error occurred while processing the completed sale.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed. Please use POST.' });
  }
}
