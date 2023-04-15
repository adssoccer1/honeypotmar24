import React, { useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import Dashboard from '../components/dashboards/Dashboard';
import FooterTailwind from '../components/FooterTailwind';

import { useAuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { Layout as AntLayout } from 'antd';

const { Header, Content, Footer } = AntLayout;

const DashboardPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <AntLayout>
      <Content>
        <NavigationBar>
          {user && <Dashboard user={user} />}
        </NavigationBar>
        
      </Content>
      <FooterTailwind></FooterTailwind>
    </AntLayout>

  );
};

export default DashboardPage;
