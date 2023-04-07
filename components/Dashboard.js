import React from 'react';
import NewsletterDashboard from './NewsletterDashboard';
import AdvertiserDashboard from './AdvertiserDashboard';

const Dashboard = ({ user }) => {
  if (user.accountType === 'newsletter') {
    return <NewsletterDashboard user={user} />;
  } else if (user.accountType === 'advertiser') {
    return <AdvertiserDashboard user={user} />;
  } else {
    return <div>Invalid account type</div>;
  }
};

export default Dashboard;
