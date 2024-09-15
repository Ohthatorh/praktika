import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

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
    <div>
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Home;
