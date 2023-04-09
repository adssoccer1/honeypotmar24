// pages/index.js

import React, { useContext } from 'react';
import NavigationBar from '../components/NavigationBar';
import Leaderboard from '../components/leaderboard/Leaderboard';
import { Layout as AntLayout } from 'antd';
import { AuthContext } from '../contexts/AuthContext';

const { Header, Content, Footer } = AntLayout;

const IndexPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <AntLayout>
      {!user && (
        <Header
          style={{
            backgroundColor: 'white',
            textAlign: 'center',
            height: 'auto', // Set the height to auto
            padding: '1rem', // Add some padding
          }}
        >
          {/* This header section should be a landing page that explains the webapp to first time visitors. Also include a link to the shopify app.
              The leaderboard will be featured underneath this "landing" page section and this section will disapear when a user logs in */ }
          <h1>Welcome to Honeypot</h1>
          <p>
            Honeypot connects advertisers and newsletters to facilitate mutually
            beneficial partnerships. Advertisers can post exclusive deals
            while newsletters can easily discover and claim offers to share with
            their audience. Experience seamless collaboration and drive revenue
            growth through our user-friendly platform.

            Advertisers must download our shopify app onto their shopify store before they are verified to post deals to the leaderboard.
          </p>
        </Header>
      )}
      <Content>
        <NavigationBar>
          <Leaderboard />
        </NavigationBar>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        {/* Footer content 
        The terms of service and another othe important information should always be in the footer component*/}
        Honeypot ©{new Date().getFullYear()} - Created by YourCompanyName
      </Footer>
    </AntLayout>
  );
};

export default IndexPage;
