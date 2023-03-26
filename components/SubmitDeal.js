// components/SubmitDeal.js

import { useState } from 'react';

const SubmitDeal = ({user}) => {

  console.log('user at subdeal', user);

  const [dealData, setDealData] = useState({
    // Initialize the deal data with the necessary fields
    title: '',
    description: '',
    commission: '',
    shopurl: user.shopifyLink,
    ownerEmail: user.email,
    ownerId: user.id,
    dateCreated: new Date().toJSON()
    // Add other required fields here
  });

  const handleChange = (e) => {
    setDealData({
      ...dealData,
      [e.target.name]: e.target.value,
    });
    console.log('deal at subdeal', dealData);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(dealData);
    try {
      const response = await fetch('/api/deals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dealData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit deal');
      }

      alert('Deal submitted successfully!');
      // Clear form fields after successful
      // Clear form fields after successful submission
      setDealData({
        title: '',
        description: '',
        commission: '',
        dateCreated: ''
        // Reset other required fields here
      });

      const addedDeal = await response.json();
      console.log("added deal from submtdeal.js: ", addedDeal);
    } catch (error) {
      console.error('Error submitting deal:', error);
      alert('Failed to submit deal. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={dealData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={dealData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="commission">Commission:</label>
        <input
            id="commission"
            name="commission"
            type="number"
            min="1"
            max="100"
            value={dealData.commission}
            onChange={handleChange}
            required
        />
      </div>
      {/* Add other form fields as necessary */}
      <button type="submit">Submit Deal</button>
    </form>
  );
};

export default SubmitDeal;
