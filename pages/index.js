// pages/index.js

import React, { useContext } from 'react';
import Layout from '../components/Layout';
import Leaderboard from '../components/Leaderboard';
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
        <Layout>
          <Leaderboard />
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        {/* Footer content */}
        Honeypot ©{new Date().getFullYear()} - Created by YourCompanyName
      </Footer>
    </AntLayout>
  );
};

export default IndexPage;
