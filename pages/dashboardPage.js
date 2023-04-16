import React, { useEffect, useContext } from 'react';
import NavigationBar from '../components/NavigationBar';
import Dashboard from '../components/dashboards/Dashboard';
import FooterTailwind from '../components/FooterTailwind';

import { useRouter } from 'next/router';
import { Layout as AntLayout } from 'antd';
import NavigationBarV2 from '../components/NavigationBarV2';
import { AuthContext } from '../contexts/AuthContext';

const { Header, Content, Footer } = AntLayout;

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

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
      </Header>

      <Content>
        {user && <Dashboard user={user} />}
      </Content>
      
      <FooterTailwind></FooterTailwind>
    </div>
  );
};

export default DashboardPage;
