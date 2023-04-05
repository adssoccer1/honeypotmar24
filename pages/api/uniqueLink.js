// pages/api/uniqueLink.js

import { auth, db } from '../../lib/firebase';
import { ref, set, update, get, push, query, equalTo, orderByChild } from 'firebase/database';

const checkExistingLink = async (userId, dealId) => {
    const linksRef = ref(db, 'uniqueLinks');
    const existingLinkQuery = query(linksRef, orderByChild('userId_dealId'), equalTo(`${userId}_${dealId}`));
    const snapshot = await get(existingLinkQuery);
  
    if (snapshot.exists()) {
      const linkData = snapshot.val();
      const linkKey = Object.keys(linkData)[0];
      return linkData[linkKey].url;
    }
  
    return null;
  };

const createUniqueLink = async (userId, shopifyLink, deal) => {
    console.log("at createUniqueLink before db request, ", shopifyLink);
    console.log("at createUniqueLink w deal, ", deal);

    const dealId = deal.id;

    const existingLink = await checkExistingLink(userId, dealId);

  if (existingLink) {
    return existingLink;
  }

  const newUniqueLinkId = push(ref(db, 'uniqueLinks')).key;

  const url = `https://example.com/redirect/?id=${newUniqueLinkId}`;
  console.log("need to replace ths wth an envronment varable");
  const newUniqueLink = {
    id: newUniqueLinkId,
    newsletterId: userId,
    advertiserId: deal.advertiserId,
    userId_dealId: `${userId}_${dealId}`, // Add this field to make querying easier
    shopifyLink,
    clicks: 0,
    dealId,
    url: url,
    purchaseEvents: 0,
    dateCreated: new Date().toJSON(),
    valid: true
  };

  console.log("at createUniqueLink after db request, ", newUniqueLink);

  await set(ref(db, `uniqueLinks/${newUniqueLinkId}`), newUniqueLink);

  return url;
};

export default async function handler(req, res) {

  if (req.method === 'POST') {
    const { userId, shopifyLink, deal } = req.body;
    console.log("at unque lnk handler ", deal);

    try {
        const uniqueLink = await createUniqueLink(userId, shopifyLink, deal);
        console.log("at unque lnk handler 200 res: ", uniqueLink);

        res.status(200).json({ uniqueLink });
      } catch (error) {
        console.error('Error generating unique link:', error);
        res.status(500).json({ error: 'An error occurred while generating the unique link.' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed. Please use POST.' });
    }
  }