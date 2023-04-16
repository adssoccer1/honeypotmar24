import { CheckIcon } from '@heroicons/react/24/solid';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../../../contexts/AuthContext';
import React, { useContext, useState } from 'react';
import EmailAddressVerification from './EmailAddressVerification';


const ContentURLVerification = () => {
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
          alert("Cool! Your link is only used to help advertiser's find the best partners. Feel free to edit your links in your dashboard.");
          console.log("you updated the user data to!!! : ", data, " and a new user update " , user);
        }
    };


    const renderInputField = (fieldName, labelText, inputType = 'text') => {
        const isVerified = user[fieldName] && user[fieldName] !== '';
        const inputClass = isVerified
          ? 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
          : 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6';
        
          if (isVerified) {
            return (
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor={fieldName} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    {labelText}:
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0 flex items-center">
                    <input
                    type={inputType}
                    name={fieldName}
                    id={fieldName}
                    autoComplete="off"
                    className={inputClass}
                    defaultValue={user[fieldName]}
                    readOnly
                    />
                    <CheckIcon className="h-6 w-6 text-green-600 ml-2" aria-hidden="true" />
                </div>
                </div>
            );
            } else {
            return (
                <form onSubmit={(e) => handleSubmit(e, fieldName)}>
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label htmlFor={fieldName} className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                        {labelText}:
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0 flex items-center">
                            <input
                                type={inputType}
                                name={fieldName}
                                id={fieldName}
                                autoComplete="off"
                                className={inputClass}
                                value={formData[fieldName]}
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                className="ml-2 px-4 py-2 border border-transparent text-sm font-medium
                                rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            Submit
                            </button>
                        </div>
                    </div>
                </form>
            );
        }
        
    };

  return (
    <div>
        {renderInputField('newsletterUrl', 'Link to content you create')}
    </div>
  );
}
export default ContentURLVerification;
