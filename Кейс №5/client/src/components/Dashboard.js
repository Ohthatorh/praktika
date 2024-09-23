import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTransaction from './AddTransaction';
import ExpenseChart from './ExpenseChart';
import { Col, Container, Row } from 'react-bootstrap';
import IncomeChart from './IncomeChart';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem('token');

  const fetchTransactions = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get('http://localhost:5000/api/transactions', config);
      setTransactions(data);
    } catch (error) {
      console.error('Ошибка при получении транзакций', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Container>
    <Row className="justify-content-center align-items-center p-4">
      <Col md={3}>
        <h2>Ваш баланс</h2>
        <AddTransaction token={token} fetchTransactions={fetchTransactions} />
      </Col>
      <Col md={3}>
        <h2 className="text-center">Доходы</h2>
        <IncomeChart transactions={transactions} />
      </Col>
      <Col md={3}>
        <h2 className="text-center">Расходы</h2>
        <ExpenseChart transactions={transactions} />
      </Col>
    </Row>
  </Container>
  )
};

export default Dashboard;
