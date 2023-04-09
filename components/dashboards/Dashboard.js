import React from 'react';
import NewsletterDashboard from './NewsletterDashboard';
import AdvertiserDashboard from './AdvertiserDashboard';

//this file just handles the logis of registering the appropriate dashboard component based on an advertiser of newsletter account thats logged in
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
