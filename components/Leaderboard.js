// components/Leaderboard.js

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ClaimOffer from './ClaimOffer';
import SubmitDeal from './SubmitDeal';

const LeaderboardContainer = styled.div`
  /* Add leaderboard styles here */
`;

const DealItem = styled.div`
  /* Add deal item styles here */
`;

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
      const response = await fetch('/api/deals', {method: 'GET'});
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
    <LeaderboardContainer>
      {/*advertsers allowed to post deals only */
      user && user.accountType === 'advertiser' && (
        <SubmitDeal user={user} deals={deals}/>
      )}
      {/* newsletters allowed to get deals only */
      deals ? 
        deals.map((deal) => (
            <DealItem key={deal.id}>
            <h3>{deal.title}</h3>
            <p>Commission percentage: {deal.commission}% of driven revenue</p>
            <p>Advertiser: {deal.shopurl}</p>
            <p>Description: {deal.description}</p>
            <p>Date: {deal.dateCreated}</p>
            {user && user.accountType === 'newsletter' && (
                <ClaimOffer dealId={deal.id} user={user}/>
            )}
            </DealItem>
        ))
      : <></>}
    </LeaderboardContainer>
  );
};

export default Leaderboard;

