import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, setTasks }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async (id) => {
    try {
      const task = tasks.find(task => task._id === id);
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { ...task, completed: !task.completed }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setTasks(tasks.map(t => (t._id === id ? { ...t, completed: !t.completed } : t)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id}>
          <span>{task.title}</span>
          <span>{task.description}</span>
          <span>{task.dueDate}</span>
          <button onClick={() => handleComplete(task._id)}>{task.completed ? 'Undo' : 'Complete'}</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
