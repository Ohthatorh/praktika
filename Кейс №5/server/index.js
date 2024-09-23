const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Подключение маршрутов
const userRoutes = require('./src/routes/userRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');
const verifyRoutes = require('./src/routes/verify');

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', verifyRoutes);

// Подключение к базе данных
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB подключен'))
  .catch((error) => console.error('Ошибка подключения к MongoDB:', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
