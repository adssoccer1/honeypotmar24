// pages/index.js

import React, { useContext } from 'react';
import NavigationBar from '../components/NavigationBar';
import Leaderboard from '../components/leaderboard/Leaderboard';
import FooterTailwind from '../components/FooterTailwind';
import LandingPage from '../components/landingpage/LandingPage';
import NavigationBarV2 from '../components/NavigationBarV2';

import { Layout as AntLayout } from 'antd';
import { AuthContext } from '../contexts/AuthContext';

const { Header, Content, Footer } = AntLayout;

const IndexPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
        <Header
          style={{
            backgroundColor: 'white',
            textAlign: 'center',
            height: 'auto', // Set the height to auto
            padding: '1rem', // Add some padding
          }}
        >
          <NavigationBarV2 user={user}></NavigationBarV2>
          {!user && (
          <LandingPage></LandingPage>
          )}

        </Header>
          
        <div className="pt-16"> {/* Add padding to the top of the Leaderboard component */}
          <Leaderboard user={user}/>
        </div>      
        
      <FooterTailwind></FooterTailwind>

    </div>
  );
};

export default IndexPage;