import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SurveyForm = () => {
    const { id } = useParams();
    const [survey, setSurvey] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/surveys/${id}`);
                setSurvey(data);
            } catch (error) {
                console.error('Error fetching survey', error);
            }
        };
        fetchSurvey();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/surveys/${id}/submit`, { answers });
            alert('Survey submitted!');
        } catch (error) {
            console.error('Error submitting survey', error);
        }
    };

    const handleChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    if (!survey) return <p>Loading...</p>;

    return (
        <Container>
            <h2>{survey.title}</h2>
            <Form onSubmit={handleSubmit}>
                {survey.questions.map((question, index) => (
                    <Form.Group key={index} className="mb-3">
                        <Form.Label>{question.questionText}</Form.Label>
                        {question.questionType === 'text' && (
                            <Form.Control
                                type="text"
                                placeholder="Your answer"
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
                        )}
                        {question.questionType === 'radio' && question.options.map((option, i) => (
                            <Form.Check
                                key={i}
                                type="radio"
                                label={option}
                                name={`question-${index}`}
                                value={option}
                                onChange={() => handleChange(index, option)}
                            />
                        ))}
                        {question.questionType === 'checkbox' && question.options.map((option, i) => (
                            <Form.Check
                                key={i}
                                type="checkbox"
                                label={option}
                                value={option}
                                onChange={() => handleChange(index, option)}
                            />
                        ))}
                    </Form.Group>
                ))}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default SurveyForm;
