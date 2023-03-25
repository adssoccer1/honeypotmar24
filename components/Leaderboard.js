// components/Leaderboard.js

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ClaimOffer from './ClaimOffer';

const LeaderboardContainer = styled.div`
  /* Add leaderboard styles here */
`;

const DealItem = styled.div`
  /* Add deal item styles here */
`;

const AddDealForm = styled.form`
  /* Add styles for the add deal form here */
`;

const fetchDeals = async () => {
  // Replace this function with a call to your API to fetch affiliate link deals
  return [
    { id: 1, title: 'Deal 1', discount: '10%', advertiser: 'Advertiser 1' },
    { id: 2, title: 'Deal 2', discount: '20%', advertiser: 'Advertiser 2' },
    { id: 3, title: 'Deal 3', discount: '15%', advertiser: 'Advertiser 3' },
    // Add more sample deals if necessary
  ];
};



const Leaderboard = ({ user }) => {
    const [newDeal, setNewDeal] = useState('');
    const [deals, setDeals] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      const dealsData = await fetchDeals();
      setDeals(dealsData);
    };
    fetchData();
  }, []);

  const handleAddDeal = async (e) => {
    e.preventDefault();
    if (newDeal.trim()) {
      await addDeal(newDeal);
      setNewDeal('');
    }
  };

  const addDeal = async (newDeal) => {
    try {
        
      // Replace this URL with your API endpoint for adding a new deal
      /*
      const response = await fetch('https://your-api.com/addDeal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deal: newDeal }),
      });

      if (!response.ok) {
        throw new Error('Failed to add deal');
    }
    */

    //const addedDeal = await response.json();
    const addedDeal = {
        id: Date.now(), // Generate a unique ID based on the current timestamp
        title: 'New Deal Title',
        description: 'New Deal Description',
        discount: 15,
        // Include any other relevant deal data here
      };
    // Update the state with the new deal
    setDeals((deals) => [...deals, addedDeal]);

    } catch (error) {
        console.error('Error adding deal:', error);
        // Optionally, handle the error by displaying a message or updating the UI
    }
  };


  return (
    <LeaderboardContainer>
      {/*advertsers allowed to get deals only */
      user && user.accountType === 'advertiser' && (
        <AddDealForm onSubmit={handleAddDeal}>
          <label htmlFor="newDeal">Add a new deal:</label>
          <input
            type="text"
            id="newDeal"
            value={newDeal}
            onChange={(e) => setNewDeal(e.target.value)}
          />
          <button type="submit">Add Deal</button>
        </AddDealForm>
      )}
      {/* newsletters allowed to post deals only */
      deals.map((deal) => (
        <DealItem key={deal.id}>
          <h3>{deal.title}</h3>
          <p>Discount: {deal.discount}</p>
          <p>Advertiser: {deal.advertiser}</p>
          {user && user.accountType === 'newsletter' && (
            <ClaimOffer dealId={deal.id} />
          )}
        </DealItem>
      ))}
    </LeaderboardContainer>
  );
};

export default Leaderboard;
