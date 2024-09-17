import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const SurveyEditor = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ questionText: '', questionType: 'text', options: [] }]);

    const addQuestion = () => {
        setQuestions([...questions, { questionText: '', questionType: 'text', options: [] }]);
    };

    const handleChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/surveys', { title, questions });
            alert('Survey saved!');
        } catch (error) {
            console.error('Error saving survey', error);
        }
    };

    return (
        <Container>
            <h2>Create New Survey</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Survey Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter survey title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                {questions.map((question, index) => (
                    <Form.Group key={index} className="mb-3">
                        <Form.Label>Question {index + 1}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter question text"
                            value={question.questionText}
                            onChange={(e) => handleChange(index, 'questionText', e.target.value)}
                        />
                        <Form.Select
                            value={question.questionType}
                            onChange={(e) => handleChange(index, 'questionType', e.target.value)}
                        >
                            <option value="text">Text</option>
                            <option value="radio">Multiple Choice (Radio)</option>
                            <option value="checkbox">Multiple Choice (Checkbox)</option>
                        </Form.Select>
                    </Form.Group>
                ))}
                
                <Button variant="secondary" onClick={addQuestion}>
                    Add Question
                </Button>
                <Button variant="primary" type="submit" className="mt-3">
                    Save Survey
                </Button>
            </Form>
        </Container>
    );
};

export default SurveyEditor;
