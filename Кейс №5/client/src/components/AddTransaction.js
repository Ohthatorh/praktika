import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const AddTransaction = ({ token, fetchTransactions }) => {
  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    category: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post('http://localhost:5000/api/transactions', formData, config);
      setFormData({
        type: 'income',
        amount: '',
        category: '',
        description: '',
      })
      fetchTransactions();
    } catch (error) {
      console.error('Ошибка при добавлении транзакции', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formSelect" className='mb-4'>
        <Form.Label>Сумма</Form.Label>
        <Form.Select defaultValue={formData.type} onChange={handleChange}>
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formAmount" className='mb-4'>
        <Form.Label>Сумма</Form.Label>
        <Form.Control type="number" name="amount" value={formData.amount} onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="formCategory" className='mb-4'>
        <Form.Label>Категория</Form.Label>
        <Form.Control type="text" name="category" value={formData.category} onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="formDescription" className='mb-4'>
        <Form.Label>Описание</Form.Label>
        <Form.Control type="text" name="description" value={formData.description} onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Добавить
      </Button>
    </Form>
  );
};

export default AddTransaction;
