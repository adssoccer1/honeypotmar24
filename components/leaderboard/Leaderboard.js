// components/Leaderboard.js

//This is the leaderboard, where deals are posted. We should probably build a "Deal" component the we can use to render each deal
import React, { useEffect, useState } from 'react';
import { Button, List } from 'antd';
import ClaimOffer from './ClaimOffer';
import SubmitDeal from './SubmitDeal';
import Board from './Board';

import FinishAdvertiserRegistration from '../advertiserRegistration/FinishAdvertiserRegistration';

const Leaderboard = ({ user }) => {
  const [deals, setDeals] = useState([]);
  const [showFinishRegistrationModal, setShowFinishRegistrationModal] = useState(false);
  const [showSubmitDeal, setShowSubmitDeal] = useState(false);

  console.log("user at leaderboard: ", user);

  useEffect(() => {
    const fetchData = async () => {
      const dealsData = await fetchDeals();
      console.log("use effect consolelogged: ", dealsData);
      setDeals(dealsData);
    };
    fetchData();
  }, []);

  //fetches the deals from out api route that gets all the deals from firebase
  const fetchDeals = async () => {
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

  const handlePostNewDeal = () => {
    if (user.verified) {
      setShowSubmitDeal(true);
    } else {
      setShowFinishRegistrationModal(true);
    }
  };

  const handleFinishRegistrationCancel = () => {
    setShowFinishRegistrationModal(false);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Live LeaderBoard</h1>
      {//render this if user logged in as advertiser account only. 
      user && user.accountType === 'advertiser' && (
        <div>
          <Button type="primary" onClick={handlePostNewDeal}>
            Post New Deal
          </Button>
          <FinishAdvertiserRegistration
            user={user} 
            open={showFinishRegistrationModal}
            onCancel={handleFinishRegistrationCancel}
          />
          {showSubmitDeal && <SubmitDeal user={user} deals={deals} />}
        </div>
      )}
      {/* newsletters allowed to get deals only */}
      {deals ? (
        <List
          itemLayout="horizontal"
          dataSource={deals}
          style={{ width: '80%', maxWidth: '800px' }}
          renderItem={(deal, index) => (
            <List.Item
              key={deal.id}
              actions={ //if logged in as a newsletter then the claim offer button will appear. 
                user && user.accountType === 'newsletter'
                  ? [<ClaimOffer key={deal.id} deal={deal} user={user} />]
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