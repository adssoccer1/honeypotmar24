// components/ClaimOffer.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ClaimButton = styled.button`
  /* Add claim button styles here */
`;

const generateRedirectLink = async (deal, user) => {
    console.log("at generateRedirectLink w dealId  as: ", deal);
    try {
      const response = await fetch('/api/uniqueLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, shopifyLink: (deal.shopurl ? deal.shopurl : 'test.com'), deal: deal }),
      });
      console.log("at generateRedirectLink data returned, ", response);

      if (response.ok) {
        const data = await response.json();
        return data.uniqueLink;
      } else {
        throw new Error('Error generating unique link.');
    }
  } catch (error) {
    console.error('Error generating unique link:', error);
    return 'Error generating unique link.';
  }
};

const copyToClipboard = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

const ClaimOffer = ({ deal, user }) => {
  const [uniqueLink, setUniqueLink] = useState('');

  useEffect(() => {
  }, [deal, user]);

  const fetchUniqueLink = async () => {
    const link = await generateRedirectLink(deal, user);
    return link;
  };

  const handleClick = async () => {
    if (uniqueLink) {
      console.log("link already generated: ", uniqueLink);
      copyToClipboard(uniqueLink);
      alert('The unique redirect link has been copied to your clipboard!');
    } else {
      if (user) { // TODO later change to user.verified
        console.log("new link to be generated");
  
        const link = await fetchUniqueLink();
        setUniqueLink(link);
        copyToClipboard(link);
        console.log("new link now generated: ", link);
  
        alert('The unique redirect link has been copied to your clipboard!');
      } else { 
            alert('An error occurred while generating the unique link. Please try again.');
        }
    }
  };

  return (
    <div>
        <ClaimButton onClick={handleClick}>
        Claim Offer
        </ClaimButton>
        {uniqueLink && <p> You have a link for this offer! {uniqueLink}</p>}
    </div>
  );
};

export default ClaimOffer;
