const Question = require("../models/Question");

//Create Question
const createQuestion = async (req, res) => {
    try {
        const question = await Question.create(req.body);

        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//Get Questions For Assessment
const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find({
            assessmentId: req.params.assessmentId,
        });

        res.json(questions);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createQuestion,
    getQuestions,
};