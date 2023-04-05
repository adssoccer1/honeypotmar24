// components/Layout.js

import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  margin-bottom: 2rem;
`;

const Footer = styled.footer`
  margin-top: auto;
`;

const Content = styled.div`
  flex: 1;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > * {
    margin-right: 0.5rem;
    padding: 0.25rem;
  }

  & > :last-child {
    margin-right: 0;
  }
`;

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
  
    const handleLogin = async () => {
      // Call the login function from AuthContext with the user's email and password
      // Replace 'userEmail' and 'userPassword' with the actual email and password from a form, for example
      await login('userEmail', 'userPassword');
    };
  
    const handleLogout = () => {
      logout();
    };
  
    return (
      <Container>
        <Header>
            {/* Add navigation links and user login/logout status */}
            <Navbar>
                {user ? (
                <>
                    <div>{`Logged in as: ${user.accountType}`}</div>
                    <button onClick={handleLogout}>Logout</button>
                </>
                ) : (
                <>
                    <button onClick={handleLogin}>Login</button>
                    {/* Add a link to the register page */}
                    {/* Add "Sign in with Google" button */}
                    {!user && (
                        <button onClick={handleLoginWithGoogle}>Sign in with Google</button>
                    )}
                </>
                )}
                {/* Add the Leaderboard link */}
                {user && (
                    <Link href="/">
                        Leaderboard 
                    </Link>
                )}
                {/* Add the Dashboard link */}
                {user && (
                    <Link href="/dashboardPage">
                        Dashboard
                    </Link>
                )}
            </Navbar>
      </Header>
      <Content>
        {/* Send user prop to leaderboard */
        React.Children.map(children, (child) =>
          React.cloneElement(child, { user })
        )}
      </Content>
      <Footer>
        {/* Add footer content */}
      </Footer>
    </Container>
  );
};

export default Layout;



