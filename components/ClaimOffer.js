// components/ClaimOffer.js

import React from 'react';
import styled from 'styled-components';

const ClaimButton = styled.button`
  /* Add claim button styles here */
`;

const generateRedirectLink = (dealId) => {
  // Replace this function with a call to your API to generate a unique redirect link with UTM codes
  //check if the user already has a unique link for this deal, in which case present it to them. 
  return `https://example.com/shop?dealId=${dealId}&utm_source=newsletter&utm_medium=affiliate`;
};

const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };
  
  const ClaimOffer = ({ dealId, user }) => {
    
    const handleClick = () => {
        //has to get shopify link to redirect to and also userid to include in link. 
      const redirectLink = generateRedirectLink(dealId, user);
      copyToClipboard(redirectLink);
      alert('The unique redirect link has been copied to your clipboard!');
    };
  
    return (
      <ClaimButton onClick={handleClick}>
        Claim Offer
      </ClaimButton>
    );
  };
  
  export default ClaimOffer;
  