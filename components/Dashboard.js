import React, { useEffect, useState } from 'react';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../lib/firebase';

const Dashboard = ({ user }) => {
  console.log("dashboard user: ", user);
  const [completedSales, setCompletedSales] = useState([]);
  const [uniqueLinks, setUniqueLinks] = useState([]);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    const completedSalesRef = ref(db, 'completedSales');
    const uniqueLinksRef = ref(db, 'uniqueLinks');
    const dealsRef = ref(db, 'deals');

    if (user.accountType === 'newsletter') {
      const completedSalesQuery = query(completedSalesRef, orderByChild('newsletterId'), equalTo(user.id));
      const uniqueLinksQuery = query(uniqueLinksRef, orderByChild('newsletterId'), equalTo(user.id));

      const completedSalesSnapshot = await get(completedSalesQuery);
      console.log("all sales for ths newsletter: ",completedSalesSnapshot );

      const uniqueLinksSnapshot = await get(uniqueLinksQuery);
      console.log("all lnks for ths newsletter: ",uniqueLinksSnapshot );

      if (completedSalesSnapshot.exists()) {
        setCompletedSales(Object.values(completedSalesSnapshot.val()));
      }
      if (uniqueLinksSnapshot.exists()) {
        setUniqueLinks(Object.values(uniqueLinksSnapshot.val()));
      }
    } else if (user.accountType === 'advertiser') {
      const completedSalesQuery = query(completedSalesRef, orderByChild('advertiserId'), equalTo(user.id));

      const dealsQuery = query(dealsRef, orderByChild('advertiserId'), equalTo(user.id));

      const completedSalesSnapshot = await get(completedSalesQuery);
      console.log("all sales for ths advertiser: ",completedSalesSnapshot );

      const dealsSnapshot = await get(dealsQuery);
      console.log("all deals for ths advertiser: ",dealsSnapshot );

      if (completedSalesSnapshot.exists()) {
        setCompletedSales(Object.values(completedSalesSnapshot.val()));
      }
      if (dealsSnapshot.exists()) {
        setDeals(Object.values(dealsSnapshot.val()));
      }
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Completed Sales</h2>
      <ul>
        {completedSales.map((sale, index) => (
          <li key={index}>{JSON.stringify(sale)}</li>
        ))}
      </ul>
      <h2>{user.accountType === 'newsletter' ? 'Unique Links' : 'Deals'}</h2>
      <ul>
        {(user.accountType === 'newsletter' ? uniqueLinks : deals).map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
