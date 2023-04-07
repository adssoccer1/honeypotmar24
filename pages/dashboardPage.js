import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
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
        <Layout>
          {user && <Dashboard user={user} />}
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        {/* Footer content */}
        Honeypot ©{new Date().getFullYear()} - Created by YourCompanyName
      </Footer>
    </AntLayout>
  );
};

export default DashboardPage;
