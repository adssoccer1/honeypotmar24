// components/Layout.js

import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  /* Container styles */
`;

const Header = styled.header`
  /* Header styles */
`;

const Footer = styled.footer`
  /* Footer styles */
`;

const Content = styled.div`
  /* Add styles for the content container here */
`;

const Navbar = styled.div`
  /* Add navbar styles here */
`;

const Layout = ({ children }) => {
    const { user, login, logout, loginWithGoogle } = useContext(AuthContext);

    const handleLoginWithGoogle = async () => {
        console.log("here");
        try {
          await loginWithGoogle();
          router.push('/');
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
                    <Link href="/dashboard">
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



