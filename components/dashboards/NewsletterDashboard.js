import React, { useEffect, useState } from 'react';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../lib/firebase';
import { List, Typography, Row, Col, Card } from 'antd';

const { Text } = Typography;

const NewsletterDashboard = ({ user }) => {
  const [completedSales, setCompletedSales] = useState([]);
  const [uniqueLinks, setUniqueLinks] = useState([]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    const completedSalesRef = ref(db, 'completedSales');
    const uniqueLinksRef = ref(db, 'uniqueLinks');

    const completedSalesQuery = query(completedSalesRef, orderByChild('newsletterId'), equalTo(user.id));
    const uniqueLinksQuery = query(uniqueLinksRef, orderByChild('newsletterId'), equalTo(user.id));

    const completedSalesSnapshot = await get(completedSalesQuery);
    const uniqueLinksSnapshot = await get(uniqueLinksQuery);

    if (completedSalesSnapshot.exists()) {
      setCompletedSales(Object.values(completedSalesSnapshot.val()));
    }
    if (uniqueLinksSnapshot.exists()) {
      setUniqueLinks(Object.values(uniqueLinksSnapshot.val()));
    }
  };

  // Render logic specific to newsletter accounts
  const totalAmount = completedSales.reduce((acc, sale) => acc + sale.amount, 0);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
      <h2>Unique Links</h2>
      <List
        dataSource={uniqueLinks}
        renderItem={(link, index) => (
          <List.Item key={index}>
            <Text>{JSON.stringify(link)}</Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default NewsletterDashboard;
