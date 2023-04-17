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
import { CheckIcon } from '@heroicons/react/24/solid';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthContext } from '../../../contexts/AuthContext';
import React, { useContext, useState } from 'react';
import EmailAddressVerification from '../newsletterLeaderBoardVerification/EmailAddressVerification';
import ContentURLVerification from '../newsletterLeaderBoardVerification/ContentURLVerification';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const AdvertiserLeaderBoardVerification = () => {
    const { user, setUser } = useContext(AuthContext);

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
      };

    const [formData, setFormData] = useState({
        email: user.email || '',
        newsletterUrl: user.newsletterUrl || '',
        stripeVerification: user.stripeVerification || ''
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log("contentUrl now updatng, ", newsletterUrl);
    };
    
    const onClickAddLater = async () => {

        console.log("at onClickAddLater,formData,  ");
    
          const response = await fetch('/api/updateUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: user,
              fieldToUpdate: "stripeAddLater",
              newValue: true
            })
          });
    
          const data = await response.json();
          if (data.success) {
            updateUser({ ...user, "stripeAddLater" : true });
          }
          
          console.log("you updated the user data to!!! : ", data, " and a new user update " , user);
        }


    const handleSubmit = async (e, fieldName) => {
        e.preventDefault();

        if(formData[fieldName].length < 4) return;


        console.log("at handleSubmit,formData,  ", formData);
    
        if (formData[fieldName] !== user[fieldName]) {
          const response = await fetch('/api/updateUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: user,
              fieldToUpdate: fieldName,
              newValue: formData[fieldName]
            })
          });
    
          const data = await response.json();
          if (data.success) {
            updateUser({ ...user, [fieldName]: formData[fieldName] });
          }
          
          console.log("you updated the user data to!!! : ", data, " and a new user update " , user);
        }
    };

    const stripe = useStripe();
    const elements = useElements();

    const handleStripeSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
          return;
        }
    
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
    
        if (error) {
          console.error('[error]', error);
        } else {
          // Send the paymentMethod to your backend for processing
          // and update the user's stripeVerification status in your database
          console.log('[PaymentMethod]', paymentMethod);
        }
    };

    const renderInputField = (fieldName, labelText, inputType = 'text') => {
        const isVerified = user[fieldName] && user[fieldName] !== '';
        const inputClass = isVerified
          ? 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
          : 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6';
      
        if (fieldName === 'stripeVerification') {
          return (
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor={fieldName} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                {labelText}
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0 flex items-center">
                {!user.stripeVerification && !user.stripeVerificationPending && (
                  <form onSubmit={handleStripeSubmit} className="w-full">
                    <CardElement className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" />
                    <button
                        type="button"
                        className="mt-3 bg-gray-400 text-white rounded-md px-3 py-1"
                        onClick={onClickAddLater}
                    >
                        Add Later
                    </button>
                    <button
                      type="submit"
                      disabled={!stripe}
                      className="ml-2 mt-3 bg-indigo-600 text-white rounded-md px-3 py-1"
                    >
                      Submit
                    </button>
                  </form>
                )}
                {user.stripeVerification && (
                  <CheckIcon className="h-6 w-6 text-green-600 ml-2" aria-hidden="true" />
                )}
                </div>
            </div>
            );
        }
    };

  return (
    <div>
      <div className="space-y-12 sm:space-y-16">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Leaderboard Verification</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            This remaining information is needed for you to start working with offers from the leaderboard.
          </p>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <EmailAddressVerification></EmailAddressVerification>
            <ContentURLVerification></ContentURLVerification>
            {renderInputField('stripeVerification', "Stripe verification - we'll only ever pay you!")}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdvertiserLeaderBoardVerification;
