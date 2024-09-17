const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [
        {
            questionText: { type: String, required: true },
            questionType: { type: String, enum: ['text', 'radio', 'checkbox'], required: true },
            options: [String] // используется для вопросов с выбором (радио или чекбоксы)
        }
    ],
    responses: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            answers: [String]
        }
    ]
});

module.exports = mongoose.model('Survey', surveySchema);
