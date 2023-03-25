// components/Dashboard.js

import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  /* Add dashboard styles here */
`;

const Dashboard = ({ user }) => {
  if (!user) {
    return <div>Please log in to view your dashboard</div>;
  }

  return (
    <DashboardContainer>
      <h2>{user.accountType === 'newsletter' ? 'Newsletter' : 'Advertiser'} Dashboard</h2>
      {/* Render dashboard content based on the user's account type */}
      {user.accountType === 'newsletter' ? (
        <div>
          {/* Render newsletter dashboard content */}
          <p>Sales driven: 123</p>
          <p>Expected commissions: $456.78</p>
        </div>
      ) : (
        <div>
          {/* Render advertiser dashboard content */}
          <p>Sales: 321</p>
          <p>Expected expenses: $987.65</p>
        </div>
      )}
    </DashboardContainer>
);
};

export default Dashboard;