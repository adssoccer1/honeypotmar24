// pages/api/redirect.js

//this class listens for clicks on the "uniqueurls". When a click happens the user is sent here where a click through event is 
//recorded and the user is immediately redirected to the original advertiser's shopify store with a utm_code that can be tracked for purchases.
import { db } from '../../lib/firebase';
import { ref, update, get } from 'firebase/database';

const generateUTMCode = () => {
    return Math.random().toString(36).substring(2, 10);
  };
  
export default async function handler(req, res) {
    console.log("at redirect route ");
  if (req.method === 'GET') {
    const { id } = req.query;
    console.log("in get method redirect route ", id);

    try {
      const uniqueLinkRef = ref(db, `uniqueLinks/${id}`);
      const snapshot = await get(uniqueLinkRef);
      console.log("in get method redirect  try ", id);

      if (snapshot.exists()) {
        const uniqueLink = snapshot.val();
        console.log("in get method redirect  shop lnk ", uniqueLink.shopifyLink);

        await update(uniqueLinkRef, { clicks: uniqueLink.clicks + 1 });

        //const utm_campaign = generateUTMCode();
        const utm_campaign = "honey"+uniqueLink.id;

        const urlWithUTM = new URL(uniqueLink.shopifyLink);

        urlWithUTM.searchParams.append('utm_campaign', utm_campaign);

        res.redirect(urlWithUTM.toString());
        res.status(302).end();
      } else {
        res.status(404).json({ error: 'Unique link not found.' });
    }
  } catch (error) {
    console.error('Error handling redirect:', error);
    res.status(500).json({ error: 'An error occurred while processing the redirect.' });
  }
} else {
  res.status(405).json({ error: 'Method not allowed. Please use GET.' });
}
}