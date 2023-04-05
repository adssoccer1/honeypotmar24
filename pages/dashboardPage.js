import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import { useAuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

const DashboardPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <Layout>
      {user && <Dashboard user={user} />}
    </Layout>
  );
};

export default DashboardPage;
