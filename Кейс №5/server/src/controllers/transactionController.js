const Transaction = require('../models/Transaction');

// Добавление транзакции
const addTransaction = async (req, res) => {
  const { type, amount, category, description } = req.body;
  try {
    const transaction = await Transaction.create({
      userId: req.user._id,
      type,
      amount,
      category,
      description,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при добавлении транзакции' });
  }
};

// Получение всех транзакций пользователя
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении транзакций' });
  }
};

// Удаление транзакции
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.userId.equals(req.user._id)) {
      await transaction.remove();
      res.json({ message: 'Транзакция удалена' });
    } else {
      res.status(404).json({ message: 'Транзакция не найдена' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении транзакции' });
  }
};

module.exports = { addTransaction, getTransactions, deleteTransaction };
