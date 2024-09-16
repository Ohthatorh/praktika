import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Col, Container, Row } from 'react-bootstrap';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/tasks', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>Задачи</h1>
          <TaskForm />
          <TaskList tasks={tasks} setTasks={setTasks} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
