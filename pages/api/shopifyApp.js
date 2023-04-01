// pages/api/shopifyApp.js
// pages/api/shopifyApp.js

import { ref, get, update, orderByChild, equalTo, push, query, set } from 'firebase/database';
import { db } from '../../lib/firebase';

export default async function handler(req, res) {
    console.log("shopify install/unistall endpoint hit");
    if (req.method === 'POST') {
        console.log(req.body);
      const { shopUrl, action } = req.body;
      console.log("shopify install/unistall endpoint url", shopUrl, " and action ", action);

      if (!shopUrl || !action) {
        res.status(400).json({ error: 'Invalid request. Both shopifyStoreUrl and action are required.' });
        return;
      }
  
      try {
        switch (action) {
          case 'install':
            // Handle the installation event
            await handleInstall(shopUrl);
            res.status(200).json({ message: 'Installation event processed successfully.' });
            break;
  
          case 'uninstall':
            // Handle the uninstallation event
            await handleUninstall(shopUrl);
            res.status(200).json({ message: 'Uninstallation event processed successfully.' });
            break;
  
          default:
            res.status(400).json({ error: 'Invalid action. Action must be either "install" or "uninstall".' });
            break;
        }
      } catch (error) {
        console.error('Error processing the event:', error);
        res.status(500).json({ error: 'An error occurred while processing the event.' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed. Please use POST.' });
    }
  }
  

async function handleInstall(shopUrl) {
    // Add your logic for handling the installation event
    console.log(`Handling installation for store: ${shopUrl}`);
    // Check and update advertiser users
    const usersRef = ref(db, 'users');
    const usersQuery = query(usersRef, orderByChild('shopUrl'), equalTo(shopUrl));
    
    const usersSnapshot = await get(usersQuery);
    console.log('usersSnapshot:');

    if (usersSnapshot.exists()) {
        usersSnapshot.forEach((userSnapshot) => {
        const userId = userSnapshot.key;
        update(ref(db, `users/${userId}`), { verifiedUrl: false });
        });
    }
    
    // Check and update verifiedShops
    const verifiedShopsRef = ref(db, 'verifiedShops');
    const verifiedShopsQuery = query(verifiedShopsRef, orderByChild('shopUrl'), equalTo(shopUrl));
    
    const verifiedShopsSnapshot = await get(verifiedShopsQuery);
    
    if (verifiedShopsSnapshot.exists()) {
        verifiedShopsSnapshot.forEach((shopSnapshot) => {
        const shopId = shopSnapshot.key;
        update(ref(db, `verifiedShops/${shopId}`), { installed: true });
        });
    } else {
        // Create a new entry in verifiedShops
        const newShopId = push(ref(db, 'verifiedShops')).key;
        const newShop = {
        shopUrl: shopUrl,
        verifiedUrl: false,
        installed: true,
        };
        await set(ref(db, `verifiedShops/${newShopId}`), newShop);
    }
    }

      
  
  async function handleUninstall(shopUrl) {
    // Add your logic for handling the uninstallation event
    console.log(`Handling uninstallation for store: ${shopUrl}`);
  }
  