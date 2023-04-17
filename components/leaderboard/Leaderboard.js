// components/Leaderboard.js

import React, { useEffect, useState } from 'react';
import ClaimOffer from './ClaimOffer';
import SubmitDeal from './SubmitDeal';
import Board from './Board';
import FinishAdvertiserRegistration from '../advertiserRegistration/FinishAdvertiserRegistration';
import AdvertiserLeaderBoardVerification from '../verification/advertiserLeaderBoardVerification/AdvertiserLeaderBoardVerification'; // Import the RegisterModal component

import SubmitDealModal from './SubmitDealModal';

const Leaderboard = ({ user }) => {
  const [deals, setDeals] = useState([]);
  const [showFinishRegistrationModal, setShowFinishRegistrationModal] = useState(false);
  const [showSubmitDealModal, setSubmitDealModal] = useState(false); // Add a new state for the RegisterModal

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
    if (!user.verified) { //change this after dev testing
      setSubmitDealModal(true)
    } else {
       // Show the RegisterModal if the user is not verified
    }
  };

  return (
    <div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Live LeaderBoard</h1>
        <div className="px-4 sm:px-6 lg:px-8">

          <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the users in your account including their name, title, email and role.
                </p>
              </div>
          
              {user && user.accountType === 'advertiser' && (
                <div>
                  <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                      type="button"
                      onClick={handlePostNewDeal}
                      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Post New Deal
                    </button>
                  </div>
                  {showSubmitDealModal && <SubmitDealModal user={user} showModal={showSubmitDealModal} closeModal={() => setSubmitDealModal(false)} />} {/* Render the RegisterModal and pass the closeModal prop */}
              </div>
              )}
            </div>
        </div>
        <Board user={user} deals={deals}></Board>
        </div>

    </div>
  );
};

export default Leaderboard;
