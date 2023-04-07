// components/Leaderboard.js

import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import ClaimOffer from './ClaimOffer';
import SubmitDeal from './SubmitDeal';

const Leaderboard = ({ user }) => {
  const [deals, setDeals] = useState([]);

  console.log("user at leaderboard: ", user);

  useEffect(() => {
    const fetchData = async () => {
      const dealsData = await fetchDeals();
      console.log("use effect consolelogged: ", dealsData);
      setDeals(dealsData);
    };
    fetchData();
  }, []);

  const fetchDeals = async () => {
    // Replace this function with a call to your API to fetch affiliate link deals
    try {
      const response = await fetch('/api/deals', { method: 'GET' });
      if (!response.ok) {
        throw new Error('Failed to fetch deals');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Live LeaderBoard</h1>
      {/*advertisers allowed to post deals only */
      user && user.accountType === 'advertiser' && (
        <SubmitDeal user={user} deals={deals} />
      )}
      {/* newsletters allowed to get deals only */
      deals ? (
        <List
          itemLayout="horizontal"
          dataSource={deals}
          style={{ width: '80%', maxWidth: '800px' }}
          renderItem={(deal, index) => (
            <List.Item
              actions={
                user && user.accountType === 'newsletter'
                  ? [<ClaimOffer deal={deal} user={user} />]
                  : []
              }
            >
              <List.Item.Meta
                title={
                  <>
                    <span>{index + 1}. </span>
                    <span>{deal.title}</span>
                  </>
                }
                description={`Commission percentage: ${deal.commission}% of driven revenue - Advertiser: ${deal.shopurl}`}
              />
              <div>
                <p>Description: {deal.description}</p>
                <p>Date: {deal.dateCreated}</p>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Leaderboard;
