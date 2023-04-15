/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState } from 'react';

export default function RegisterPageToggle({ accountType, onAccountTypeChange }) {
  //const [selectedAccountType, setSelectedAccountType] = useState('');

  const handleAccountTypeChange = (event) => {
    const newAccountType = event.target.value;
    onAccountTypeChange(newAccountType);
    console.log("And the new accounttype: ", accountType);
    //onAccountTypeChange(accountType);
  };

  return (
    <fieldset>
      <legend className="sr-only">Account Type</legend>
      <div className="space-y-5">
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="newsletter"
              name="accountType"
              value="newsletter"
              type="radio"
              checked={accountType === 'newsletter'}
              onChange={handleAccountTypeChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="newsletter" className="font-medium text-gray-900">
              Content Creator Account
            </label>
            <p id="newsletter-description" className="text-gray-500">
              As a content creator, you want to work with Shopify stores.
            </p>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="advertiser"
              name="accountType"
              value="advertiser"
              type="radio"
              checked={accountType === 'advertiser'}
              onChange={handleAccountTypeChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="advertiser" className="font-medium text-gray-900">
              Advertiser Account
            </label>
            <p id="advertiser-description" className="text-gray-500">
              You want to connect your Shopify store with content creators.
            </p>
          </div>
        </div>
      </div>
    </fieldset>
  );
}
