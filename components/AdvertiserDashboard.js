import React, { useEffect, useState } from 'react';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../lib/firebase';
import { List, Typography, Row, Col, Card } from 'antd';

const { Text } = Typography;

const AdvertiserDashboard = ({ user }) => {
  const [completedSales, setCompletedSales] = useState([]);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    const completedSalesRef = ref(db, 'completedSales');
    const dealsRef = ref(db, 'deals');

    const completedSalesQuery = query(completedSalesRef, orderByChild('advertiserId'), equalTo(user.id));
    const dealsQuery = query(dealsRef, orderByChild('advertiserId'), equalTo(user.id));

    const completedSalesSnapshot = await get(completedSalesQuery);
    const dealsSnapshot = await get(dealsQuery);

    if (completedSalesSnapshot.exists()) {
      setCompletedSales(Object.values(completedSalesSnapshot.val()));
    }
    if (dealsSnapshot.exists()) {
      setDeals(Object.values(dealsSnapshot.val()));
    }
  };

  // Render logic specific to advertiser accounts
  const totalAmount = completedSales.reduce((acc, sale) => acc + sale.amount, 0);

  return (
    <div>
      <h1>Dashboard</h1>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="User Information">
            <p>Email: {user.email}</p>
            <p>Account Type: {user.accountType}</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Data">
            <p>Total Sales Amount: ${totalAmount.toFixed(2)}</p>
            <p>Total Amount to be billed: ${totalAmount.toFixed(2)}</p>
          </Card>
        </Col>
      </Row>
      <h2>Completed Sales</h2>
      <List
        dataSource={completedSales}
        renderItem={(sale, index) => (
          <List.Item key={index}>
            <Text>{JSON.stringify(sale)}</Text>
          </List.Item>
        )}
      />
      <h2>Deals</h2>
      <List
        dataSource={deals}
        renderItem={(deal, index) => (
          <List.Item key={index}>
            <Text>{JSON.stringify(deal)}</Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default AdvertiserDashboard;
