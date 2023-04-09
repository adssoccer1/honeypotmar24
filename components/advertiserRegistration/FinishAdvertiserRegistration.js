

/*
My idea here is to build one componenet that can take care of verification (complete the advertiser user's signup) at any point in the 
site. So the user can pretty much choose when they want to complete all the necessary account information to verify them before they start posting deals

i would imaging the being 
 1) a pop-up that pops-up when an clicks on "Post deal" but are not verified
 2) part of the advertiser dashboard

 it will pull all user information we have on the user, present it to the user in an incomplete form, and highlight the incomplete fields needed in red. 

 Then the advertiser will have a clear idea of whats needed before they are verified
*/


import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const FinishAdvertiserRegistration = ({ user, open, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();

  console.log("stripe: ",stripe, " and ", !stripe );
  const onFinish = (values) => {
    // Handle form submission here
    console.log('Received values of form: ', values);
  };

  const handlePaymentMethod = async (paymentMethodId) => {
    console.log("handlePaymentMethod submt of strpe");

    try {
      const response = await fetch('/api/createCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          paymentMethodId,
        }),
      });

      if (response.ok) {
        message.success('Payment verified successfully.');
        // Reload the page or update user data to reflect the payment verification
      } else {
        message.error('An error occurred while verifying the payment.');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      message.error('An error occurred while verifying the payment.');
    }
  };

  const handleSubmit = async (event) => {
    console.log("handle submt of strpe");
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    console.log("pass condtonal submt of strpe");
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('[error]', error);
      message.error('An error occurred while processing the payment method.');
    } else {
      handlePaymentMethod(paymentMethod.id);
    }
  };

  return (
    <Modal
      title="Finish Advertiser Registration"
      open={open}
      onCancel={onCancel}
      cancelText="Cancel"
    >
      <Form onFinish={onFinish}>
        {/* Add form fields for any missing user information */}
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[{ required: true, message: 'Please input your company name!' }]}
        >
          <Input />
        </Form.Item>
        {/* Add more form fields if needed */}
      </Form>
      <Form onClick={handleSubmit}>
        <Form.Item label="Card Information">
          <CardElement />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!stripe}>
            Complete Payment Verification
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FinishAdvertiserRegistration;
