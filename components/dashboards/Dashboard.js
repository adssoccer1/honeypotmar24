import React from 'react';
import NewsletterDashboard from './newsletter/NewsletterDashboard';
import AdvertiserDashboard from './advertiser/AdvertiserDashboard';
import AdvertiserDashboardV2 from './advertiser/AdvertiserDashboardV2';
import NewsletterDashboardV2 from './newsletter/NewsletterDashboardV2';

//this file just handles the logis of registering the appropriate dashboard component based on an advertiser of newsletter account thats logged in
const Dashboard = ({ user }) => {
  if (user.accountType === 'newsletter') {
    return <NewsletterDashboardV2 user={user}></NewsletterDashboardV2>;

    //return <NewsletterDashboard user={user} />;
  } else if (user.accountType === 'advertiser') {
    return <AdvertiserDashboardV2 user={user}></AdvertiserDashboardV2>;
    //return <AdvertiserDashboard user={user} />;
  } else {
    return <div>Invalid account type</div>;
  }
};

export default Dashboard;
