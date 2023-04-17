// components/ClaimOffer.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../verification/Modal'; // Adjust the path if necessary
import ClaimUniqueLinkModal from './ClaimUniqueLinkModal'; // Adjust the path if necessary

 //This class is used by newsletter accounts to get deals from the leaderboard. 
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
  const [showModal, setShowModal] = useState(false);
  const [showClaimUniqueLinkModal, setShowClaimUniqueLinkModal] = useState(false); // Add a new state for the LinkModal

  useEffect(() => {
  }, [deal, user]);

  const fetchUniqueLink = async () => {
    const link = await generateRedirectLink(deal, user);
    return link;
  };

  const handleClick = async () => {
    if (!user.verified && !(user.email && user.newsletterUrl && user.email.length > 4 && user.newsletterUrl.length > 4 && user.stripeAddLater)) {
      console.log(
        'your newsletter account is not yet verified. please go to your dashboard and enter missing information before you can claimOffer ',
        showModal
      );
      setShowModal(true);
      return;
    }
    if (uniqueLink) {
      console.log("link already generated: ", uniqueLink);
      copyToClipboard(uniqueLink);
      showUniqueLinkModal();
    } else {
      if (user) { // TODO later change to user.verified
        console.log("new link to be generated");
  
        const link = await fetchUniqueLink();
        setUniqueLink(link);
        copyToClipboard(link);
        console.log("new link now generated: ", link);
        showUniqueLinkModal();
      } else {
        alert("An error occurred while generating the unique link. Please try again.");
      }
    }
    
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeClaimUniqueLinkModal = () => {
    setShowClaimUniqueLinkModal(false)
  }

  const showUniqueLinkModal = () => {
    setShowClaimUniqueLinkModal(true);
    console.log("State ShowClaimUniqueLinkModal", showClaimUniqueLinkModal);
  };

  return (
    <div>
        <ClaimButton onClick={handleClick}>
        {uniqueLink.length < 2 ? "Claim Offer" : "View your link!"}
        </ClaimButton>
        {/*uniqueLink && <p> You have a link for this offer! {uniqueLink}</p> */}
        {showModal && <Modal user={user} showModal={showModal} closeModal={closeModal} />}
        {showClaimUniqueLinkModal && <ClaimUniqueLinkModal uniqueLink={uniqueLink} user={user} showClaimUniqueLinkModal={showClaimUniqueLinkModal} showUniqueLinkModal={showUniqueLinkModal} closeClaimUniqueLinkModal={closeClaimUniqueLinkModal} />} {/* Render the LinkModal and pass the uniqueLink prop */}
    </div>
  );
};

export default ClaimOffer;
