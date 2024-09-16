import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return toast.error('Заполните все поля');
    }
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { username, password });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Вход в систему</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formLogin">
              <Form.Label>Логин</Form.Label>
              <Form.Control type="text" placeholder="Введите логин" value={username} onChange={(e) => setUsername(e.target.value)} />
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
  );
};

export default Login;
