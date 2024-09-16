import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ModalDialog from './ModalDialog';

const TaskList = ({ tasks, setTasks }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const handleOpenModal = (id) => {
    setTaskId(id);
    setShowModal(true);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setTasks(tasks.filter(task => task._id !== id));
      toast.success('Задача удалена!');
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async (id) => {
    try {
      const task = tasks.find(task => task._id === id);
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { ...task, completed: !task.completed }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setTasks(tasks.map(t => (t._id === id ? { ...t, completed: !t.completed } : t)));
      if (task.completed) {
        toast.warning('Задача открыта!')
      } else {
        toast.success('Задача завершена!')
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ListGroup>
        {tasks.map(task => (
          <ListGroupItem key={task._id}>
            <Row>
              <Col md={6}>
                <h5>{task.title}</h5>
                <p>{task.description}</p>
              </Col>
              <Col md={6} className="text-right">
                <Button variant="primary" onClick={() => handleComplete(task._id)}>
                  {task.completed ? 'Открыть' : 'Завершить'}
                </Button>
                <Button variant="danger" onClick={() => handleOpenModal(task._id)}>
                  Удалить задачу
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
      <ModalDialog show={showModal} handleCancel={() => setShowModal(false)} handleAppend={() => handleDelete(taskId)} />
    </>
  );
};

export default TaskList;
