const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authController = require('./controllers/authController');
const surveyController = require('./controllers/surveyController');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к базе данных
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.post('/api/surveys', surveyController.createSurvey);
app.get('/api/surveys', surveyController.getSurveys);
app.post('/api/surveys/:id/submit', surveyController.submitResponse);

// Запуск сервера
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));