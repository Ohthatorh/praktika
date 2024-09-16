import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = { title, description };
      await axios.post('http://localhost:5000/api/tasks', newTask, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Название задачи</Form.Label>
        <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Задача" required/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Описание задачи</Form.Label>
        <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание" required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Добавить задачу
      </Button>
    </Form>
  );
};

export default TaskForm;
