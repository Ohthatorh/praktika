import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Регистрация элементов Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const IncomeChart = ({ transactions }) => {
  const expenseCategories = transactions.filter(t => t.type === 'income')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});
  const data = {
    labels: Object.keys(expenseCategories),
    datasets: [{
      data: Object.values(expenseCategories),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    }],
  };

  return <Pie data={data} />;
};

export default IncomeChart;
