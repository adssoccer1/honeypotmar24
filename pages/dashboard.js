// pages/dashboard.js

import React from 'react';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import { useAuthContext } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuthContext();

  return (
    <Layout>
      <Dashboard user={user} />
    </Layout>
  );
};

export default DashboardPage;
