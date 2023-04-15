// pages/index.js

import React, { useContext } from 'react';
import NavigationBar from '../components/NavigationBar';
import Leaderboard from '../components/leaderboard/Leaderboard';
import FooterTailwind from '../components/FooterTailwind';
import LandingPage from '../components/landingpage/LandingPage';

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
          <LandingPage></LandingPage>
          {/* This header section should be a landing page that explains the webapp to first time visitors. Also include a link to the shopify app.
              The leaderboard will be featured underneath this "landing" page section and this section will disapear when a user logs in */ }
          
        </Header>
      )}
      <Content>
        <NavigationBar>
          <Leaderboard />
        </NavigationBar>
      </Content>
      
      <FooterTailwind></FooterTailwind>

    </AntLayout>
  );
};

export default IndexPage;