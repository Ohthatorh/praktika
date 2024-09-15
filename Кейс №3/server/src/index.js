const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к базе данных
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Роуты
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Запуск сервера
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));