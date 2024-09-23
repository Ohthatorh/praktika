import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      setError('Ошибка входа. Проверьте правильность данных.');
    }
  };

  return (
    <Container>
    <Row className="justify-content-center">
      <Col md={6}>
        <h2>Вход в систему</h2>
        {error && <div className="error">{error}</div>}
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formLogin">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Введите Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPassword" className='mb-4'>
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Войти
          </Button>
          <Link to="/register">
            <Button variant="primary" >
              Зарегистрироваться
            </Button>
          </Link>
        </Form>
      </Col>
    </Row>
  </Container>
  )
};

export default Login;
