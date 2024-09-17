import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const SurveyResults = () => {
    const { id } = useParams();
    const [results, setResults] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/surveys/${id}/results`);
                setResults(data);
            } catch (error) {
                console.error('Error fetching survey results', error);
            }
        };

        fetchResults();
    }, [id]);

    if (!results) return <p>Loading...</p>;

    // Пример данных для столбчатой диаграммы
    const barData = {
        labels: results.questions.map(q => q.questionText),
        datasets: [
            {
                label: 'Ответы',
                data: results.questions.map(q => q.answers.length),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }
        ]
    };

    // Пример данных для круговой диаграммы
    const pieData = {
        labels: results.questions[0].options, // Подразумевается, что первый вопрос - множественный выбор
        datasets: [
            {
                data: results.questions[0].answers.reduce((acc, answer) => {
                    acc[answer] = (acc[answer] || 0) + 1;
                    return acc;
                }, {}),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            }
        ]
    };

    return (
        <Container>
            <h2>Survey Results</h2>
            <div className="mb-5">
                <h4>Ответы по количеству вопросов</h4>
                <Bar data={barData} />
            </div>
            <div className="mb-5">
                <h4>Ответы на первый вопрос</h4>
                <Pie data={pieData} />
            </div>
        </Container>
    );
};

export default SurveyResults;
