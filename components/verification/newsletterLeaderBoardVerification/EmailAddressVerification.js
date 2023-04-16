import { CheckIcon } from '@heroicons/react/24/solid';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthContext } from '../../../contexts/AuthContext';
import React, { useContext, useState, useEffect } from 'react';


const EmailAddressVerification = () => {
    const { user, setUser, sendVerificationEmail } = useContext(AuthContext);

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
      };

    const [formData, setFormData] = useState({
        email: user.email || '',
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log("contentUrl now updatng, ", newsletterUrl);
    };

    const handleSubmit = async () => {
        console.log("at handleSubmit, formData, ", formData);
        await sendVerificationEmail(formData["email"]);          
        console.log("you updated the user data to!!! : ", formData, " and a new user update " , user);
    };

    const renderInputField = (fieldName, labelText, inputType = 'text') => {
        const isVerified = user[fieldName] && user[fieldName] !== '' && user['emailVerified'];
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
                                readOnly
                            />
                            <button
                                onClick={handleSubmit}
                                className="ml-2 px-4 py-2 border border-transparent text-sm font-medium
                                rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            Send Verification Email
                            </button>
                        </div>
                    </div>
            );
        }
        
    };

  return (
          <div >
            {renderInputField('email', 'Email address')}
          </div>
  );
}
export default EmailAddressVerification;
