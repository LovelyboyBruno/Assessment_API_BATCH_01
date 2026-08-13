const Question = require("../models/Question");

//Create Question
const createQuestion = async (req, res, next) => {
    try {
        const question = await Question.create(req.body);

        res.status(201).json(question);
    } catch (error) {
        next(error);
    }
};

//Get Questions For Assessment
const getQuestions = async (req, res, next) => {
    try {
        const questions = await Question.find({
            assessmentId: req.params.assessmentId,
        });

        res.json(questions);
    } catch (error) {
        next(error);
    }
};

const getAllQuestions = async (req, res, next) => {
    try {

        const questions = await Question.find()
            .populate("assessmentId", "title");

            res.json(questions);

    } catch (error) {
        next(error);
    }
};

const updateQuestion = async (req, res, next) => {
    try {
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidtors: true }
        );

        if (!question) {
            return res.status(404).json({
                message:"Question not found"
            });
        }

        res.json(question);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createQuestion,
    getQuestions,
    getAllQuestions,
    updateQuestion,
};