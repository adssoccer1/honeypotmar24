import { firebase, db } from '../../lib/firebase';
import { ref, push, set, onValue, get } from 'firebase/database';

const fetchDeals = async () => {
  const dealsRef = ref(db, 'deals');
  const snapshot = await get(dealsRef);
  const dealsData = snapshot.val();
  const deals = Object.entries(dealsData || {}).map(([id, data]) => ({
    id,
    ...data,
  }));
  return deals;
};

const createDeal = async (newDeal) => {
  const dealsRef = ref(db, 'deals');
  const newDealRef = push(dealsRef);
  await set(newDealRef, newDeal);
  return { ...newDeal, id: newDealRef.key };
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const deals = await fetchDeals();
      res.status(200).json(deals);
    } catch (error) {
      console.error('Error fetching deals:', error);
      res.status(500).json({ message: 'Error fetching deals' });
    }
  } else if (req.method === 'POST') {
    try {
      const newDeal = req.body;
      const createdDeal = await createDeal(newDeal);
      res.status(200).json(createdDeal);
    } catch (error) {
      console.error('Error creating deal:', error);
      res.status(500).json({ message: 'Error creating deal' });
    }
  }
}
