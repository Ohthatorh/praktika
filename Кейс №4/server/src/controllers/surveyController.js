const Survey = require('../models/Survey');

// Создание новой анкеты
exports.createSurvey = async (req, res) => {
    const { title, questions } = req.body;
    try {
        const newSurvey = new Survey({ title, questions });
        await newSurvey.save();
        res.status(201).json(newSurvey);
    } catch (error) {
        res.status(400).json({ message: 'Error creating survey' });
    }
};

// Получение списка анкет
exports.getSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find();
        res.json(surveys);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.submitResponse = async (req, res) => {
  const { surveyId, answers } = req.body;
  try {
      const survey = await Survey.findById(surveyId);
      survey.responses.push({ userId: req.userId, answers });
      await survey.save();
      res.status(201).json({ message: 'Response submitted' });
  } catch (error) {
      res.status(400).json({ message: 'Error submitting response' });
  }
};
