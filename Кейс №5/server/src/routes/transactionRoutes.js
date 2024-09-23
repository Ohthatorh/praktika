const express = require('express');
const { addTransaction, getTransactions, deleteTransaction } = require('../controllers/transactionController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, addTransaction);
router.get('/', protect, getTransactions);
router.delete('/:id', protect, deleteTransaction);

module.exports = router;
