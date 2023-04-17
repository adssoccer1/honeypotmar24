// contexts/DealsContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import { getDatabase, ref, onValue, off, query, equalTo, orderByChild } from 'firebase/database';
import { AuthContext } from './AuthContext';

export const DealsContext = createContext();

export const DealsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [deals, setDeals] = useState([]);
  const [uniqueLinks, setUniqueLinks] = useState([]);
  const [uniqueDeals, setUniqueDeals] = useState([]);

  useEffect(() => {

    console.log("context deals updatng...")

    const db = getDatabase();
    const dealsRef = ref(db, 'deals');

    const onDealsChange = (snapshot) => {
      const dealsData = snapshot.val();
      const dealsList = Object.values(dealsData || {});
      setDeals(dealsList);
    };

    onValue(dealsRef, onDealsChange);

    return () => {
      off(dealsRef, 'value', onDealsChange);
    };
  }, []);

  useEffect(() => {
    console.log("context unque advertiser deals updatng...")

    if (user && user.accountType === 'advertiser') {
      const advertiserDeals = deals.filter(
        (deal) => deal.advertiserId === user.id
      );
      setUniqueDeals(advertiserDeals);
    } else {
      setUniqueDeals([]);
    }
  }, [user, deals]);

  useEffect(() => {
    console.log("context unquelnks updatng...")
    if (user && user.accountType === 'newsletter') {
      const db = getDatabase();
      const uniqueLinksRef = ref(db, 'uniqueLinks');
      const uniqueLinksQuery = query(uniqueLinksRef, orderByChild('newsletterId'), equalTo(user.id));

      const onUniqueLinksChange = (snapshot) => {
        const uniqueLinksData = snapshot.val();
        const uniqueLinksList = Object.values(uniqueLinksData || {});
        setUniqueLinks(uniqueLinksList);
      };

      onValue(uniqueLinksQuery, onUniqueLinksChange);

      return () => {
        off(uniqueLinksQuery, 'value', onUniqueLinksChange);
      };
    } else {
      setUniqueLinks([]);
    }
  }, [user]);

  return (
    <DealsContext.Provider value={{ deals, uniqueLinks, uniqueDeals , setDeals, setUniqueLinks, setUniqueDeals,  }}>
      {children}
    </DealsContext.Provider>
  );
};
