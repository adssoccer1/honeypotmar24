// components/AccountTypePopup.js

import React, { useState } from 'react';

const AccountTypePopup = ({ user, onSave, onCancel }) => {
  const [accountType, setAccountType] = useState('');
  const [shopifyLink, setShopifyLink] = useState('');

  const handleSubmit = () => {
    if (accountType === 'newsletter' || (accountType === 'advertiser' && shopifyLink)) {
      onSave({ accountType, shopifyLink });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="popup">
      <h2>Select Account Type</h2>
      <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
        <option value="">Select an account type</option>
        <option value="newsletter">Newsletter</option>
        <option value="advertiser">Advertiser</option>
      </select>
      {accountType === 'advertiser' && (
        <div>
          <label htmlFor="shopifyLink">Shopify Store Link:</label>
          <input
            type="text"
            id="shopifyLink"
            value={shopifyLink}
            onChange={(e) => setShopifyLink(e.target.value)}
          />
        </div>
      )}
      <button onClick={handleSubmit}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default AccountTypePopup;