// components/Layout.js

import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children }) => {
  const { user, login, logout, loginWithGoogle } = useContext(AuthContext);

  const handleLoginWithGoogle = async () => {
    console.log("here");
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Menu mode="horizontal">
        {user ? (
          <>
            <Menu.Item>{`Logged in as: ${user.accountType}`}</Menu.Item>
            <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item onClick={handleLoginWithGoogle}>Sign in for access</Menu.Item>
          </>
        )}
        {user && (
          <Menu.Item>
            <Link href="/">Leaderboard</Link> 
          </Menu.Item>
        )}
        {user && (
          <Menu.Item>
            <Link href="/dashboardPage">Dashboard</Link>
          </Menu.Item>
        )}
      </Menu>
      {/* Send user prop to leaderboard */
        React.Children.map(children, (child) =>
        React.cloneElement(child, { user })
      )}
    </>
  );
};

export default Layout;
