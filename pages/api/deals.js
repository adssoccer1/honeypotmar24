// pages/api/deals.js

import { firebase, db } from '../../lib/firebase';
import { ref, push, set, onValue } from "firebase/database";


// pages/api/deals.js


export default async function handler (req, res) {
    console.log('deals handler');
  if (req.method === 'GET') {
    try {
      const dealsRef = ref(db, 'deals');
      onValue(dealsRef, (snapshot) => {
        const dealsData = snapshot.val();
        const deals = Object.entries(dealsData || {}).map(([id, data]) => ({
          id,
          ...data,
        }));
        res.status(200).json(deals);
      }); 
    } catch (error) {
      console.error('Error fetching deals:', error);
      res.status(500).json({ message: 'Error fetching deals' });
    }
  } else if (req.method === 'POST') {
    try {
        const newDeal = req.body;
        const dealsRef = ref(db, 'deals');
        const newDealRef = push(dealsRef);
        await set(newDealRef, newDeal);
        res.status(200).json({ message: 'Deal added successfully' });
    } catch (error) {
        console.error('Error creating deal:', error);
        res.status(500).json({ message: 'Error creating deal:'});
    }
  }
}

 /*
        //remove to fetch from real db
        const dealLst = [
            { id: 1, title: 'Deal 1', discount: '10%', advertiser: 'Advertiser 1' },
            { id: 2, title: 'Deal 2', discount: '20%', advertiser: 'Advertiser 2' },
            { id: 3, title: 'Deal 3', discount: '15%', advertiser: 'Advertiser 3' },
            // Add more sample deals if necessary
          ];
          */