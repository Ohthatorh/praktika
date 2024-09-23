import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/register', { name, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      setError('Ошибка регистрации. Проверьте данные.');
    }
  };

  return ( 
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Зарегистрироваться</h2>
          {error && <div className="error">{error}</div>}
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formName" className='mb-4'>
              <Form.Label>Имя</Form.Label>
              <Form.Control type="text" placeholder="Введите имя" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formEmail" className='mb-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Введите email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword" className='mb-4'>
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Зарегистрироваться
            </Button>
            <Link to="/login">
              <Button variant="primary" >
                Войти
              </Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default Register;
